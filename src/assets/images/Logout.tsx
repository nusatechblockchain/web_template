import * as React from 'react';

interface LogoutProps {
    className?: string;
}

export const Logout: React.FC<LogoutProps> = (props: LogoutProps) => {
    return (
        <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.1665 5.83333L12.9915 7.00833L15.1415 9.16667H6.6665V10.8333H15.1415L12.9915 12.9833L14.1665 14.1667L18.3332 10L14.1665 5.83333ZM3.33317 4.16667H9.99984V2.5H3.33317C2.4165 2.5 1.6665 3.25 1.6665 4.16667V15.8333C1.6665 16.75 2.4165 17.5 3.33317 17.5H9.99984V15.8333H3.33317V4.16667Z"
                fill="#B5B3BC"
            />
        </svg>
    );
};
