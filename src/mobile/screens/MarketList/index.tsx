import * as React from 'react';
import { EditIcon, SearchIcon } from '../../assets/Market';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table } from '../../../components';
import { BtcIcon } from '../../../assets/images/CoinIcon';

const MarketListlMobileScreen: React.FC = () => {
    const [key, setKey] = React.useState('tranding');

    const MarketFavorite = [{ icon_url: 'Name', name: 'BTC', id: 'btc', price_change_percent: '2.00%' }];

    const renderDataTable = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                <img src={item && item.currency && item.currency.icon_url} alt="coin" className="small-coin-icon" />
                <p className="mb-0 white-text text-sm ml-2">{item && item.currency && item.currency.name}</p>
                <p className="mb-0 grey-text text-xs ml-2">
                    {item && item.currency && item.currency.id && item.currency.id.toUpperCase()}
                </p>
            </div>,
            <div></div>,
            <p className={`badge white-text font-bold ${item.change.includes('-') ? 'badge-danger' : 'badge-success'}`}>
                {item && item.price_change_percent}
            </p>,
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
                        <SearchIcon />
                    </div>
                </nav>
                <div id="form-search" className="mb-24">
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
                <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                    <Tab eventKey="tranding" title="Tranding">
                        <Table data={renderDataTable(MarketFavorite)} />
                    </Tab>
                    <Tab eventKey="new-volume" title="New Volume">
                        <Table data={renderDataTable(MarketFavorite)} />
                    </Tab>
                    <Tab eventKey="gainers" title="Gainers">
                        <Table data={renderDataTable(MarketFavorite)} />
                    </Tab>
                    <Tab eventKey="loser" title="Loser">
                        <div className="table-mobile-wrapper">{/* <Table data={renderDataTable(dataLosers)} /> */}</div>
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    );
};

export { MarketListlMobileScreen };
