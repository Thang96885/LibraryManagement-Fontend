// src/app/admin/auth/change-password/page.tsx
'use client'
import { useState } from 'react';
import AuthService from '@/app/services/AuthService';
import { ChangePasswordRequest } from '@/app/models/auth-model';

export default function ChangePasswordForm() {
    const authService = new AuthService();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        if (newPassword !== confirmPassword) {
            setError('New password and confirm password do not match');
            return;
        }
        const userName = authService.DeCodeJwtToken(authService.GetJwtToken()).nameid;

        const request = new ChangePasswordRequest(userName, currentPassword, newPassword);
        const result = await authService.changePassword(request);

        if (result) {
            setSuccess(true);
        } else {
            setError('Failed to change password');
        }
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Change Password</h1>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow">
                {error && <p className="text-red-500 mb-4">{error}</p>}
                {success && <p className="text-green-500 mb-4">Password changed successfully</p>}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Password</label>
                    <input
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">New Password</label>
                    <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                        required
                    />
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Change Password
                    </button>
                </div>
            </form>
        </div>
    );
}