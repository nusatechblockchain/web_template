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
    const orderError = useSelector(orderExecuteError);

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
    const [priceBuy, setPriceBuy] = React.useState(0);
    const [amountBuy, setAmountBuy] = React.useState(0);
    const [totalBuy, setTotalBuy] = React.useState(0);

    const [priceSell, setPriceSell] = React.useState(0);
    const [amountSell, setAmountSell] = React.useState(0);
    const [totalSell, setTotalSell] = React.useState(0);

    const handleChangePriceBuy = (e: number) => {
        setPriceBuy(e);
    };

    const handleChangePriceSell = (e: number) => {
        setPriceSell(e);
    };

    const handleChangeAmountBuy = (e: number) => {
        setAmountBuy(e);
    };

    const handleChangeAmounSell = (e: number) => {
        setAmountSell(e);
    };

    React.useEffect(() => {
        let temp = (+balance * orderPercentageSell) / 100;

        setAmountSell(temp);
    }, [orderPercentageSell]);

    React.useEffect(() => {
        if (priceSell) {
            let limit = +priceSell * +amountSell;
            let market = +tickerItem?.last * +amountSell;
            setTotalSell(orderTypeSell === 'market' ? market : limit);
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

    const handleSubmitBuy = () => {
        dispatch(
            orderExecuteFetch({
                market: currentMarket?.id,
                side: 'buy',
                volume: amountBuy.toString(),
                price: orderTypeBuy === 'market' ? tickerItem?.last : priceBuy.toString(),
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
                price: orderTypeSell === 'market' ? tickerItem?.last : priceSell.toString(),
                ord_type: orderTypeSell,
            })
        );

        setShowModalSell(false);
        setAmountSell(0);
        setTotalSell(0);
        setPriceSell(0);

        // if (!orderExecuteError) {
        //     setShowModalSell(false);
        // }
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
                            handleChangeAmount={handleChangeAmountBuy}
                            total={totalBuy}
                            // handleChangeTotal={handleChangeTotalBuy}
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
                            handleChangeAmount={handleChangeAmounSell}
                            total={totalSell}
                            // handleChangeTotal={handleChangeTotalSell}
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
