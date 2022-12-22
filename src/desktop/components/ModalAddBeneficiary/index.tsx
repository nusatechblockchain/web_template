import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './ModalAddBeneficiary.pcss';
import { CircleCloseIcon } from 'src/assets/images/CircleCloseIcon';
import { validateBeneficiaryAddress } from '../../../helpers/validateBeneficiaryAddress';
import { Modal, CustomInput } from '..';
import { CustomStylesSelect } from '../../components';
import '../../../styles/colors.pcss';
import { beneficiariesCreate, BeneficiaryBank, selectCurrencies } from '../../../modules';
import Select from 'react-select';

export interface ModalAddBeneficiaryProps {
    showModalAddBeneficiary: boolean;
}

const defaultSelected = {
    blockchainKey: '',
    protocol: '',
    name: '',
    id: '',
    fee: '',
    minWithdraw: '',
};

export const ModalAddBeneficiary: React.FunctionComponent<ModalAddBeneficiaryProps> = (props) => {
    const intl = useIntl();
    const history = useHistory();
    const dispatch = useDispatch();

    const { formatMessage } = useIntl();
    const { currency = '' } = useParams<{ currency?: string }>();
    const currencies = useSelector(selectCurrencies);
    const currencyItem = currencies.find((item) => item.id === currency);
    const isRipple = React.useMemo(() => currency === 'xrp', [currency]);

    const [showModalAddBeneficiary, setShowModalAddBeneficiary] = React.useState(props.showModalAddBeneficiary);
    const [coinAddress, setCoinAddress] = React.useState('');
    const [coinAddressValid, setCoinAddressValid] = React.useState(false);
    const [coinBlockchainName, setCoinBlockchainName] = React.useState(defaultSelected);
    const [coinBeneficiaryName, setCoinBeneficiaryName] = React.useState('');
    const [coinDescription, setCoinDescription] = React.useState('');
    const [coinDestinationTag, setCoinDestinationTag] = React.useState('');
    const [coinAddressFocused, setCoinAddressFocused] = React.useState(false);
    const [coinBeneficiaryNameFocused, setCoinBeneficiaryNameFocused] = React.useState(false);
    const [coinDescriptionFocused, setCoinDescriptionFocused] = React.useState(false);
    const [coinDestinationTagFocused, setCoinDestinationTagFocused] = React.useState(false);

    const [fiatName, setFiatName] = React.useState('');
    const [fiatFullName, setFiatFullName] = React.useState('');
    const [fiatAccountNumber, setFiatAccountNumber] = React.useState('');
    const [fiatBankName, setFiatBankName] = React.useState('');
    const [fiatBankSwiftCode, setFiatBankSwiftCode] = React.useState('');
    const [fiatIntermediaryBankName, setFiatIntermediaryBankName] = React.useState('');
    const [fiatIntermediaryBankSwiftCode, setFiatIntermediaryBankSwiftCode] = React.useState('');
    const [fiatNameFocused, setFiatNameFocused] = React.useState(false);
    const [fiatFullNameFocused, setFiatFullNameFocused] = React.useState(false);
    const [fiatAccountNumberFocused, setFiatAccountNumberFocused] = React.useState(false);
    const [fiatBankNameFocused, setFiatBankNameFocused] = React.useState(false);
    const [fiatBankSwiftCodeFocused, setFiatBankSwiftCodeFocused] = React.useState(false);
    const [fiatIntermediaryBankNameFocused, setFiatIntermediaryBankNameFocused] = React.useState(false);
    const [fiatIntermediaryBankSwiftCodeFocused, setFiatIntermediaryBankSwiftCodeFocused] = React.useState(false);

    const handleClearModalsInputs = React.useCallback(() => {
        setCoinAddress('');
        setCoinBeneficiaryName('');
        setCoinBlockchainName(defaultSelected);
        setCoinDescription('');
        setCoinDestinationTag('');
        setCoinAddressFocused(false);
        setCoinBeneficiaryNameFocused(false);
        setCoinDescriptionFocused(false);
        setCoinDestinationTagFocused(false);
        setCoinAddressValid(false);

        setFiatAccountNumber('');
        setFiatName('');
        setFiatFullName('');
        setFiatBankName('');
        setFiatBankSwiftCode('');
        setFiatIntermediaryBankName('');
        setFiatIntermediaryBankSwiftCode('');
        setFiatNameFocused(false);
        setFiatFullNameFocused(false);
        setFiatAccountNumberFocused(false);
        setFiatBankNameFocused(false);
        setFiatBankSwiftCodeFocused(false);
        setFiatIntermediaryBankNameFocused(false);
        setFiatIntermediaryBankSwiftCodeFocused(false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getState = React.useCallback(
        (key) => {
            switch (key) {
                case 'coinAddress':
                    return coinAddress;
                case 'coinBeneficiaryName':
                    return coinBeneficiaryName;
                case 'coinDestinationTag':
                    return coinDestinationTag;
                case 'coinDescription':
                    return coinDescription;
                case 'coinAddressFocused':
                    return coinAddressFocused;
                case 'coinBeneficiaryNameFocused':
                    return coinBeneficiaryNameFocused;
                case 'coinDescriptionFocused':
                    return coinDescriptionFocused;
                case 'coinDestinationTagFocused':
                    return coinDestinationTagFocused;
                case 'fiatName':
                    return fiatName;
                case 'fiatFullName':
                    return fiatFullName;
                case 'fiatAccountNumber':
                    return fiatAccountNumber;
                case 'fiatBankName':
                    return fiatBankName;
                case 'fiatBankSwiftCode':
                    return fiatBankSwiftCode;
                case 'fiatIntermediaryBankName':
                    return fiatIntermediaryBankName;
                case 'fiatIntermediaryBankSwiftCode':
                    return fiatIntermediaryBankSwiftCode;
                case 'fiatNameFocused':
                    return fiatNameFocused;
                case 'fiatFullNameFocused':
                    return fiatFullNameFocused;
                case 'fiatAccountNumberFocused':
                    return fiatAccountNumberFocused;
                case 'fiatBankNameFocused':
                    return fiatBankNameFocused;
                case 'fiatBankSwiftCodeFocused':
                    return fiatBankSwiftCodeFocused;
                case 'fiatIntermediaryBankNameFocused':
                    return fiatIntermediaryBankNameFocused;
                case 'fiatIntermediaryBankSwiftCodeFocused':
                    return fiatIntermediaryBankSwiftCodeFocused;
                default:
                    return '';
            }
        },
        [
            coinAddress,
            coinAddressFocused,
            coinBeneficiaryName,
            coinBeneficiaryNameFocused,
            coinDescription,
            coinDescriptionFocused,
            coinDestinationTag,
            coinDestinationTagFocused,
            fiatAccountNumber,
            fiatAccountNumberFocused,
            fiatBankName,
            fiatBankNameFocused,
            fiatBankSwiftCode,
            fiatBankSwiftCodeFocused,
            fiatFullName,
            fiatFullNameFocused,
            fiatIntermediaryBankName,
            fiatIntermediaryBankNameFocused,
            fiatIntermediaryBankSwiftCode,
            fiatIntermediaryBankSwiftCodeFocused,
            fiatName,
            fiatNameFocused,
        ]
    );

    const validateCoinAddressFormat = React.useCallback(
        (value: string) => {
            const coinAddressValidator = validateBeneficiaryAddress.cryptocurrency(currency, true);

            setCoinAddressValid(coinAddressValidator.test(value.trim()));
        },
        [currency]
    );

    const handleChangeCoinAddress = (value: string) => {
        setCoinAddress(value);
        validateCoinAddressFormat(value);
    };

    const handleChangeBeneficiaryName = (value: string) => {
        setCoinBeneficiaryName(value);
    };

    const handleChangeCoinDescription = (value: string) => {
        setCoinDescription(value);
    };

    // const handleChangeBlockchain = (index: number) => {
    //     const blockchainItem = currencyItem.networks[index];

    //     setCoinBlockchainName({
    //         blockchainKey: blockchainItem.blockchain_key,
    //         protocol: blockchainItem.protocol,
    //         name: currencyItem.name,
    //         id: currencyItem.id,
    //         fee: blockchainItem?.withdraw_fee,
    //         minWithdraw: blockchainItem.min_withdraw_amount,
    //     });
    // };

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [coinAddress, coinBeneficiaryName, coinDescription, currency, coinBlockchainName]);

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

    const renderHeaderModalAddBeneficiary = () => {
        return (
            <React.Fragment>
                <div
                    className="com-modal-add-beneficiary-header
                 d-flex justify-content-between align-items-center w-100">
                    <h6 className="text-xl font-bold white-text mb-0">Withdraw Crypto</h6>
                    <span
                        onClick={() => setShowModalAddBeneficiary(!showModalAddBeneficiary)}
                        className="cursor-pointer">
                        <CircleCloseIcon />
                    </span>
                </div>
            </React.Fragment>
        );
    };

    const renderContentModalAddBeneficiary = () => {
        return (
            <React.Fragment>
                <div className="com-modal-add-beneficiary-content mb-24">
                    <div className="body mb-24">
                        <div className="py-3 px-3 mb-3 dark-bg-main radius-md d-flex justify-content-between">
                            <div className="mr-2">
                                <p className="mb-2 text-sm white-text">Available</p>
                                <p className="mb-2 text-sm white-text">Balance</p>
                            </div>
                            <div className="ml-2">
                                <p className="mb-2 text-sm grey-text text-right">10075.56213968 USDT</p>
                                <p className="mb-2 text-sm grey-text-accent text-right">$10,095.35</p>
                            </div>
                        </div>
                    </div>

                    <form>
                        <div>
                            <CustomInput
                                type="text"
                                label={'Blockchain Address'}
                                placeholder={'Input Address'}
                                defaultLabel={'Blockchain Address'}
                                handleChangeInput={handleChangeCoinAddress}
                                inputValue={coinAddress}
                                classNameLabel="text-ms white-text mb-8"
                                classNameInput={``}
                                autoFocus={false}
                                labelVisible
                            />
                            <p className="mb-16 text-xs grey-text ">
                                Do not send Tether USD unless you are certain the destination supports TRC-20
                                transactions. If it does not, you could permanently lose access to your coins.
                            </p>
                        </div>

                        <div>
                            <p className="text-ms white-text mb-8">Select Networks</p>
                            <Select
                                styles={CustomStylesSelect}
                                options={optionNetworks}
                                value={optionNetworks.filter(function (option) {
                                    return option.value === coinBlockchainName.blockchainKey;
                                })}
                                onChange={(e) =>
                                    setCoinBlockchainName({ ...coinBlockchainName, blockchainKey: e.value })
                                }
                            />
                        </div>

                        <div>
                            <CustomInput
                                type="text"
                                label={'Beneficiary Name'}
                                placeholder={'Input Name'}
                                defaultLabel={'Beneficiary Name'}
                                handleChangeInput={handleChangeBeneficiaryName}
                                inputValue={coinBeneficiaryName}
                                classNameLabel="text-ms white-text mb-8"
                                classNameInput={``}
                                autoFocus={false}
                                labelVisible
                            />
                        </div>
                        <div>
                            <CustomInput
                                type="textarea"
                                label={'Description (Optional)'}
                                placeholder={'Input Description'}
                                defaultLabel={'Description (Optional)'}
                                handleChangeInput={handleChangeCoinDescription}
                                inputValue={coinDescription}
                                classNameLabel="text-ms white-text mb-8"
                                classNameInput={``}
                                autoFocus={false}
                                labelVisible
                            />
                        </div>

                        <button
                            onClick={handleSubmitAddAddressCoinModal}
                            type="button"
                            className="btn btn-primary btn-block">
                            Save Address
                        </button>
                    </form>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {showModalAddBeneficiary && (
                <Modal
                    show={showModalAddBeneficiary}
                    header={renderHeaderModalAddBeneficiary()}
                    content={renderContentModalAddBeneficiary()}
                />
            )}
        </React.Fragment>
    );
};
