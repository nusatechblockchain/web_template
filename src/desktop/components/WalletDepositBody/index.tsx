import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyInfo } from '../';
import { DepositCrypto } from '../DepositCrypto';
import { selectUserInfo } from '../../../modules/user/profile';
import {
    Currency,
    selectCurrencies,
    walletsAddressFetch
} from '../../../modules';

const WalletDepositBodyComponent = props => {
    const { wallet } = props;
    const intl = useIntl();
    const dispatch = useDispatch();
    const user = useSelector(selectUserInfo);
    const label = React.useMemo(() => intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.address' }), [intl]);

    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency | any = (currencies && currencies.find(item => item.id === wallet.currency)) || { min_confirmations: 6, deposit_enabled: false };
    const [blockchainNetwork, setBlockchainNetwork] = useState(null);
    if(!blockchainNetwork && currencyItem.networks && currencyItem.type !== 'fiat'){
        setBlockchainNetwork(currencyItem.networks[0].protocol)
    }
    const blockchain = blockchainNetwork && currencyItem.networks.find(n=> n.protocol === blockchainNetwork) || {blockchain_key: null}
    const blockchainKey = blockchain.blockchain_key

    const depositAddress = wallet && blockchainKey && wallet.deposit_addresses.find(w=>w.blockchain_key.toLowerCase() === blockchainKey.toLowerCase()) || null

    const handleGenerateAddress = useEffect(() => {
        if (!depositAddress && blockchainKey) {
            dispatch(walletsAddressFetch({ currency: wallet.currency, blockchain_key: blockchainKey }));
        }
    }, [wallet, walletsAddressFetch, blockchainKey]);

    const buttonLabel = `${intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.button.generate' })} ${wallet.currency.toUpperCase()} ${intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.button.address' })}`;
    const error = intl.formatMessage({id: 'page.body.wallets.tabs.deposit.ccy.message.pending'});
    const text = intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.submit' },
    { confirmations: currencyItem.min_confirmations });
    const handleOnCopy = () => ({});

    const minDepositAmount = blockchain.min_deposit_amount || "0"

    const renderDeposit = () => {
        return (
            <React.Fragment>
                <CurrencyInfo wallet={wallet}/>
                <h5>Network</h5>
                <div className="navbar navbar-expand-lg">
                    <div className="collapse navbar-collapse">
                        <ul className="navbar-nav">
                            {currencyItem.networks && currencyItem.networks.map((network)=>                                    
                                <li className={`nav-item ${blockchainNetwork === network.protocol ? 'active' : ''}`} key={network.blockchain_key} onClick={()=>setBlockchainNetwork(network.protocol)}>
                                    <div className="nav-link">{network.protocol}</div>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>

                <div className='border-top mt-4'>
                    <h3>Deposit</h3>
                    {depositAddress && (
                        <DepositCrypto
                            buttonLabel={buttonLabel}
                            copiableTextFieldText={`${wallet.currency.toUpperCase()} ${label}`}
                            copyButtonText={intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.button'} )}
                            error={error}
                            handleGenerateAddress={() => handleGenerateAddress}
                            handleOnCopy={handleOnCopy}
                            text={text}
                            wallet={wallet}
                            network={blockchainKey}
                            minDepositAmount={minDepositAmount}
                        />
                    )}
                </div>
            </React.Fragment>
        )
    };

    return (
        renderDeposit()
    );
};

const WalletDepositBody = React.memo(WalletDepositBodyComponent);

export {
    WalletDepositBody,
};
