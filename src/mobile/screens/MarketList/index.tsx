import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies, selectMarkets, selectMarketTickers } from 'src/modules';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { EditIcon, SearchIcon } from '../../assets/Market';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table, Decimal } from '../../../components';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { Link } from 'react-router-dom';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const MarketListlMobileScreen: React.FC = () => {
    const [key, setKey] = React.useState('tranding');
    const [showSearch, setShowSearch] = React.useState(false);

    useMarketsFetch();
    useMarketsTickersFetch();
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);

    const marketList = markets
        .map((market) => ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
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

    const renderTableHeader = [
        <p className="mb-0 text-sm grey-text">Name</p>,
        <p className="mb-0 text-sm grey-text">Last Price</p>,
        <p className="mb-0 text-sm grey-text">Change</p>,
        '',
    ];

    const renderDataTable = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                <img src={item && item.currency && item.currency.icon_url} alt="coin" className="small-coin-icon" />
                <div className="ml-1">
                    <p className="mb-0 grey-text-accent mb-0 text-sm ml-2">
                        {item && item.base_unit && item.base_unit.toUpperCase()} /{' '}
                        <span className="text-xxs grey-text">{item && item.id.toUpperCase()} </span>
                    </p>
                    <p className="mb-0 grey-text text-xxs ml-2">vol : {item && item.volume}</p>
                </div>
            </div>,
            <p
                className={`grey-text text-sm font-bold mb-0 ${
                    item.price_change_percent.includes('-') ? 'danger-text' : 'contrast-text'
                }`}>
                {item && item.last}
            </p>,
            <p
                className={`badge white-text font-bold mb-0 ${
                    item.price_change_percent.includes('-') ? 'badge-danger' : 'badge-success'
                }`}>
                {item && item.price_change_percent}
            </p>,
            <Link to={`/markets/${item.base_unit}/detail`} className="gradient-text text-sm">
                Detail
            </Link>,
        ]);
    };
    return (
        <React.Fragment>
            <div className="mobile-container  no-header market-list dark-bg-main">
                <nav className="navbar navbar-dark mb-16">
                    <h1 className="navbar-brand p-0 m-0">Market</h1>
                    <div className="menu">
                        <div className="mr-2 d-inline">
                            <EditIcon />
                        </div>
                        <div className="d-inline" onClick={() => setShowSearch(true)}>
                            <SearchIcon />
                        </div>
                    </div>
                </nav>
                {showSearch && (
                    <div className="mb-24 mt-24">
                        <form>
                            <div className="d-flex justify-content-between align-items-center form-wrapper">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">
                                            <SearchIcon />
                                        </span>
                                    </div>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter the currency you are looking for."
                                        aria-label="search"
                                        aria-describedby="basic-addon1"
                                    />
                                </div>
                                <button id="cancel" className="btn-cancel" type="button">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}
                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="all-crypto"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="">
                    <Tab eventKey="tranding" title="Tranding">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(marketList)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="all-crypto" title="All-crypto">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(marketList)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="spot" title="Spot">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(marketList)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="future" title="Future">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(marketList)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="New Listing" title="New Listing">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(marketList)} header={renderTableHeader} />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    );
};

export { MarketListlMobileScreen };
