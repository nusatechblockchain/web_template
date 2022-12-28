import React from 'react';
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
import { Table } from '../../../components';
import { Tabs, Tab } from 'react-bootstrap';
import moment from 'moment';
import { Pagination } from 'src/desktop/components';
import { NoData } from 'src/desktop/components';

export default function InternalTransferHistory() {
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
            <div className="table-content">
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
                </p>
                ,
                <div className="d-flex align-items-center text-sm">
                    <span className="mr-12">{item.icon}</span>
                    <p className="m-0 mr-24 white-text font-bold">{item.currency.toUpperCase()}</p>
                </div>
                ,<p className="m-0 text-sm white-text">{item.amount}</p>,
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
                </p>
                ,
            </div>,
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
                </div>

                <div className="w-20 mr-24">
                    <p className="m-0 white-text text-sm mb-8">Status</p>
                </div>
            </div>
        );
    };

    return (
        <>
            <div>
                <Tabs onSelect={(e) => handleChangeType(e)}>
                    <Tab eventKey="transfers" title="Internal Transfer" className="mb-24">
                        <div className="">
                            {/* {renderFilter()} */}
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
                    </Tab>
                </Tabs>
            </div>
        </>
    );
}
