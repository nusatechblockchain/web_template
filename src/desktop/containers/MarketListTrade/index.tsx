import * as React from 'react';
import { useSelector } from 'react-redux';
import { SearchIcon } from '../../../assets/images/ProfileIcon';
import { Decimal } from '../../../components';
import { useMarketsFetch, useMarketsTickersFetch } from '../../../hooks';
import {
    selectCurrencies,
    selectMarketTickers,
    MarketsTickersData,
    Currency,
    selectMarkets,
    Market,
} from '../../../modules';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const MarketListTradeComponent = (props) => {
    useMarketsFetch();
    useMarketsTickersFetch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const currencies = useSelector(selectCurrencies);

    const marketList = markets
        .map((market) => ({
            ...market,
            currency: currencies.find((cur) => cur.id == market.base_unit),
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
        }))
        .map((market) => ({
            ...market,
            change: Decimal.format(
                (+market.last - +market.open).toFixed(market.price_precision),
                market.price_precision
            ),
        }));

    console.log(marketList);

    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm mb-24">Market List</p>
                <div className="d-flex align-items-center">
                    <div className="form-group mb-0 position-relative  w-100">
                        <input
                            type="text"
                            className="form-control input-search"
                            id="search"
                            placeholder="Search Coin"
                        />
                        <SearchIcon className="search-icon" />
                    </div>
                </div>
                <div className="max-300 position-relative mt-2">
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th className="grey-text-accent text-left">Pair</th>
                                <th className="grey-text-accent text-right text-nowrap">Last Price</th>
                                <th className="grey-text-accent text-right">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {marketList &&
                                marketList.map((item) => (
                                    <tr>
                                        <td>
                                            <div className="d-flex justify-content-between">
                                                <div className="mr-0 d-flex align-items-center">
                                                    <span className="cr-crypto-icon">
                                                        <img
                                                            src={item.currency && item.currency.icon_url}
                                                            className="small-coin-icon"
                                                            alt="btc icon"
                                                        />
                                                    </span>
                                                    <div className="name ml-1">
                                                        <p className="text-sm text-white font-bold mb-0">
                                                            {item.currency && item.currency.id.toUpperCase()}
                                                        </p>
                                                        <span className="text-xs grey-text-accent">
                                                            {item.currency && item.currency.name.toUpperCase()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2">
                                                <p
                                                    className={`text-xs my-auto  mb-0 text-right ${
                                                        item.last < item.open ? 'danger-text' : 'green-text'
                                                    }`}>
                                                    {item.last}
                                                </p>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="py-2">
                                                <p
                                                    className={`text-xs mb-0 text-right ${
                                                        item.change.includes('+')
                                                            ? 'green-text'
                                                            : item.change.includes('-')
                                                            ? 'danger-text'
                                                            : 'green-text'
                                                    }`}>
                                                    {item.change}%
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export const MarketListTrade = React.memo(MarketListTradeComponent);
