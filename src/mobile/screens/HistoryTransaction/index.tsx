import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistoryFetch, useWalletsFetch } from '../../../hooks';
import { CustomStylesSelect } from 'src/desktop/components';
import Select from 'react-select';
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
import { FilterIcon } from 'src/mobile/assets/Wallet';
import Tabs from 'react-bootstrap/Tabs';
import { useDocumentTitle } from 'src/hooks';
import { Table } from '../../../components';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { NoData } from 'src/desktop/components';
import { PaginationMobile } from 'src/mobile/components';
import { Link } from 'react-router-dom';

const HistoryTransactionMobileScreen: React.FC = () => {
    const currencies = useSelector(selectCurrencies);
    const page = useSelector(selectCurrentPage);
    const list = useSelector(selectHistory);

    const [historys, setHistorys] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [type, setType] = React.useState('deposits');

    const [status, setStatus] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [showFilter, setShowFilter] = React.useState(false);

    // Handle get item pagination
    const firstElementIndex = useSelector((state: RootState) => selectFirstElemIndex(state, 5));
    const lastElementIndex = useSelector((state: RootState) => selectLastElemIndex(state, 5));
    const nextPageExists = useSelector((state: RootState) => selectNextPageExists(state, 5));

    useDocumentTitle('History Transaction');
    useHistoryFetch({ type: type, limit: 5, currency, page: currentPage });
    useWalletsFetch();

    // ====== Handle type navigation
    const handleChangeType = (e) => {
        setType(e);
        setCurrency('');
    };

    // Handle click next page table
    const onClickPrevPage = () => {
        setCurrentPage(Number(page) - 1);
    };
    const onClickNextPage = () => {
        setCurrentPage(Number(page) + 1);
    };

    // Add code coin into amount history
    const getAmmountCode = (code: string) => {
        switch (code) {
            case 'trx':
                return 'TRX';
            case 'eth':
                return 'ETH';
            case 'btc':
                return 'BTC';
            case 'bnb':
                return 'BNB';
            default:
                return;
        }
    };

    // Handle className for type History Transaction
    const getTypeClassnameHistoryTransaction = (typeClassTransaction: string) => {
        switch (typeClassTransaction) {
            case 'deposits':
                return 'contrast-text';
            case 'withdrawl':
                return 'danger-text';
            default:
                return 'blue-text';
        }
    };

    // Handle type of history transaction
    const getTypeHistoryTransaction = (typeHistoryTransaction: string) => {
        switch (typeHistoryTransaction) {
            case 'deposits':
                return 'Deposit';
            case 'withdrawl':
                return 'Withdrawl';
            case 'transfers':
                return 'Internal Transfer';
            default:
                return;
        }
    };

    // Handle status class history transaction
    const getStatusClassTransaction = (statusCode: string) => {
        switch (statusCode) {
            case 'Pending':
                return 'warning-text';
            case 'Canceled':
                return 'danger-text';
            default:
                return 'green-text';
        }
    };

    // Handle status history transaction
    const getStatusTransaction = (statusCode: string) => {
        switch (statusCode) {
            case 'Pending':
                return 'Pending';
            case 'Canceled':
                return 'Canceled';
            case 'completed':
                return 'Completed';
            default:
                return;
        }
    };

    // Get icon url from currency and wrap to history list
    const transFerlistDataHistory = historys.map((history) => ({
        ...history,
        dataCurrency: currencies.find(({ id }) => id == history.currency),
    }));

    /**
     *
     * Internal history transaction
     *
     */

    // Render header table for internal history transaction
    const getTableHeadersInternalTransaction = () => [
        <p className="mb-0 text-sm grey-text">Coins</p>,
        <p className="mb-0 text-sm grey-text">Amount</p>,
        <p className="mb-0 text-sm grey-text">Type</p>,
        <p className="mb-0 text-sm grey-text">Receiver UID</p>,
        <p className="mb-0 text-sm grey-text">Status</p>,
    ];

    // Render data table for internal transaction history
    const getTableDataInternalTransaction = (data) => {
        return data.map((item) => [
            <div className="d-flex justify-content-center align-items-stretch">
                <img
                    className="icon-history mr-3 rounded-full"
                    src={item.dataCurrency && item.dataCurrency.icon_url}
                    alt="icon"
                />
                {/* <p className="m-0 mr-24 white-text font-bold">{item.currency.toUpperCase()}</p> */}
            </div>,
            <div className="text-nowrap">
                <p className="mb-1 font-weight-bold">
                    {item.amount} {getAmmountCode(item.currency)}
                </p>
                <p className="text-secondary text-sm">
                    <small>{moment(item.created_at).format('D MMM YYYY - HH:mm')}</small>
                </p>
            </div>,
            <div>
                <p className={`m-0 text-xs font-bold text-nowrap ${getTypeClassnameHistoryTransaction(type)}`}>
                    {getTypeHistoryTransaction(type)}
                </p>
            </div>,
            <p className="m-0 white-text text-xs">{item.receiver_uid}</p>,
            <p className={`m-0 text-sm ${getStatusClassTransaction(item.status)}`}>
                {getStatusTransaction(item.status)}
            </p>,
        ]);
    };

    // ======= End Internal history transaction ============

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

    const filterredStatus = (status) => {
        let filterredList;
        let temp;
        temp = list;
        filterredList = temp.filter((item) => item.status === status);
        setHistorys(filterredList);
    };

    React.useEffect(() => {
        setHistorys(list);
    }, [list]);

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

    const handleReset = () => {
        setStatus('');
        setStartDate('');
        setEndDate('');
        setShowFilter(false);
        setHistorys(list);
    };

    const optionStatus = [
        { label: <p className="m-0 text-sm grey-text-accent">Pending</p>, value: 'pending' },
        { label: <p className="m-0 text-sm grey-text-accent">Completed</p>, value: 'completed' },
        { label: <p className="m-0 text-sm grey-text-accent">Canceled</p>, value: 'canceled' },
    ];

    return (
        <section className="mobile-container pg-history-transaction no-header dark-bg-main">
            {/* ===== Header History Transaction ===== */}
            <div className="head-container position-relative">
                <Link to={'/profile'} className="cursor-pointer position-absolute">
                    <ArrowLeft className={'back'} />
                </Link>
                <h1 className="text-center text-md grey-text-accent font-bold">History Transaction</h1>
                <div className="handle-filter text-right">
                    <span className="cursor-pointer" onClick={() => setShowFilter(true)}>
                        <FilterIcon className="filter-icon" />
                    </span>
                </div>
            </div>
            {/* ===== End Header History Transaction ===== */}

            {/* =================== Tab navigation history transaction =========== */}
            <Tabs
                id="controlled-tab-example"
                defaultActiveKey="deposits"
                onSelect={(e) => handleChangeType(e)}
                className="justify-content-between">
                <Tab eventKey="deposits" title="Deposit">
                    <div className="table-mobile-wrapper">
                        <Table data={renderDataTable(dataDeposit)} header={renderTableHeader} />
                    </div>
                </Tab>
                <Tab eventKey="withdraws" title="Withdrawal">
                    <div className="table-mobile-wrapper">
                        <Table data={renderDataTable(dataWithdrawal)} header={renderTableHeader} />
                    </div>
                </Tab>
                <Tab eventKey="transfers" title="Internal Transfer">
                    <div className="table-responsive">
                        <Table
                            className="table table-borderless"
                            header={getTableHeadersInternalTransaction()}
                            data={getTableDataInternalTransaction(transFerlistDataHistory)}
                        />
                    </div>
                    {historys[0] && (
                        <PaginationMobile
                            firstElementIndex={firstElementIndex}
                            lastElementIndex={lastElementIndex}
                            page={page}
                            nextPageExists={nextPageExists}
                            onClickPrevPage={onClickPrevPage}
                            onClickNextPage={onClickNextPage}
                        />
                    )}
                    {historys.length < 1 && <NoData text="No Data Yet" />}
                </Tab>
            </Tabs>
            {/* =================== End Tab navigation history transaction =========== */}

            <div id="off-canvas-filter" className={`position-fixed off-canvas-filter ${showFilter ? 'show' : ''}`}>
                <div className="fixed-bottom off-canvas-content-container-filter overflow-auto">
                    <div>
                        <label className="m-0 white-text text-sm mb-8">Start Date</label>
                        <input
                            type="date"
                            className="form-control mb-24"
                            onChange={(e) => {
                                setStartDate(e.target.value);
                            }}
                        />
                    </div>

                    <div>
                        <label className="m-0 white-text text-sm mb-8">End Date</label>
                        <input
                            type="date"
                            className="form-control mb-24"
                            onChange={(e) => {
                                setEndDate(e.target.value);
                            }}
                        />
                    </div>

                    <div className="mb-24">
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

                    <div className="d-flex justify-content-center align-items-center">
                        <button
                            onClick={handleReset}
                            type="button"
                            className="btn btn-reset grey-text-accent dark-bg-accent text-sm w-40 mr-8">
                            Reset
                        </button>
                        <button
                            onClick={() => setShowFilter(!showFilter)}
                            type="button"
                            className="btn-primary grey-text-accent text-sm font-normal w-40">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { HistoryTransactionMobileScreen };
