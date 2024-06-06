import { makeObservable, observable, runInAction } from 'mobx';
import EmployeeStore from './EmployeeStore';
const baseUrl = 'https://localhost:7067/api/Role'
const formatDate = (dateString) => {
    if (typeof dateString === 'string') {
        const dateParts = dateString.split('T')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // חודש מתחיל מ-0
        const day = parseInt(dateParts[2]);
        return new Date(year, month, day);
    }
};
class RoleStore {
    roles = []

    constructor() {
        makeObservable(this, {
            roles: false,
            getAllRoles: observable,
        });
        this.getAllRoles()
    }
    async getAllRoles() {

        fetch(baseUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((res) => {
            res.json().then((data) => {
                console.log(data);
                runInAction(() => {
                    this.roles = data;
                    this.roles.forEach(r => {
                        r.startRole = formatDate(r.startRole);
                    });
                });console.log(this.roles)
            });
            
        }).catch((error) => {
            console.log(error);
        });
        return this.roles;
    }

} export default new RoleStore();