import React from 'react';
import { useParams, useHistory, Link } from 'react-router-dom';
import { SearchIcon } from 'src/mobile/assets/SearchIcon';
import { TrashIconMobile } from 'src/mobile/assets/TrashIcon';
import { Table } from '../../../components';
import { useSelector, useDispatch } from 'react-redux';
import { useIntl } from 'react-intl';
import Select from 'react-select';
import { Button } from 'react-bootstrap';
import { CustomStylesSelect } from 'src/mobile/components';
import { CustomInput } from 'src/desktop/components';
import {
    selectCurrencies,
    Currency,
    createInternalTransfersFetch,
    selectInternalTransfersCreateSuccess,
    selectWallets,
    selectUserInfo,
} from '../../../modules';
import { CodeVerification } from 'src/desktop/components';
import { SwapIconMobile } from 'src/mobile/assets/Swap';
import { useWalletsFetch } from 'src/hooks';

const InternalTransferMobileScreen: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    const dispatch = useDispatch();
    const [amount, setAmount] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const { currency = '' } = useParams<{ currency?: string }>();

    const handleChangeAmount = (value) => {
        setAmount(value);
    };

    const handleChangeOtp = (value) => {
        setOtp(value);
    };

    const handleChangeUid = (value) => {
        setUid(value);
    };

    const disableButton = () => {
        if (amount === '' || uid === '' || otp === '' || otp.length < 6) {
            return true;
        }
    };

    const currencies: Currency[] = useSelector(selectCurrencies);

    const optionCurrency = currencies.map((item) => {
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

    return (
        <section className="internal-transfer-mobile-screen pb-5">
            <div className="container-fluid w-100 p-0 m-0 dark-bg-main">
                <div className="mb-4">
                    <Link to="/wallets">
                        <span className="text-white">Back</span>
                    </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center w-100 mb-24 transfer-head-container">
                    <h1 className="navbar-brand p-0 m-0">Internal Transfer</h1>
                </div>

                <form className="form-transfer">
                    <div className="mb-3 w-100">
                        <label className="mb-2">Select Coin</label>
                        <Select
                            value={optionCurrency.filter(function (option) {
                                return option.value === currency;
                            })}
                            styles={CustomStylesSelect}
                            options={optionCurrency}
                        />
                    </div>

                    <div className="transfer-information mb-3">
                        <div className="transfer-shipper">
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="basic-addon1">
                                        From : Main Account
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="transfer-value">
                            <div className="mb-3">
                                <CustomInput
                                    type="text"
                                    label={'Input Ammount to send'}
                                    placeholder={'0.0000000000'}
                                    defaultLabel={'Input Ammount to send'}
                                    handleChangeInput={handleChangeAmount}
                                    inputValue={amount}
                                    classNameLabel="text-ms white-text mb-8"
                                    classNameInput={`dark-bg-accent`}
                                    autoFocus={false}
                                    labelVisible
                                />
                            </div>
                        </div>
                    </div>

                    <div className="w-100 text-center mb-1">
                        <SwapIconMobile />
                    </div>

                    <div className="transfer-information mb-3">
                        <div className="transfer-shipper">
                            <div className="mb-3">
                                <CustomInput
                                    type="text"
                                    label={'Enter UID'}
                                    placeholder={'Enter UID'}
                                    defaultLabel={'Input Ammount to send'}
                                    handleChangeInput={handleChangeUid}
                                    inputValue={uid}
                                    classNameLabel="text-ms white-text mb-8"
                                    classNameInput={`dark-bg-accent`}
                                    autoFocus={false}
                                    labelVisible
                                />
                            </div>
                        </div>
                        <div className="transfer-value">
                            <div className="mb-3">
                                <label>Received</label>
                                <span>00.00 USD</span>
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label>Two-factor Authentications Code</label>

                        <CodeVerification
                            code={otp}
                            onChange={() => {}}
                            onSubmit={() => {}}
                            codeLength={6}
                            type="text"
                            placeholder="______"
                            inputMode="decimal"
                            showPaste2FA={false}
                        />
                    </div>

                    <Button block size="lg" variant="primary">
                        Continue
                    </Button>
                </form>
            </div>
        </section>
    );
};

export { InternalTransferMobileScreen };
