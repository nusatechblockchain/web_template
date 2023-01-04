import * as React from 'react';
import { Modal, OrderFormComponent } from '../../components';
import { Decimal } from '../../../components';
import {
    selectUserLoggedIn,
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
import { useParams } from 'react-router';
import { numberFormat } from '../../../helpers';

export const OrderForm = () => {
    const dispatch = useDispatch();
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

    const [orderTypeBuy, setOrderTypeBuy] = React.useState('limit');
    const [orderTypeSell, setOrderTypeSell] = React.useState('limit');
    const [orderPercentageBuy, setOrderPercentageBuy] = React.useState(0);
    const [orderPercentageSell, setOrderPercentageSell] = React.useState(0);

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
            let temp = +priceSell * +amountSell;
            let tempToFloat = numberFormat(+temp, 'ID')
                .toString()
                .split(',')[0];
            console.log(temp, 'temp total');
            console.log(tempToFloat, 'total');

            setTotalSell(temp);
        }
    }, [priceSell, amountSell]);

    React.useEffect(() => {
        if (priceBuy) {
            setTotalBuy(+priceBuy * +amountBuy);
        }
    }, [priceBuy, amountBuy]);

    React.useEffect(() => {
        if (priceBuy) {
            setAmountBuy((+balance / +priceBuy) * orderPercentageBuy);
        }
    }, [priceBuy, orderPercentageBuy]);

    React.useEffect(() => {
        let temp = (+balance * orderPercentageSell) / 1000;
        let tempToFloat = numberFormat(+temp, 'ID')
            .toString()
            .split(',')[0];
        console.log(temp, 'temp amount');
        console.log(tempToFloat, 'amount');

        setAmountSell(temp);
    }, [orderPercentageSell]);

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
                        <OrderFormComponent
                            side={'Buy'}
                            orderType={orderTypeBuy}
                            handleSelectType={(e) => setOrderTypeBuy(e)}
                            orderPercentage={orderPercentageBuy}
                            handleSelectPercentage={(e) => setOrderPercentageBuy(e)}
                            labelPercent0={'label-buy-0'}
                            labelPercent25={'label-buy-25'}
                            labelPercent50={'label-buy-50'}
                            labelPercent75={'label-buy-75'}
                            labelPercent100={'label-buy-100'}
                            amount={amountBuy}
                            handleChangeAmount={(e) => setAmountBuy(e)}
                            total={totalBuy}
                            handleChangeTotal={(e) => setTotalBuy(e)}
                            price={priceBuy}
                            handleChangePrice={handleChangePriceBuy}
                            handleSubmit={() => setShowModalBuy(true)}
                        />
                    </div>
                    <div className="col-6">
                        <OrderFormComponent
                            side={'Sell'}
                            orderType={orderTypeSell}
                            handleSelectType={(e) => setOrderTypeSell(e)}
                            orderPercentage={orderPercentageSell}
                            handleSelectPercentage={(e) => setOrderPercentageSell(e)}
                            labelPercent0={'label-sell-0'}
                            labelPercent25={'label-sell-25'}
                            labelPercent50={'label-sell-50'}
                            labelPercent75={'label-sell-75'}
                            labelPercent100={'label-sell-100'}
                            amount={amountSell}
                            handleChangeAmount={(e) => setAmountSell(e)}
                            total={totalSell}
                            handleChangeTotal={(e) => setTotalSell(e)}
                            price={priceSell}
                            handleChangePrice={handleChangePriceSell}
                            handleSubmit={() => setShowModalSell(true)}
                        />
                    </div>
                </div>
            </div>

            <Modal content={renderModalContentSell()} show={showModalSell} />
            <Modal content={renderModalContentBuy()} show={showModalBuy} />
            <Modal content={renderModalContentSellSuccess()} show={showModalSellSuccess} />
        </React.Fragment>
    );
};
