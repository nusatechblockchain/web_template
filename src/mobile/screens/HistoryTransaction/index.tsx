import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { useDocumentTitle } from 'src/hooks';
import { Table } from '../../../components';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { Link } from 'react-router-dom';

const HistoryTransactionMobileScreen: React.FC = () => {
    useDocumentTitle('History Trade');
    const [key, setKey] = React.useState('all');

    const dataAll = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Tf Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Canceled',
        },
    ];

    const dataDeposit = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Canceled',
        },
    ];

    const dataWithdrawal = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Canceled',
        },
    ];

    const dataTransferInternal = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Tf Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Tf Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Tf Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Tf Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            price: '323,669,061',
            status: 'Canceled',
        },
    ];

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
                    <p className="mb-0 grey-text-accent font-bold text-sm">{item.ammount}</p>
                    <p className="mb-0 grey-text text-xxs">{item.date}</p>
                </div>
            </div>,
            <p className={`badge grey-text text-sm mb-0`}>{item.price}</p>,
            <p
                className={`badge text-sm mb-0 cursor-pointer ${
                    item.type === 'Deposit' ? 'contrast-text' : item.type === 'Withdrawal' ? 'danger-text' : 'blue-text'
                }`}>
                {item.type}
            </p>,
            <p
                className={`badge text-sm mb-0 cursor-pointer ${
                    item.status === 'Pending'
                        ? 'warning-text'
                        : item.status === 'Canceled'
                        ? 'danger-text'
                        : 'green-text'
                }`}>
                {item.status}
            </p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="mobile-container pg-history-transaction no-header dark-bg-main">
                <>
                    <div className="head-container position-relative">
                        <Link to={'/profile'} className="cursor-pointer position-absolute">
                            <ArrowLeft className={'back'} />
                        </Link>
                        <h1 className="text-center text-md grey-text-accent font-bold">History Trade</h1>
                    </div>

                    <Tabs
                        id="controlled-tab-example"
                        defaultActiveKey="all"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="justify-content-between">
                        <Tab eventKey="all" title="All">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(dataAll)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="deposit" title="Deposit">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(dataDeposit)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="withdrawal" title="Withdrawal">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(dataWithdrawal)} header={renderTableHeader} />
                            </div>
                        </Tab>
                        <Tab eventKey="internal-transfer" title="Internal Transfer">
                            <div className="table-mobile-wrapper">
                                <Table data={renderDataTable(dataTransferInternal)} header={renderTableHeader} />
                            </div>
                        </Tab>
                    </Tabs>
                </>
            </div>
        </React.Fragment>
    );
};

export { HistoryTransactionMobileScreen };
