import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './ModalInternalTransfer.pcss';
import { Modal, CustomStylesSelect, CustomInput } from '../../components';
import { CircleCloseIcon } from '../../../assets/images/CircleCloseIcon';
import { selectCurrencies, Currency } from '../../../modules';
import Select from 'react-select';

export interface ModalTransferShowProps {
    showModalTransfer: boolean;
}

export const ModalInternalTransfer: React.FunctionComponent<ModalTransferShowProps> = (props) => {
    const intl = useIntl();
    const history = useHistory();
    const [showModalTransfer, setShowModalTransfer] = React.useState(props.showModalTransfer);
    const [showModalTransferConfirmation, setShowModalTransferConfirmation] = React.useState(false);
    const [showModalTransferSuccessfully, setShowModalTransferSuccessfully] = React.useState(false);
    const { currency = '' } = useParams<{ currency?: string }>();

    const currencies: Currency[] = useSelector(selectCurrencies);

    const optionCurrency = currencies.map((item) => {
        const customLabel = (
            <Link key={item.id} to={`/wallets/${item.id}/deposit`}>
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

    const renderHeaderModalTransfer = () => {
        return (
            <React.Fragment>
                <div
                    className="com-modal-transfer-header
                 d-flex justify-content-between align-items-center">
                    <h6 className="text-xl font-bold white-text mb-0">Transfer Internal</h6>
                    <span onClick={() => setShowModalTransfer(!showModalTransfer)} className="cursor-pointer">
                        <CircleCloseIcon />
                    </span>
                </div>
            </React.Fragment>
        );
    };

    const renderContentModalTransfer = () => {
        return (
            <React.Fragment>
                <div className="body mb-24">
                    <p className="text-ms white-text mb-24">Send Assets to another member</p>
                    <div className="form">
                        <div className="mb-24">
                            <CustomInput
                                type="text"
                                label={'Enter a valid UID of a user you want to transfer money'}
                                placeholder={'Enter UID'}
                                defaultLabel={'Enter a valid UID of a user you want to transfer money'}
                                // handleChangeInput={handleChangeNewPassword}
                                inputValue={''}
                                // handleFocusInput={}
                                classNameLabel="text-ms white-text mb-8"
                                classNameInput={`dark-bg-accent`}
                                autoFocus={false}
                                labelVisible
                            />
                        </div>

                        <div className="d-flex flex-column justify-content-between align-items-start">
                            <p className="text-ms white-text mb-8">Coins</p>

                            <div className="w-100">
                                <Select
                                    value={optionCurrency.filter(function (option) {
                                        return option.value === currency;
                                    })}
                                    styles={CustomStylesSelect}
                                    options={optionCurrency}
                                />
                            </div>
                        </div>

                        <div>
                            <CustomInput
                                type="text"
                                label={'Input Ammount to send'}
                                placeholder={'Input Amount'}
                                defaultLabel={'Input Ammount to send'}
                                // handleChangeInput={handleChangeNewPassword}
                                inputValue={''}
                                // handleFocusInput={}
                                classNameLabel="text-ms white-text mb-8"
                                classNameInput={`dark-bg-accent`}
                                autoFocus={false}
                                labelVisible
                            />
                        </div>

                        <div className="py-3 px-3 mb-3 dark-bg-main radius-md d-flex justify-content-between">
                            <div className="mr-2">
                                <p className="mb-2 text-sm white-text">Available</p>
                                <p className="mb-2 text-sm white-text">Balance</p>
                            </div>
                            <div className="ml-2">
                                <p className="mb-2 text-sm grey-text">0 BTC</p>
                                <p className="mb-2 text-sm grey-text-accent">$ 0</p>
                            </div>
                        </div>

                        <div>
                            <CustomInput
                                type="text"
                                label={'Enter 2FA Code'}
                                placeholder={'2FA Code'}
                                defaultLabel={'Enter 2FA Code'}
                                // handleChangeInput={handleChangeNewPassword}
                                inputValue={''}
                                // handleFocusInput={}
                                classNameLabel="text-ms white-text mb-8"
                                classNameInput={`dark-bg-accent`}
                                autoFocus={false}
                                labelVisible
                            />
                        </div>

                        <button
                            onClick={() => {
                                setShowModalTransfer(!showModalTransfer);
                                setShowModalTransferConfirmation(!showModalTransferConfirmation);
                            }}
                            type="button"
                            className="btn btn-primary btn-block">
                            Continue
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    const renderHeaderModalTransferConfirmation = () => {
        return (
            <React.Fragment>
                <h6 className="text-md white-text font-semibold mb-0">Transfer Confirmation</h6>
            </React.Fragment>
        );
    };

    const renderContentModalTransferConfirmation = () => {
        return (
            <React.Fragment>
                <p className="text-ms grey-text-accent font-semibold mb-24">
                    Are you sure to transfer 0.002 BTC to another User? Please check UID of user you want to transfer
                </p>
                <div className="d-flex">
                    <button
                        className="btn btn-danger sm px-5 mr-3"
                        onClick={() => setShowModalTransferConfirmation(!showModalTransferConfirmation)}>
                        Cancel
                    </button>
                    <button
                        className="btn btn-success sm px-5"
                        onClick={() => {
                            setShowModalTransferConfirmation(!showModalTransferConfirmation);
                            setShowModalTransferSuccessfully(!showModalTransferSuccessfully);
                        }}>
                        Continue
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const renderHeaderModalTransferSuccessfully = () => {
        return (
            <React.Fragment>
                <h6 className="text-md white-text font-semibold m-0">Transfer BTC has Successfully </h6>
            </React.Fragment>
        );
    };

    const renderContentModalTransferSuccessfully = () => {
        return (
            <React.Fragment>
                <p className="text-ms grey-text-accent font-semibold mb-24">
                    You success to transfer 0.002 BTC to UID A2135123
                </p>
                <div className="d-flex">
                    <button
                        className="btn btn-danger sm px-5 mr-3"
                        onClick={() => setShowModalTransferSuccessfully(!showModalTransferSuccessfully)}>
                        Cancel
                    </button>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Modal
                show={showModalTransfer}
                header={renderHeaderModalTransfer()}
                content={renderContentModalTransfer()}
            />

            {showModalTransferConfirmation && (
                <Modal
                    show={showModalTransferConfirmation}
                    header={renderHeaderModalTransferConfirmation()}
                    content={renderContentModalTransferConfirmation()}
                />
            )}
            {showModalTransferSuccessfully && (
                <Modal
                    show={showModalTransferSuccessfully}
                    header={renderHeaderModalTransferSuccessfully()}
                    content={renderContentModalTransferSuccessfully()}
                />
            )}
        </React.Fragment>
    );
};
