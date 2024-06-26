"use client"

import React, { useState } from "react";
import axiosInstance from "@/app/api";
import SERVER_API_URL from "@/app/config";
import { User } from "@/app/types";
import { jwtDecode } from "jwt-decode";
import { FaGoogle } from "react-icons/fa";
import Head from 'next/head';

interface SignUpProps {
    onClose: () => void;
    setUserLoggedIn: React.Dispatch<React.SetStateAction<User | undefined>>
    setCurrentPage: React.Dispatch<React.SetStateAction<string>>
}

const SignUp: React.FC<SignUpProps> = ({ onClose, setUserLoggedIn, setCurrentPage }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.post(`${SERVER_API_URL}/auth/signup`, {
                firstName, lastName, email, password
            });
            if (response.status === 201) {
                const user = response.data;
                localStorage.setItem("token", user.token)
                const decodedData = jwtDecode(user.token) as User;
                if (decodedData) {
                    setUserLoggedIn(decodedData);
                }
                onClose();
            }

        } catch (e: any) {
            if (e.code === 'ERR_NETWORK') {
                setError('Please check your internet connection');
            } else if (e.response && e.response.status === 406) {
                setError('This email is already taken user!');
            } else {
                setError('unKnown error, please refresh and try again!');
            }
        }
        setLoading(false);
    };

    return (
        <>
            <Head>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
            </Head>
            <div className="p-10 pt-5" style={{ minWidth: 500, minHeight: 450 }}>
                <form onSubmit={handleSubmit}>
                    {error && (
                        <div className="w-full px-2 py-2 mb-5 bg-red-200 text-center">{error}</div>
                    )}
                    <input
                        required
                        type="firstName"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <input
                        required
                        type="lastName"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <input
                        required
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <input
                        required
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <input
                        required
                        type="confirmPassword"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                    />
                    <button
                        disabled={loading}
                        type="submit"
                        className={`flex justify-center items-center w-full ${loading ? "bg-gray-300" : "bg-blue-500  hover:bg-blue-700"} text-white font-bold py-2 px-4 rounded`}
                    >
                        {loading && <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-900"></div>}
                        Sign Up
                    </button>

                    <div className="m-1 text-center">Or</div>
                    <button
                        onClick={() => setCurrentPage("signUpWithGoogle")}
                        className=" flex flex-row justify-center items-center gap-3 w-full bg-gray-200 hover:bg-gray-300 text-black text-center font-bold py-2 px-4 rounded"
                    >
                        <FaGoogle /> Sign Up with Google
                    </button>

                </form>
            </div>
        </>
    );
};

export default SignUp;
