import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table, Decimal } from '../../../components';
import { EditIcon, CloseIcon } from '../../assets/Market';
import { FilterIcon } from 'src/assets/images/FilterIcon';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { Link } from 'react-router-dom';

const MarketOrderMobileScreen: React.FC = () => {
    const [key, setKey] = React.useState('open-order');
    const [showDetail, setShowDetail] = React.useState(false);

    const orders = [{ name: 'test' }, { name: 'test' }, { name: 'test' }, { name: 'test' }];

    const renderTableHeader = [
        <p className="mb-0 text-sm grey-text">Coins</p>,
        <p className="mb-0 text-sm grey-text">Amount</p>,
        <p className="mb-0 text-sm grey-text">Price</p>,
        <p className="mb-0 text-sm grey-text">Type</p>,
        <p className="mb-0 text-sm grey-text">Status</p>,
    ];

    const renderDataTable = (data) => {
        return data.map((item) => [
            <BtcIcon />,
            <div className="d-flex align-items-center text-sm">
                <div className="">
                    <p className="mb-0 grey-text-accent font-bold text-sm">0.003 BTC</p>
                    <p className="mb-0 grey-text text-xxs text-nowrap">24 Oct 2022 - 14.44</p>
                </div>
            </div>,
            <p className={`badge grey-text text-sm mb-0`}>323,669,061</p>,
            <p className={`badge text-sm mb-0 cursor-pointer gradient-text`}>Buy</p>,
            <p className={`badge text-sm mb-0 cursor-pointer danger-text`} onClick={() => setShowDetail(true)}>
                Cancel
            </p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="mobile-container pg-market-order no-header dark-bg-main">
                <div className="d-flex justify-content-between align-items-center head-container">
                    <h1 className="text-md font-extrabold mb-0 grey-text-accent">Market Order</h1>
                    <div className="d-flex justify-content-start align-items-center head-action">
                        <span className="mr-8">
                            <FilterIcon />
                        </span>
                        <span>
                            <EditIcon />
                        </span>
                    </div>
                </div>

                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="open-order"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    className="">
                    <Tab eventKey="open-order" title="Open Order">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(orders)} header={renderTableHeader} />
                        </div>
                    </Tab>
                    <Tab eventKey="close-order" title="Close Order">
                        <div className="table-mobile-wrapper">
                            <Table data={renderDataTable(orders)} header={renderTableHeader} />
                        </div>
                    </Tab>

                    <div className="ml-auto">
                        <div className="d-flex justify-content-start align-items-center cancel-all-container">
                            <p className="p-0 m-0">Close All</p>
                            <CloseIcon />
                        </div>
                    </div>
                </Tabs>

                <div id="off-canvas" className={`position-fixed off-canvas ${showDetail ? ' show' : ''}`}>
                    <div className="fixed-bottom off-canvas-content-container overflow-auto">
                        <div className="d-flex align-items-center off-canvas-content-head">
                            <BtcIcon />
                            <h3>
                                Bitcoin / <span>BTC</span>
                            </h3>
                        </div>
                        <table className="w-100 table-canvas">
                            <tbody>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Date</td>
                                    <td className="td-value">20 Oct 2022 - 13:44</td>
                                </tr>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Market</td>
                                    <td className="td-value">Limit Order</td>
                                </tr>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Type</td>
                                    <td className="td-value">Buy</td>
                                </tr>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Price</td>
                                    <td className="td-value">323,669,061</td>
                                </tr>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Volume</td>
                                    <td className="td-value">1 ETH</td>
                                </tr>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Execute</td>
                                    <td className="td-value">0.7</td>
                                </tr>
                                <tr className="w-100 d-flex justify-content-between align-items0center">
                                    <td className="td-title">Unexecute</td>
                                    <td className="td-value">0.3</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            id="cancel-canvas"
                            className="btn btn-danger btn-mobile w-100 mb-3 mt-4"
                            onClick={() => setShowDetail(false)}>
                            Cancel
                        </button>
                        <button
                            id="close-canvas"
                            className="btn btn-secondary btn-outline btn-mobile btn-block mb-4"
                            onClick={() => setShowDetail(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { MarketOrderMobileScreen };
