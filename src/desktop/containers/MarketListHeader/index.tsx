import React, { FC, ReactElement, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Decimal } from 'src/components';
import { selectCurrencies, Market, selectMarkets, selectMarketTickers, setCurrentMarket } from 'src/modules';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { Link } from 'react-router-dom';
import { CardMarket } from '../../components';
import './MarketListHeader.pcss';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

export const MarketListHeader: FC = (): ReactElement => {
    useMarketsFetch();
    useMarketsTickersFetch();
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);

    const marketList = markets.map((market) => ({
        ...market,
        currency: currencies.find((cur) => cur.id == market.base_unit),
        price_change_percent:
            (marketTickers[market.id] && marketTickers[market.id].price_change_percent) ||
            defaultTicker.price_change_percent,
        volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.price_precision),
    }));

    const dataVolumes = marketList && marketList.sort((a, b) => +b.volume - +a.volume);
    const dataGainers = marketList && marketList.sort((a, b) => +b.price_change_percent - +a.price_change_percent);
    const dataHighlight = marketList.sort(
        (a, b) => +b.currency && +b.currency.price - +a.currency && +a.currency.price
    );

    return (
        <React.Fragment>
            <h1 className="m-0 mb-24 text-lg white-text">Markets</h1>

            <div className="cr-market-list-header__card-container">
                <CardMarket title="Top Volume Coins" data={dataVolumes} />
                <CardMarket title="Highlight Coins" data={dataHighlight} />
                <CardMarket title="New Listing" data={dataGainers} />
                <CardMarket title="Top Gainers" data={dataGainers} />
            </div>
        </React.Fragment>
    );
};
