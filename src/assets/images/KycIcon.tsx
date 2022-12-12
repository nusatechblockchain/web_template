import * as React from 'react';

interface KycIconProps {
    className?: string;
    fill?: string;
}

export const PasportIcon: React.FC<KycIconProps> = (props: KycIconProps) => {
    return (
        <svg
            width={33}
            height={32}
            className={props.className}
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_6812)">
                <path
                    d="M8.01553 18.1531H5.65234C6.32424 19.4724 7.50747 20.4721 8.94858 20.9026C8.59664 20.2083 8.24361 19.2865 8.01553 18.1531Z"
                    fill={props.fill}
                />
                <path
                    d="M9.12988 18.1531C9.43844 19.5405 9.94787 20.5365 10.339 21.1382C10.393 21.1397 10.4434 21.1541 10.4977 21.1541C10.5521 21.1541 10.6024 21.1397 10.6563 21.1382C11.0487 20.5352 11.5576 19.5396 11.8655 18.1531H9.12988Z"
                    fill={props.fill}
                />
                <path
                    d="M15.7606 14.3336H13.1491C13.1946 14.7657 13.226 15.2152 13.226 15.6977C13.226 16.1804 13.1935 16.6294 13.1475 17.0618H15.7606C15.8747 16.6232 15.9543 16.1714 15.9543 15.6977C15.9543 15.2239 15.8747 14.7721 15.7606 14.3336Z"
                    fill={props.fill}
                />
                <path
                    d="M12.0459 10.4921C12.4059 11.1974 12.7584 12.1113 12.984 13.2422H15.3438C14.6715 11.9223 13.4878 10.9224 12.0459 10.4921Z"
                    fill={props.fill}
                />
                <path
                    d="M10.6584 10.2574C10.6038 10.2559 10.5529 10.2412 10.4981 10.2412C10.4437 10.2412 10.3931 10.2556 10.3393 10.2572C9.93162 10.8814 9.43181 11.8748 9.12891 13.2423H11.8675C11.5658 11.8794 11.0679 10.8857 10.6584 10.2574Z"
                    fill={props.fill}
                />
                <path
                    d="M12.0497 14.3336H8.94713C8.89727 14.7628 8.86133 15.2103 8.86133 15.6977C8.86133 16.1847 8.89782 16.6323 8.94822 17.0618H12.0486C12.0987 16.6323 12.1353 16.1848 12.1353 15.6977C12.1352 15.2103 12.0992 14.7629 12.0497 14.3336Z"
                    fill={props.fill}
                />
                <path
                    d="M5.65234 13.2422H8.01294C8.23883 12.1108 8.59159 11.1958 8.95022 10.4921C7.50822 10.9227 6.32451 11.9223 5.65234 13.2422Z"
                    fill={props.fill}
                />
                <path
                    d="M7.76924 15.6977C7.76924 15.2152 7.80095 14.7657 7.84651 14.3336H5.23472C5.12068 14.7721 5.04102 15.2239 5.04102 15.6977C5.04102 16.1714 5.12068 16.6232 5.23472 17.0618H7.84815C7.80177 16.6294 7.76924 16.1804 7.76924 15.6977Z"
                    fill={props.fill}
                />
                <path
                    d="M12.9806 18.153C12.7531 19.2864 12.4003 20.2076 12.0479 20.9025C13.4887 20.4717 14.6717 19.4723 15.3435 18.153H12.9806Z"
                    fill={props.fill}
                />
                <path
                    d="M29.6145 3.464L16.9652 0.0746617C15.8009 -0.23731 14.6041 0.45368 14.2922 1.61795L13.1514 5.87575H18.1373C18.8111 5.87575 19.4061 6.18752 19.8063 6.66734C20.2213 6.77852 20.998 6.98661 21.7104 7.17745L25.3029 3.82788L26.3087 4.09742L24.0574 7.80637C24.7181 7.98344 25.3924 8.16404 25.8344 8.28259L27.1993 7.48035L27.8699 7.66001L26.8114 9.26297L26.9265 11.1805L26.2559 11.0009L25.475 9.62378C25.0329 9.50524 24.3586 9.32463 23.6979 9.14757L23.7933 13.4854L22.7875 13.2159L21.351 8.51878C21.0001 8.42479 20.65 8.33094 20.3199 8.24255V21.3677L21.444 17.0917L22.498 17.3743L20.3199 25.6606V27.7017C20.3199 28.9071 19.3427 29.8842 18.1373 29.8842H14.3727L21.9886 31.9249C23.1528 32.2369 24.3496 31.5459 24.6616 30.3816L28.1942 17.1983L27.1373 16.9231L27.4207 15.8691L28.4766 16.1441L31.158 6.13718C31.4699 4.97284 30.7788 3.77604 29.6145 3.464ZM21.8663 15.5104L20.8123 15.228L21.0957 14.174L22.1497 14.4564L21.8663 15.5104ZM23.2026 14.7393L24.2577 15.0218L23.9763 16.0758L22.9213 15.7933L23.2026 14.7393ZM22.5534 29.8166L21.4994 29.5342L24.6061 17.9391L25.6601 18.2215L22.5534 29.8166ZM26.0832 16.6406L25.0292 16.3581L25.3127 15.3041L26.3667 15.5866L26.0832 16.6406Z"
                    fill={props.fill}
                />
                <path
                    d="M18.1369 6.96735H1.76758V28.7931H18.1369C18.7388 28.7931 19.2282 28.3035 19.2282 27.7018V8.05863C19.2282 7.45693 18.7388 6.96735 18.1369 6.96735ZM15.9543 26.6105H5.04144V25.5193H15.9543V26.6105ZM10.4979 22.2454C6.8817 22.2454 3.95016 19.3138 3.95016 15.6977C3.95016 12.0815 6.8817 9.14992 10.4979 9.14992C14.1141 9.14992 17.0456 12.0815 17.0456 15.6977C17.0456 19.3138 14.1141 22.2454 10.4979 22.2454Z"
                    fill={props.fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_924_6812">
                    <rect width={32} height={32} fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const NationalIDIcon: React.FC<KycIconProps> = (props: KycIconProps) => {
    return (
        <svg
            width={33}
            className={props.className}
            height={32}
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_924_6737)">
                <path
                    d="M28.8333 4H4.16675C2.14404 4 0.5 5.64404 0.5 7.66675V24.3333C0.5 26.356 2.14404 28 4.16675 28H28.8333C30.856 28 32.5 26.356 32.5 24.3333V7.66675C32.5 5.64404 30.856 4 28.8333 4ZM10.5 9.33325C12.3374 9.33325 13.8333 10.8293 13.8333 12.6667C13.8333 14.5039 12.3374 16 10.5 16C8.6626 16 7.16675 14.5039 7.16675 12.6667C7.16675 10.8293 8.6626 9.33325 10.5 9.33325ZM16.5 21.6667C16.5 22.2188 16.052 22.6667 15.5 22.6667H5.5C4.948 22.6667 4.5 22.2188 4.5 21.6667V21C4.5 18.9773 6.14404 17.3333 8.16675 17.3333H12.8333C14.856 17.3333 16.5 18.9773 16.5 21V21.6667ZM27.5 22.6667H20.1667C19.6147 22.6667 19.1667 22.2188 19.1667 21.6667C19.1667 21.1147 19.6147 20.6667 20.1667 20.6667H27.5C28.052 20.6667 28.5 21.1147 28.5 21.6667C28.5 22.2188 28.052 22.6667 27.5 22.6667ZM27.5 17.3333H20.1667C19.6147 17.3333 19.1667 16.8853 19.1667 16.3333C19.1667 15.7812 19.6147 15.3333 20.1667 15.3333H27.5C28.052 15.3333 28.5 15.7812 28.5 16.3333C28.5 16.8853 28.052 17.3333 27.5 17.3333ZM27.5 12H20.1667C19.6147 12 19.1667 11.552 19.1667 11C19.1667 10.448 19.6147 10 20.1667 10H27.5C28.052 10 28.5 10.448 28.5 11C28.5 11.552 28.052 12 27.5 12Z"
                    fill={props.fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_924_6737">
                    <rect width={32} height={32} fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>
    );
};

export const DrivingLlicenseIcon: React.FC<KycIconProps> = (props: KycIconProps) => {
    return (
        <svg
            width={33}
            className={props.className}
            height={32}
            viewBox="0 0 33 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M19.6412 24.5714V22.2857C19.6417 20.708 20.9206 19.4292 22.4983 19.4286V18.8572C22.4999 18.3723 22.7077 17.911 23.0697 17.5885V17.0801C23.0613 16.6967 22.8475 16.3474 22.5098 16.1657C20.2925 14.8629 19.0699 12.7771 19.0699 10.2858C19.0702 6.49831 22.1408 3.42825 25.9283 3.42863H25.9376C26.126 3.42863 26.309 3.43425 26.4975 3.45144V2.85719C26.497 1.27975 25.2186 0.001 23.6412 0H4.21259C2.63484 0.0005625 1.35603 1.27944 1.35547 2.85713V29.1428C1.35603 30.7206 2.63491 31.9994 4.21259 31.9999H23.6412C25.2189 31.9994 26.4977 30.7205 26.4983 29.1428V26.2857H21.3554C20.4098 26.2829 19.644 25.5171 19.6412 24.5714ZM7.06972 6.85712H16.2126C16.5282 6.85712 16.784 7.11294 16.784 7.42856C16.784 7.74413 16.5282 8 16.2126 8H7.06972C6.75416 8 6.49828 7.74419 6.49828 7.42856C6.49828 7.113 6.75416 6.85712 7.06972 6.85712ZM7.06972 9.14287H16.2126C16.5282 9.14287 16.784 9.39869 16.784 9.71431C16.784 10.0299 16.5282 10.2858 16.2126 10.2858H7.06972C6.75416 10.2858 6.49828 10.0299 6.49828 9.71431C6.49828 9.39869 6.75416 9.14287 7.06972 9.14287ZM6.49828 12C6.49916 11.6847 6.75447 11.4294 7.06972 11.4286H16.2126C16.5282 11.4286 16.784 11.6844 16.784 12C16.784 12.3156 16.5282 12.5714 16.2126 12.5714H7.06972C6.75453 12.5706 6.49922 12.3153 6.49828 12ZM13.3555 27.4286C10.8307 27.4286 8.78403 25.3819 8.78403 22.8571C8.78403 20.3324 10.8307 18.2857 13.3555 18.2857C15.8802 18.2857 17.9269 20.3324 17.9269 22.8571C17.9235 25.3805 15.8788 27.4252 13.3555 27.4286Z"
                fill={props.fill}
            />
            <path
                d="M13.3553 19.4286C11.4618 19.4286 9.92676 20.9636 9.92676 22.8572C9.92676 24.7507 11.4618 26.2857 13.3553 26.2857C15.2489 26.2857 16.7839 24.7507 16.7839 22.8572C16.7824 20.9642 15.2483 19.43 13.3553 19.4286ZM14.9492 22.0627L13.1717 24.3484C12.9809 24.5977 12.6242 24.6452 12.3749 24.4545C12.335 24.424 12.2993 24.3883 12.2688 24.3484L11.7602 23.697C11.5661 23.4477 11.6109 23.0882 11.8603 22.8942C12.1096 22.7001 12.469 22.7449 12.6631 22.9942L12.7203 23.0683L14.0459 21.3656C14.2428 21.1196 14.6017 21.0798 14.8477 21.2766C15.0876 21.4686 15.1324 21.8162 14.9488 22.0627H14.9492V22.0627Z"
                fill={props.fill}
            />
            <path
                d="M29.3559 20.5715H28.2128V18.8571C28.213 18.5416 27.9573 18.2858 27.6418 18.2857C27.6417 18.2857 27.6416 18.2857 27.6415 18.2857V17.0792C27.6493 16.3 28.0691 15.5832 28.7447 15.195C30.012 14.4568 31.5429 13.0479 31.637 10.5273C31.7801 7.68658 29.7946 5.18026 26.9965 4.66958C23.8927 4.08201 20.9003 6.12183 20.3127 9.22564C20.2465 9.57514 20.2131 9.93001 20.2129 10.2857C20.2129 12.936 21.7761 14.411 23.0868 15.1815C23.775 15.5672 24.2045 16.2913 24.2129 17.0802V18.2853C23.8973 18.2853 23.6415 18.5411 23.6415 18.8567V20.571H22.4986C21.5524 20.5725 20.7858 21.3391 20.7843 22.2853V24.571C20.7843 24.8866 21.0401 25.1425 21.3557 25.1425H30.4988C30.8143 25.1425 31.0702 24.8866 31.0702 24.571V22.2857C31.0687 21.3396 30.3021 20.5729 29.3559 20.5715ZM27.07 20.5715H24.7843V19.4286H27.07V20.5715Z"
                fill={props.fill}
            />
        </svg>
    );
};

export const UploadFileIcon: React.FC<KycIconProps> = (props: KycIconProps) => {
    return (
        <svg
            width={56}
            height={56}
            className={props.className}
            viewBox="0 0 56 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M27.9998 28.0001V49.0001M27.9998 28.0001L22.1665 32.6667M27.9998 28.0001L33.8332 32.6667M11.7458 21.2731C9.53899 21.8284 7.61088 23.1704 6.32375 25.0471C5.03663 26.9238 4.47909 29.2058 4.75588 31.4646C5.03267 33.7233 6.12474 35.8032 7.82691 37.3136C9.52909 38.8239 11.7242 39.6607 13.9998 39.6667H16.3332"
                stroke="#B5B3BC"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M36.9362 16.6554C36.1387 13.4974 34.1702 10.7608 31.4299 9.0003C28.6895 7.23984 25.3822 6.58724 22.1785 7.17481C18.9748 7.76237 16.1143 9.54613 14.177 12.1645C12.2397 14.7828 11.3705 18.0399 11.7456 21.2754C11.7456 21.2754 12.1026 23.3334 12.8329 24.5"
                stroke="#B5B3BC"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M39.6663 39.6667C41.3138 39.6656 42.9423 39.3156 44.4447 38.6397C45.9471 37.9639 47.2893 36.9775 48.383 35.7455C49.4767 34.5135 50.2971 33.0638 50.7902 31.4919C51.2833 29.92 51.4379 28.2615 51.2438 26.6256C51.0497 24.9896 50.5114 23.4133 49.6642 22.0004C48.817 20.5875 47.6802 19.3701 46.3286 18.4282C44.9769 17.4863 43.4412 16.8414 41.8223 16.5358C40.2035 16.2302 38.5383 16.271 36.9363 16.6554L33.833 17.5"
                stroke="#B5B3BC"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};