import * as React from 'react';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { WithdrawlIcon, DepositIcon, TransferIcon } from '../../assets/Wallet';
import { SearchIcon } from '../../assets/Market';
import { Table } from '../../../components';
import { Link } from 'react-router-dom';

const WalletListMobileScreen: React.FC = () => {
    const wallets = [{ name: 'test' }, { name: 'test' }, { name: 'test' }, { name: 'test' }];

    const renderTableData = (data) => {
        return (
            data &&
            data.map((item) => [
                <div className="d-flex justify-content-start align-items-center td-coin">
                    <BtcIcon />
                    <div className="d-flex flex-column justify-content-start align-items-start">
                        <h3 className="p-0 m-0 text-one">Bitcoins</h3>
                        <h4 className="p-0 m-0 text-two">BTC</h4>
                    </div>
                </div>,
                <div className="td-available-order d-flex flex-column justify-content-start align-items-start">
                    <h3 className="p-0 m-0 text-one">Available</h3>
                    <h4 className="p-0 m-0 text-two">$ 129,900,20</h4>
                </div>,
                <div className="td-available-order d-flex flex-column justify-content-start align-items-start">
                    <h3 className="p-0 m-0 text-one">On Order</h3>
                    <h4 className="p-0 m-0 text-two">0,45 BTC</h4>
                </div>,
                <Link to={'/wallet/detail'} className="gradient-text text-xs font-semibold">
                    Detail
                </Link>,
            ])
        );
    };
    return (
        <React.Fragment>
            <div className="mobile-container wallet-list no-header dark-bg-main pt-4 ">
                <h1 className="w-100 heading-one mb-5">Balances</h1>
                <div className="estimate-container d-flex flex-column pl-3 w-100">
                    <div className="total-container w-50 d-flex flex-column">
                        <h3 className="text-md grey-text font-bold  mb-0">Estimated Total Balance</h3>
                        <div className="total-value d-flex justify-content-between align-items-center">
                            <h4 className="text-sm grey-text-accent font-bold">0BTC = $0.0000000</h4>
                        </div>
                    </div>
                    <div className="total-container w-50 d-flex flex-column">
                        <h3 className="text-md grey-text font-bold  mb-0">Estimated Total Available</h3>
                        <div className="total-value d-flex justify-content-between align-items-center">
                            <h4 className="text-sm grey-text-accent font-bold">0BTC = $0.0000000</h4>
                        </div>
                    </div>
                    <div className="action-container w-100 d-flex flex-wrap justify-content-center align-items-center">
                        <button className="btn btn-primary btn-sm">
                            <DepositIcon className={'mr-2'} />
                            Deposit
                        </button>
                        <button className="btn btn-primary btn-sm" data-toggle="modal" data-target="#modal-withdraw">
                            <WithdrawlIcon className={'mr-2'} />
                            Withdraw
                        </button>
                        <button className="btn btn-primary btn-sm">
                            <TransferIcon className={'mr-2'} />
                            Transfer
                        </button>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 mt-3 mb-16">
                    <div className="form-group form-check mb-0">
                        <input type="checkbox" className="form-check-input" id="hide-all" />
                        <label className="form-check-label text-sm font-semibold white-text" htmlFor="hide-all">
                            Hide All Pairs
                        </label>
                    </div>
                    <SearchIcon />
                </div>
                <Table data={renderTableData(wallets)} />
            </div>
        </React.Fragment>
    );
};

export { WalletListMobileScreen };
