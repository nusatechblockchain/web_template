import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { CustomInput } from 'src/desktop/components';
import {
    selectCurrencies,
    Currency,
    createInternalTransfersFetch,
    selectInternalTransfersCreateSuccess,
} from '../../../modules';
import { SwapIconMobile } from 'src/mobile/assets/Swap';
import { KeyConfirmation } from 'src/mobile/assets/KeyConfirmation';
import { ArrowLeft } from 'src/mobile/assets/Arrow';

const InternalTransferMobileScreen: React.FC = () => {
    const dispatch = useDispatch();
    const { currency = '' } = useParams<{ currency?: string }>();
    const [amount, setAmount] = React.useState('');
    const [uid, setUid] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const transferSuccess = useSelector(selectInternalTransfersCreateSuccess);

    const currencies: Currency[] = useSelector(selectCurrencies);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);
    const [showModalConfirmation, setShowModalConfirmation] = React.useState(false);

    const handleChangeAmount = (value) => {
        const data = value.replace(/[^0-9\.]/g, '');
        setAmount(data);
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

    const handleCreateTransfer = () => {
        const payload = {
            currency: currency.toLowerCase(),
            username_or_uid: uid,
            amount,
            otp,
        };

        dispatch(createInternalTransfersFetch(payload));
    };

    React.useEffect(() => {
        if (transferSuccess) {
            setShowModalConfirmation(false);
        }
    }, [transferSuccess]);

    return (
        <section className="internal-transfer-mobile-screen pb-5 dark-bg-main">
            <div className="container-fluid inside-internal-transfer w-100 h-100">
                <div className="pt-5 pb-3">
                    <Link to="/wallets">
                        <ArrowLeft className="white-text" />
                    </Link>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-2 transfer-head-container">
                    <h1 className="navbar-brand p-0 m-0 white-text">Internal Transfer</h1>
                </div>

                <form className="form-transfer">
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

                    <div className="transfer-information mt-3 mb-3">
                        <div className="transfer-value">
                            <div className="mb-3">
                                <CustomInput
                                    type="text"
                                    label={'Input Ammount to send'}
                                    placeholder={'0.00000000'}
                                    defaultLabel={'Input Ammount to send'}
                                    handleChangeInput={handleChangeAmount}
                                    inputValue={amount}
                                    classNameLabel="text-ms white-text mb-8"
                                    classNameInput={`d-block dark-bg-accent m-0`}
                                    autoFocus={false}
                                    labelVisible
                                />
                            </div>
                        </div>
                    </div>
                    <div className="transfer-information mb-3">
                        <div className="transfer-shipper">
                            <div className="mb-3">
                                <CustomInput
                                    type="text"
                                    label={'Enter UID'}
                                    placeholder={'Enter UID'}
                                    defaultLabel={''}
                                    handleChangeInput={handleChangeUid}
                                    inputValue={uid}
                                    classNameLabel="text-ms white-text mb-8"
                                    classNameInput={`dark-bg-accent d-block m-0`}
                                    autoFocus={false}
                                    labelVisible
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="m-0 mb-2">Two-factor Authentications Code</label>
                        <CustomInput
                            type="text"
                            label={''}
                            placeholder={'2FA Code'}
                            defaultLabel={''}
                            handleChangeInput={handleChangeOtp}
                            inputValue={otp}
                            classNameLabel="text-ms white-text d-none"
                            classNameInput={`dark-bg-accent m-0`}
                            autoFocus={false}
                            labelVisible
                        />
                    </div>

                    <Button
                        onClick={() => {
                            setShowModalConfirmation(!showModalConfirmation);
                        }}
                        disabled={disableButton()}
                        block
                        size="lg"
                        variant="primary">
                        Continue
                    </Button>
                </form>
                <Modal show={showModalConfirmation} onHide={() => setShowModalConfirmation(!showModalConfirmation)}>
                    <div className="container p-3 text-center">
                        <div className="d-flex mb-2 justify-content-center">
                            <KeyConfirmation />
                        </div>
                        <p className="gradient-text font-weight-bold mb-2">Transfer Confirmation</p>
                        <div className="">
                            <p className="text-sm text-secondary">
                                Are you sure to transfer {amount} {currency.toUpperCase()} to another User? Please check
                                UID of user you want to transfer
                            </p>
                        </div>
                        <div className="">
                            <button className="btn btn-primary btn-lg btn-block" onClick={handleCreateTransfer}>
                                Continue
                            </button>
                            <button
                                onClick={() => setShowModalConfirmation(!showModalConfirmation)}
                                className="btn btn-outline-danger py-3 text-sm btn-lg btn-block">
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </section>
    );
};

export { InternalTransferMobileScreen };
