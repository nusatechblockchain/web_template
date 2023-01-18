import * as React from 'react';

interface LandingFeatureProps {
    className?: string;
}

export const FeatureIcon1: React.FC<LandingFeatureProps> = (props: LandingFeatureProps) => {
    return (
        <svg
            width={65}
            height={65}
            className={props.className}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M51.4583 13.5417H46.0417V8.125H18.9583V13.5417H13.5417C10.5625 13.5417 8.125 15.9792 8.125 18.9583V21.6667C8.125 28.5729 13.325 34.2062 20.0146 35.0458C20.8711 37.0753 22.2089 38.8658 23.9123 40.2625C25.6158 41.6593 27.6337 42.6203 29.7917 43.0625V51.4583H18.9583V56.875H46.0417V51.4583H35.2083V43.0625C37.3663 42.6203 39.3842 41.6593 41.0877 40.2625C42.7911 38.8658 44.1289 37.0753 44.9854 35.0458C51.675 34.2062 56.875 28.5729 56.875 21.6667V18.9583C56.875 15.9792 54.4375 13.5417 51.4583 13.5417ZM13.5417 21.6667V18.9583H18.9583V29.3042C15.8167 28.1667 13.5417 25.1875 13.5417 21.6667ZM32.5 37.9167C28.0312 37.9167 24.375 34.2604 24.375 29.7917V13.5417H40.625V29.7917C40.625 34.2604 36.9688 37.9167 32.5 37.9167ZM51.4583 21.6667C51.4583 25.1875 49.1833 28.1667 46.0417 29.3042V18.9583H51.4583V21.6667Z"
                fill="url(#paint0_linear_939_7247)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_939_7247"
                    x1="8.125"
                    y1="8.125"
                    x2="56.875"
                    y2="56.875"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const FeatureIcon2: React.FC<LandingFeatureProps> = (props: LandingFeatureProps) => {
    return (
        <svg
            width={65}
            height={65}
            className={props.className}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M56.875 19.7167V13.5417C56.875 10.5625 54.4375 8.125 51.4583 8.125H13.5417C12.1051 8.125 10.7273 8.69568 9.7115 9.7115C8.69568 10.7273 8.125 12.1051 8.125 13.5417V51.4583C8.125 52.8949 8.69568 54.2727 9.7115 55.2885C10.7273 56.3043 12.1051 56.875 13.5417 56.875H51.4583C54.4375 56.875 56.875 54.4375 56.875 51.4583V45.2833C57.6937 44.8107 58.3744 44.132 58.8495 43.3148C59.3246 42.4976 59.5776 41.5703 59.5833 40.625V24.375C59.5776 23.4297 59.3246 22.5024 58.8495 21.6852C58.3744 20.8679 57.6937 20.1893 56.875 19.7167ZM54.1667 24.375V40.625H35.2083V24.375H54.1667ZM13.5417 51.4583V13.5417H51.4583V18.9583H35.2083C32.2292 18.9583 29.7917 21.3958 29.7917 24.375V40.625C29.7917 43.6042 32.2292 46.0417 35.2083 46.0417H51.4583V51.4583H13.5417Z"
                fill="url(#paint0_linear_939_7277)"
            />
            <path
                d="M43.3335 36.5625C45.5772 36.5625 47.396 34.7437 47.396 32.5C47.396 30.2563 45.5772 28.4375 43.3335 28.4375C41.0898 28.4375 39.271 30.2563 39.271 32.5C39.271 34.7437 41.0898 36.5625 43.3335 36.5625Z"
                fill="url(#paint1_linear_939_7277)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_939_7277"
                    x1="8.125"
                    y1="8.125"
                    x2="56.8038"
                    y2="59.5082"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
                <linearGradient
                    id="paint1_linear_939_7277"
                    x1="39.271"
                    y1="28.4375"
                    x2="47.396"
                    y2="36.5625"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const FeatureIcon3: React.FC<LandingFeatureProps> = (props: LandingFeatureProps) => {
    return (
        <svg
            width={65}
            height={65}
            className={props.className}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M48.7502 21.6667H46.0418V16.25C46.0418 8.77501 39.9752 2.70834 32.5002 2.70834C25.0252 2.70834 18.9585 8.77501 18.9585 16.25V21.6667H16.2502C13.271 21.6667 10.8335 24.1042 10.8335 27.0833V54.1667C10.8335 57.1458 13.271 59.5833 16.2502 59.5833H48.7502C51.7293 59.5833 54.1668 57.1458 54.1668 54.1667V27.0833C54.1668 24.1042 51.7293 21.6667 48.7502 21.6667ZM24.3752 16.25C24.3752 11.7542 28.0043 8.12501 32.5002 8.12501C36.996 8.12501 40.6252 11.7542 40.6252 16.25V21.6667H24.3752V16.25ZM48.7502 54.1667H16.2502V27.0833H48.7502V54.1667ZM32.5002 46.0417C35.4793 46.0417 37.9168 43.6042 37.9168 40.625C37.9168 37.6458 35.4793 35.2083 32.5002 35.2083C29.521 35.2083 27.0835 37.6458 27.0835 40.625C27.0835 43.6042 29.521 46.0417 32.5002 46.0417Z"
                fill="url(#paint0_linear_939_7293)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_939_7293"
                    x1="10.8335"
                    y1="2.70834"
                    x2="65.6685"
                    y2="44.4874"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const FeatureIcon4: React.FC<LandingFeatureProps> = (props: LandingFeatureProps) => {
    return (
        <svg
            width={65}
            height={65}
            className={props.className}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M31.9584 29.5208C25.8104 27.9229 23.8334 26.2708 23.8334 23.6979C23.8334 20.7458 26.5688 18.6875 31.1459 18.6875C35.9667 18.6875 37.7542 20.9896 37.9167 24.375H43.9021C43.7125 19.7167 40.8688 15.4375 35.2084 14.0563V8.125H27.0834V13.975C21.8292 15.1125 17.6042 18.525 17.6042 23.7521C17.6042 30.0083 22.7771 33.1229 30.3334 34.9375C37.1042 36.5625 38.4584 38.9458 38.4584 41.4646C38.4584 43.3333 37.1313 46.3125 31.1459 46.3125C25.5667 46.3125 23.3729 43.8208 23.075 40.625H17.1167C17.4417 46.5562 21.8834 49.8875 27.0834 50.9979V56.875H35.2084V51.0521C40.4896 50.05 44.6875 46.9896 44.6875 41.4375C44.6875 33.7458 38.1063 31.1187 31.9584 29.5208Z"
                fill="url(#paint0_linear_939_7308)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_939_7308"
                    x1="17.1167"
                    y1="8.125"
                    x2="58.8953"
                    y2="31.7531"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const FeatureIcon5: React.FC<LandingFeatureProps> = (props: LandingFeatureProps) => {
    return (
        <svg
            width={65}
            height={65}
            className={props.className}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M54.1665 16.2501H48.2623C48.5603 15.4105 48.7498 14.4897 48.7498 13.5417C48.7528 11.7944 48.1916 10.0928 47.1497 8.69002C46.1078 7.28726 44.6409 6.2583 42.9673 5.75621C41.2936 5.25411 39.5026 5.3057 37.8606 5.9033C36.2186 6.5009 34.8134 7.61259 33.854 9.073L32.4998 10.8876L31.1457 9.04591C29.6832 6.87925 27.2186 5.41675 24.3748 5.41675C19.879 5.41675 16.2498 9.04591 16.2498 13.5417C16.2498 14.4897 16.4394 15.4105 16.7373 16.2501H10.8332C7.82692 16.2501 5.44359 18.6605 5.44359 21.6667L5.4165 51.4584C5.4165 54.4647 7.82692 56.8751 10.8332 56.8751H54.1665C57.1728 56.8751 59.5832 54.4647 59.5832 51.4584V21.6667C59.5832 18.6605 57.1728 16.2501 54.1665 16.2501ZM40.6248 10.8334C42.1144 10.8334 43.3332 12.0522 43.3332 13.5417C43.3332 15.0313 42.1144 16.2501 40.6248 16.2501C39.1353 16.2501 37.9165 15.0313 37.9165 13.5417C37.9165 12.0522 39.1353 10.8334 40.6248 10.8334ZM24.3748 10.8334C25.8644 10.8334 27.0832 12.0522 27.0832 13.5417C27.0832 15.0313 25.8644 16.2501 24.3748 16.2501C22.8853 16.2501 21.6665 15.0313 21.6665 13.5417C21.6665 12.0522 22.8853 10.8334 24.3748 10.8334ZM54.1665 51.4584H10.8332V46.0417H54.1665V51.4584ZM54.1665 37.9167H10.8332V21.6667H24.5915L18.9582 29.3313L23.3457 32.5001L29.7915 23.7251L32.4998 20.0417L35.2082 23.7251L41.654 32.5001L46.0415 29.3313L40.4082 21.6667H54.1665V37.9167Z"
                fill="url(#paint0_linear_939_7328)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_939_7328"
                    x1="5.4165"
                    y1="5.414"
                    x2="56.8101"
                    y2="59.5096"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};

export const FeatureIcon6: React.FC<LandingFeatureProps> = (props: LandingFeatureProps) => {
    return (
        <svg
            width={65}
            height={65}
            className={props.className}
            viewBox="0 0 65 65"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M51.4583 37.9166V48.75H46.0417V37.9166H51.4583ZM18.9583 37.9166V48.75H16.25C14.7604 48.75 13.5417 47.5312 13.5417 46.0416V37.9166H18.9583ZM32.5 2.70831C26.0353 2.70831 19.8355 5.27639 15.2643 9.84759C10.6931 14.4188 8.125 20.6187 8.125 27.0833V46.0416C8.125 50.5375 11.7542 54.1666 16.25 54.1666H24.375V32.5H13.5417V27.0833C13.5417 16.6021 22.0188 8.12498 32.5 8.12498C42.9812 8.12498 51.4583 16.6021 51.4583 27.0833V32.5H40.625V54.1666H51.4583V56.875H32.5V62.2916H48.75C53.2458 62.2916 56.875 58.6625 56.875 54.1666V27.0833C56.875 20.6187 54.3069 14.4188 49.7357 9.84759C45.1645 5.27639 38.9647 2.70831 32.5 2.70831Z"
                fill="url(#paint0_linear_939_7348)"
            />
            <defs>
                <linearGradient
                    id="paint0_linear_939_7348"
                    x1="8.125"
                    y1="2.70831"
                    x2="66.5285"
                    y2="50.493"
                    gradientUnits="userSpaceOnUse">
                    <stop stopColor="#02C3BD" />
                    <stop offset={1} stopColor="#4062BB" />
                </linearGradient>
            </defs>
        </svg>
    );
};
