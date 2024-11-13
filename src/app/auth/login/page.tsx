// src/pages/login.tsx
"use client";
import React, { useState } from 'react';
import AuthService from "@/app/services/AuthService";
import { LoginRequest } from '@/app/models/auth-model';
import { useRouter } from 'next/navigation';
import ErrorAlert from '@/app/components/alert/error-alert';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorText, setErrorText] = useState('Error has occurred');
    const router = useRouter();

    const loginHandler = async (event: React.FormEvent) => {
        event.preventDefault();
        const authService = new AuthService();
        try {
            const result = await authService.Login(new LoginRequest(email, password));
            console.log(result);
            localStorage.setItem("jwtToken", result.jwtToken);
            localStorage.setItem("refreshToken", result.refreshToken);
            setErrorText('');
            router.refresh();
            router.push('/'); // Use router.push correctly
        } catch (error) {
            console.error('Login error:', error);
            setErrorText('Login failed. Please check your credentials and try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-800">
            <div className="bg-white bg-opacity-75 p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-4">Login</h1>
                <form className="flex flex-col gap-4" onSubmit={loginHandler}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="border border-gray-300 p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="border border-gray-300 p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Login
                    </button>
                </form>
                {errorText && (
                    <ErrorAlert message={errorText} />
                )}
            </div>
        </div>
    );
}