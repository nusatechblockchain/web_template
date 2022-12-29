import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMarket } from 'src/modules';
import { OpenOrders, OrderBook, MarketListTrade, RecentTrades, OrderForm, Charts } from '../../containers';

export const TradingScreen: FC = (): ReactElement => {
    const currentMarket = useSelector(selectCurrentMarket);

    return (
        <React.Fragment>
            <div className="market-trade-screen">
                <div className="content-wrapper no-sidebar dark-bg-accent pb-5">
                    <div className="px-24 pt-1">
                        <div className="grid-wrapper">
                            <div className="grid-item order-book">
                                <OrderBook />
                            </div>
                            <div className="grid-item chart">
                                <Charts />
                            </div>
                            <div className="grid-item market-list">
                                <MarketListTrade />
                            </div>
                            <div className="grid-item order-form">
                                <OrderForm />
                            </div>
                            <div className="grid-item recent-trades">
                                <RecentTrades />
                            </div>
                            <div className="grid-item open-orders mt-50">
                                <OpenOrders />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
