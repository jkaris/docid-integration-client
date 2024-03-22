import React, { useState, useEffect } from "react";
import "./Toast.css";
import { Toast, ToastBody, ToastContainer } from "react-bootstrap"; // Import CSS for Toast component

const UserAuthToast = ({ message, showToast, setShowToast }) => {
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000); // Adjust the time as needed (e.g., 3000ms = 3 seconds)

            return () => clearTimeout(timer);
        }
    }, [showToast, setShowToast]);

    return (
        <Toast>
            <ToastContainer className={`toast ${showToast ? "show" : null}`}>
                <ToastBody className="toast-content">{message}</ToastBody>
            </ToastContainer>
        </Toast>
    );
};

export default UserAuthToast;
