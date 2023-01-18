import * as React from 'react';

export const InfoIcon = () => {
    return (
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8 14.667c3.667 0 6.667-3 6.667-6.667s-3-6.667-6.666-6.667c-3.667 0-6.667 3-6.667 6.667s3 6.667 6.667 6.667zM8 5.333v3.334"
                stroke="#B5B3BC"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M7.996 10.667h.006"
                stroke="#B5B3BC"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const InfoModalNetworkIcon = () => {
    return (
        <svg width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.25 1a5.25 5.25 0 100 10.5 5.25 5.25 0 000-10.5zm.375 7.781a.094.094 0 01-.094.094H5.97a.094.094 0 01-.094-.094V5.594c0-.052.042-.094.094-.094h.562c.052 0 .094.042.094.094V8.78zM6.25 4.75a.563.563 0 010-1.125.563.563 0 010 1.125z"
                fill="#6F6F6F"
            />
        </svg>
    );
};

export const InfoWarningIcon = () => {
    return (
        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                opacity={0.3}
                d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm1 13h-2v-6h2v6zm0-8h-2V7h2v2z"
                fill="#FF9533"
            />
            <path
                d="M11 7h2v2h-2V7zm0 4h2v6h-2v-6zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
                fill="#FF9533"
            />
        </svg>
    );
};
