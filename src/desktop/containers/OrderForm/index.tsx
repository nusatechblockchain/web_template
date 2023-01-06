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
    orderExecuteError,
    selectOrderExecuteLoading,
    selectDepthAsks,
    selectDepthBids,
} from '../../../modules';
import { OrderSide } from 'src/modules/types';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { numberFormat, getTotalPrice } from '../../../helpers';

export const OrderForm = () => {
    const dispatch = useDispatch();
    const isLoggedin = useSelector(selectUserLoggedIn);
    const tickers = useSelector(selectMarketTickers);
    const currentMarket = useSelector(selectCurrentMarket);
    const wallets = useSelector(selectWallets);
    const orderLoading = useSelector(selectOrderExecuteLoading);
    const bids = useSelector(selectDepthBids);
    const asks = useSelector(selectDepthAsks);

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

    const [orderTypeBuy, setOrderTypeBuy] = React.useState('limit');
    const [orderTypeSell, setOrderTypeSell] = React.useState('limit');
    const [orderPercentageBuy, setOrderPercentageBuy] = React.useState(0);
    const [orderPercentageSell, setOrderPercentageSell] = React.useState(0);

    const [showModalSell, setShowModalSell] = React.useState(false);
    const [showModalBuy, setShowModalBuy] = React.useState(false);
    const [showModalSellSuccess, setShowModalSellSuccess] = React.useState(false);
    const [priceBuy, setPriceBuy] = React.useState(0);
    const [amountBuy, setAmountBuy] = React.useState('');
    const [totalBuy, setTotalBuy] = React.useState('');

    const [priceSell, setPriceSell] = React.useState(0);
    const [amountSell, setAmountSell] = React.useState('');
    const [totalSell, setTotalSell] = React.useState('');

    // new function start
    const [orderType, setOrderType] = React.useState('limit');
    const [side, setSide] = React.useState<OrderSide>();
    const [price, setPrice] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [total, setTotal] = React.useState('');

    const handleChangePrice = (value: string) => {
        setPrice(value);
    };

    const handleChangeAmount = (value: string) => {
        setAmount(value);
    };

    React.useEffect(() => {
        if (side === 'sell') {
            let sell = Decimal.format((+balance * orderPercentageSell) / 100, currentMarket?.amount_precision);
            setAmount(sell);
        } else {
            let buy = Decimal.format((+usdt * orderPercentageBuy) / 100, currentMarket?.amount_precision);
            setAmount(buy);
        }
    }, [price, orderPercentageBuy, orderPercentageSell, side]);

    React.useEffect(() => {
        if (side === 'sell') {
            let limit = Decimal.format(+price * +amount, currentMarket?.price_precision);
            let market = Decimal.format(+tickerItem?.last * +amount, currentMarket?.price_precision);
            setTotal(orderType === 'market' ? market : limit);
        } else {
            let limit = Decimal.format(+price * +amount, currentMarket?.price_precision);
            let market = Decimal.format(+tickerItem?.last * +amount, currentMarket?.price_precision);
            setTotal(orderType === 'market' ? market : limit);
        }
    }, [price, orderType, amount, side]);

    const handleSubmit = () => {
        const payloadLimit = {
            market: currentMarket?.id,
            side: side,
            volume: amount,
            price: price,
            ord_type: orderType,
        };

        const payloadMarket = {
            market: currentMarket?.id,
            side: side,
            volume: amount,
            ord_type: orderType,
        };

        dispatch(orderExecuteFetch(orderType === 'limit' ? payloadLimit : payloadMarket));

        setShowModalSell(false);
        setAmount('');
        setTotal('');
        setPrice('');
        setOrderPercentageSell(0);
        setOrderPercentageBuy(0);
    };

    // new function end

    const handleChangePriceBuy = (e: number) => {
        setPriceBuy(e);
    };

    const handleChangePriceSell = (e: number) => {
        setPriceSell(e);
    };

    const handleChangeAmountBuy = (e: string) => {
        setAmountBuy(e);
    };

    const handleChangeAmounSell = (e: string) => {
        setAmountSell(e);
    };

    React.useEffect(() => {
        let temp = Decimal.format((+balance * orderPercentageSell) / 100, currentMarket?.amount_precision);
        setAmountSell(temp);
    }, [orderPercentageSell]);

    React.useEffect(() => {
        if (priceSell) {
            let limit = Decimal.format(+priceSell * +amountSell, currentMarket?.price_precision);
            let market = Decimal.format(+tickerItem?.last * +amountSell, currentMarket?.price_precision);
            setTotalSell(orderTypeSell === 'market' ? market : limit);
        }
    }, [priceSell, amountSell]);

    React.useEffect(() => {
        if (priceBuy) {
            let limit = Decimal.format(+priceBuy * +amountBuy, currentMarket?.price_precision);
            let market = Decimal.format(+tickerItem?.last * +amountBuy, currentMarket?.price_precision);
            setTotalBuy(orderTypeBuy === 'market' ? market : limit);
        }
    }, [priceBuy, amountBuy]);

    React.useEffect(() => {
        let temp = Decimal.format((+usdt * orderPercentageBuy) / 100, currentMarket?.amount_precision);

        if (priceBuy) {
            setAmountBuy(temp);
        }
    }, [priceBuy, orderPercentageBuy]);

    const handleSubmitBuy = () => {
        dispatch(
            orderExecuteFetch({
                market: currentMarket?.id,
                side: 'buy',
                volume: amountBuy.toString(),
                price: orderType === 'market' ? tickerItem?.last : priceBuy.toString(),
                ord_type: orderType,
            })
        );

        setShowModalBuy(false);
        setAmountBuy('');
        setTotalBuy('');
        setPriceBuy(0);
        setOrderPercentageBuy(0);
    };

    const handleSubmitSell = () => {
        dispatch(
            orderExecuteFetch({
                market: currentMarket.id,
                side: 'sell',
                volume: amountSell,
                ord_type: orderType,
                price: priceSell.toString(),
            })
        );

        setShowModalSell(false);
        setAmountSell('');
        setTotalSell('');
        setPriceSell(0);
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
                            onClick={() => setOrderType('limit')}
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
                            onClick={() => setOrderType('market')}
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
                                orderType={orderType}
                                orderPercentage={orderPercentageBuy}
                                handleSelectPercentage={(e) => setOrderPercentageBuy(e)}
                                labelPercent0={'label-buy-0'}
                                labelPercent25={'label-buy-25'}
                                labelPercent50={'label-buy-50'}
                                labelPercent75={'label-buy-75'}
                                labelPercent100={'label-buy-100'}
                                amount={amountBuy}
                                handleChangeAmount={handleChangeAmountBuy}
                                total={totalBuy}
                                price={priceBuy}
                                handleChangePrice={handleChangePriceBuy}
                                handleSubmit={() => setShowModalBuy(true)}
                            />
                        </div>
                        <div className="col-6">
                            <OrderFormComponent
                                loading={orderLoading}
                                side={'Sell'}
                                orderType={orderType}
                                orderPercentage={orderPercentageSell}
                                handleSelectPercentage={(e) => setOrderPercentageSell(e)}
                                labelPercent0={'label-sell-0'}
                                labelPercent25={'label-sell-25'}
                                labelPercent50={'label-sell-50'}
                                labelPercent75={'label-sell-75'}
                                labelPercent100={'label-sell-100'}
                                amount={amountSell}
                                handleChangeAmount={handleChangeAmounSell}
                                total={totalSell}
                                price={priceSell}
                                handleChangePrice={handleChangePriceSell}
                                handleSubmit={() => setShowModalSell(true)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <Modal content={renderModalContentSell()} show={showModalSell} />
            <Modal content={renderModalContentBuy()} show={showModalBuy} />
            <Modal content={renderModalContentSellSuccess()} show={showModalSellSuccess} />
        </React.Fragment>
    );
};
