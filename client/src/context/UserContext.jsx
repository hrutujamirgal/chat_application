/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

const UserContext = createContext()

export const UserProvider = ({ children }) => {

    const [alert, setAlert] = useState(null);  // State to control alert display
    const navigate = useNavigate();
    
    const userroute = import.meta.env.VITE_ROUTE;
    const route = `${userroute}/auth`;

    const showAlert = (status, title, description) => {
        setAlert({ status, title, description });
        setTimeout(() => setAlert(null), 3000); // Hide the alert after 3 seconds
    }

    const login = async (data) => {
        try {
            console.log(data);
            const response = await fetch(`${route}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showAlert("success", "Login Successful", "You have logged in successfully.");
                navigate("/in");
            } else {
                showAlert("error", "Login Failed", "Invalid credentials, please try again.");
            }
        } catch (e) {
            console.error("Error in the data: ", e);
            showAlert("error", "Login Failed", "An error occurred. Please try again.");
        }
    };

    const signup = async (data) => {
        try {
            console.log(data);
            const response = await fetch(`${route}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                showAlert("success", "Sign Up Successful", "You have signed up successfully.");
                navigate("/in");
            } else {
                showAlert("error", "Sign Up Failed", "An error occurred. Please try again.");
            }
        } catch (e) {
            console.error("Error in the data: ", e);
            showAlert("error", "Sign Up Failed", "An error occurred. Please try again.");
        }
    };

    return (
        <UserContext.Provider value={{login, signup}}>
            {alert && (
                <Alert status={alert.status} variant="solid" mb={4}>
                    <AlertIcon />
                    <AlertTitle>{alert.title}</AlertTitle>
                    <AlertDescription>{alert.description}</AlertDescription>
                </Alert>
            )}
            {children}
        </UserContext.Provider>
    );
}

export const useAuth = () => useContext(UserContext);
