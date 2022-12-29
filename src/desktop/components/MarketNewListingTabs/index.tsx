import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies, selectMarkets, selectMarketTickers } from 'src/modules';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { Link } from 'react-router-dom';
import { Table, Decimal } from '../../../components';
import './MarketNewListingTabs.pcss';
import { NoData } from '../../components';
import { FilterInput } from 'src/desktop/components';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    volume: '0.0',
};

export const MarketNewListingTabs: FC = (): ReactElement => {
    useMarketsFetch();
    useMarketsTickersFetch();
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const [filterMarket, setFilterMarket] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('');

    const marketList = markets
        .map((market) => ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
            currency: currencies.find((cur) => cur.id == market.base_unit),
            volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.price_precision),
        }))
        .map((market) => ({
            ...market,
            change: Decimal.format(
                (+market.last - +market.open).toFixed(market.price_precision),
                market.price_precision
            ),
        }));

    const getTableHeaders = () => {
        return ['Name', 'Price', '24 Change', 'Market Cap', ''];
    };

    const handleFilter = (result) => {
        setFilterMarket(result);
    };

    const searchFilter = (row, searchKey) => {
        setFilterValue(searchKey);
        return row ? row.name?.toLowerCase().includes(searchKey.toLowerCase()) : false;
    };

    const getTableData = (data) => {
        let newListingData = [];
        if (filterValue != '') {
            newListingData = filterMarket;
        } else {
            newListingData = data;
        }
        return newListingData.map((item, i) => [
            <div key={i} className="d-flex align-items-center text-sm">
                <img src={item.currency && item.currency.icon_url} alt="coin" className="mr-12 small-coin-icon" />
                <p className="m-0 mr-24 white-text font-bold">
                    {item.currency && item.currency.id && item.currency.id.toUpperCase()}
                </p>
                <p className="m-0 grey-text-accent">{item.currency && item.currency.name}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.currency && item.currency.price}</p>,
            <p className={`text-sm m-0 ${item.change.includes('-') ? 'danger-text' : 'green-text'}`}>{item.change}</p>,
            <p className="m-0 text-sm white-text">{item.cap}</p>,
            <div className="d-flex">
                <div className="mr-3">
                    <Link to={`/markets/detail/${item.base_unit}`}>
                        <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Detail</p>
                    </Link>
                </div>
                <div>
                    <Link to={`/markets/${item.type == 'spot' ? 'trading/' : '/trading-future/'}${item.id}`}>
                        <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Trade</p>
                    </Link>
                </div>
            </div>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="com-market-all-tabs">
                <div className="search-form">
                    <FilterInput
                        data={marketList}
                        onFilter={handleFilter}
                        filter={searchFilter}
                        placeholder={'Search by assets'}
                        className="filter-search"
                    />
                </div>
                <Table header={getTableHeaders()} data={getTableData(marketList)} />
                {marketList.length < 1 && <NoData text="No Data Yet" />}
            </div>
        </React.Fragment>
    );
};
