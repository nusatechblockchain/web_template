import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies, Currency } from 'src/modules';
import { Link } from 'react-router-dom';
import { Table } from 'src/components';
import { CustomStylesSelect } from 'src/desktop/components';
import { Tabs, Tab } from 'react-bootstrap';
import { BtcIcon } from 'src/assets/images/CoinIcon';
import Select from 'react-select';
import './HistoryTransactionScreen.pcss';

export const HistoryTransactionScreen: FC = (): ReactElement => {
    const currencies: Currency[] = useSelector(selectCurrencies);

    useDocumentTitle('Market List');
    useWalletsFetch();

    const dataAll = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Transfer Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
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
            txid: 'TXASF21351S...',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Deposit',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
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
            txid: 'TXASF21351S...',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Withdrawal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Canceled',
        },
    ];

    const dataTransferInternal = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Transfer Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Pending',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Transfer Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Transfer Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Done',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Transfer Internal',
            assets: 'BTC',
            icon: <BtcIcon />,
            ammount: '0.02 BTC',
            txid: 'TXASF21351S...',
            status: 'Canceled',
        },
    ];

    const getTableHeaders = () => {
        return ['Date', 'Type', 'Asset', 'Ammount', 'TxID', 'Status'];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            <p className="m-0 text-sm white-text">{item.date}</p>,
            <p
                className={`m-0 text-sm font-bold ${
                    item.type === 'Deposit' ? 'contrast-text' : item.type === 'Withdrawal' ? 'danger-text' : 'blue-text'
                }`}>
                {item.type}
            </p>,
            <div className="d-flex align-items-center text-sm">
                <span className="mr-12">{item.icon}</span>
                <p className="m-0 mr-24 white-text font-bold">{item.assets}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.ammount}</p>,
            <p className="m-0 text-sm white-text text-italic">{item.txid}</p>,
            <p
                className={`m-0 text-sm ${
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

    const optionTime = [
        { label: <p className="m-0 text-sm grey-text-accent">Past 7 Days</p>, value: '7' },
        { label: <p className="m-0 text-sm grey-text-accent">Past 30 Days</p>, value: '30' },
        { label: <p className="m-0 text-sm grey-text-accent">Past 90 Days</p>, value: '90' },
    ];

    const optionStatus = [
        { label: <p className="m-0 text-sm grey-text-accent">Pending</p>, value: 'pending' },
        { label: <p className="m-0 text-sm grey-text-accent">Done</p>, value: 'done' },
        { label: <p className="m-0 text-sm grey-text-accent">Canceled</p>, value: 'canceled' },
    ];

    const optionAssets = currencies.map((item) => {
        const customLabel = (
            <div className="d-flex align-items-center">
                <img src={item.icon_url} alt="icon" className="mr-12 small-coin-icon" />
                <div>
                    <p className="m-0 text-sm grey-text-accent">{item.id.toUpperCase()}</p>
                    <p className="m-0 text-xs grey-text-accent">{item.name}</p>
                </div>
            </div>
        );
        return {
            label: customLabel,
            value: item.id,
        };
    });

    const optionTxId = [
        { label: <p className="m-0 text-sm grey-text-accent">TXASF21351S...</p>, value: 'TXASF21351S...' },
        { label: <p className="m-0 text-sm grey-text-accent">TXASF21352S...</p>, value: 'TXASF21352S...' },
        { label: <p className="m-0 text-sm grey-text-accent">TXASF21353S...</p>, value: 'TXASF21353S...' },
    ];

    const renderFilter = () => {
        return (
            <div className="d-flex align-items-center">
                <div className="w-20 mr-24">
                    <p className="m-0 white-text text-sm mb-8">Time</p>
                    <Select
                        value={optionTime.filter(function (option) {
                            return option.value === '7';
                        })}
                        styles={CustomStylesSelect}
                        options={optionTime}
                    />
                </div>

                <div className="w-20 mr-24">
                    <p className="m-0 white-text text-sm mb-8">Assets</p>
                    <Select
                        value={optionAssets.filter(function (option) {
                            return option.value === 'bnb';
                        })}
                        styles={CustomStylesSelect}
                        options={optionAssets}
                    />
                </div>

                <div className="w-20 mr-24">
                    <p className="m-0 white-text text-sm mb-8">Status</p>
                    <Select
                        value={optionStatus.filter(function (option) {
                            return option.value === 'pending';
                        })}
                        styles={CustomStylesSelect}
                        options={optionStatus}
                    />
                </div>

                <div className="w-20">
                    <p className="m-0 white-text text-sm mb-8">TX ID</p>
                    <Select
                        value={optionTxId.filter(function (option) {
                            return option.value === 'TXASF21351S...';
                        })}
                        styles={CustomStylesSelect}
                        options={optionTxId}
                    />
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="pg-history-transaction-screen dark-bg-main">
                <div className="pg-history-transaction-screen__title dark-bg-main">
                    <h1 className="m-0 white-text text-xl">Transaction History</h1>
                </div>
                <div className="pg-history-transaction-screen__content-wrapper dark-bg-accent">
                    <div className="transaction-history-tabs">
                        <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
                            <Tab eventKey="all" title="All" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(dataAll)} />
                                </div>
                            </Tab>
                            <Tab eventKey="deposit" title="Deposit" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(dataDeposit)} />
                                </div>
                            </Tab>
                            <Tab eventKey="withdrawal" title="Withdrawal" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(dataWithdrawal)} />
                                </div>
                            </Tab>
                            <Tab eventKey="internal-transfer" title="Internal Transfer" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(dataTransferInternal)} />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
