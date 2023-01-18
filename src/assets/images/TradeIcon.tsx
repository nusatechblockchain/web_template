import * as React from 'react';

export const TradeUp = (className) => {
    return (
        <svg width={14} height={19} className="ml-3" viewBox="0 0 14 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.37887 0.411964L0.757242 5.76589C0.414253 6.09255 0.414253 6.62232 0.757242 6.94898C1.1003 7.2757 1.65642 7.2757 1.99948 6.94898L6.12161 3.02314L6.12161 11.9895C6.12161 12.4514 6.51491 12.826 6.99999 12.826C7.485 12.826 7.87837 12.4514 7.87837 11.9895L7.87837 3.02314L12.0005 6.94885C12.3436 7.27557 12.8997 7.27557 13.2427 6.94885C13.4141 6.78555 13.5 6.57139 13.5 6.3573C13.5 6.14321 13.4141 5.92912 13.2427 5.76576L7.62111 0.411964C7.27805 0.08524 6.72193 0.08524 6.37887 0.411964Z"
                fill="#24AE8F"
            />
            <rect
                x="13.5"
                y="18.5"
                width={13}
                height="1.78082"
                rx="0.890411"
                transform="rotate(-180 13.5 18.5)"
                fill="#24AE8F"
            />
        </svg>
    );
};

export const TradeDown = (className) => {
    return (
        <svg width={13} height={19} className="ml-3" viewBox="0 0 13 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.12113 18.088L12.7428 12.734C13.0857 12.4074 13.0857 11.8776 12.7428 11.551C12.3997 11.2242 11.8436 11.2242 11.5005 11.551L7.37839 15.4768L7.37839 6.51047C7.37839 6.04849 6.98509 5.67392 6.50001 5.67392C6.015 5.67392 5.62163 6.04849 5.62163 6.51047L5.62163 15.4768L1.4995 11.5511C1.15644 11.2244 0.600319 11.2244 0.257259 11.5511C0.0858696 11.7144 -3.28649e-07 11.9285 -3.28649e-07 12.1426C-3.28649e-07 12.3567 0.0858696 12.5708 0.257259 12.7342L5.87889 18.088C6.22195 18.4147 6.77807 18.4147 7.12113 18.088Z"
                fill="#FF4445"
            />
            <rect y="-6.10352e-05" width={13} height="1.78082" rx="0.890411" fill="#FF4445" />
        </svg>
    );
};

export const Sell = () => {
    return (
        <svg width={31} height={32} viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="7.23047" y={11} width={9} height={1} rx="0.5" fill="#FF4445" />
            <rect x="7.23047" y={15} width={7} height={1} rx="0.5" fill="#FF4445" />
            <rect x="7.23047" y={19} width={4} height={1} rx="0.5" fill="#FF4445" />
        </svg>
    );
};

export const Buy = () => {
    return (
        <svg width={31} height={32} viewBox="0 0 31 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect
                x="23.2305"
                y={21}
                width={10}
                height={1}
                rx="0.5"
                transform="rotate(-180 23.2305 21)"
                fill="#24AE8F"
            />
            <rect x="23.2305" y={17} width={7} height={1} rx="0.5" transform="rotate(-180 23.2305 17)" fill="#24AE8F" />
            <rect x="23.2305" y={13} width={5} height={1} rx="0.5" transform="rotate(-180 23.2305 13)" fill="#24AE8F" />
        </svg>
    );
};
