import * as React from 'react';

export const CircleCloseIcon = () => {
    return (
        <svg width={32} height={32} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9.29289 9.29289C9.68342 8.90237 10.3166 8.90237 10.7071 9.29289L16 14.5858L21.2929 9.29289C21.6834 8.90237 22.3166 8.90237 22.7071 9.29289C23.0976 9.68342 23.0976 10.3166 22.7071 10.7071L17.4142 16L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L16 17.4142L10.7071 22.7071C10.3166 23.0976 9.68342 23.0976 9.29289 22.7071C8.90237 22.3166 8.90237 21.6834 9.29289 21.2929L14.5858 16L9.29289 10.7071C8.90237 10.3166 8.90237 9.68342 9.29289 9.29289Z"
                fill="#F2F0FF"
            />
            <rect x={1} y={1} width={30} height={30} rx={15} stroke="#F2F0FF" strokeWidth={2} />
        </svg>
    );
};

export const CircleCloseDangerLargeIcon = () => {
    return (
        <svg width={60} height={60} viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 30C0 13.44 13.44 0 30 0C46.56 0 60 13.44 60 30C60 46.56 46.56 60 30 60C13.44 60 0 46.56 0 30ZM6 30C6 43.23 16.77 54 30 54C43.23 54 54 43.23 54 30C54 16.77 43.23 6 30 6C16.77 6 6 16.77 6 30ZM38.0572 18L42 21.9427L33.9427 30L42 38.0572L38.0573 42L30 33.9427L21.9427 42L18 38.0572L26.0573 30L18 21.9427L21.9427 18L30 26.0572L38.0572 18Z"
                fill="#FF4445"
            />
        </svg>
    );
};

export const CircleCloseModalNetworkIcon = () => {
    return (
        <svg width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx={8} cy={8} r={8} fill="#6F6F6F" />
            <path
                d="M9.6 6.4L6.4 9.6m0-3.2l3.2 3.2"
                stroke="#B5B3BC"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
