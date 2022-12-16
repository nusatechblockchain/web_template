import * as React from 'react';

export const Close = ({ className, onClick }) => {
    return (
        <svg
            width={20}
            className={className}
            onClick={onClick}
            height={21}
            viewBox="0 0 20 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M14.6583 4.66666L9.99996 9.32499L5.34163 4.66666L4.16663 5.84166L8.82496 10.5L4.16663 15.1583L5.34163 16.3333L9.99996 11.675L14.6583 16.3333L15.8333 15.1583L11.175 10.5L15.8333 5.84166L14.6583 4.66666Z"
                fill="#848484"
            />
        </svg>
    );
};
