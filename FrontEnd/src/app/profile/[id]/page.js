"use client";
import React from 'react';
import { useRouter } from "next/navigation";

const ProfilePage = () => {
    const router = useRouter();

    const handleLogout = async() => {
        await fetch('http://localhost:3000/api/logout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        router.push('/login');
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
            {/* Add your profile content here */}
            <p>Welcome to your profile page!</p>

            <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 mt-4 rounded"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
};

export default ProfilePage;