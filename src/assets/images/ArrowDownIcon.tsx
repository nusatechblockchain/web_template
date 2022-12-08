import * as React from 'react';

export const ArrowDownIcon = ({ strokeColor, className }) => {
    return (
        <svg
            width="12"
            height="8"
            className={className}
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M1.00001 1.58667L5.74668 6.33334L10.4933 1.58667"
                stroke={strokeColor}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export const ArrowDownLarge = ({ className }) => {
    return (
        <svg
            className={className}
            width={18}
            height={17}
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.875 12.4999L11.125 8.49988L6.875 4.49988"
                stroke="#B5B3BC"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
