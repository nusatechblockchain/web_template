import * as React from 'react';
import { useIntl } from 'react-intl';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { CustomInput } from 'src/desktop/components';
import { selectCurrencies, Currency, selectBeneficiaries, Beneficiary } from '../../../modules';
import { useBeneficiariesFetch, useWithdrawLimits } from '../../../hooks';
import { walletsWithdrawCcyFetch, selectWithdrawSuccess } from '../../../modules';
import { ArrowLeft } from 'src/mobile/assets/Arrow';
import { CustomStylesSelect } from 'src/mobile/components';
import { CirclePlusIcon } from 'src/assets/images/CirclePlusIcon';
import Select from 'react-select';
import { ModalAddBeneficiaryMobile } from 'src/mobile/components';
import { ModalBeneficiaryListMobile } from 'src/mobile/components/ModalBeneficiaryListMobile';
import { beneficiariesCreate } from '../../../modules';

export const WalletWithdrawMobileScreen: React.FC = () => {
    useBeneficiariesFetch();
    useWithdrawLimits();
    const intl = useIntl();
    const dispatch = useDispatch();

    const defaultSelected = {
        blockchainKey: '',
        protocol: '',
        name: '',
        id: '',
        fee: '',
        minWithdraw: '',
    };

    const [amount, setAmount] = React.useState('');
    const [beneficiaryId, setBeneficiaryId] = React.useState(0);
    const [blockchainKey, setBlockchainKey] = React.useState('');
    const [showModalAddBeneficiary, setShowModalModalAddBeneficiary] = React.useState(false);
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(false);

    const [address, setAddress] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const { currency = '' } = useParams<{ currency?: string }>();

    const withdrawSuccess = useSelector(selectWithdrawSuccess);
    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);
    const beneficiariesList = beneficiaries.filter((item) => item.currency === currency);
    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);

    const [coinAddress, setCoinAddress] = React.useState('');
    const [coinAddressValid, setCoinAddressValid] = React.useState(false);
    const [coinBeneficiaryName, setCoinBeneficiaryName] = React.useState('');
    const [coinDescription, setCoinDescription] = React.useState('');
    const [coinDestinationTag, setCoinDestinationTag] = React.useState('');
    const [coinBlockchainName, setCoinBlockchainName] = React.useState(defaultSelected);

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

    const optionNetworks =
        currencyItem &&
        currencyItem.networks.map((item) => {
            const customLabel = (
                <div className="d-flex align-items-center">
                    <p className="m-0 grey-text-accent text-sm">{item.blockchain_key}</p>
                </div>
            );

            return {
                label: customLabel,
                value: item.blockchain_key,
            };
        });

    const isDisabled = !coinAddress || !coinBeneficiaryName || !coinAddressValid || !coinBlockchainName.blockchainKey;

    const handleClearModalsInputs = React.useCallback(() => {
        setCoinAddress('');
        setCoinBeneficiaryName('');
        setCoinBlockchainName(defaultSelected);
        setCoinDescription('');
        setCoinDestinationTag('');
    }, []);

    const isRipple = React.useMemo(() => currency === 'xrp', [currency]);

    const handleSubmitAddAddressCoinModal = React.useCallback(() => {
        const payload = {
            currency: currency || '',
            name: coinBeneficiaryName,
            blockchain_key: coinBlockchainName.blockchainKey,
            data: JSON.stringify({
                address: isRipple && coinDestinationTag ? `${coinAddress}?dt=${coinDestinationTag}` : coinAddress,
            }),
            ...(coinDescription && { description: coinDescription }),
        };

        dispatch(beneficiariesCreate(payload));
        handleClearModalsInputs();
        //props.handleAddAddress();
    }, [coinAddress, coinBeneficiaryName, coinDescription, currency, coinBlockchainName]);

    // React.useEffect(() => {
    //     if (withdrawSuccess) {
    //         setShowModalWithdrawalConfirmation(!showModalWithdrawalConfirmation);
    //         setShowModalWithdrawalSuccessfully(!showModalWithdrawalSuccessfully);
    //     }
    // }, [withdrawSuccess]);

    return (
        <React.Fragment>
            <section className="withdraw-mobile-screen pb-5 dark-bg-main">
                <div className="container-fluid w-100 h-100">
                    <div className="header-link">
                        <Link to="/wallets">
                            <ArrowLeft className="white-text" />
                        </Link>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mb-2 transfer-head-container">
                        <h1 className="navbar-brand p-0 m-0 white-text">Withdraw Crypto</h1>
                    </div>

                    <form className="form-withdraw pb-4">
                        <div className="d-flex flex-column justify-content-between align-items-start">
                            <p className="text-sm white-text mb-1">Coins</p>
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

                        <div className="withdraw-information">
                            <div className="align-items-start select-container">
                                <label className="text-sm mt-3 white-text">Select Address</label>
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
                                        onClick={() => setShowModalModalAddBeneficiary(!showModalAddBeneficiary)}
                                        className="position-absolute mt-1 cursor-pointer">
                                        <CirclePlusIcon />
                                    </span>
                                </div>
                            </div>

                            <div className="align-items-start">
                                <label className="text-sm white-text">Add Amount</label>
                                <div className="input-amount">
                                    <div>
                                        <CustomInput
                                            type="text"
                                            label={intl.formatMessage({
                                                id: 'page.body.profile.header.account.content.password.new',
                                            })}
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
                            </div>

                            <div className="align-items-start">
                                <label className="text-sm white-text">Two-factor Authentications Code</label>
                                <div className="input-amount">
                                    <div>
                                        <CustomInput
                                            type="text"
                                            label=""
                                            placeholder={'2FA Code'}
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
                                    Amount available for withdrawal ≤ Account available assets Unconfirmed digital
                                    assets.
                                </small>
                            </p>
                            <div className="my-3">
                                <p className="mb-0 text-sm grey-text-accent">Fee</p>
                                <p className="mb-0  text-base grey-text-accent font-bold">
                                    $ {fee !== undefined ? fee : '0'}
                                </p>
                            </div>
                            <div className="">
                                <p className="mb-0 text-sm grey-text-accent">Total Withdrawal Amount</p>
                                <p className="mb-0 text-base grey-text-accent font-bold">
                                    {amount !== '' ? amount : '0'} {currency.toUpperCase()}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleSubmitWithdraw}
                            type="button"
                            disabled={
                                !currency
                                    ? true
                                    : !amount
                                    ? true
                                    : !otp
                                    ? true
                                    : !beneficiaryId
                                    ? true
                                    : !address
                                    ? true
                                    : false
                            }
                            className="btn btn-primary btn-block">
                            Withdraw
                        </button>
                    </form>
                </div>
            </section>
            {showModalAddBeneficiary && (
                <ModalAddBeneficiaryMobile
                    onCloseList={() => ''}
                    onCloseAdd={() => setShowModalModalAddBeneficiary(false)}
                    handleAddAddress={() => setShowModalModalAddBeneficiary(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                />
            )}

            {showModalBeneficiaryList && (
                <ModalBeneficiaryListMobile
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
        </React.Fragment>
    );
};
