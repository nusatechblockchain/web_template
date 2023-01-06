import * as React from 'react';

export interface OrderTypeProps {
    orderType: string;
    handleSelectType: (e: string) => void;
}

export const OrderType: React.FunctionComponent<OrderTypeProps> = (props) => {
    const { orderType, handleSelectType } = props;

    return (
        <React.Fragment>
            <div className="d-flex mb-1 order-tab">
                <input type="radio" id="limit-order-sell" className="d-none" name="order-form" defaultValue="limit" />
                <label
                    htmlFor="limit-order-sell"
                    onClick={() => handleSelectType('limit')}
                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                        orderType === 'limit' ? 'green-text' : 'white-text'
                    }`}>
                    LIMIT
                </label>
                <input type="radio" id="market-order-sell" className="d-none" name="order-form" defaultValue="market" />
                <label
                    onClick={() => handleSelectType('market')}
                    htmlFor="market-order-sell"
                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                        orderType === 'market' ? 'green-text' : 'white-text'
                    }`}>
                    MARKET
                </label>
            </div>
        </React.Fragment>
    );
};
