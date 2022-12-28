import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch, useHistoryFetch } from 'src/hooks';
import {
    selectCurrencies,
    Currency,
    selectHistory,
    selectFirstElemIndex,
    selectCurrentPage,
    selectLastElemIndex,
    selectNextPageExists,
    RootState,
} from 'src/modules';
import { localeDate } from '../../../helpers';
import { Table } from 'src/components';
import { Pagination, CustomStylesSelect } from 'src/desktop/components';
import Select from 'react-select';
import moment from 'moment';
import { NoData } from '../../components';

const DEFAULT_LIMIT = 5;

export const HistoryTrade: FC = (): ReactElement => {
    const currencies: Currency[] = useSelector(selectCurrencies);
    const page = useSelector(selectCurrentPage);
    const list = useSelector(selectHistory);

    const [historys, setHistorys] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [status, setStatus] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const firstElemIndex = useSelector((state: RootState) => selectFirstElemIndex(state, DEFAULT_LIMIT));
    const lastElemIndex = useSelector((state: RootState) => selectLastElemIndex(state, DEFAULT_LIMIT));
    const nextPageExists = useSelector((state: RootState) => selectNextPageExists(state, DEFAULT_LIMIT));
    useDocumentTitle('Trade History');
    useHistoryFetch({ type: 'transfers', limit: DEFAULT_LIMIT, currency, page: currentPage });

    const onClickPrevPage = () => {
        setCurrentPage(Number(page) - 1);
    };
    const onClickNextPage = () => {
        setCurrentPage(Number(page) + 1);
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

    React.useEffect(() => {
        if (startDate != '' && endDate != '') {
            const filterredList = list.filter(
                (item) =>
                    moment(item.created_at).format() >= moment(startDate).format() &&
                    moment(item.created_at).format() <= moment(endDate).format()
            );
            setHistorys(filterredList);
        }
    }, [startDate, endDate]);

    console.log(historys);

    const getTableHeaders = () => {
        return ['Date', 'Type', 'Market', 'Assets', 'Volume', 'Price', 'Total', 'Status'];
    };

    const getTableData = (data) => {
        const market = currencies.find((m) => m.id === data.market);
        return data.map((item) => [
            <p className="m-0 text-sm white-text">{localeDate(item.created_at, 'fullDate')}</p>,
            <p className={`m-0 text-sm ${item.side == 'Buy' ? 'green-text' : 'danger-text'}`}>{item.side}</p>,
            <p className="m-0 text-sm white-text">{item.market}</p>,
            <p className="m-0 text-sm white-text">{market}</p>,
            <p className="m-0 text-sm white-text">{item.amount}</p>,
            <p className="m-0 text-sm white-text">{item.price}</p>,
            <p className="m-0 text-sm white-text">{item.total}</p>,
            <p className="m-0 text-sm green-text">{item.status}</p>,
            <p></p>,
        ]);
    };

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
                    <label className="m-0 white-text text-sm mb-8">Start Date</label>
                    <input
                        type="date"
                        className="form-control mb-24"
                        onChange={(e) => {
                            setStartDate(e.target.value);
                        }}
                    />
                </div>

                <div className="w-20 mr-24">
                    <label className="m-0 white-text text-sm mb-8">End Date</label>
                    <input
                        type="date"
                        className="form-control mb-24"
                        onChange={(e) => {
                            setEndDate(e.target.value);
                        }}
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
            <div className="history-trade-screen content-wrapper dark-bg-main">
                <div className="px-24 dark-bg-main pt-4 pb-4">
                    <h1 className="m-0 white-text text-xl">Trade History</h1>
                </div>
                <div className="pg-history-transaction-screen__content-wrapper dark-bg-accent">
                    <div className="position-relative">{renderFilter()}</div>
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
                    {historys.length < 1 && <NoData text="No Data Yet" />}
                </div>
            </div>
        </React.Fragment>
    );
};
