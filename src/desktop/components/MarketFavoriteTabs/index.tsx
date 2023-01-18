import React, { FC, ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrencies, selectMarkets, selectMarketTickers, setCurrentMarket, Market } from 'src/modules';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { Link, useHistory } from 'react-router-dom';
import { Table, Decimal } from '../../../components';
import { Favorite } from '../../../assets/images/Favorite';
import './MarketFavoriteTabs.pcss';
import { NoData } from '../../components';
import { FilterInput } from 'src/desktop/components';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

export const MarketFavoriteTabs: FC = (): ReactElement => {
    useMarketsFetch();
    useMarketsTickersFetch();

    const dispatch = useDispatch();
    const history = useHistory();

    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const [favoriteMarket, setFavoriteMarket] = React.useState(JSON.parse(localStorage.getItem('favourites') || '[]'));
    const [filterMarket, setFilterMarket] = React.useState([]);
    const [filterValue, setFilterValue] = React.useState('');

    useEffect(() => {
        setFavoriteMarket(JSON.parse(localStorage.getItem('favourites') || '[]'));
    }, [localStorage]);

    const handleRedirectToTrading = (id: string) => {
        const currentMarket: Market | undefined = markets.find((item) => item.id === id);

        if (currentMarket) {
            dispatch(setCurrentMarket(currentMarket));
            history.push(
                `/markets/${currentMarket.type == 'spot' ? 'trading/' : '/trading-future/'}${currentMarket.id}`
            );
        }
    };

    const marketList = markets
        .map((market) => ({
            ...market,
            last: Decimal.format(+(marketTickers[market.id] || defaultTicker).last, market.price_precision),
            open: Decimal.format(+(marketTickers[market.id] || defaultTicker).open, market.price_precision),
            price_change_percent: marketTickers[market.id].price_change_percent,
            high: Decimal.format(+(marketTickers[market.id] || defaultTicker).high, market.price_precision),
            low: Decimal.format(+(marketTickers[market.id] || defaultTicker).low, market.price_precision),
            volume: Decimal.format(+(marketTickers[market.id] || defaultTicker).volume, market.amount_precision),
            currency: currencies.find((cur) => cur.id == market.base_unit),
        }))
        .map((market) => ({
            ...market,
            change: Decimal.format(
                (+market.last - +market.open).toFixed(market.price_precision),
                market.price_precision
            ),
        }));

    const getTableHeaders = () => {
        return ['Name', 'Price', '24 Change', 'Volume', ''];
    };

    const favoriteMarketData = marketList.filter((market) =>
        JSON.parse(localStorage.getItem('favourites') || '[]').some((name) => name == market.name)
    );

    const handleFavorite = (dataMarket: string) => {
        const favorite = JSON.parse(localStorage.getItem('favourites') || '[]');
        const newStorageItem = favorite.filter((savedId) => savedId !== dataMarket);
        setFavoriteMarket(newStorageItem);
        localStorage.setItem('favourites', JSON.stringify(newStorageItem));
    };

    const handleFilter = (result) => {
        setFilterMarket(result);
    };

    const searchFilter = (row, searchKey) => {
        setFilterValue(searchKey);
        return row ? row.name?.toLowerCase().includes(searchKey.toLowerCase()) : false;
    };

    const getTableData = (data) => {
        let favoriteData = [];
        if (filterValue != '') {
            favoriteData = filterMarket;
        } else {
            favoriteData = data;
        }
        return favoriteData.map((item, i) => [
            <div key={i} className="d-flex align-items-center text-sm">
                <div className="mr-2 cursor-pointer">
                    <Favorite fillColor={'#EF8943'} strokeColor={'#EF8943'} onClick={() => handleFavorite(item.name)} />
                </div>
                <p className="m-0 mr-24 white-text font-bold">{item.name && item.name.toUpperCase()}</p>
            </div>,
            <p className="m-0 text-sm white-text">$ {item.last}</p>,
            <p className={`text-sm m-0 ${item.price_change_percent.includes('-') ? 'danger-text' : 'green-text'}`}>
                {item.price_change_percent}
            </p>,
            <p className="text-sm m-0 grey-text-accent">{item.volume}</p>,
            <div className="d-flex">
                <div className="mr-3">
                    <Link to={`/markets/detail/${item.base_unit}`}>
                        <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Detail</p>
                    </Link>
                </div>
                <div>
                    <p
                        onClick={() => handleRedirectToTrading(item.id)}
                        className="m-0 text-sm font-bold gradient-text cursor-pointer">
                        Trade
                    </p>
                </div>
            </div>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="com-market-all-tabs">
                <div className="search-form">
                    <FilterInput
                        data={favoriteMarketData}
                        onFilter={handleFilter}
                        filter={searchFilter}
                        placeholder={'Search assets'}
                        className="filter-search"
                    />
                </div>
                <Table header={getTableHeaders()} data={getTableData(favoriteMarketData)} />
                {favoriteMarketData.length < 1 && <NoData text="No Data Yet" />}
            </div>
        </React.Fragment>
    );
};
