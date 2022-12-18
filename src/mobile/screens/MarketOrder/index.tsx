import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table, Decimal } from '../../../components';
import { EditIcon, SearchIcon } from '../../assets/Market';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { Link } from 'react-router-dom';

const MarketOrderMobileScreen: React.FC = () => {
    const [key, setKey] = React.useState('tranding');

    const orders = [{ name: 'test' }, { name: 'test' }, { name: 'test' }, { name: 'test' }];

    const renderDataTable = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                <BtcIcon />
                <div className="ml-1">
                    <p className="mb-0 grey-text-accent mb-0 text-sm ml-2">
                        Bitcoin
                        <span className="text-xxs grey-text">BTC</span>
                    </p>
                    <p className="mb-0 grey-text text-xxs ml-2">vol : 1.12,121.</p>
                </div>
            </div>,
            <p className={`badge white-text font-bold mb-0`}>323,669,061</p>,
            <p className={`badge white-text font-bold mb-0  gradient-text`}>Buy</p>,
            <p className={`badge white-text font-bold mb-0 danger-text`}>Cancle</p>,
        ]);
    };

    const renderTableHeader = [
        <p className="mb-0 text-sm grey-text">Name</p>,
        <p className="mb-0 text-sm grey-text">Last Price</p>,
        <p className="mb-0 text-sm grey-text">Change</p>,
        '',
    ];
    return (
        <React.Fragment>
            <div className="mobile-container no-header dark-bg-main">
                <>
                    <div className="d-flex justify-content-between align-items-center head-container">
                        <h1 className="heading-one">Market Order</h1>
                        <div className="d-flex justify-content-start align-items-center head-action">
                            <img
                                src="../../assets/icons/filter.svg"
                                alt="filter"
                                data-toggle="modal"
                                data-target="#modal-filter"
                            />
                            <img src="../../assets/icons/navbar/edit.svg" alt="edit" />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-24 w-100">
                        <nav className="m-0">
                            <div className="nav-market nav nav-tabs" id="nav-tab">
                                <a
                                    className="nav-item nav-link active"
                                    id="nav-open-tab"
                                    href="#nav-open"
                                    role="tab"
                                    aria-controls="nav-open"
                                    data-toggle="tab"
                                    aria-selected="true">
                                    Open Orders
                                </a>
                                <a
                                    className="nav-item nav-link"
                                    id="nav-close-tab"
                                    href="#nav-close"
                                    role="tab"
                                    aria-controls="nav-close"
                                    data-toggle="tab"
                                    aria-selected="false">
                                    Close Orders
                                </a>
                            </div>
                        </nav>
                        <div className="d-flex justify-content-start align-items-center cancel-all-container">
                            <p className="p-0 m-0">Close All</p>
                            <img src="../../assets/icons/close.svg" alt="cancel" />
                        </div>
                    </div>
                    <Tabs
                        id="controlled-tab-example"
                        defaultActiveKey="all-crypto"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="">
                        <Tab eventKey="tranding" title="Tranding">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(orders)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="all-crypto" title="All-crypto">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(orders)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="spot" title="Spot">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(orders)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="future" title="Future">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(orders)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="New Listing" title="New Listing">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(orders)} header={renderTableHeader} />
                            </div>
                        </Tab>
                    </Tabs>
                    <div className="tab-content" id="nav-tabContent">
                        <div
                            id="nav-open"
                            role="tabpanel"
                            aria-labelledby="nav-copen-tab"
                            className="tab-pane fade show active">
                            <div className="table-order-container w-100">
                                <table className="table table-borderless w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <div className="d-flex justify-content-start align-items-center name-vol-container name-col">
                                                    <p>Coins</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-start align-items-center name-vol-container name-col">
                                                    <p>Amount</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-start align-items-center name-vol-container name-col">
                                                    <p>Price</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-end align-items-center name-vol-container name-col">
                                                    <p>Type</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-end align-items-center name-vol-container name-col">
                                                    <p>Status</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status m-0 p-0 text-right">
                                                    Cancel
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div id="nav-close" role="tabpanel" aria-labelledby="nav-close-tab" className="tab-pane fade">
                            <div className="table-order-container w-100">
                                <table className="table table-borderless w-100">
                                    <thead>
                                        <tr>
                                            <th scope="col">
                                                <div className="d-flex justify-content-start align-items-center name-vol-container name-col">
                                                    <p>Coins</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-start align-items-center name-vol-container name-col">
                                                    <p>Amount</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-start align-items-center name-vol-container name-col">
                                                    <p>Price</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-end align-items-center name-vol-container name-col">
                                                    <p>Type</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                            <th scope="col">
                                                <div className="d-flex justify-content-end align-items-center name-vol-container name-col">
                                                    <p>Status</p>
                                                    <img src="../../assets/icons/sorting.svg" alt="sorting" />
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <img
                                                    src="../../assets/images/coin/eth.png"
                                                    alt="coins"
                                                    className="m-0 p-0"
                                                    width={32}
                                                    height={32}
                                                />
                                            </td>
                                            <td>
                                                <div className="d-flex flex-column justify-content-start align-items-start td-amount">
                                                    <h3 className="p-0 m-0">0.003 ETH</h3>
                                                    <p className="p-0 m-0">24 Oct 2022 - 14.44</p>
                                                </div>
                                            </td>
                                            <td>
                                                <p className="td-price m-0 p-0">323,669,061</p>
                                            </td>
                                            <td>
                                                <p className="td-type m-0 p-0 text-right">Buy</p>
                                            </td>
                                            <td>
                                                <p id="cancel1" className="td-status-done m-0 p-0 text-right">
                                                    Done
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </React.Fragment>
    );
};

export { MarketOrderMobileScreen };
