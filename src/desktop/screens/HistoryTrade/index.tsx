import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies, Currency } from 'src/modules';
import { Table } from 'src/components';
import { CustomStylesSelect } from 'src/desktop/components';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import Select from 'react-select';
import { NoData } from '../../components';

export const HistoryTrade: FC = (): ReactElement => {
    const currencies: Currency[] = useSelector(selectCurrencies);

    useDocumentTitle('History Trade');
    useWalletsFetch();

    const dataOpen = [
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Buy',
            market: 'Limit Order',
            assets: (
                <div>
                    <BtcIcon /> BTC
                </div>
            ),
            volume: '1 BTC',
            price: '$ 252.125.536',
            total: '$ 252.125.536',
            status: 'Success',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Buy',
            market: 'Limit Order',
            assets: (
                <div>
                    <BtcIcon /> BTC
                </div>
            ),
            volume: '1 BTC',
            price: '$ 252.125.536',
            total: '$ 252.125.536',
            status: 'Success',
        },
        {
            date: '24-10-2022 - 13:22:03',
            type: 'Buy',
            market: 'Limit Order',
            assets: (
                <div>
                    <BtcIcon /> BTC
                </div>
            ),
            volume: '1 BTC',
            price: '$ 252.125.536',
            total: '$ 252.125.536',
            status: 'Success',
        },
    ];

    const getTableHeaders = () => {
        return ['Date', 'Type', 'Market', 'Assets', 'Volume', 'Price', 'Total', 'Status'];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            <p className="m-0 text-sm white-text">{item.date}</p>,
            <p className={`m-0 text-sm ${item.type == 'Buy' ? 'green-text' : 'danger-text'}`}>{item.type}</p>,
            <p className="m-0 text-sm white-text">{item.market}</p>,
            <p className="m-0 text-sm white-text">{item.assets}</p>,
            <p className="m-0 text-sm white-text">{item.volume}</p>,
            <p className="m-0 text-sm white-text">{item.price}</p>,
            <p className="m-0 text-sm white-text">{item.total}</p>,
            <p className="m-0 text-sm green-text">{item.status}</p>,
            <p></p>,
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
            <div className="history-trade-screen content-wrapper dark-bg-main">
                <div className="px-24 dark-bg-main pt-4 pb-4">
                    <h1 className="m-0 white-text text-xl">Trade History</h1>
                </div>
                <div className="pg-history-transaction-screen__content-wrapper dark-bg-accent">
                    <div className="position-relative">{renderFilter()}</div>
                    <Table header={getTableHeaders()} data={getTableData(dataOpen)} />
                    {dataOpen.length < 1 && <NoData text="No Data Yet" />}
                </div>
            </div>
        </React.Fragment>
    );
};
