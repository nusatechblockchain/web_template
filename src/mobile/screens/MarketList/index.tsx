import * as React from 'react';
import { EditIcon, SearchIcon } from '../../assets/Market';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table } from '../../../components';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { Link } from 'react-router-dom';

const MarketListlMobileScreen: React.FC = () => {
    const [key, setKey] = React.useState('tranding');
    const [showSearch, setShowSearch] = React.useState(false);

    const MarketFavorite = [
        {
            icon_url: <BtcIcon />,
            name: 'BTC',
            id: 'btc',
            volume: '18.122.212',
            last_price: '323.903.231',
            price_change_percent: '+2.00%',
        },
        {
            icon_url: <BtcIcon />,
            name: 'BTC',
            id: 'btc',
            volume: '18.122.212',
            last_price: '323.903.231',
            price_change_percent: '+2.00%',
        },
        {
            icon_url: <BtcIcon />,
            name: 'BTC',
            id: 'btc',
            volume: '18.122.212',
            last_price: '323.903.231',
            price_change_percent: '-2.00%',
        },
        {
            icon_url: <BtcIcon />,
            name: 'BTC',
            id: 'btc',
            volume: '18.122.212',
            last_price: '323.903.231',
            price_change_percent: '-2.00%',
        },
    ];
    const renderTableHeader = [
        <p className="mb-0 text-sm grey-text">Name</p>,
        <p className="mb-0 text-sm grey-text">Volume</p>,
        <p className="mb-0 text-sm grey-text">Change</p>,
        '',
    ];

    const renderDataTable = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                {item && item.icon_url}
                <div className="ml-1">
                    <p className="mb-0 grey-text-accent mb-0 text-sm ml-2">
                        {item && item.name} /{' '}
                        <span className="text-xxs grey-text">{item && item.id.toUpperCase()} </span>
                    </p>
                    <p className="mb-0 grey-text text-xxs ml-2">vol : {item && item.volume}</p>
                </div>
            </div>,
            <p
                className={`grey-text text-sm font-bold mb-0 ${
                    item.price_change_percent.includes('-') ? 'danger-text' : 'contrast-text'
                }`}>
                {item.last_price}
            </p>,
            <p
                className={`badge white-text font-bold mb-0 ${
                    item.price_change_percent.includes('-') ? 'badge-danger' : 'badge-success'
                }`}>
                {item && item.price_change_percent}
            </p>,
            <Link to={`/trading/${item.id}`} className="gradient-text text-sm">
                Trade
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
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="">
                    <Tab eventKey="tranding" title="Tranding">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(MarketFavorite)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="all-crypto" title="All-crypto">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(MarketFavorite)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="spot" title="Spot">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(MarketFavorite)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="future" title="Future">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(MarketFavorite)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="New Listing" title="New Listing">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(MarketFavorite)} header={renderTableHeader} />
                        </div>
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    );
};

export { MarketListlMobileScreen };
