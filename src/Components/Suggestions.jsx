// src/Components/Suggestions.jsx

import React from 'react';
import { useSelector } from 'react-redux';

const Suggestions = () => {
    const user = useSelector((store) => store.user);

    if (!user) return null; // Don't render if no user

    return (
        <div>
            {/* Current User Profile Snippet */}
            <div className="flex items-center gap-4 mb-8">
                <div className="avatar">
                    <div className="w-14 rounded-full">
                        <img src={user.photoUrl} alt="User avatar" />
                    </div>
                </div>
                <div>
                    <p className="font-bold">{user.firstName} {user.lastName}</p>
                    <p className="text-sm text-neutral-400">Welcome back!</p>
                </div>
            </div>

            {/* Suggestions Placeholder */}
            <h3 className="text-neutral-400 font-semibold mb-4">Suggestions For You</h3>
            <div className="flex flex-col gap-4">
                {/* This is where you would map over suggested users */}
                <div className="flex items-center justify-between">
                    <p className="text-neutral-300">Future suggestions will appear here.</p>
                </div>
            </div>
        </div>
    );
}

export default Suggestions;