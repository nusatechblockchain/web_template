import * as React from 'react';

export const AnnouncementIcon = ({ fillColor }) => {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_604_6051)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.333 12H12.6663C11.933 12 11.333 12.6 11.333 13.3333V22.6667C11.333 23.4 11.933 24 12.6663 24H23.333C24.0663 24 24.6663 23.4 24.6663 22.6667V13.3333C24.6663 12.6 24.0663 12 23.333 12ZM23.333 22.6667H12.6663V13.3333H23.333V22.6667Z"
                    fill={fillColor}
                />
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M22.94 16.9467L21.9933 16L19.88 18.1133L18.94 17.1667L18 18.1067L19.88 20L22.94 16.9467Z"
                    fill="#F2F0FF"
                />
                <path d="M16.6663 14.6667H13.333V16H16.6663V14.6667Z" fill="#F2F0FF" />
                <path d="M16.6663 17.3333H13.333V18.6667H16.6663V17.3333Z" fill="#F2F0FF" />
                <path d="M16.6663 20H13.333V21.3333H16.6663V20Z" fill="#F2F0FF" />
            </g>
            <defs>
                <clipPath id="clip0_604_6051">
                    <rect width="16" height="16" fill="white" transform="translate(10 10)" />
                </clipPath>
            </defs>
        </svg>
    );
};
