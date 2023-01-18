import * as React from 'react';

interface NotificationProps {
    className?: string;
}

export const Notification: React.FC<NotificationProps> = (props: NotificationProps) => {
    return (
        <svg
            width={24}
            height={24}
            className={props.className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.7499 2.44995C11.4499 1.85995 12.5799 1.85995 13.2599 2.44995L14.8399 3.79995C15.1399 4.04995 15.7099 4.25995 16.1099 4.25995H17.8099C18.8699 4.25995 19.7399 5.12995 19.7399 6.18995V7.88995C19.7399 8.28995 19.9499 8.84995 20.1999 9.14995L21.5499 10.7299C22.1399 11.4299 22.1399 12.5599 21.5499 13.2399L20.1999 14.8199C19.9499 15.1199 19.7399 15.6799 19.7399 16.0799V17.7799C19.7399 18.8399 18.8699 19.7099 17.8099 19.7099H16.1099C15.7099 19.7099 15.1499 19.9199 14.8499 20.1699L13.2699 21.5199C12.5699 22.1099 11.4399 22.1099 10.7599 21.5199L9.17988 20.1699C8.87988 19.9199 8.30988 19.7099 7.91988 19.7099H6.16988C5.10988 19.7099 4.23988 18.8399 4.23988 17.7799V16.0699C4.23988 15.6799 4.03988 15.1099 3.78988 14.8199L2.43988 13.2299C1.85988 12.5399 1.85988 11.4199 2.43988 10.7299L3.78988 9.13995C4.03988 8.83995 4.23988 8.27995 4.23988 7.88995V6.19995C4.23988 5.13995 5.10988 4.26995 6.16988 4.26995H7.89988C8.29988 4.26995 8.85988 4.05995 9.15988 3.80995L10.7499 2.44995Z"
                stroke="#F2F0FF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M12 8.13V12.96" stroke="#F2F0FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path
                d="M11.9941 16H12.0031"
                stroke="#F2F0FF"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
