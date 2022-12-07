import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { useWalletsFetch } from '../../../hooks';
import { selectWallets, Wallet } from '../../../modules/user/wallets';
import { WalletDepositBody, WalletHeader } from '../../components';
import { DEFAULT_WALLET } from '../../../constants';

const WalletDeposit: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    const { currency = '' } = useParams<{ currency?: string }>();
    const wallets = useSelector(selectWallets) || [];

    useWalletsFetch();

    const wallet: Wallet = wallets.find((item) => item.currency === currency) || DEFAULT_WALLET;

    return (
        <React.Fragment>
            <div className="pg-wallet-deposit-screen dark-bg-main no-sidebar">
                <WalletHeader currency={wallet.currency} name={wallet.name} />
                <WalletDepositBody wallet={wallet} />
            </div>
        </React.Fragment>
    );
};

export { WalletDeposit };
