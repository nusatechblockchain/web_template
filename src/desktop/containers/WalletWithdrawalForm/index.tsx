import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './WalletWithdrawalForm.pcss';
import { CustomInput, Modal, ModalAddBeneficiary, ModalBeneficiaryList } from '../../components';
import { selectCurrencies, selectBeneficiaries, Beneficiary, Currency, BlockchainCurrencies } from '../../../modules';
import { GLOBAL_PLATFORM_CURRENCY, DEFAULT_FIAT_PRECISION } from '../../../constants';
import { Decimal, Tooltip } from '../../../components';
import { CirclePlusIcon } from '../../../assets/images/CirclePlusIcon';
import { useBeneficiariesFetch, useWithdrawLimits } from '../../../hooks';
import { walletsWithdrawCcyFetch, selectWithdrawSuccess } from '../../../modules';

export const WalletWithdrawalForm: React.FC = () => {
    useBeneficiariesFetch();
    useWithdrawLimits();
    const intl = useIntl();
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModalWithdrawalConfirmation, setShowModalWithdrawalConfirmation] = React.useState(false);
    const [showModalWithdrawalSuccessfully, setShowModalWithdrawalSuccessfully] = React.useState(false);
    const [showModalAddBeneficiary, setShowModalModalAddBeneficiary] = React.useState(false);
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(false);
    const [showModalBeneficiaryCode, setShowModalBeneficiaryCode] = React.useState(false);
    const [showModalOtp, setShowModalOtp] = React.useState(false);

    const [amount, setAmount] = React.useState('');
    const [beneficiaryId, setBeneficiaryId] = React.useState(0);
    const [blockchainKey, setBlockchainKey] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const { currency = '' } = useParams<{ currency?: string }>();

    const withdrawSuccess = useSelector(selectWithdrawSuccess);
    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);
    const beneficiariesList = beneficiaries.filter((item) => item.currency === currency);
    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);

    // const uniqueBlockchainKeys = new Set(beneficiaries.map((item) => item.blockchain_key));
    // const uniqueBlockchainKeysValues = [...uniqueBlockchainKeys.values()];
    // console.log(uniqueBlockchainKeysValues);

    const blockchainKeyValue =
        currencyItem && currencyItem.networks.find((item) => item.blockchain_key === blockchainKey);
    const fee = blockchainKeyValue && blockchainKeyValue.withdraw_fee;

    const handleChangeBeneficiaryId = (id: number, address: string, blockchainKey: string) => {
        setBeneficiaryId(id);
        setAddress(address);
        setBlockchainKey(blockchainKey);
        setShowModalBeneficiaryList(false);
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
                <div className="mb-24 white-text text-ms bg-warning radius-sm p-10 min-w-500">
                    Please check the target address carefully before confirming the withdrawal.
                </div>
                <p className="text-ms grey-text-accent font-semibold mb-24">
                    You've requested to withdraw 0.0233 ETH, Are you sure to do Withdraw?
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
                <p className="text-ms grey-text-accent font-semibold mb-24">You success to withdraw 0.002 BTC</p>
                <div className="d-flex">
                    <button
                        className="btn btn-danger sm px-5 mr-3"
                        onClick={() => setShowModalWithdrawalSuccessfully(!showModalWithdrawalSuccessfully)}>
                        Cancel
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

    const renderModalBeneficiaryCode = () => (
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
                    <p className="mb-0 text-ms grey-text-accent">Fee</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">$ {fee !== undefined ? fee : '0'}</p>
                </div>
                <div className="d-flex justify-content-between mb-24">
                    <p className="mb-0 text-ms grey-text-accent">Total Withdrawal Amount</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">
                        {amount !== '' ? amount : '0'} {currency.toUpperCase()}
                    </p>
                </div>
                <button
                    type="button"
                    disabled={!currency ? true : !amount ? true : !beneficiaryId ? true : !address ? true : false}
                    onClick={() => setShowModalOtp(!showModalOtp)}
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
                    handleChangeBeneficiaryId={handleChangeBeneficiaryId}
                />
            )}

            {showModalAddBeneficiary && (
                <ModalAddBeneficiary
                    showModalBeneficiaryList={showModalBeneficiaryList}
                    onCloseList={() => setShowModalBeneficiaryList(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                    onCloseAdd={() => setShowModalModalAddBeneficiary(false)}
                    handleAddAddress={() => {
                        setShowModalBeneficiaryList(true);
                        setShowModalModalAddBeneficiary(false);
                    }}
                />
            )}
        </React.Fragment>
    );
};
