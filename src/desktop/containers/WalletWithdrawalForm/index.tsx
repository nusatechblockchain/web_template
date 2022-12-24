import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './WalletWithdrawalForm.pcss';
import Select from 'react-select';
import { CustomStylesSelect, CustomInput, Modal, ModalAddBeneficiary, ModalBeneficiaryList } from '../../components';
import { selectCurrencies, selectBeneficiaries, Beneficiary, Currency, BlockchainCurrencies } from '../../../modules';
import { GLOBAL_PLATFORM_CURRENCY, DEFAULT_FIAT_PRECISION } from '../../../constants';
import { Decimal, Tooltip } from '../../../components';
import { CirclePlusIcon } from '../../../assets/images/CirclePlusIcon';
import { useBeneficiariesFetch } from '../../../hooks';

export const WalletWithdrawalForm: React.FC = () => {
    useBeneficiariesFetch();
    const intl = useIntl();
    const history = useHistory();
    const [showModalWithdrawalConfirmation, setShowModalWithdrawalConfirmation] = React.useState(false);
    const [showModalWithdrawalSuccessfully, setShowModalWithdrawalSuccessfully] = React.useState(false);
    const [showModalAddBeneficiary, setShowModalModalAddBeneficiary] = React.useState(false);
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const { currency = '' } = useParams<{ currency?: string }>();

    const currencies: Currency[] = useSelector(selectCurrencies);
    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);

    const uniqueBlockchainKeys = new Set(beneficiaries.map((item) => item.blockchain_key));
    const uniqueBlockchainKeysValues = [...uniqueBlockchainKeys.values()];

    const optionCurrency = currencies.map((item) => {
        const customLabel = (
            <Link key={item.id} to={`/wallets/${item.id}/withdraw`}>
                <div className="d-flex align-items-center">
                    <img src={item.icon_url} alt="icon" className="mr-12 small-coin-icon" />
                    <div>
                        <p className="m-0 text-sm grey-text-accent">{item.id.toUpperCase()}</p>
                        <p className="m-0 text-xs grey-text-accent">{item.name}</p>
                    </div>
                </div>
            </Link>
        );
        return {
            label: customLabel,
            value: item.id,
        };
    });

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
                <div className="mb-24 white-text text-ms bg-warning radius-sm p-10">
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
                    <button
                        className="btn btn-success sm px-5"
                        onClick={() => {
                            setShowModalWithdrawalConfirmation(!showModalWithdrawalConfirmation);
                            setShowModalWithdrawalSuccessfully(!showModalWithdrawalSuccessfully);
                        }}>
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

    console.log(beneficiaries, 'INI BENE');

    return (
        <React.Fragment>
            <div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Select Coin</p>
                    <div className="w-70">
                        <Select
                            value={optionCurrency.filter(function (option) {
                                return option.value === currency;
                            })}
                            styles={CustomStylesSelect}
                            options={optionCurrency}
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Select Address</p>
                    <div className="w-70 position-relative input-add-address">
                        <div
                            onClick={() =>
                                beneficiaries && beneficiaries[0]
                                    ? setShowModalBeneficiaryList(!showModalBeneficiaryList)
                                    : setShowModalModalAddBeneficiary(!showModalAddBeneficiary)
                            }>
                            <CustomInput
                                type="text"
                                isDisabled={true}
                                label={intl.formatMessage({
                                    id: 'page.body.profile.header.account.content.password.new',
                                })}
                                placeholder={''}
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
                            handleChangeInput={(e) => setAmount(e)}
                            inputValue={amount}
                            // handleFocusInput={}
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
                    <p className="mb-0 text-ms grey-text-accent font-bold">$2</p>
                </div>
                <div className="d-flex justify-content-between mb-24">
                    <p className="mb-0 text-ms grey-text-accent">Total Withdrawal Amount</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">0.55 BTC</p>
                </div>
                <button
                    onClick={() => setShowModalWithdrawalConfirmation(!showModalWithdrawalConfirmation)}
                    className="btn btn-primary btn-block">
                    Withdraw
                </button>
            </div>

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
                    onClose={() => setShowModalBeneficiaryList(false)}
                    blockchainKey={''}
                    showModalBeneficiaryList={showModalBeneficiaryList}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                />
            )}
            {showModalAddBeneficiary && (
                <ModalAddBeneficiary
                    onClose={() => setShowModalModalAddBeneficiary(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                />
            )}
        </React.Fragment>
    );
};
