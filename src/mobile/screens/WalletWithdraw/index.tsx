import * as React from 'react';
import { useIntl } from 'react-intl';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CustomInput } from 'src/desktop/components';
import moment from 'moment';
import {
    selectCurrencies,
    Currency,
    selectBeneficiaries,
    Beneficiary,
    beneficiariesActivate,
    selectBeneficiariesCreate,
    selectBeneficiariesCreateError,
} from '../../../modules';
import { beneficiariesResendPin } from '../../../modules';
import { useBeneficiariesFetch, useWithdrawLimits } from '../../../hooks';
import { walletsWithdrawCcyFetch } from '../../../modules';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { CirclePlusIcon } from 'src/assets/images/CirclePlusIcon';
import { ModalAddBeneficiaryMobile } from 'src/mobile/components';
import { ModalBeneficiaryListMobile } from 'src/mobile/components/ModalBeneficiaryListMobile';
import { Modal } from 'react-bootstrap';
import PinInput from 'react-pin-input';
import { KeyConfirmation } from 'src/mobile/assets/KeyConfirmation';
import { selectWallets } from '../../../modules';
import { useHistory } from 'react-router-dom';

export const WalletWithdrawMobileScreen: React.FC = () => {
    useBeneficiariesFetch();
    useWithdrawLimits();
    const intl = useIntl();
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const history = useHistory();
    const TIME_RESEND = 30000;

    const [amount, setAmount] = React.useState('');
    const [beneficiaryId, setBeneficiaryId] = React.useState(0);
    const [blockchainKey, setBlockchainKey] = React.useState('');
    const [showModalAddBeneficiary, setShowModalModalAddBeneficiary] = React.useState(false);
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(false);
    const [showModalConfirmation, setShowModalConfirmation] = React.useState(false);
    const [showModalConfirmationBeneficiary, setShowModalConfirmationBeneficiary] = React.useState(false);
    const [seconds, setSeconds] = React.useState(TIME_RESEND);
    const beneficiariesError = useSelector(selectBeneficiariesCreateError);
    const [timerActive, setTimerActive] = React.useState(false);

    const [beneficiaryActivateId, setBeneficiaryActivateId] = React.useState(0);
    const [beneficiaryCode, setBeneficiaryCode] = React.useState('');

    const [address, setAddress] = React.useState('');
    const [otp, setOtp] = React.useState('');

    const { currency = '' } = useParams<{ currency?: string }>();

    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);
    const beneficiariesCreate = useSelector(selectBeneficiariesCreate);
    const beneficiariesList = beneficiaries.filter((item) => item.currency === currency);
    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);
    const wallets = useSelector(selectWallets);
    const wallet = wallets.find((item) => item.currency === currency);

    const blockchainKeyValue =
        currencyItem && currencyItem.networks.find((item) => item.blockchain_key === blockchainKey);
    const fee = blockchainKeyValue && blockchainKeyValue.withdraw_fee;

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
    const handleChangeBeneficiaryId = (id: number, address: string, blockchainKey: string) => {
        setBeneficiaryId(id);
        setAddress(address);
        setBlockchainKey(blockchainKey);
        setShowModalBeneficiaryList(false);
    };

    React.useEffect(() => {
        if (beneficiariesError != undefined) {
            setShowModalConfirmationBeneficiary(false);
            setShowModalModalAddBeneficiary(true);
        }
    }, [beneficiariesError]);

    const handleChangeAmount = (e) => {
        const value = e.replace(/[^0-9\.]/g, '');
        setAmount(value);
    };

    const handleResendCode = () => {
        if (beneficiaryActivateId) {
            dispatch(beneficiariesResendPin({ id: beneficiaryActivateId }));
        } else {
            dispatch(beneficiariesResendPin({ id: beneficiariesCreate.id }));
        }
        setSeconds(TIME_RESEND);
        setTimerActive(true);
    };

    const handlePendingStatus = (id: number) => {
        dispatch(beneficiariesResendPin({ id: id }));
        setShowModalBeneficiaryList(false);
        setShowModalConfirmationBeneficiary(true);
        setBeneficiaryActivateId(id);
        setSeconds(TIME_RESEND);
        setTimerActive(true);
    };

    const handleChangeOtp = (value: string) => {
        setOtp(value);
    };

    const handleChangeBeneficiaryCode = (value) => {
        setBeneficiaryCode(value);
    };

    const handleSubmitWithdraw = async () => {
        dispatch(walletsWithdrawCcyFetch({ amount, beneficiary_id: beneficiaryId.toString(), currency, otp }));
        setShowModalConfirmation(false);
        history.push('/history-transaction');
    };

    const isValidForm = () => {
        if (beneficiaryCode.length < 6) {
            return true;
        }
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

        if (!beneficiariesError) {
            setShowModalConfirmationBeneficiary(false);
            setShowModalBeneficiaryList(true);
        }
    };

    const disabledButton = () => {
        if (currency === '' || amount === '' || otp === '' || beneficiaryId === 0 || address === '') {
            return true;
        }
    };

    return (
        <>
            {/* ======== Process  Withdraw Section ========= */}
            <section className="withdraw-mobile-screen pb-5 dark-bg-main">
                <div className="container-fluid w-100 h-100">
                    <div className="header-link">
                        <Link to="/wallets">
                            <ArrowLeft className="white-text" />
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2 transfer-head-container">
                        <h1 className="navbar-brand p-0 m-0 white-text">
                            {formatMessage({ id: 'page.mobile.withdraw.header' })}
                        </h1>
                    </div>

                    <form className="form-withdraw pb-4">
                        {/* ====== Coin Informartion ===== */}
                        <div className="d-flex flex-column justify-content-between align-items-start">
                            <p className="text-sm white-text mb-1">
                                {formatMessage({ id: 'page.mobile.historyTransaction.internalTransfer.header.coins' })}
                            </p>
                            <div className="w-100 d-flex align-items-center coin-selected">
                                <img
                                    src={currencyItem && currencyItem.icon_url}
                                    alt="icon"
                                    className="mr-12 small-coin-icon"
                                />
                                <div>
                                    <p className="m-0 text-sm grey-text-accent">
                                        {currencyItem && currencyItem.id.toUpperCase()}
                                    </p>
                                    <p className="m-0 text-xs grey-text-accent">{currencyItem && currencyItem.name}</p>
                                </div>
                            </div>
                        </div>

                        {/* ====== Input withdraw ====== */}

                        <div className="withdraw-information">
                            <div className="align-items-start select-container">
                                <label className="text-sm mt-3 white-text">
                                    {formatMessage({ id: 'page.mobile.withdraw.addressLabel' })}
                                </label>
                                <div className="position-relative input-add-address">
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
                                            placeholder={
                                                address
                                                    ? address
                                                    : `${formatMessage({
                                                          id: 'page.mobile.withdraw.addressPlaceholder',
                                                      })}`
                                            }
                                            defaultLabel="Select Address"
                                            inputValue={''}
                                            classNameLabel="d-none"
                                            classNameInput={`cursor-pointer dark-bg-accent`}
                                            autoFocus={false}
                                            labelVisible={false}
                                        />
                                    </div>
                                    <span
                                        onClick={() => setShowModalModalAddBeneficiary(!showModalAddBeneficiary)}
                                        className="position-absolute mt-1 cursor-pointer">
                                        <CirclePlusIcon />
                                    </span>
                                </div>
                            </div>

                            <div className="align-items-start">
                                <label className="text-sm white-text">
                                    {formatMessage({
                                        id: 'page.mobile.withdraw.amountLabel',
                                    })}
                                </label>
                                <div className="input-amount">
                                    <div>
                                        <CustomInput
                                            type="text"
                                            label={''}
                                            placeholder={'0.00'}
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
                            </div>

                            <div className="align-items-start">
                                <label className="text-sm white-text">
                                    {formatMessage({
                                        id: 'page.mobile.withdraw.2FALabel',
                                    })}
                                </label>
                                <div className="input-amount">
                                    <div>
                                        <CustomInput
                                            type="text"
                                            label=""
                                            placeholder={`${formatMessage({
                                                id: 'page.mobile.withdraw.2FAPlaceholder',
                                            })}`}
                                            defaultLabel=""
                                            handleChangeInput={handleChangeOtp}
                                            inputValue={otp}
                                            classNameLabel="d-none"
                                            classNameInput={`dark-bg-accent`}
                                            autoFocus={false}
                                            labelVisible={false}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="my-3">
                            <p className="grey-text-accent">
                                <small>
                                    {formatMessage({
                                        id: 'page.mobile.withdraw.infoAmount',
                                    })}
                                </small>
                            </p>
                            <div className="my-3">
                                <p className="mb-0 text-sm grey-text-accent">
                                    {formatMessage({
                                        id: 'page.mobile.withdraw.fee',
                                    })}
                                </p>
                                <p className="mb-0  text-base grey-text-accent font-bold">
                                    $ {fee !== undefined ? fee : '0'}
                                </p>
                            </div>
                            { wallet !== undefined &&                            
                            <div className="my-3">
                                <p className='mb-0 text-sm grey-text-accent'>
                                Balance
                                </p>
                                <p className='mb-0 text-base grey-text-accent font-bold'>
                                    {wallet.balance} {currency.toUpperCase()}
                                </p>
                            </div>}
                            <div className="">
                                <p className="mb-0 text-sm grey-text-accent">
                                    {formatMessage({
                                        id: 'page.mobile.withdraw.totalAmount',
                                    })}
                                </p>
                                <p className="mb-0 text-base grey-text-accent font-bold">
                                    {amount !== '' ? amount : '0'} {currency.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowModalConfirmation(!showModalConfirmation)}
                            type="button"
                            disabled={disabledButton()}
                            className="btn btn-primary btn-block mb-3">
                            {formatMessage({
                                id: 'page.mobile.withdraw.title',
                            })}
                        </button>
                    </form>
                </div>
            </section>

            {/* ========== Modal for Add Beneficiary Address ========== */}

            {showModalAddBeneficiary && (
                <ModalAddBeneficiaryMobile
                    onCloseList={() => setShowModalBeneficiaryList(false)}
                    onCloseAdd={() => setShowModalModalAddBeneficiary(false)}
                    handleAddAddress={() => {
                        setShowModalModalAddBeneficiary(false);
                        setShowModalConfirmationBeneficiary(true);
                        setBeneficiaryCode('');
                        setTimerActive(true);
                    }}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                />
            )}

            {/* =========== Modal if user have Beneficiary Address list ====== */}

            {showModalBeneficiaryList && (
                <ModalBeneficiaryListMobile
                    blockchainKey={''}
                    showModalBeneficiaryList={showModalBeneficiaryList}
                    onCloseList={() => setShowModalBeneficiaryList(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                    onCloseAdd={() => setShowModalModalAddBeneficiary(false)}
                    handleAddAddress={() => {
                        setShowModalModalAddBeneficiary(true);
                        setShowModalBeneficiaryList(false);
                    }}
                    handlePendingStatus={(id) => handlePendingStatus(id)}
                    handleChangeBeneficiaryId={handleChangeBeneficiaryId}
                    handleDelete={() => setAddress('')}
                />
            )}

            {/* ========= Modal for confirmation withdraw ========== */}
            {showModalConfirmation && (
                <Modal dialogClassName="modal-confirmation-withdraw" show={showModalConfirmation}>
                    <section className="container p-3 dark-bg-main">
                        <div className="text-left">
                            <h6 className="mb-3 white-text text-lg">
                                {formatMessage({
                                    id: 'page.mobile.withdraw.modal.confirm.title',
                                })}
                            </h6>
                            <p className="white-text">
                                {formatMessage({
                                    id: 'page.mobile.withdraw.modal.info1',
                                })}{' '}
                                <span>
                                    {' '}
                                    {amount !== '' ? amount : '0'} {currency.toUpperCase()}{' '}
                                </span>{' '}
                                {formatMessage({
                                    id: 'page.mobile.withdraw.modal.info2',
                                })}
                            </p>
                        </div>
                        <div className="alert-mobile-warning px-2 py-3 alert d-flex align-items-center justify-content-between show text-xs warning-text font-normal position-relative mb-24">
                            <span className="text-sm warning-text font-normal">
                                {formatMessage({
                                    id: 'page.mobile.withdraw.modal.alert',
                                })}
                            </span>
                        </div>
                        <div className="mb-0">
                            <button onClick={handleSubmitWithdraw} type="button" className="btn btn-primary btn-block">
                                {formatMessage({
                                    id: 'page.mobile.withdraw.title',
                                })}
                            </button>

                            <div className="mt-3" onClick={() => setShowModalConfirmation(!showModalConfirmation)}>
                                <button type="button" className="btn btn-outline-danger btn-block">
                                    {formatMessage({
                                        id: 'page.mobile.internalTransfer.cancel',
                                    })}
                                </button>
                            </div>
                        </div>
                    </section>
                </Modal>
            )}

            {showModalConfirmationBeneficiary && (
                <Modal
                    // style={{ zIndex: '99999999999999px' }}
                    // onHide={setShowModalConfirmationBeneficiary(!showModalConfirmationBeneficiary)}
                    dialogClassName="modal-confirmation-withdraw"
                    show={showModalConfirmationBeneficiary}>
                    <section className="container p-3 dark-bg-main">
                        <div className="d-flex justify-content-center my-2">
                            <KeyConfirmation />
                        </div>
                        <div className="text-center">
                            <p className="gradient-text mb-3">Confirmation New Address</p>
                            <p className="text-secondary text-sm">
                                We have sent you an email containing a confirmation code pin, please enter it below to
                                save the new address:
                            </p>
                        </div>
                        <div className="mb-0">
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
                                    background: '#15191D',
                                    borderRadius: '4px',
                                    borderColor: '#15191D',
                                    fontSize: '20px',
                                    color: ' #DEDEDE',
                                }}
                                inputFocusStyle={{ fontSize: '20px', color: 'color: #23262F' }}
                                autoSelect={true}
                                regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                            />
                        </div>
                        <button
                            disabled={isValidForm()}
                            onClick={handleActivateBeneficiary}
                            className="btn btn-primary btn-block mt-3">
                            Confirm
                        </button>
                        <p
                            className={`text-right text-xs  mt-2 ${
                                timerActive ? 'grey-text' : 'grey-text-accent cursor-pointer'
                            }`}
                            onClick={!timerActive && handleResendCode}>
                            {moment(seconds).format('mm:ss')} Resend Code
                        </p>
                    </section>
                </Modal>
            )}
        </>
    );
};
