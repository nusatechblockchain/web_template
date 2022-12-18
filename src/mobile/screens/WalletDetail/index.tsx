import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../assets/Arrow';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { WithdrawlIcon, DepositIcon, TransferIcon, FilterIcon, DocIcon } from '../../assets/Wallet';
import { Table } from '../../../components';
import { ModalMobile } from '../../components';

const WalletDetailMobileScreen: React.FC = () => {
    const [showModalFilter, setShowModalFilter] = React.useState(false);
    const wallets = [];

    const renderTableData = (data) => {
        return (
            data &&
            data.map((item) => [
                <p className="grey-tex text-sm mb-0">Data</p>,
                <p className="grey-tex text-sm mb-0">Data</p>,
                <p className="grey-tex text-sm mb-0">Data</p>,
                <p className="grey-tex text-sm mb-0">Data</p>,
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
    return (
        <React.Fragment>
            <div className="mobile-container wallet-detail dark-bg-main">
                <div className="head-container position-relative mb-36">
                    <Link to={''} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                </div>
                <div className="detail-title-coin align-items-center">
                    <BtcIcon />
                    <h3 className="mb-0">
                        Bitcoins <span>BTC</span>
                    </h3>
                </div>
                <div className="detail-assets-container w-100 mb-4">
                    <div className="total-assets w-100">
                        <h3 className="title">Total Assets</h3>
                        <h2 className="value">0.00</h2>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="other-assets w-50">
                            <h3 className="title">Available</h3>
                            <h2 className="value">0.00</h2>
                        </div>
                        <div className="other-assets w-50 ">
                            <h3 className="title">In Order</h3>
                            <h2 className="value">0.00</h2>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                        <div className="other-assets w-50">
                            <h3 className="title">Locked</h3>
                            <h2 className="value">0.00</h2>
                        </div>
                        <div className="other-assets w-50 ">
                            <h3 className="title">Estimation</h3>
                            <h2 className="value">_ _</h2>
                        </div>
                    </div>
                </div>
                <div className="detail-history-action-container d-flex justify-content-between align-items-center">
                    <p className="p-0 m-0 title">Detail History</p>
                    <div onClick={() => setShowModalFilter(true)}>
                        <FilterIcon className={''} />
                    </div>
                </div>
                {wallets.length == 0 || wallets == null ? (
                    <div className="empty-data d-flex flex-column align-items-center mb-5 w-100">
                        <DocIcon className={''} />
                        <h1>Empty Data You don’t have any transaction yet</h1>
                    </div>
                ) : (
                    <div className="mb-4">
                        <Table data={renderTableData(wallets)} />
                    </div>
                )}

                <div className="btn-action-container d-flex justify-content-between align-items-center pb-4">
                    <button className="btn btn-primary btn-sm">
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
            </div>

            <ModalMobile content={renderModalFilter()} show={showModalFilter} />
        </React.Fragment>
    );
};

export { WalletDetailMobileScreen };
