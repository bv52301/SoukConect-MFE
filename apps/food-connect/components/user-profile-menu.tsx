'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/auth-context';

export const UserProfileMenu: React.FC = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:opacity-80 transition"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-semibold text-sm">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm font-semibold text-gray-700 hidden md:inline">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>

          <div className="p-2">
            <button
              onClick={() => {
                setIsOpen(false);
                // Add profile edit functionality here
              }}
              className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
            >
              Profile
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                // Add order history functionality here
              }}
              className="w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
            >
              Order History
            </button>
            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
