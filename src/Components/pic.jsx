import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import EmployeeTable from './EmployeeTable';
function Pic({ onSave, onCancel }) {
    const [isHovered, setIsHovered] = useState(false);
    useEffect(() => {
        const handleMouseEnter = () => setIsHovered(true);

        document.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            document.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, []);

    return (
        <>
            <div className="container">
                <motion.div
                    className="animated-box"
                    initial={{ y: 0 }}
                    animate={{ y: isHovered ? -window.innerHeight : 0 }}
                    transition={{ duration: 0.5 }}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="content">
                        <h1>דף ראשי</h1>
                        <p>העבר את העכבר למעלה כדי לראות תוכן נוסף</p>
                    </div>
                </motion.div>
                <div className="hidden-content">
                    <EmployeeTable />
                </div>
            </div>
        </>
    );
}

export default Pic;