import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { History } from 'history';
import { RouterProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { setDocumentTitle } from '../../../helpers';
import { ModalTwoFa, Modal, CustomInput } from '../../components';
import { CheckIcon, GoogleIcon, KeyIcon, MailIcon, PhoneIcon } from '../../../assets/images/ProfileSecurityIcon';
import { Notification } from '../../../assets/images/Notification';
import { CloseIcon, ModalCloseIcon } from '../../../assets/images/CloseIcon';
interface ProfileSecurityState {
    showTwoFaModal: boolean;
    showTwoFaPhoneModal: boolean;
    showTwoFaPasswordModal: boolean;
    showPhoneModal: boolean;
    showPasswordModal: boolean;
    twoFaCode: string;
    twoFaPhoneCode: string;
    twoFaPasswordCode: string;
    newPhone: string;
    confirmationCode: string;
    passwordNew: string;
    passwordOld: string;
    passwordConfirm: string;
    twoFaStatus: boolean;
    passwordMatches: boolean;
}

interface OwnProps {
    history: History;
}

type Props = RouterProps & IntlProps & OwnProps;

class ProfileSecurityComponent extends React.Component<Props, ProfileSecurityState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showTwoFaModal: false,
            showTwoFaPhoneModal: false,
            showTwoFaPasswordModal: false,
            showPhoneModal: false,
            showPasswordModal: false,
            twoFaCode: '',
            twoFaPhoneCode: '',
            twoFaPasswordCode: '',
            newPhone: '',
            confirmationCode: '',
            passwordNew: '',
            passwordOld: '',
            passwordConfirm: '',
            twoFaStatus: false,
            passwordMatches: true,
        };
    }

    public componentDidMount() {
        setDocumentTitle('Profile Security');
    }

    // public componentDidUpdate() {
    //     if (this.state.passwordNew !== this.state.passwordConfirm) {
    //         this.setState({ passwordMatches: false });
    //     }
    // }

    public render() {
        const { twoFaCode, twoFaPasswordCode, showPhoneModal, showPasswordModal, twoFaStatus } = this.state;

        // google two fa
        const handleSubmitTwoFa = () => {
            if (twoFaCode == '123456') {
                this.setState({ showTwoFaModal: false });
                this.setState({ twoFaCode: '' });
                this.setState({ twoFaStatus: !this.state.twoFaStatus });
            } else {
                alert('kode yang anda masukkan salah');
            }
        };

        // two fa phone
        const handleSubmitTwoFaPhone = () => {
            if (twoFaCode == '123456') {
                this.setState({ showTwoFaPhoneModal: false });
                this.setState({ showPhoneModal: true });
            } else {
                alert('kode yang anda masukkan salah');
            }
        };

        // two fa password
        const handleSubmitTwoFaPassword = () => {
            if (twoFaPasswordCode == '123456') {
                this.setState({ showTwoFaPasswordModal: false });
                this.setState({ showPasswordModal: true });
            } else {
                alert('kode yang anda masukkan salah');
            }
        };

        return (
            <React.Fragment>
                <div className="profile-security-screen content-wrapper dark-bg-accent pb-5">
                    <div className="header dark-bg-main py-4 px-24 mb-24">
                        <h2 className="mb-0 text-xl white-text font-bold ">Security System</h2>
                    </div>
                    <div className="px-24">
                        <div className="d-flex mb-24">
                            <div className="status d-flex align-items-center">
                                {twoFaStatus ? <CheckIcon /> : ''}
                                <p className="mb-0 white-text text-sm ml-3">Two-Factor Authentication (2FA)</p>
                            </div>
                            <div className="status d-flex align-items-center ml-4">
                                <CheckIcon />
                                <p className="mb-0 white-text text-sm ml-3">Identity Verification</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="notification-warning alert show text-sm white-text font-normal position-relative mb-24">
                                    <Notification className="mr-2" />
                                    To ensure the security of your account, use a combination of Google Verification +
                                    Email Binding or Phone Number Binding
                                    <div className="close-icon pl-3">
                                        <CloseIcon fill="#fff" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-md font-bold white-text mb-4">Authentication</h3>
                        <div className="row">
                            <div className="col-sm-12 col-lg-7">
                                <div className="box">
                                    <div className="d-flex align-items-start">
                                        <GoogleIcon />
                                        <div className="ml-4">
                                            <p className="d-flex mb-1 text-ms white-text font-bold">
                                                Google Authenticator (Recommended)
                                                <CheckIcon className="ml-3" />
                                            </p>
                                            <span className="text-sm grey-text-accent">
                                                Protect your account and withdrawals with a security key such as
                                                Yubikey.
                                            </span>
                                            <div className="d-flex mt-3">
                                                {this.state.twoFaStatus ? (
                                                    <button
                                                        id="button-remove-2fa"
                                                        type="button"
                                                        onClick={() => this.setState({ showTwoFaModal: true })}
                                                        className="btn btn-transparent w-auto font-bold text-sm grey-text px-0">
                                                        Remove
                                                    </button>
                                                ) : (
                                                    <button
                                                        id="button-change-2fa"
                                                        type="button"
                                                        className="btn btn-transparent gradient-text font-bold text-sm w-auto px-0 mr-3"
                                                        onClick={() => this.setState({ showTwoFaModal: true })}>
                                                        Activate
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12 col-lg-5">
                                <div className="box">
                                    <div className="d-flex align-items-start">
                                        <MailIcon />
                                        <div className="ml-4">
                                            <p className="d-flex mb-1 text-ms white-text font-bold">
                                                Email Address Verification
                                                <CheckIcon className="ml-3" />
                                            </p>
                                            <span className="text-sm grey-text-accent">
                                                Protect your account and transactions.
                                            </span>
                                            <div className="d-flex mt-3">
                                                <Link
                                                    to={'/change-email'}
                                                    className="btn btn-transparent gradient-text font-bold text-sm w-auto px-0 mr-3">
                                                    Change
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="box">
                                    <div className="d-flex align-items-start">
                                        <PhoneIcon />
                                        <div className="ml-4">
                                            <p className="d-flex mb-1 text-ms white-text font-bold">
                                                Phone Number Verification
                                                <CheckIcon className="ml-3" />
                                            </p>
                                            <span className="text-sm grey-text-accent">
                                                Protect your account and transactions.
                                            </span>
                                            <div className="d-flex mt-3">
                                                <button
                                                    onClick={() => this.setState({ showTwoFaPhoneModal: true })}
                                                    type="button"
                                                    className="btn btn-transparent gradient-text font-bold text-sm w-auto px-0 mr-3">
                                                    Change
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-md font-bold white-text mb-4">Advance Security</h3>
                        <div className="col-sm-12">
                            <div className="box">
                                <div className="d-flex align-items-start">
                                    <KeyIcon />
                                    <div className="ml-4">
                                        <p className="d-flex mb-1 text-ms white-text font-bold">
                                            Login Password
                                            <CheckIcon className="ml-3" />
                                        </p>
                                        <span className="text-sm grey-text-accent">
                                            Login password is used to log in to your account.
                                        </span>
                                        <div className="d-flex mt-3">
                                            <button
                                                type="button"
                                                className="btn btn-transparent gradient-text font-bold text-sm w-auto px-0 mr-3"
                                                onClick={() => this.setState({ showTwoFaPasswordModal: true })}>
                                                Change
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ModalTwoFa
                    show={this.state.showTwoFaModal}
                    twoFaValue={this.state.twoFaCode}
                    onSubmit={handleSubmitTwoFa}
                    closeModal={() => this.setState({ showTwoFaModal: false })}
                    onChangeValue={(e) => this.setState({ twoFaCode: e })}
                />

                <ModalTwoFa
                    show={this.state.showTwoFaPhoneModal}
                    twoFaValue={this.state.twoFaPhoneCode}
                    onSubmit={handleSubmitTwoFaPhone}
                    closeModal={() => this.setState({ showTwoFaPhoneModal: false })}
                    onChangeValue={(e) => this.setState({ twoFaPhoneCode: e })}
                />

                <ModalTwoFa
                    show={this.state.showTwoFaPasswordModal}
                    twoFaValue={this.state.twoFaPasswordCode}
                    onSubmit={handleSubmitTwoFaPassword}
                    closeModal={() => this.setState({ showTwoFaPasswordModal: false })}
                    onChangeValue={(e) => this.setState({ twoFaPasswordCode: e })}
                />

                <Modal content={this.modalPhoneContent()} header={this.modalPhoneHeader()} show={showPhoneModal} />
                <Modal
                    content={this.modalPasswordContent()}
                    header={this.modalPasswordHeader()}
                    show={showPasswordModal}
                />
            </React.Fragment>
        );
    }

    // Render phone modal
    public modalPhoneContent = () => {
        return (
            <React.Fragment>
                <p className="text-sm grey-text mb-24">Set your new Phone number and verifed</p>
                <div className="form">
                    <div className="form-group mb-24">
                        <CustomInput
                            defaultLabel="New Phone Number"
                            inputValue={this.state.newPhone}
                            label="New Phone Number"
                            placeholder="+6281902912921"
                            type="text"
                            labelVisible
                            classNameLabel="white-text text-sm"
                            handleChangeInput={(e) => this.setState({ newPhone: e })}
                        />
                    </div>
                    <div className="form-group mb-24">
                        <label className="white-text text-sm ">Verification Code</label>
                        <div className="d-flex align-items-center">
                            <CustomInput
                                defaultLabel=""
                                inputValue={this.state.confirmationCode}
                                label=""
                                placeholder="_____"
                                type="text"
                                labelVisible={false}
                                classNameLabel="d-none"
                                classNameInput="spacing-10"
                                classNameGroup="mb-0 w-100"
                                handleChangeInput={(e) => this.setState({ confirmationCode: e })}
                            />
                            <button className="btn btn-primary ml-2 text-nowrap">Send Code</button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        data-toggle="modal"
                        data-target="#change-phone"
                        data-dismiss="modal">
                        Change
                    </button>
                </div>
            </React.Fragment>
        );
    };

    public modalPhoneHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">Change Phone Number</h6>
                <ModalCloseIcon
                    className="cursor-pointer ml-4"
                    onClick={() => this.setState({ showPhoneModal: false })}
                />
            </React.Fragment>
        );
    };

    // Render phone modal
    public modalPasswordContent = () => {
        return (
            <React.Fragment>
                <>
                    <p className="text-sm grey-text mb-24">
                        Set your new password with strong password incule numbers, letters, and punctuation marks
                    </p>
                    <div className="form">
                        <div className="form-group position-relative mb-24">
                            <CustomInput
                                defaultLabel="Old Password"
                                inputValue={this.state.passwordOld}
                                label="Old Password"
                                placeholder="Old Password"
                                type="password"
                                labelVisible
                                classNameLabel="white-text text-sm"
                                handleChangeInput={(e) => this.setState({ passwordOld: e })}
                            />
                        </div>
                        <div className="form-group position-relative mb-24">
                            <CustomInput
                                defaultLabel="New Password "
                                inputValue={this.state.passwordNew}
                                label="New Password"
                                placeholder="New Password"
                                type="password"
                                labelVisible
                                classNameLabel="white-text text-sm"
                                // classNameInput={this.state.passwordMatches ? '' : 'error'}
                                handleChangeInput={(e) => this.setState({ passwordNew: e })}
                            />
                        </div>
                        <div className="form-group position-relative mb-24">
                            <CustomInput
                                defaultLabel="Confirm Password "
                                inputValue={this.state.passwordConfirm}
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                type="password"
                                labelVisible
                                classNameLabel="white-text text-sm"
                                // classNameInput={this.state.passwordMatches ? '' : 'error'}
                                handleChangeInput={(e) => this.setState({ passwordConfirm: e })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary btn-block"
                            data-dismiss="modal"
                            data-toggle="modal"
                            data-target="#change-phone">
                            Change
                        </button>
                    </div>
                </>
            </React.Fragment>
        );
    };

    public modalPasswordHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">Change Password</h6>
                <ModalCloseIcon
                    className="cursor-pointer ml-4"
                    onClick={() => this.setState({ showPasswordModal: false })}
                />
            </React.Fragment>
        );
    };
}

export const Security = compose(injectIntl, withRouter, connect())(ProfileSecurityComponent) as React.ComponentClass;
