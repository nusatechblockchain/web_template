import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from 'src/assets/images/ArrowLeftIcon';
import './WalletWithdrawal.pcss';
import { WalletWithdrawalForm, WalletWithdrawalInfo } from '../../containers';
import { ModalInternalTransfer, Modal } from '../../components';
import { Table } from '../../../components';

export const WalletWitdrawal: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    const { currency = '' } = useParams<{ currency?: string }>();
    const [showModalTransfer, setShowModalTransfer] = React.useState(false);

    const dataTable = [
        {
            date: '24 Oct 2022 - 14.44',
            transactionId: 'PX8RTQWVA....',
            amount: '0.5 BTC',
            type: 'Deposit',
            status: 'Pending',
            confirmation: '1/4',
        },
        {
            date: '24 Oct 2022 - 14.44',
            transactionId: 'PX8RTQWVA....',
            amount: '0.5 BTC',
            type: 'Deposit',
            status: 'Pending',
            confirmation: '1/4',
        },
    ];

    const getTableHeaders = () => {
        return ['Date', 'Transacsion ID', 'Amount', 'Type Transaction', 'Status', 'Confirmation'];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            item.date,
            item.transactionId,
            item.amount,
            item.type,
            item.status,
            item.confirmation,
        ]);
    };

    return (
        <React.Fragment>
            <div className="pg-wallet-withdraw-screen dark-bg-main">
                <div className="header-withdraw dark-bg-main d-flex justify-content-between py-4 px-24 mb-24">
                    <div className="mr-2">
                        <Link to="/wallets" className="white-text text-lg">
                            <ArrowLeftIcon className={''} />
                            Withdrawal Crypto
                        </Link>
                    </div>

                    <div className="ml-2">
                        <Link to={`/wallets/${currency}/deposit`}>
                            <button className="btn btn-secondary radius-sm m-1 text-sm font-bold">Deposit</button>
                        </Link>

                        <button
                            onClick={() => setShowModalTransfer(!showModalTransfer)}
                            className="btn btn-secondary radius-sm m-1 text-sm font-bold"
                            data-toggle="modal"
                            data-target="#transfer">
                            Transfer Internal
                        </button>
                    </div>
                </div>
                <div className="dark-bg-accent body-withdraw">
                    <div className="d-flex justify-content-between align-items-start mb-24 w-100 body-withdraw__content">
                        <div className="w-60">
                            <WalletWithdrawalForm />
                        </div>
                        <div className="w-30">
                            <WalletWithdrawalInfo />
                        </div>
                    </div>
                    <div className="table-container">
                        <h1 className="mb-24 text-lg white-text">Recent Withdraw</h1>
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </div>
                </div>
            </div>

            {showModalTransfer && <ModalInternalTransfer showModalTransfer={showModalTransfer} />}
        </React.Fragment>
    );
};
