import * as React from 'react';
interface Props {
    currency: string;
    name: string;
}

const WalletHeaderComponent = (props: Props) => {
    return (
        <div className='border-bottom pb-2 mb-2'>
            <div>{props.currency}</div>
            <div>{props.name}</div>
        </div>
    );
};

const WalletHeader = React.memo(WalletHeaderComponent);

export {
    WalletHeader,
};
