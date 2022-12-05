import * as React from 'react';

interface EyeProps {
    className?: string;
}

export const EyeOpen: React.FC<EyeProps> = (props: EyeProps) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className={props.className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M15.58 11.9999C15.58 13.9799 13.98 15.5799 12 15.5799C10.02 15.5799 8.42001 13.9799 8.42001 11.9999C8.42001 10.0199 10.02 8.41992 12 8.41992C13.98 8.41992 15.58 10.0199 15.58 11.9999Z"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M12 20.2697C15.53 20.2697 18.82 18.1897 21.11 14.5897C22.01 13.1797 22.01 10.8097 21.11 9.39973C18.82 5.79973 15.53 3.71973 12 3.71973C8.47 3.71973 5.18 5.79973 2.89 9.39973C1.99 10.8097 1.99 13.1797 2.89 14.5897C5.18 18.1897 8.47 20.2697 12 20.2697Z"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

export const EyeClose: React.FC<EyeProps> = (props: EyeProps) => {
    return (
        <svg
            width="24"
            height="24"
            className={props.className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.53 9.46992L9.46998 14.5299C8.81998 13.8799 8.41998 12.9899 8.41998 11.9999C8.41998 10.0199 10.02 8.41992 12 8.41992C12.99 8.41992 13.88 8.81992 14.53 9.46992Z"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M17.82 5.77047C16.07 4.45047 14.07 3.73047 12 3.73047C8.47003 3.73047 5.18003 5.81047 2.89003 9.41047C1.99003 10.8205 1.99003 13.1905 2.89003 14.6005C3.68003 15.8405 4.60003 16.9105 5.60003 17.7705"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M8.41998 19.5297C9.55998 20.0097 10.77 20.2697 12 20.2697C15.53 20.2697 18.82 18.1897 21.11 14.5897C22.01 13.1797 22.01 10.8097 21.11 9.39969C20.78 8.87969 20.42 8.38969 20.05 7.92969"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M15.51 12.7002C15.25 14.1102 14.1 15.2602 12.69 15.5202"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M9.47 14.5303L2 22.0003"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <path
                d="M22 2L14.53 9.47"
                stroke="#B5B3BC"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};
