import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import {
    TradingFutureChart,
    TradingFutureOrderBook,
    TradingFutureOrderForm,
    TradingFutureRecentTrades,
} from '../../containers';
import './TradingFutureScreen.pcss';

export const TradingFutureScreen: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    useDocumentTitle('Trading Future');
    useWalletsFetch();

    return (
        <React.Fragment>
            <div className="pg-trading-future-screen">
                <div className="content-wrapper p-0 no-sidebar dark-bg-main">
                    <div className="">
                        <div className="grid-wrapper">
                            <div className="grid-item chart">
                                <TradingFutureChart />
                            </div>

                            <div className="grid-item order-book">
                                <TradingFutureOrderBook />
                            </div>

                            <div className="grid-item recent-trades">
                                <TradingFutureRecentTrades />
                            </div>

                            <div className="grid-item order-form">
                                <TradingFutureOrderForm />
                            </div>

                            <div className="grid-item open-orders mt-50">
                                <h1>Ini Open Order</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
