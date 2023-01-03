import * as React from 'react';
import { Modal } from '../../components';
import { Decimal } from '../../../components';
import {
    selectUserLoggedIn,
    selectCurrencies,
    Currency,
    selectMarketTickers,
    selectCurrentMarket,
    Ticker,
    selectWallets,
    alertPush,
    orderExecuteFetch,
    selectCurrentPrice,
    setCurrentPrice,
    selectAmount,
    setAmount,
    selectOrderType,
    setOrderType,
} from '../../../modules';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router';

const OrderFormComponent = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedin = useSelector(selectUserLoggedIn);
    const currencies = useSelector(selectCurrencies);
    const tickers = useSelector(selectMarketTickers);
    const currentMarket = useSelector(selectCurrentMarket);
    const currentPrice = useSelector(selectCurrentPrice);
    const wallets = useSelector(selectWallets);

    // console.log(currentPrice, 'current price');

    const { currency = '' } = useParams<{ currency?: string }>();
    const currencyItem: Currency = currencies.find((item) => item.id === currentMarket?.quote_unit);
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

    const [orderTypeBuy, setOrderTypeBuy] = React.useState('market');
    const [orderTypeSell, setOrderTypeSell] = React.useState('market');
    const [orderPrecentageBuy, setOrderPrecentageBuy] = React.useState(0);
    const [orderPrecentageSell, setOrderPrecentageSell] = React.useState(0);
    const [showModalSell, setShowModalSell] = React.useState(false);
    const [showModalBuy, setShowModalBuy] = React.useState(false);
    const [showModalSellSuccess, setShowModalSellSuccess] = React.useState(false);
    const [priceBuy, setPriceBuy] = React.useState('');
    const [amountBuy, setAmountBuy] = React.useState(0);
    const [totalBuy, setTotalBuy] = React.useState(0);
    const [priceSell, setPriceSell] = React.useState('');
    const [amountSell, setAmountSell] = React.useState(0);
    const [totalSell, setTotalSell] = React.useState(0);

    const handleChangePriceBuy = (e: string) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setPriceBuy(value);
    };

    const handleChangePriceSell = (e: string) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setPriceSell(value);
    };

    React.useEffect(() => {
        if (priceSell) {
            setTotalSell(+priceSell * +amountSell);
        }
    }, [priceSell, amountSell]);

    React.useEffect(() => {
        if (priceBuy) {
            setTotalBuy(+priceBuy * +amountBuy);
        }
    }, [priceBuy, amountBuy]);

    React.useEffect(() => {
        if (priceBuy) {
            setAmountBuy((+balance / +priceBuy) * orderPrecentageBuy);
        }
    }, [priceBuy, orderPrecentageBuy]);

    React.useEffect(() => {
        setAmountSell(+balance * orderPrecentageSell);
    }, [orderPrecentageSell]);

    const handleSubmitBuy = () => {
        dispatch(
            orderExecuteFetch({
                market: currentMarket?.id,
                side: 'buy',
                volume: amountBuy.toString(),
                price: orderTypeBuy === 'market' ? tickerItem?.last : priceBuy,
                ord_type: orderTypeBuy,
            })
        );
    };

    const handleSubmitSell = () => {
        dispatch(
            orderExecuteFetch({
                market: currentMarket?.id,
                side: 'sell',
                volume: amountSell.toString(),
                price: orderTypeSell === 'market' ? tickerItem?.last : priceSell,
                ord_type: orderTypeSell,
            })
        );
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
                <button onClick={handleSubmitSell} type="button" className="btn btn-success sm px-5">
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
                <button onClick={handleSubmitBuy} type="button" className="btn btn-success sm px-5">
                    Buy
                </button>
            </div>
        </React.Fragment>
    );

    const renderModalContentSellSuccess = () => (
        <React.Fragment>
            <h6 className="text-md white-text font-semibold mb-24">
                Sell {currentMarket?.base_unit?.toUpperCase()} has Succesfully{' '}
            </h6>
            <ul className="pl-2">
                <li className="text-ms grey-text-accent font-semibold">
                    Bought 0.00003324 {currentMarket?.base_unit?.toUpperCase()} = $ 212,642,342
                </li>
                <li className="text-ms grey-text-accent font-semibold">
                    Sell in 0.00003324 {currentMarket?.base_unit?.toUpperCase()} = $ 857,887,545
                </li>
                <li className="text-ms grey-text-accent font-semibold">Fee $ 64</li>
                <li className="text-ms grey-text-accent font-semibold">Amount Received : 0.000002154</li>
            </ul>
            <div className="d-flex">
                <button className="btn btn-success sm px-5 mr-3" onClick={() => setShowModalSellSuccess(false)}>
                    Close
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm mb-3">Order Form</p>
                <div className={isLoggedin ? 'row ' : 'row blur-effect'}>
                    <div className="col-6">
                        <form action="">
                            <div className="d-flex mb-1 order-tab">
                                <input
                                    type="radio"
                                    id="market-order-sell"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="market"
                                />
                                <label
                                    htmlFor="market-order-sell"
                                    onClick={() => setOrderTypeBuy('market')}
                                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                        orderTypeBuy === 'market' ? 'green-text' : 'white-text'
                                    }`}>
                                    MARKET
                                </label>
                                <input
                                    type="radio"
                                    id="limit-order-sell"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="limit"
                                />
                                <label
                                    onClick={() => setOrderTypeBuy('limit')}
                                    htmlFor="limit-order-sell"
                                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                        orderTypeBuy === 'limit' ? 'green-text' : 'white-text'
                                    }`}>
                                    LIMIT
                                </label>
                                <input
                                    type="radio"
                                    id="stop-order-sell"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="stop"
                                />
                                <label
                                    onClick={() => setOrderTypeBuy('spot')}
                                    htmlFor="stop-order-sell"
                                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                        orderTypeBuy === 'spot' ? 'green-text' : 'white-text'
                                    }`}>
                                    SPOT
                                </label>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input
                                    type="text"
                                    defaultValue={orderTypeBuy === 'market' ? tickerItem?.last : priceBuy}
                                    value={orderTypeBuy === 'market' ? tickerItem?.last : priceBuy}
                                    onChange={(e) => handleChangePriceBuy(e.target.value)}
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
                                    defaultValue={amountBuy}
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
                            <div className="input-timeline mb-24 position-relative">
                                <div className="line-wrap">
                                    <div className="line" id="line-order" style={{ width: orderPrecentageBuy + '%' }} />
                                </div>
                                <div className="main-input">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-item start" onClick={() => setOrderPrecentageBuy(0)}>
                                            <label htmlFor="percent-buy-buy-0" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 0 ? 'active' : 'check'
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy == 0 ? '' : 'check'}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                id="percent-buy-0"
                                                name="order-form"
                                                defaultValue="market"
                                                className="d-none"
                                            />
                                            <label
                                                htmlFor="percent-buy-0"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                0%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageBuy(25)}>
                                            <label htmlFor="percent-buy-25" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 25
                                                            ? 'active'
                                                            : orderPrecentageBuy > 25
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy > 25 ? 'check' : ''}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-25"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-25"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                25%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageBuy(50)}>
                                            <label htmlFor="percent-buy-50" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 50
                                                            ? 'active'
                                                            : orderPrecentageBuy > 50
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy > 50 ? 'check' : ''}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-50"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-50"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                50%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageBuy(75)}>
                                            <label htmlFor="percent-buy-75" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 75
                                                            ? 'active'
                                                            : orderPrecentageBuy > 75
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy > 75 ? 'check' : ''}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-75"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-75"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                75%
                                            </label>
                                        </div>
                                        <div className="input-item end" onClick={() => setOrderPrecentageBuy(100)}>
                                            <label htmlFor="percent-buy-100" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 100
                                                            ? 'active'
                                                            : orderPrecentageBuy > 100
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageBuy == 100 ? 'check' : ''}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-100"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-100"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                100%
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-3 position-relative  w-100">
                                <input
                                    type="text"
                                    defaultValue={totalBuy}
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
                                    <Decimal fixed={usdtFixed} thousSep=",">
                                        {usdt}
                                    </Decimal>{' '}
                                    {currentMarket?.quote_unit?.toUpperCase()}{' '}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success btn-block"
                                onClick={() => setShowModalBuy(true)}
                                disabled={!isLoggedin}>
                                Buy {currentMarket?.base_unit?.toUpperCase()}
                            </button>
                        </form>
                    </div>
                    <div className="col-6">
                        <form action="">
                            <div className="d-flex mb-1 order-tab">
                                <input
                                    type="radio"
                                    id="market-order"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="market"
                                />
                                <label
                                    htmlFor="market-order"
                                    onClick={() => setOrderTypeSell('market')}
                                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                        orderTypeSell === 'market' ? 'green-text' : 'white-text'
                                    }`}>
                                    MARKET
                                </label>
                                <input
                                    type="radio"
                                    id="limit-order"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="limit"
                                />
                                <label
                                    htmlFor="limit-order"
                                    onClick={() => setOrderTypeSell('limit')}
                                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                        orderTypeSell === 'limit' ? 'green-text' : 'white-text'
                                    }`}>
                                    LIMIT
                                </label>
                                <input
                                    type="radio"
                                    id="stop-order"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="stop"
                                />
                                <label
                                    htmlFor="stop-order"
                                    onClick={() => setOrderTypeSell('spot')}
                                    className={`btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4 ${
                                        orderTypeSell === 'spot' ? 'green-text' : 'white-text'
                                    }`}>
                                    SPOT
                                </label>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input
                                    type="text"
                                    defaultValue={orderTypeSell === 'market' ? tickerItem?.last : priceSell}
                                    value={orderTypeSell === 'market' ? tickerItem?.last : priceSell}
                                    onChange={(e) => handleChangePriceSell(e.target.value)}
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
                                    defaultValue={amountSell}
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
                            <div className="input-timeline mb-24 position-relative">
                                <div className="line-wrap">
                                    <div
                                        className="line"
                                        id="line-order"
                                        style={{ width: orderPrecentageSell + '%' }}
                                    />
                                </div>
                                <div className="main-input">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-item start" onClick={() => setOrderPrecentageSell(0)}>
                                            <label htmlFor="percent-sell-buy-0" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 0 ? 'active' : 'check'
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell == 0 ? '' : 'check'}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                id="percent-sell-0"
                                                name="order-form"
                                                defaultValue="market"
                                                className="d-none"
                                            />
                                            <label
                                                htmlFor="percent-sell-0"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                0%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageSell(25)}>
                                            <label htmlFor="percent-sell-25" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 25
                                                            ? 'active'
                                                            : orderPrecentageSell > 25
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell > 25 ? 'check' : ''}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-25"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-25"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                25%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageSell(50)}>
                                            <label htmlFor="percent-sell-50" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 50
                                                            ? 'active'
                                                            : orderPrecentageSell > 50
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell > 50 ? 'check' : ''}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-50"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-50"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                50%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageSell(75)}>
                                            <label htmlFor="percent-sell-75" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 75
                                                            ? 'active'
                                                            : orderPrecentageSell > 75
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell > 75 ? 'check' : ''}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-75"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-75"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                75%
                                            </label>
                                        </div>
                                        <div className="input-item end" onClick={() => setOrderPrecentageSell(100)}>
                                            <label htmlFor="percent-sell-100" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 100
                                                            ? 'active'
                                                            : orderPrecentageSell > 100
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell == 100 ? 'check' : ''}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-100"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-100"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                100%
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="form-group mb-3 position-relative  w-100">
                                <input
                                    type="text"
                                    defaultValue={totalSell}
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
                                    <Decimal fixed={selectedFixed} thousSep=",">
                                        {balance}
                                    </Decimal>{' '}
                                    {currentMarket?.base_unit?.toUpperCase()}{' '}
                                </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-danger btn-block"
                                disabled={!isLoggedin}
                                onClick={() => setShowModalSell(true)}>
                                Sell {currentMarket?.base_unit?.toUpperCase()}
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Modal content={renderModalContentSell()} show={showModalSell} />
            <Modal content={renderModalContentBuy()} show={showModalBuy} />
            <Modal content={renderModalContentSellSuccess()} show={showModalSellSuccess} />
        </React.Fragment>
    );
};

export const OrderForm = React.memo(OrderFormComponent);
