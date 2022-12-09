import * as React from 'react';

interface CloseIconProps {
    className?: string;
    onClick?: () => void;
    fill?: string;
}

export const CloseIcon: React.FC<CloseIconProps> = (props: CloseIconProps) => {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" className={props.className} onClick={props.onClick} fill="none">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.58434 6.99901L0.875873 11.7079L2.29003 13.1221L6.99849 8.41328L11.707 13.1221L13.1211 11.7079L8.41265 6.99901L13.704 1.7072L12.2899 0.292927L6.99849 5.58474L1.70712 0.292932L0.292969 1.7072L5.58434 6.99901Z"
                fill={props.fill}
            />
        </svg>
    );
};

export const HugeCloseIcon: React.FC<CloseIconProps> = (props: CloseIconProps) => {
    return (
        <svg
            width="26"
            height="25"
            viewBox="0 0 26 25"
            className={props.className}
            onClick={props.onClick}
            fill={props.fill}
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M8.35978e-07 22.0625L9.54167 12.5L0 2.9375L2.9375 0L15.4375 12.5L2.9375 25L8.35978e-07 22.0625Z"
                fill="var(--icons)"
            />
            <path
                d="M25.4375 22.0625L15.8958 12.5L25.4375 2.9375L22.5 0L10 12.5L22.5 25L25.4375 22.0625Z"
                fill="var(--icons)"
            />
        </svg>
    );
};

export const ModalCloseIcon: React.FC<CloseIconProps> = (props: CloseIconProps) => {
    return (
        <svg
            width={32}
            height={32}
            className={props.className}
            onClick={props.onClick}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
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
