import * as React from 'react';
import { useSelector } from 'react-redux';
import { Tabs, Tab } from 'react-bootstrap';
import { Link, useParams, useHistory } from 'react-router-dom';
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
import { useHistoryFetch, useDocumentTitle, useWalletsFetch } from '../../../hooks';
import { ArrowLeft } from '../../assets/Arrow';
import { WithdrawlIcon, DepositIcon, TransferIcon, FilterIcon, DocIcon } from '../../assets/Wallet';
import { Table } from '../../../components';
import { ModalMobile } from '../../components';
import { CircleCloseModalNetworkIcon } from '../../../assets/images/CircleCloseIcon';
import { InfoModalNetworkIcon } from '../../../assets/images/InfoIcon';

const DEFAULT_LIMIT = 5;
const WalletDetailMobileScreen: React.FC = () => {
    const [showModalFilter, setShowModalFilter] = React.useState(false);

    const history = useHistory();
    const { currency = '' } = useParams<{ currency?: string }>();
    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);

    const page = useSelector(selectCurrentPage);
    const list = useSelector(selectHistory);

    const [historys, setHistorys] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [type, setType] = React.useState('deposits');
    const [status, setStatus] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [showNetwork, setShowNetwork] = React.useState(false);

    useHistoryFetch({ type: type, limit: 15, currency: currency, page: currentPage });

    const handleSelectNetwork = (blockchain_key, protocol) => {
        history.push(`/wallets/${currency}/deposit`, { blockchain_key: blockchain_key, protocol: protocol });
    };

    useDocumentTitle(`Detail ${currency.toUpperCase()}`);
    useWalletsFetch();

    const handleChangeType = (e) => {
        setType(e);
    };

    const onClickPrevPage = () => {
        setCurrentPage(Number(page) - 1);
    };
    const onClickNextPage = () => {
        setCurrentPage(Number(page) + 1);
    };

    React.useEffect(() => {
        setHistorys(list);
    }, [list]);

    const getTableData = (data) => {
        return (
            data &&
            data.map((item) => [
                <div className="d-flex justify-content-start align-items-start td-coin">
                    <img src={currencyItem && currencyItem.icon_url} alt="logo" className="small-coin-icon mr-8" />
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <h3 className="p-0 m-0 grey-text-accent text-ms font-bold">Amount</h3>
                        <h4 className="p-0 m-0 grey-text text-ms font-bold">
                            {item.amount} {item.currency.toUpperCase()}
                        </h4>
                    </div>
                </div>,
                <div className="td-id-status-type d-flex flex-column justify-content-start align-items-start">
                    <h3 className="p-0 m-0 grey-text-accent text-ms font-bold">ID</h3>
                    <h4 className="p-0 m-0 grey-text text-ms font-bold">{item.receiver_uid.slice(0, 5)}..</h4>
                </div>,
                <div className="td-id-status-type d-flex flex-column justify-content-start align-items-start">
                    <h3 className="p-0 m-0 grey-text-accent text-ms font-bold">Status</h3>
                    <h4 className="p-0 m-0 grey-text text-ms font-bold">
                        {item.status === 'completed' ? 'Completed' : item.status === 'pending' ? 'Pending' : 'Canceled'}
                    </h4>
                </div>,
                <div className="td-id-status-type d-flex flex-column justify-content-end align-items-end">
                    <h3 className="p-0 m-0 grey-text-accent text-ms font-bold">Type</h3>
                    <h4 className="p-0 m-0 grey-text text-ms font-bold">
                        {type === 'deposits' ? 'Deposit' : type === 'withdraws' ? 'Withdraw' : 'Internal Transfer'}
                    </h4>
                </div>,
            ])
        );
    };

    const renderModalFilter = () => (
        <React.Fragment>
            <div className="menu-container d-flex flex-column">
                <p>Side</p>
                <div className="d-flex justify-content-between align-items-center menu-option">
                    <button className="btn btn-option active">All</button>
                    <button className="btn btn-option">Received</button>
                    <button className="btn btn-option">Sent</button>
                </div>
            </div>
            <div className="menu-container d-flex flex-column">
                <p>Time</p>
                <div className="d-flex justify-content-between align-items-center menu-option">
                    <button className="btn btn-option active">All</button>
                    <button className="btn btn-option">Received</button>
                    <button className="btn btn-option">Sent</button>
                </div>
            </div>
            <div className="menu-container d-flex flex-column">
                <p>Side</p>
                <div className="d-flex flex-column justify-content-start align-items-center menu-option">
                    <button className="btn btn-type">All</button>
                    <button className="btn btn-type active">
                        Deposit
                        <img src="../../../../assets/icons/check-primary.svg" alt="selected" />
                    </button>
                    <button className="btn btn-type">Withdraw</button>
                    <button className="btn btn-type">Transfer</button>
                </div>
            </div>
        </React.Fragment>
    );

    const renderFilter = () => {
        return (
            <div className="detail-history-action-container d-flex justify-content-between align-items-center">
                <p className="p-0 m-0 title">Detail History</p>
                <div onClick={() => setShowModalFilter(true)}>
                    <FilterIcon className={''} />
                </div>
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="mobile-container wallet-detail dark-bg-main position-relative pg-mobile-wallet-detail">
                <div className="head-container position-relative mb-24">
                    <Link to={'/wallets'} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <p className="text-md font-extrabold grey-text-accent m-0 text-center">
                        {currencyItem && currencyItem.name}
                    </p>
                </div>

                <div className="detail-assets-container w-100 mb-4">
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-ms grey-text">Available</h3>
                            <h2 className="text-ms grey-text font-extrabold">0</h2>
                        </div>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-ms grey-text">Locked</h3>
                            <h2 className="text-ms grey-text font-extrabold">0</h2>
                        </div>

                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <h3 className="text-ms grey-text">Estimated IDR</h3>
                            <h2 className="text-ms grey-text font-extrabold">0</h2>
                        </div>
                    </div>
                </div>

                <div className="btn-action-container d-flex justify-content-between align-items-center pb-4">
                    <button
                        id="network-canvas"
                        type="button"
                        onClick={() => setShowNetwork(true)}
                        className="btn btn-primary btn-sm">
                        <DepositIcon className={''} />
                        Deposit
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <WithdrawlIcon className={''} />
                        Withdraw
                    </button>
                    <button className="btn btn-primary btn-sm">
                        <TransferIcon className={''} />
                        Transfer
                    </button>
                </div>

                <Tabs
                    id="controlled-tab-example"
                    defaultActiveKey="deposits"
                    activeKey={type}
                    onSelect={(e) => handleChangeType(e)}
                    className="tabs-history-detail d-flex justify-content-between">
                    <Tab eventKey="deposits" title="Deposit">
                        <div className="table-mobile-wrapper">
                            {renderFilter()}
                            {!historys[0] || historys === null ? (
                                <div className="empty-data d-flex flex-column align-items-center mb-5 w-100">
                                    <DocIcon className={''} />
                                    <h1>Empty Data You don’t have any transaction yet</h1>
                                </div>
                            ) : (
                                <Table data={getTableData(historys)} />
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="withdraws" title="Withdraw">
                        {renderFilter()}
                        {!historys[0] || historys === null ? (
                            <div className="empty-data d-flex flex-column align-items-center mb-5 w-100">
                                <DocIcon className={''} />
                                <h1>Empty Data You don’t have any transaction yet</h1>
                            </div>
                        ) : (
                            <Table data={getTableData(historys)} />
                        )}
                    </Tab>
                    <Tab eventKey="transfers" title="Internal Transfer">
                        {renderFilter()}
                        {!historys[0] || historys === null ? (
                            <div className="empty-data d-flex flex-column align-items-center mb-5 w-100">
                                <DocIcon className={''} />
                                <h1>Empty Data You don’t have any transaction yet</h1>
                            </div>
                        ) : (
                            <Table data={getTableData(historys)} />
                        )}
                    </Tab>
                </Tabs>

                <div id="off-canvas" className={`position-fixed off-canvas ${showNetwork ? 'show' : ''}`}>
                    <div className="fixed-bottom off-canvas-content-container overflow-auto">
                        <div className="d-flex justify-content-between align-items-center mb-12">
                            <h3 className="p-0 m-0 text-ms grey-text-accent">Select Network</h3>
                            <span onClick={() => setShowNetwork(false)} className="cursor-pointer">
                                <CircleCloseModalNetworkIcon />
                            </span>
                        </div>

                        <div className="d-flex justify-content-start align-items-start mb-24">
                            <span className="mr-8 curspr-pointer">
                                <InfoModalNetworkIcon />
                            </span>
                            <p className="m-0 p-0 grey-text text-xxs">
                                Ensure that the selected network is consistent with your method of withdrawal, Otherwise
                                you are at risk losing your assets,
                            </p>
                        </div>

                        {currencyItem &&
                            currencyItem.networks.map((item, i) => (
                                <div
                                    onClick={() =>
                                        handleSelectNetwork(item && item.blockchain_key, item && item.protocol)
                                    }
                                    key={i}
                                    className="cursor-pointer mb-8">
                                    <h3 className="p-0 m-0 text-ms grey-text-accent">{item && item.protocol}</h3>
                                    <p className="m-0 p-0 grey-text text-xxs">{item && item.blockchain_key}</p>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <ModalMobile content={renderModalFilter()} show={showModalFilter} />
        </React.Fragment>
    );
};

export { WalletDetailMobileScreen };
