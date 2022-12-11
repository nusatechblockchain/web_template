import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies, Currency } from 'src/modules';
import { Table } from 'src/components';
import { CustomStylesSelect } from 'src/desktop/components';
import { Tabs, Tab } from 'react-bootstrap';
import { ModalCloseIcon } from '../../../assets/images/CloseIcon';
import Select from 'react-select';

export const MarketOpen: FC = (): ReactElement => {
    const currencies: Currency[] = useSelector(selectCurrencies);

    useDocumentTitle('Market Order');
    useWalletsFetch();

    const dataOpen = [
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Buy',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Buy',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Buy',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Buy',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Buy',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
    ];

    const dataClose = [
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Sell',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Sell',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Sell',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Sell',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
        {
            date: '24-10-2022 - 13:22:03',
            market: 'Limit Order',
            type: 'Sell',
            price: '$ 252.125.536',
            volume: '1 TRX',
            executed: '0.8 TRX',
            unexecuted: '0.2 TRX',
        },
    ];

    const getTableHeaders = () => {
        return ['Date', 'Market', 'Type', 'Price', 'Volume', 'Executed', 'Unexecuted', 'Status'];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            <p className="m-0 text-sm white-text">{item.date}</p>,
            <p className="m-0 text-sm white-text">{item.market}</p>,
            <p className={`m-0 text-sm ${item.type == 'Buy' ? 'green-text' : 'danger-text'}`}>{item.type}</p>,
            <p className="m-0 text-sm white-text">{item.price}</p>,
            <p className="m-0 text-sm white-text text-italic">{item.volume}</p>,
            <p className="m-0 text-sm white-text text-italic">{item.executed}</p>,
            <p className="m-0 text-sm white-text text-italic">{item.unexecuted}</p>,
            <button className="btn btn-sm btn-danger text-sm font-normal">Cancle Button</button>,
        ]);
    };

    const optionTime = [
        { label: <p className="m-0 text-sm grey-text-accent">Past 7 Days</p>, value: '7' },
        { label: <p className="m-0 text-sm grey-text-accent">Past 30 Days</p>, value: '30' },
        { label: <p className="m-0 text-sm grey-text-accent">Past 90 Days</p>, value: '90' },
    ];

    const optionStatus = [
        { label: <p className="m-0 text-sm grey-text-accent">All</p>, value: 'all' },
        { label: <p className="m-0 text-sm grey-text-accent">Canceled</p>, value: 'canceled' },
        { label: <p className="m-0 text-sm grey-text-accent">Pending</p>, value: 'pending' },
        { label: <p className="m-0 text-sm grey-text-accent">Success</p>, value: 'all' },
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
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="market-order-screen content-wrapper dark-bg-main">
                <div className="px-24 dark-bg-main">
                    <h1 className="m-0 white-text text-xl">Market Orders</h1>
                </div>
                <div className="pg-history-transaction-screen__content-wrapper dark-bg-accent">
                    <div className="position-relative">
                        {renderFilter()}
                        <div className="ml-3 cancel-all-order">
                            <button className="btn btn-secondary">
                                Cancel All Orders <ModalCloseIcon className="small-icon" />
                            </button>
                        </div>
                    </div>
                    <Tabs defaultActiveKey="open" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="open" title="Open Order" className="mb-24">
                            <div className="mt-24">
                                <Table header={getTableHeaders()} data={getTableData(dataOpen)} />
                            </div>
                        </Tab>
                        <Tab eventKey="close" title="Close Order" className="mb-24">
                            <div className="mt-24">
                                <Table header={getTableHeaders()} data={getTableData(dataClose)} />
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    );
};
