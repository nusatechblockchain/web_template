import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch, useHistoryFetch } from '../../../hooks';
import {
    selectCurrencies,
    Currency,
    selectHistory,
    selectFirstElemIndex,
    selectCurrentPage,
    selectLastElemIndex,
    selectNextPageExists,
    RootState,
} from '../../../modules';
import { Table } from '../../../components';
import { Pagination } from '../../../desktop/components';
import { CustomStylesSelect } from '../../../desktop/components';
import { Tabs, Tab } from 'react-bootstrap';
import Select from 'react-select';
import moment from 'moment';
import './HistoryTransactionScreen.pcss';

const DEFAULT_LIMIT = 5;
export const HistoryTransactionScreen: FC = (): ReactElement => {
    const currencies: Currency[] = useSelector(selectCurrencies);
    const page = useSelector(selectCurrentPage);
    const list = useSelector(selectHistory);

    const [historys, setHistorys] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [type, setType] = React.useState('deposits');
    const [status, setStatus] = React.useState('');
    const [date, setDate] = React.useState('');

    const firstElemIndex = useSelector((state: RootState) => selectFirstElemIndex(state, DEFAULT_LIMIT));
    const lastElemIndex = useSelector((state: RootState) => selectLastElemIndex(state, DEFAULT_LIMIT));
    const nextPageExists = useSelector((state: RootState) => selectNextPageExists(state, DEFAULT_LIMIT));

    useHistoryFetch({ type: type, limit: DEFAULT_LIMIT, currency, page: currentPage });

    useDocumentTitle('Transaction History');
    useWalletsFetch();

    const handleChangeType = (e) => {
        setType(e);
        setCurrency('');
    };

    const onClickPrevPage = () => {
        setCurrentPage(Number(page) - 1);
    };
    const onClickNextPage = () => {
        setCurrentPage(Number(page) + 1);
    };

    const getTableHeaders = () => {
        return ['Date', 'Type', 'Asset', 'Ammount', 'Receiver UID', 'Status'];
    };

    React.useEffect(() => {
        setHistorys(list);
    }, [list]);

    const filterredStatus = (status) => {
        let filterredList;
        let temp;
        temp = list;
        filterredList = temp.filter((item) => item.status === status);
        setHistorys(filterredList);
    };

    const getTableData = (data) => {
        return data.map((item) => [
            <p className="m-0 text-sm white-text">{moment(item.created_at).format('D MMM YYYY - HH:mm')}</p>,
            <p
                className={`m-0 text-sm font-bold ${
                    type === 'deposits' ? 'contrast-text' : type === 'withdraws' ? 'danger-text' : 'blue-text'
                }`}>
                {type === 'deposits'
                    ? 'Deposit'
                    : type === 'withdraws'
                    ? 'Withdrawal'
                    : type === 'transfers'
                    ? 'Internal Transfer'
                    : ''}
            </p>,
            <div className="d-flex align-items-center text-sm">
                <span className="mr-12">{item.icon}</span>
                <p className="m-0 mr-24 white-text font-bold">{item.currency.toUpperCase()}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.amount}</p>,
            <p className="m-0 text-sm white-text text-italic">{item.receiver_uid}</p>,
            <p
                className={`m-0 text-sm ${
                    item.status === 'Pending'
                        ? 'warning-text'
                        : item.status === 'Canceled'
                        ? 'danger-text'
                        : 'green-text'
                }`}>
                {item.status === 'pending'
                    ? 'Pending'
                    : item.status === 'canceled'
                    ? 'Canceled'
                    : item.status === 'completed'
                    ? 'Completed'
                    : ''}
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
        { label: <p className="m-0 text-sm grey-text-accent">Completed</p>, value: 'completed' },
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
                            return option.value === currency;
                        })}
                        styles={CustomStylesSelect}
                        options={optionAssets}
                        onChange={(e) => {
                            setCurrency(e.value);
                        }}
                    />
                </div>

                <div className="w-20 mr-24">
                    <p className="m-0 white-text text-sm mb-8">Status</p>
                    <Select
                        value={optionStatus.filter(function (option) {
                            return option.value === status;
                        })}
                        styles={CustomStylesSelect}
                        options={optionStatus}
                        onChange={(e) => {
                            setStatus(e.value);
                            filterredStatus(e.value);
                        }}
                    />
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="pg-history-transaction-screen dark-bg-main">
                <div className="pg-history-transaction-screen__title dark-bg-main px-24 pb-4 pt-4">
                    <h1 className="m-0 white-text text-xl">Transaction History</h1>
                </div>
                <div className="pg-history-transaction-screen__content-wrapper dark-bg-accent">
                    <div className="transaction-history-tabs">
                        <Tabs
                            defaultActiveKey="deposits"
                            onSelect={(e) => handleChangeType(e)}
                            id="uncontrolled-tab-example"
                            className="mb-3">
                            <Tab eventKey="deposits" title="Deposit" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(historys)} />
                                    {historys[0] && (
                                        <Pagination
                                            firstElemIndex={firstElemIndex}
                                            lastElemIndex={lastElemIndex}
                                            page={page}
                                            nextPageExists={nextPageExists}
                                            onClickPrevPage={onClickPrevPage}
                                            onClickNextPage={onClickNextPage}
                                        />
                                    )}
                                </div>
                            </Tab>
                            <Tab eventKey="withdraws" title="Withdrawal" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(historys)} />
                                    {historys[0] && (
                                        <Pagination
                                            firstElemIndex={firstElemIndex}
                                            lastElemIndex={lastElemIndex}
                                            page={page}
                                            nextPageExists={nextPageExists}
                                            onClickPrevPage={onClickPrevPage}
                                            onClickNextPage={onClickNextPage}
                                        />
                                    )}
                                </div>
                            </Tab>
                            <Tab eventKey="transfers" title="Internal Transfer" className="mb-24">
                                <div className="mt-24">
                                    {renderFilter()}
                                    <Table header={getTableHeaders()} data={getTableData(historys)} />
                                    {historys[0] && (
                                        <Pagination
                                            firstElemIndex={firstElemIndex}
                                            lastElemIndex={lastElemIndex}
                                            page={page}
                                            nextPageExists={nextPageExists}
                                            onClickPrevPage={onClickPrevPage}
                                            onClickNextPage={onClickNextPage}
                                        />
                                    )}
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
