import * as React from 'react';

export const UserIcon = ({ strokeColor }) => {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M18.0003 18C19.8413 18 21.3337 16.5077 21.3337 14.6667C21.3337 12.8258 19.8413 11.3334 18.0003 11.3334C16.1594 11.3334 14.667 12.8258 14.667 14.6667C14.667 16.5077 16.1594 18 18.0003 18Z"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M23.7268 24.6667C23.7268 22.0867 21.1601 20 18.0001 20C14.8401 20 12.2734 22.0867 12.2734 24.6667"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
