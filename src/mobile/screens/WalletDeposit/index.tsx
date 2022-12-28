import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link, useHistory, useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { alertPush, Currency, selectCurrencies, walletsAddressFetch, selectWallets, Wallet } from '../../../modules';
import { useWalletsFetch, useDocumentTitle } from '../../../hooks';
import { QRCode, Decimal } from '../../../components';
import { DEFAULT_WALLET } from '../../../constants';

type LocationProps = {
    state: {
        blockchain_key: string;
        protocol: string;
    };
};

const WalletDepositMobileScreen: React.FC = () => {
    const { formatMessage } = useIntl();
    const history = useHistory();
    const dispatch = useDispatch();
    const location = (useLocation() as unknown) as LocationProps;

    const wallets = useSelector(selectWallets) || [];
    const { currency = '' } = useParams<{ currency?: string }>();
    const blockchain_key = location.state?.blockchain_key;
    const protocol = location.state?.protocol;

    useWalletsFetch();
    useDocumentTitle(`Deposit ${currency.toUpperCase()}`);

    const wallet: Wallet = wallets.find((item) => item.currency === currency) || DEFAULT_WALLET;
    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency | any = (currencies && currencies.find((item) => item.id === wallet.currency)) || {
        min_confirmations: 6,
        deposit_enabled: false,
    };

    const blockchain = (protocol &&
        currencyItem &&
        currencyItem.networks &&
        currencyItem.networks.find((n) => n.protocol === protocol)) || {
        blockchain_key: null,
    };

    const blockchainKey = blockchain && blockchain.blockchain_key;
    const minDepositAmount = (blockchain && blockchain.min_deposit_amount) || '0';

    const depositAddress =
        (wallet &&
            blockchainKey &&
            wallet.deposit_addresses.find((w) => w.blockchain_key.toLowerCase() === blockchainKey.toLowerCase())) ||
        null;

    const handleGenerateAddress = (e) => {
        e.preventDefault();
        if (
            depositAddress === null &&
            wallets.length &&
            wallet !== null &&
            wallet.type !== 'fiat' &&
            currencyItem?.networks &&
            blockchain?.status !== ' disabled'
        ) {
            dispatch(walletsAddressFetch({ currency, blockchain_key }));
        } else {
            console.log('haaai ini error');
        }
    };

    return (
        <React.Fragment>
            <div>
                <p>INI TEST BRO</p>
            </div>
        </React.Fragment>
    );
};

export { WalletDepositMobileScreen };
