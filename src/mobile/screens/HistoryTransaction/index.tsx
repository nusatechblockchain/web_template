import * as React from 'react';
import Tab from 'react-bootstrap/Tab';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { useHistoryFetch, useWalletsFetch } from '../../../hooks';
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
import Tabs from 'react-bootstrap/Tabs';
import { useDocumentTitle } from 'src/hooks';
import { Table } from '../../../components';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { Pagination } from 'src/desktop/components';
import { NoData } from 'src/desktop/components';
import { Link } from 'react-router-dom';
import InternalTransferHistory from 'src/mobile/components/InternalTransferHistory';

const HistoryTransactionMobileScreen: React.FC = () => {
    useDocumentTitle('History Transaction');
    const [key, setKey] = React.useState('all');

    const currencies: Currency[] = useSelector(selectCurrencies);
    const page = useSelector(selectCurrentPage);
    const list = useSelector(selectHistory);

    const [historys, setHistorys] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [currency, setCurrency] = React.useState('');
    const [type, setType] = React.useState('deposits');
    const [status, setStatus] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');

    const firstElemIndex = useSelector((state: RootState) => selectFirstElemIndex(state, 5));
    const lastElemIndex = useSelector((state: RootState) => selectLastElemIndex(state, 5));
    const nextPageExists = useSelector((state: RootState) => selectNextPageExists(state, 5));

    useHistoryFetch({ type: type, limit: 5, currency, page: currentPage });

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

    const getTableData = (data) => {
        return data.map((item) => [
            <p className="m-0 text-xs text-nowrap white-text">
                {moment(item.created_at).format('D MMM YYYY - HH:mm')}
            </p>,
            <p
                className={`m-0 text-xs font-bold ${
                    type === 'deposits' ? 'contrast-text' : type === 'withdrawl' ? 'danger-text' : 'blue-text'
                }`}>
                {type === 'deposits'
                    ? 'Deposit'
                    : type === 'withdrawl'
                    ? 'Withdrawal'
                    : type === 'transfers'
                    ? 'Internal Transfer'
                    : ''}
            </p>,
            <div className="d-flex align-items-center text-xs">
                <span className="">{item.icon}</span>
                <p className="m-0 mr-24 white-text font-bold">{item.currency.toUpperCase()}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.amount}</p>,
            <p className="m-0 text-sm white-text text-xs">{item.receiver_uid}</p>,
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

    return (
        <React.Fragment>
            <div className="mobile-container pg-history-transaction no-header dark-bg-main">
                <>
                    <div className="head-container position-relative">
                        <Link to={'/profile'} className="cursor-pointer position-absolute">
                            <ArrowLeft className={'back'} />
                        </Link>
                        <h1 className="text-center text-md grey-text-accent font-bold">History Transaction</h1>
                    </div>

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
                            {/* <Table data={renderDataTable(dataTransferInternal)} header={renderTableHeader} /> */}

                            <Table
                                className="table-responsive"
                                header={getTableHeaders()}
                                data={getTableData(historys)}
                            />
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
                        </Tab>
                    </Tabs>
                </>
            </div>
        </React.Fragment>
    );
};

export { HistoryTransactionMobileScreen };
