import { makeObservable, observable, action, runInAction, toJS } from 'mobx';
import { format } from 'date-fns';

const formatDate = (dateString) => {
    if (typeof dateString === 'string') {
        const dateParts = dateString.split('T')[0].split('-');
        const year = parseInt(dateParts[0]);
        const month = parseInt(dateParts[1]) - 1; // חודש מתחיל מ-0
        const day = parseInt(dateParts[2]);
        return new Date(year, month, day);
    }
};

const baseUrl = 'https://localhost:7067/api/Employee'

class EmployeeStore {

    employees = []
    arr = []
    constructor() {
        makeObservable(this, {
            employees: false,
            addEmployee: action,
            getAllEmployees: action,
            removeEmployee: action,
            putEmployeeById: action,
            // getEmployeeById: observable//זה אמור להיות observable
        });
        this.getAllEmployees()
    }

    async getAllEmployees() {
        try {
            const res = await fetch(baseUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const data = await res.json();

            runInAction(() => {
                this.employees = data;
                this.employees.forEach(employee => {
                    employee.birthDate = formatDate(employee.birthDate);
                    employee.startDate = formatDate(employee.startDate);
                    if (employee.employeeRoles) {
                        employee.employeeRoles.forEach(role => {
                            role.startRole = formatDate(role.startRole);
                        });
                    } else {
                        console.log("there are no roles for employee with ID " + employee.id);
                    }
                });
            });

            console.log(this.employees);
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    // getEmployeeById(id) {
    //     return this.employees.filter(emp => emp.id === id)
    // }

    addEmployee = async (employee) => {
        try {
            employee.birthDate = format(new Date(employee.birthDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            employee.startDate = format(new Date(employee.startDate), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(employee),

            });
            if (response.status === 200) {
                this.getAllEmployees();
                console.log("addEmployee")
            } else console.log(error)
        }
        catch {
            console.log("fail addEmployee")
        }
    }

    async putEmployeeById(id, updatedEmployee) {
        try {
            const response = await fetch(`${baseUrl}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedEmployee),
            });

            if (response.ok) {

                const index = this.employees.findIndex(emp => emp.id === id);//בדיקה האם קיים
                console.log(index)
                if (index !== -1) {
                    this.employees[index] = { ...this.employees[index], ...updatedEmployee };
                    const emp = this.employees.find(e => e.id === index)//האוביקט שצריך להשתנות
                    console.log("putEmployeeById success");
                    console.log("response in put :"+response)
                    return response
                }
            }
        }
        catch {
            console.log("putEmployeeById failed");
            return null
        }
    }

    async removeEmployee(id) {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            console.log("removeEmployee success");
            this.employees = this.employees.filter(emp => emp.id !== id);
        } else {
            console.log("Employee not found to delete");
        }
    }
}
export default new EmployeeStore();
