import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './WalletWithdrawalForm.pcss';
import { CustomInput, Modal, ModalAddBeneficiary, ModalBeneficiaryList } from '../../components';
import {
    selectCurrencies,
    selectBeneficiaries,
    Beneficiary,
    Currency,
    selectBeneficiariesCreateError,
    selectBeneficiariesActivateError,
    selectBeneficiariesCreate,
    beneficiariesResendPin,
    beneficiariesActivate,
    selectUserInfo,
    selectBeneficiariesFetchError,
    selectWithdrawLimitError,
} from '../../../modules';
import { GLOBAL_PLATFORM_CURRENCY, DEFAULT_FIAT_PRECISION } from '../../../constants';
import { Decimal, Tooltip } from '../../../components';
import { CirclePlusIcon } from '../../../assets/images/CirclePlusIcon';
import { useBeneficiariesFetch, useWithdrawLimits, useReduxSelector, useWalletsFetch } from '../../../hooks';
import { walletsWithdrawCcyFetch, selectWithdrawSuccess, selectWallets } from '../../../modules';
import PinInput from 'react-pin-input';
import { CircleCloseIcon } from 'src/assets/images/CircleCloseIcon';
import moment from 'moment';
import { CircleCloseDangerLargeIcon } from '../../../assets/images/CircleCloseIcon';

