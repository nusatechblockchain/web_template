import * as React from 'react';
import { Modal, OrderFormComponent } from '../../components';
import { Decimal } from '../../../components';
import {
    selectUserLoggedIn,
    selectMarketTickers,
    selectCurrentMarket,
    Ticker,
    selectWallets,
    orderExecuteFetch,
    selectOrderExecuteLoading,
    selectDepthAsks,
    selectDepthBids,
    selectOrderError,
    selectConfigUpdateData,
} from '../../../modules';
import { OrderSide } from 'src/modules/types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { getTotalPrice, numberFormat, getAmount } from '../../../helpers';

export const OrderForm = () => {
    const dispatch = useDispatch();
    const isLoggedin = useSelector(selectUserLoggedIn);
    const tickers = useSelector(selectMarketTickers);
    const currentMarket = useSelector(selectCurrentMarket);
    const wallets = useSelector(selectWallets);
    const orderLoading = useSelector(selectOrderExecuteLoading);
    const bids = useSelector(selectDepthBids);
    const asks = useSelector(selectDepthAsks);
    const error = useSelector(selectOrderError);

    const { currency = '' } = useParams<{ currency?: string }>();
    const tickerItem: Ticker = tickers[currency];
    const wallet =
        wallets.length &&
        wallets.find((item) => item.currency.toLowerCase() === currentMarket?.base_unit?.toLowerCase());
    const balance = wallet && wallet.balance ? wallet.balance.toString() : '0';

    const usd =
        wallets.length &&
        wallets.find((item) => item.currency.toLowerCase() === currentMarket?.quote_unit?.toLowerCase());
    const usdt = usd && usd.balance ? usd.balance.toString() : '0';

    const [orderPercentageBuy, setOrderPercentageBuy] = React.useState(0);
    const [orderPercentageSell, setOrderPercentageSell] = React.useState(0);

    const [showModalSell, setShowModalSell] = React.useState(false);
    const [showModalBuy, setShowModalBuy] = React.useState(false);
    const [priceBuy, setPriceBuy] = React.useState('');
    const [amountBuy, setAmountBuy] = React.useState('');
    const [totalBuy, setTotalBuy] = React.useState('');

    const [priceSell, setPriceSell] = React.useState('');
    const [amountSell, setAmountSell] = React.useState('');
    const [totalSell, setTotalSell] = React.useState('');

    const [orderType, setOrderType] = React.useState('limit');
    const [side, setSide] = React.useState<OrderSide>('buy');

    const totalPrice = getTotalPrice(
        side === 'buy' ? amountBuy : amountSell,
        +tickerItem?.last,
        side === 'buy' ? bids : asks
    );

    const totalAmount = getAmount(
        side === 'buy' ? +usdt : +balance,
        side === 'buy' ? bids : asks,
        side === 'buy' ? orderPercentageBuy : orderPercentageSell
    );

    React.useEffect(() => {
        const safePrice = +totalPrice / +totalAmount || priceSell;

        const market =
            orderPercentageSell !== 0
                ? Decimal.format((+balance * orderPercentageSell) / 100, currentMarket?.amount_precision)
                : Decimal.format(amountSell, currentMarket?.amount_precision);

        const limit =
            orderPercentageSell !== 0
                ? Decimal.format(+totalSell / +priceSell, currentMarket?.amount_precision)
                : Decimal.format(amountSell, currentMarket?.amount_precision);

        setAmountSell(orderType === 'market' ? market : limit);
    }, [orderPercentageSell, totalSell, priceSell]);

    React.useEffect(() => {
        const safePrice = totalPrice / +amountSell || priceSell;
        // const market =
        //     orderPercentageSell !== 0
        //         ? Decimal.format((+balance * +orderPercentageSell) / 100, currentMarket?.price_precision)
        //         : Decimal.format(+amountSell * +safePrice, currentMarket?.price_precision);

        const market = Decimal.format(+amountSell * +safePrice, currentMarket?.price_precision);

        const limit =
            orderPercentageSell !== 0
                ? Decimal.format((+balance * +orderPercentageSell) / 100, currentMarket?.price_precision)
                : Decimal.format(+priceSell * +amountSell, currentMarket?.price_precision);

        setTotalSell(orderType === 'market' ? market : limit);
    }, [priceSell, amountSell, orderPercentageSell]);

    React.useEffect(() => {
        // const safePrice = +totalPrice / +totalAmount || priceBuy;
        const market =
            orderPercentageBuy !== 0
                ? Decimal.format((+usdt * orderPercentageBuy) / 100, currentMarket?.amount_precision)
                : Decimal.format(amountBuy, currentMarket?.amount_precision);

        const limit =
            orderPercentageBuy !== 0
                ? Decimal.format(+totalBuy / +priceBuy, currentMarket?.amount_precision)
                : Decimal.format(amountBuy, currentMarket?.amount_precision);

        setAmountBuy(orderType === 'market' ? market : limit);
    }, [orderPercentageBuy, totalBuy, priceBuy]);

    React.useEffect(() => {
        const safePrice = totalPrice / +amountBuy || priceBuy;
        // const market =
        //     orderPercentageBuy !== 0
        //         ? Decimal.format((+usdt * +orderPercentageBuy) / 100, currentMarket?.price_precision)
        //         : Decimal.format(+amountBuy * +safePrice, currentMarket?.price_precision);

        const market = Decimal.format(+amountBuy * +safePrice, currentMarket?.price_precision);

        const limit =
            orderPercentageBuy !== 0
                ? Decimal.format((+usdt * +orderPercentageBuy) / 100, currentMarket?.price_precision)
                : Decimal.format(+priceBuy * +amountBuy, currentMarket?.price_precision);

        setTotalBuy(orderType === 'market' ? market : limit);
    }, [priceBuy, amountBuy, orderPercentageBuy]);

    const resetForm = () => {
        setShowModalSell(false);
        setShowModalBuy(false);
        setAmountBuy('');
        setAmountSell('');
        setPriceBuy('');
        setPriceSell('');
        setTotalBuy('');
        setTotalSell('');
        setOrderPercentageSell(0);
        setOrderPercentageBuy(0);
    };

    const handleSubmit = () => {
        const payloadLimit = {
            market: currentMarket?.id,
            side: side,
            volume: side === 'sell' ? amountSell : amountBuy,
            price: side === 'sell' ? priceSell : priceBuy,
            ord_type: orderType,
        };

        const payloadMarket = {
            market: currentMarket?.id,
            side: side,
            volume: side === 'sell' ? amountSell : amountBuy,
            ord_type: orderType,
        };

        dispatch(orderExecuteFetch(orderType === 'limit' ? payloadLimit : payloadMarket));

        resetForm();
    };

    const handleSide = (value: OrderSide) => {
        setSide(value);
    };

    const handleChangePriceBuy = (e: string) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setPriceBuy(value);
    };

    const handleChangePriceSell = (e: string) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setPriceSell(value);
    };

    const handleChangeAmountBuy = (e: string) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setAmountBuy(value);
        setOrderPercentageBuy(0);
    };

    const handleChangeAmounSell = (e: string) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setAmountSell(value);
        setOrderPercentageSell(0);
    };

    const renderModalContentSell = () => (
        <React.Fragment>
            <h6 className="text-md white-text font-semibold mb-24">
                Are you sure to Sell {currentMarket?.base_unit?.toUpperCase()}?
            </h6>
            <ul className="pl-2 mb-24">
                <li className="text-ms grey-text-accent font-semibold">
                    Sell in {amountSell} {currentMarket?.base_unit?.toUpperCase()} = $ {totalSell}
                </li>
                <li className="text-ms grey-text-accent font-semibold">Total spent $ {totalSell}</li>
            </ul>
            <div className="d-flex">
                <button className="btn btn-danger sm px-5 mr-3" onClick={() => setShowModalSell(false)}>
                    Cancel
                </button>
                <button onClick={handleSubmit} type="button" className="btn btn-success sm px-5">
                    Sell
                </button>
            </div>
        </React.Fragment>
    );

    const renderModalContentBuy = () => (
        <React.Fragment>
            <h6 className="text-md white-text font-semibold mb-24">
                Are you sure to Buy {currentMarket?.base_unit?.toUpperCase()}?
            </h6>
            <ul className="pl-2 mb-24">
                <li className="text-ms grey-text-accent font-semibold">
                    Bought {amountBuy} {currentMarket?.base_unit?.toUpperCase()} = $ {totalBuy}
                </li>
                <li className="text-ms grey-text-accent font-semibold">Total spent $ {totalBuy}</li>
            </ul>
            <div className="d-flex">
                <button className="btn btn-danger sm px-5 mr-3" onClick={() => setShowModalBuy(false)}>
                    Cancel
                </button>
                <button onClick={handleSubmit} type="button" className="btn btn-success sm px-5">
                    Buy
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm mb-3">Order Form</p>

                <div className={isLoggedin ? ' ' : ' blur-effect'}>
                    <div className="d-flex mb-1 order-tab">
                        <input
                            type="radio"
                            id="limit-order-sell"
                            className="d-none"
                            name="order-form"
                            defaultValue="limit"
                        />
                        <label
                            htmlFor="limit-order-sell"
                            onClick={() => {
                                setOrderType('limit');
                                resetForm();
                            }}
                            className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                orderType === 'limit' ? 'green-text' : 'white-text'
                            }`}>
                            LIMIT
                        </label>
                        <input
                            type="radio"
                            id="market-order-sell"
                            className="d-none"
                            name="order-form"
                            defaultValue="market"
                        />
                        <label
                            onClick={() => {
                                setOrderType('market');
                                resetForm();
                            }}
                            htmlFor="market-order-sell"
                            className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                orderType === 'market' ? 'green-text' : 'white-text'
                            }`}>
                            MARKET
                        </label>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <OrderFormComponent
                                loading={orderLoading}
                                side={'Buy'}
                                handleSide={handleSide}
                                orderType={orderType}
                                orderPercentage={orderPercentageBuy}
                                handleSelectPercentage={(e) => setOrderPercentageBuy(e)}
                                labelAmount={'label-amount-buy'}
                                labelPrice={'label-price-buy'}
                                labelTotal={'label-total-buy'}
                                labelPercent0={'label-buy-0'}
                                labelPercent25={'label-buy-25'}
                                labelPercent50={'label-buy-50'}
                                labelPercent75={'label-buy-75'}
                                labelPercent100={'label-buy-100'}
                                amount={amountBuy}
                                handleChangeAmount={handleChangeAmountBuy}
                                total={totalBuy}
                                price={priceBuy}
                                totalPrice={getTotalPrice(amountBuy, +tickerItem?.last, bids)}
                                handleChangePrice={handleChangePriceBuy}
                                handleSubmit={() => setShowModalBuy(true)}
                            />
                        </div>
                        <div className="col-6">
                            <OrderFormComponent
                                loading={orderLoading}
                                side={'Sell'}
                                handleSide={handleSide}
                                orderType={orderType}
                                orderPercentage={orderPercentageSell}
                                handleSelectPercentage={(e) => setOrderPercentageSell(e)}
                                labelAmount={'label-amount-sell'}
                                labelPrice={'label-price-sell'}
                                labelTotal={'label-total-sell'}
                                labelPercent0={'label-sell-0'}
                                labelPercent25={'label-sell-25'}
                                labelPercent50={'label-sell-50'}
                                labelPercent75={'label-sell-75'}
                                labelPercent100={'label-sell-100'}
                                amount={amountSell}
                                handleChangeAmount={handleChangeAmounSell}
                                total={totalSell}
                                price={priceSell}
                                totalPrice={getTotalPrice(amountSell, +tickerItem?.last, asks)}
                                handleChangePrice={handleChangePriceSell}
                                handleSubmit={() => setShowModalSell(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal content={renderModalContentSell()} show={showModalSell} />
            <Modal content={renderModalContentBuy()} show={showModalBuy} />
        </React.Fragment>
    );
};
