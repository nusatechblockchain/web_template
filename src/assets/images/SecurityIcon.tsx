import * as React from 'react';

export const SecurityIcon = ({ fillColor }) => {
    return (
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1546_13427)">
                <path
                    d="M18 10.6666L12 13.3333V17.3333C12 21.0333 14.56 24.4933 18 25.3333C21.44 24.4933 24 21.0333 24 17.3333V13.3333L18 10.6666ZM22.6667 17.3333C22.6667 20.3466 20.68 23.1266 18 23.9533C15.32 23.1266 13.3333 20.3466 13.3333 17.3333V14.2L18 12.1266L22.6667 14.2V17.3333ZM14.94 17.7266L14 18.6666L16.6667 21.3333L22 16L21.06 15.0533L16.6667 19.4466L14.94 17.7266Z"
                    fill={fillColor}
                />
            </g>
            <defs>
                <clipPath id="clip0_1546_13427">
                    <rect width="16" height="16" fill="white" transform="translate(10 10)" />
                </clipPath>
            </defs>
        </svg>
    );
};