export const WalletWithdrawalForm: React.FC = () => {
    useBeneficiariesFetch();
    useWithdrawLimits();
    useWalletsFetch();
    const intl = useIntl();
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModalWithdrawalConfirmation, setShowModalWithdrawalConfirmation] = React.useState(false);
    const [showModalWithdrawalSuccessfully, setShowModalWithdrawalSuccessfully] = React.useState(false);
    const [showModalAddBeneficiary, setShowModalModalAddBeneficiary] = React.useState(false);
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(false);
    const [showModalBeneficiaryCode, setShowModalBeneficiaryCode] = React.useState(false);
    const [showModalOtp, setShowModalOtp] = React.useState(false);
    const [showModalLocked, setShowModalLocked] = React.useState(false);

    const [amount, setAmount] = React.useState('');
    const [beneficiaryId, setBeneficiaryId] = React.useState(0);
    const [blockchainKey, setBlockchainKey] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [beneficiaryActivateId, setBeneficiaryActivateId] = React.useState(0);
    const [otp, setOtp] = React.useState('');
    const { currency = '' } = useParams<{ currency?: string }>();
    const [beneficiaryCode, setBeneficiaryCode] = React.useState('');
    const [currencyId, setCurrencyId] = React.useState('');

    const withdrawSuccess = useSelector(selectWithdrawSuccess);
    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);
    const beneficiariesCreate = useSelector(selectBeneficiariesCreate);
    const beneficiariesError = useSelector(selectBeneficiariesCreateError);
    const beneficiariesActivateError = useSelector(selectBeneficiariesActivateError);
    const beneficiaryPermited = useSelector(selectBeneficiariesFetchError);
    const withdrawPermited = useSelector(selectWithdrawLimitError);
    const currencies: Currency[] = useSelector(selectCurrencies);
    const wallets = useSelector(selectWallets);
    const user = useSelector(selectUserInfo);

    const beneficiariesList = beneficiaries.filter((item) => item.currency === currency);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);
    const wallet = wallets.find((item) => item.currency === currency);

    const [seconds, setSeconds] = React.useState(30000);
    const [timerActive, setTimerActive] = React.useState(false);

    React.useEffect(() => {
        let timer = null;
        if (timerActive) {
            timer = setInterval(() => {
                setSeconds((seconds) => seconds - 1000);

                if (seconds === 0) {
                    setTimerActive(false);
                    setSeconds(0);
                }
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    });

    React.useEffect(() => {
        if (beneficiariesError != undefined) {
            setShowModalBeneficiaryCode(false);
            setShowModalModalAddBeneficiary(true);
        }
    }, [beneficiariesError]);

    React.useEffect(() => {
        if (beneficiaryPermited || withdrawPermited) {
            setShowModalLocked(true);
        }
    });

    const blockchainKeyValue =
        currencyItem && currencyItem.networks.find((item) => item.blockchain_key === blockchainKey);
    const fee = blockchainKeyValue && blockchainKeyValue.withdraw_fee;
    const minWithdraw = blockchainKeyValue && blockchainKeyValue.min_withdraw_amount;
    const withdrawRecive = Number(amount) - Number(fee);

    const handleChangeBeneficiaryId = (id: number, address: string, blockchainKey: string, currency_id: string) => {
        setBeneficiaryId(id);
        setAddress(address);
        setBlockchainKey(blockchainKey);
        setShowModalBeneficiaryList(false);
        setCurrencyId(currency_id);
    };

    const handleChangeAmount = (e) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setAmount(value);
    };

    const handleChangeOtp = (value: string) => {
        setOtp(value);
    };

    const handleSubmitWithdraw = () => {
        dispatch(walletsWithdrawCcyFetch({ amount, beneficiary_id: beneficiaryId.toString(), currency, otp }));
    };

    const handleResendCode = () => {
        if (beneficiaryActivateId) {
            dispatch(beneficiariesResendPin({ id: beneficiaryActivateId }));
        } else {
            dispatch(beneficiariesResendPin({ id: beneficiariesCreate.id }));
        }
        setSeconds(30000);
        setTimerActive(true);
    };

    const handlePendingStatus = (id: number) => {
        dispatch(beneficiariesResendPin({ id: id }));
        setShowModalBeneficiaryList(false);
        setShowModalBeneficiaryCode(true);
        setBeneficiaryActivateId(id);
        setSeconds(30000);
        setTimerActive(true);
    };

    const handleActivateBeneficiary = () => {
        if (beneficiaryActivateId) {
            const payload = {
                id: beneficiaryActivateId,
                pin: beneficiaryCode,
            };
            dispatch(beneficiariesActivate(payload));
            setBeneficiaryActivateId(0);
        } else {
            const payload = {
                id: beneficiariesCreate.id,
                pin: beneficiaryCode,
            };
            dispatch(beneficiariesActivate(payload));
        }

        if (!beneficiariesActivateError) {
            setShowModalBeneficiaryCode(false);
            setShowModalBeneficiaryList(true);
        }
    };

    const handleWithdraw = () => {
        if (user.labels[0].key == 'document' && user.labels[0].value == 'verified') {
            setShowModalOtp(!showModalOtp);
        } else {
            setShowModalLocked(true);
        }
    };

    React.useEffect(() => {
        if (withdrawSuccess) {
            setShowModalWithdrawalConfirmation(!showModalWithdrawalConfirmation);
            setShowModalWithdrawalSuccessfully(!showModalWithdrawalSuccessfully);
        }
    }, [withdrawSuccess]);

    const renderHeaderModalWithdrawalConfirmation = () => {
        return (
            <React.Fragment>
                <h6 className="text-md white-text font-semibold mb-0">Withdraw Confirmation</h6>
            </React.Fragment>
        );
    };

    const renderContentModalWithdrawalConfirmation = () => {
        return (
            <React.Fragment>
                <div className="mb-24 white-text text-ms bg-warning radius-sm p-10 w-100">
                    Please check the target address carefully before confirming the withdrawal.
                </div>
                <p className="text-ms grey-text-accent font-semibold mb-24">
                    You've requested to withdraw {amount} {currency.toUpperCase()}, Are you sure to do Withdraw?
                </p>
                <div className="d-flex">
                    <button
                        className="btn btn-danger sm px-5 mr-3"
                        onClick={() => setShowModalWithdrawalConfirmation(!showModalWithdrawalConfirmation)}>
                        Cancel
                    </button>
                    <button className="btn btn-success sm px-5" onClick={handleSubmitWithdraw}>
                        Withdraw
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const renderHeaderModalWithdrawalSuccessfully = () => {
        return (
            <React.Fragment>
                <h6 className="text-md white-text font-semibold m-0">Withdrawal has Successfully</h6>
            </React.Fragment>
        );
    };

    const renderContentModalWithdrawalSuccessfully = () => {
        return (
            <React.Fragment>
                <p className="text-ms grey-text-accent font-semibold mb-24">
                    You success to withdraw {amount} {currency.toUpperCase}
                </p>
                <div className="d-flex">
                    <button
                        className="btn btn-danger sm px-5 mr-3"
                        onClick={() => setShowModalWithdrawalSuccessfully(!showModalWithdrawalSuccessfully)}>
                        Close
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const renderHeaderModalOtp = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">2FA Code</h6>
            </React.Fragment>
        );
    };

    const renderContentModalOtp = () => {
        return (
            <React.Fragment>
                <div className="form min-w-400">
                    <div className="form-group mb-24">
                        <CustomInput
                            defaultLabel=""
                            inputValue={otp}
                            label=""
                            placeholder="______"
                            type="text"
                            labelVisible={false}
                            classNameInput="text-center spacing-10"
                            classNameLabel="hidden"
                            handleChangeInput={handleChangeOtp}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        data-dismiss="modal"
                        disabled={otp.length < 6 ? true : false}
                        onClick={() => {
                            setShowModalWithdrawalConfirmation(!showModalWithdrawalConfirmation);
                            setShowModalOtp(!showModalOtp);
                        }}>
                        Send
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const handleChangeBeneficiaryCode = (value) => {
        setBeneficiaryCode(value);
    };

    const renderHeaderModalBeneficiaryCode = () => {
        return (
            <React.Fragment>
                <h3 className="text-md white-text font-bold text-center mx-auto"> Confirmation New Address</h3>
                <span
                    onClick={() => {
                        setShowModalBeneficiaryCode(false);
                        setBeneficiaryCode('');
                    }}
                    className="cursor-pointer">
                    <CircleCloseIcon />
                </span>
            </React.Fragment>
        );
    };

    const renderModalBeneficiaryCode = () => {
        return (
            <React.Fragment>
                <div className="form min-w-400">
                    <p className="mb-3 text-sm grey-text text-center">
                        We have sent you an email containing a confirmation code pin, please enter it below to save the
                        new address:
                    </p>
                    <div className="form-group mb-24">
                        <PinInput
                            length={6}
                            onChange={handleChangeBeneficiaryCode}
                            onComplete={handleChangeBeneficiaryCode}
                            type="numeric"
                            inputMode="number"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                            inputStyle={{
                                background: 'var(-body-background-color)',
                                borderRadius: '4px',
                                fontSize: '20px',
                            }}
                            inputFocusStyle={{ fontSize: '20px' }}
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        data-dismiss="modal"
                        disabled={beneficiaryCode.length < 6 ? true : false}
                        onClick={() => handleActivateBeneficiary()}>
                        Confirm
                    </button>
                    <p
                        className={`text-right text-xs  mt-2 ${
                            timerActive ? 'grey-text' : 'grey-text-accent cursor-pointer'
                        }`}
                        onClick={!timerActive && handleResendCode}>
                        {moment(seconds).format('mm:ss')} Resend Code
                    </p>
                </div>
            </React.Fragment>
        );
    };

    const renderHeaderModalLocked = () => {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-center align-items-center w-100">
                    <CircleCloseDangerLargeIcon />
                </div>
            </React.Fragment>
        );
    };

    const renderContentModalLocked = () => {
        return (
            <React.Fragment>
                <h1 className="white-text text-lg mb-24 text-center ">Withdraw Locked</h1>
                <p className="grey-text text-ms font-extrabold mb-24 text-center">
                    For withdraw you must verified your document first
                </p>
                <div className="d-flex justify-content-center align-items-center w-100 mb-0">
                    <Link to={`/profile/kyc`}>
                        <button type="button" className="btn btn-primary sm px-5 mr-3">
                            Verify Document
                        </button>
                    </Link>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Coin Asset</p>
                    <div className="w-70 d-flex align-items-center coin-selected">
                        <img src={currencyItem && currencyItem.icon_url} alt="icon" className="mr-12 small-coin-icon" />
                        <div>
                            <p className="m-0 text-sm grey-text-accent">
                                {currencyItem && currencyItem.id.toUpperCase()}
                            </p>
                            <p className="m-0 text-xs grey-text-accent">{currencyItem && currencyItem.name}</p>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Select Address</p>
                    <div className="w-70 position-relative input-add-address">
                        <div
                            onClick={() => {
                                beneficiariesList && beneficiariesList.length >= 1
                                    ? setShowModalBeneficiaryList(true)
                                    : setShowModalModalAddBeneficiary(true);
                            }}>
                            <CustomInput
                                type="text"
                                isDisabled={true}
                                label={intl.formatMessage({
                                    id: 'page.body.profile.header.account.content.password.new',
                                })}
                                placeholder={address ? address : 'Select'}
                                defaultLabel="New password"
                                inputValue={''}
                                classNameLabel="d-none"
                                classNameInput={`cursor-pointer dark-bg-accent`}
                                autoFocus={false}
                                labelVisible={false}
                            />
                        </div>
                        <span
                            onClick={() => setShowModalModalAddBeneficiary(true)}
                            className="position-absolute cursor-pointer">
                            <CirclePlusIcon />
                        </span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Add Amount</p>
                    <div className="w-70">
                        <CustomInput
                            type="text"
                            label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                            placeholder={'Add Amount'}
                            defaultLabel=""
                            handleChangeInput={handleChangeAmount}
                            inputValue={amount}
                            classNameLabel="d-none"
                            classNameInput={`dark-bg-accent`}
                            autoFocus={false}
                            labelVisible={false}
                        />
                    </div>
                </div>
                <p className="text-sm grey-text-accent ">
                    Amount available for withdrawal ≤ Account available assets - Unconfirmed digital assets.
                </p>
                <div className="d-flex justify-content-between mb-12">
                    <p className="mb-0 text-ms grey-text-accent">Your Balance</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">
                        {wallet?.balance} {currency.toUpperCase()}
                    </p>
                </div>
                <div className="d-flex justify-content-between mb-12">
                    <p className="mb-0 text-ms grey-text-accent">Min Withdraw </p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">$ {minWithdraw ? minWithdraw : '0'}</p>
                </div>
                <div className="d-flex justify-content-between mb-12">
                    <p className="mb-0 text-ms grey-text-accent">Fee</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">$ {fee !== undefined ? fee : '0'}</p>
                </div>
                <div className="d-flex justify-content-between mb-24">
                    <p className="mb-0 text-ms grey-text-accent">You will Recive </p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">
                        <Decimal fixed={currencyItem?.precision} thousSep=",">
                            {amount !== '' ? withdrawRecive : '0'}
                        </Decimal>{' '}
                        {currency.toUpperCase()}
                    </p>
                </div>
                <button
                    type="button"
                    disabled={
                        !currency
                            ? true
                            : !amount
                            ? true
                            : !beneficiaryId
                            ? true
                            : !address
                            ? true
                            : withdrawRecive < 1
                            ? true
                            : false
                    }
                    onClick={handleWithdraw}
                    className="btn btn-primary btn-block">
                    Withdraw
                </button>
            </div>

            {showModalOtp && (
                <Modal show={showModalOtp} header={renderHeaderModalOtp()} content={renderContentModalOtp()} />
            )}

            {showModalWithdrawalConfirmation && (
                <Modal
                    show={showModalWithdrawalConfirmation}
                    header={renderHeaderModalWithdrawalConfirmation()}
                    content={renderContentModalWithdrawalConfirmation()}
                />
            )}

            {showModalWithdrawalSuccessfully && (
                <Modal
                    show={showModalWithdrawalSuccessfully}
                    header={renderHeaderModalWithdrawalSuccessfully()}
                    content={renderContentModalWithdrawalSuccessfully()}
                />
            )}

            {showModalBeneficiaryList && (
                <ModalBeneficiaryList
                    blockchainKey={''}
                    showModalBeneficiaryList={showModalBeneficiaryList}
                    onCloseList={() => setShowModalBeneficiaryList(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                    onCloseAdd={() => setShowModalModalAddBeneficiary(false)}
                    handleAddAddress={() => {
                        setShowModalBeneficiaryList(false);
                        setShowModalModalAddBeneficiary(true);
                    }}
                    handlePendingStatus={(id) => handlePendingStatus(id)}
                    handleChangeBeneficiaryId={handleChangeBeneficiaryId}
                    handleDelete={() => setAddress('')}
                />
            )}

            {showModalAddBeneficiary && (
                <ModalAddBeneficiary
                    showModalBeneficiaryList={showModalBeneficiaryList}
                    onCloseList={() => setShowModalBeneficiaryList(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                    onCloseAdd={() => setShowModalModalAddBeneficiary(false)}
                    handleAddAddress={() => {
                        setShowModalBeneficiaryCode(true);
                        setShowModalModalAddBeneficiary(false);
                        setBeneficiaryCode('');
                        setTimerActive(true);
                    }}
                    currency_id={currencyId}
                />
            )}

            <Modal
                content={renderModalBeneficiaryCode()}
                header={renderHeaderModalBeneficiaryCode()}
                show={showModalBeneficiaryCode}
            />

            <Modal show={showModalLocked} header={renderHeaderModalLocked()} content={renderContentModalLocked()} />
        </React.Fragment>
    );
};
