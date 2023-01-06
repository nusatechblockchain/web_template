import * as React from 'react';
import { OrderPercentage, OrderType } from '../../components';
import { Decimal } from '../../../components';
import { selectUserLoggedIn, selectMarketTickers, selectCurrentMarket, Ticker, selectWallets } from '../../../modules';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

export interface OrderFormProps {
    loading: boolean;
    side: string;
    orderType: string;
    orderPercentage: number;
    handleSelectPercentage: (e: number) => void;
    labelPercent0: string;
    labelPercent25: string;
    labelPercent50: string;
    labelPercent75: string;
    labelPercent100: string;
    amount: string;
    handleChangeAmount: (e: string) => void;
    total: string;
    price: number;
    handleChangePrice: (e: number) => void;
    handleSubmit: () => void;
}

export const OrderFormComponent: React.FunctionComponent<OrderFormProps> = (props) => {
    const {
        loading,
        side,
        orderType,
        orderPercentage,
        handleSelectPercentage,
        labelPercent0,
        labelPercent25,
        labelPercent50,
        labelPercent75,
        labelPercent100,
        amount,
        handleChangeAmount,
        total,
        price,
        handleChangePrice,
        handleSubmit,
    } = props;

    const isLoggedin = useSelector(selectUserLoggedIn);
    const tickers = useSelector(selectMarketTickers);
    const currentMarket = useSelector(selectCurrentMarket);
    const wallets = useSelector(selectWallets);

    const { currency = '' } = useParams<{ currency?: string }>();
    const tickerItem: Ticker = tickers[currency];
    const wallet =
        wallets.length &&
        wallets.find((item) => item.currency.toLowerCase() === currentMarket?.base_unit?.toLowerCase());
    const balance = wallet && wallet.balance ? wallet.balance.toString() : '0';
    const selectedFixed = (wallet || { fixed: 0 }).fixed;

    const usd =
        wallets.length &&
        wallets.find((item) => item.currency.toLowerCase() === currentMarket?.quote_unit?.toLowerCase());
    const usdt = usd && usd.balance ? usd.balance.toString() : '0';
    const usdtFixed = (usd || { fixed: 0 }).fixed;

    const disabledButton = () => {
        if (!isLoggedin) {
            return true;
        }

        if (loading) {
            return true;
        }

        if (!currentMarket?.id || !side || !orderType || !amount || !total) {
            return true;
        }
    };

    return (
        <React.Fragment>
            <form action="">
                <div className="form-group mb-3 position-relative  w-100">
                    <input
                        type="text"
                        defaultValue={orderType === 'market' ? tickerItem?.last : price}
                        value={orderType === 'market' ? tickerItem?.last : price}
                        onChange={(e) => handleChangePrice(+e.target.value)}
                        className="form-control input-order-form"
                        id="input-order"
                    />
                    <label htmlFor="input-order" className="input-order-label-left">
                        Price
                    </label>
                    <label htmlFor="input-order" className="input-order-label-right">
                        {currentMarket?.quote_unit?.toUpperCase()}
                    </label>
                </div>
                <div className="form-group mb-3 position-relative  w-100">
                    <input
                        type="text"
                        defaultValue={amount}
                        value={amount}
                        onChange={(e) => handleChangeAmount(e.target.value)}
                        className="form-control input-order-form"
                        id="input-order"
                    />
                    <label htmlFor="input-order" className="input-order-label-left">
                        Amount
                    </label>
                    <label htmlFor="input-order" className="input-order-label-right">
                        {currentMarket?.base_unit?.toUpperCase()}
                    </label>
                </div>
                <OrderPercentage
                    orderPercentage={orderPercentage}
                    handleSelectPercentage={(e) => handleSelectPercentage(e)}
                    label0={labelPercent0}
                    label25={labelPercent25}
                    label50={labelPercent50}
                    label75={labelPercent75}
                    label100={labelPercent100}
                />

                <div className="form-group mb-3 position-relative  w-100">
                    <input
                        type="text"
                        value={total}
                        readOnly
                        className="form-control input-order-form"
                        id="input-order"
                    />
                    <label htmlFor="input-order" className="input-order-label-left">
                        Total
                    </label>
                    <label htmlFor="input-order" className="input-order-label-right">
                        {currentMarket?.base_unit?.toUpperCase()}
                    </label>
                </div>
                <div className="mb-3 d-flex justify-content-between">
                    <p className="text-sm grey-text-accent"> Avaliable </p>
                    <p className="text-sm white-text">
                        {side === 'Buy' ? (
                            <>
                                {usdt}
                                {currentMarket?.quote_unit?.toUpperCase()}{' '}
                            </>
                        ) : (
                            <>
                                {balance}
                                {currentMarket?.base_unit?.toUpperCase()}{' '}
                            </>
                        )}
                    </p>
                </div>
                <button
                    type="button"
                    className={`btn btn-block ${side === 'Buy' ? 'btn-success' : 'btn-danger'}`}
                    onClick={handleSubmit}
                    disabled={disabledButton()}>
                    {side} {currentMarket?.base_unit?.toUpperCase()}
                </button>
            </form>
        </React.Fragment>
    );
};
