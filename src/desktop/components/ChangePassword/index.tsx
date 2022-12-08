import * as React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { passwordMinEntropy } from '../../../api/config';
import {
    PASSWORD_REGEX,
    passwordErrorFirstSolution,
    passwordErrorSecondSolution,
    passwordErrorThirdSolution,
} from '../../../helpers';
import { CustomInput } from '../CustomInput';
import { PasswordStrengthMeter } from '../index';
import PinInput from 'react-pin-input';
import { Link } from 'react-router-dom';

export const ChangePasswordComponent = (props) => {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');
    const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);
    const [passwordPopUp, setPasswordPopUp] = React.useState(false);
    const [code, setCode] = React.useState('');
    const [show, setShow] = React.useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const intl = useIntl();

    const handleChangePassword = () => {
        const payload = props.hideOldPassword
            ? {
                  password: newPassword,
                  confirm_password: confirmationPassword,
              }
            : {
                  old_password: oldPassword,
                  new_password: newPassword,
                  confirm_password: confirmationPassword,
              };

        props.handleChangePassword(payload);

        setOldPassword('');
        setNewPassword('');
        setConfirmationPassword('');
        setConfirmPasswordFocus(false);
    };

    const handleChangeOTP = (e) => {
        setCode(e);
        props.handleChangePin(e);
    };

    const handleChangeNewPassword = (value: string) => {
        if (passwordErrorFirstSolution(value) && !passwordErrorFirstSolved) {
            setPasswordErrorFirstSolved(true);
        } else if (!passwordErrorFirstSolution(value) && passwordErrorFirstSolved) {
            setPasswordErrorFirstSolved(false);
        }

        if (passwordErrorSecondSolution(value) && !passwordErrorSecondSolved) {
            setPasswordErrorSecondSolved(true);
        } else if (!passwordErrorSecondSolution(value) && passwordErrorSecondSolved) {
            setPasswordErrorSecondSolved(false);
        }

        if (passwordErrorThirdSolution(value) && !passwordErrorThirdSolved) {
            setPasswordErrorThirdSolved(true);
        } else if (!passwordErrorThirdSolution(value) && passwordErrorThirdSolved) {
            setPasswordErrorThirdSolved(false);
        }

        setNewPassword(value);
        setTimeout(() => {
            props.fetchCurrentPasswordEntropy({ password: value });
        }, 500);
    };

    const handleFocusNewPassword = () => {
        setPasswordPopUp(!passwordPopUp);
    };

    const translate = (key: string) => intl.formatMessage({ id: key });

    const isValidForm = () => {
        const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = newPassword === confirmationPassword;
        const isOldPasswordValid = (!props.hideOldPassword && oldPassword) || true;

        return isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid;
    };

    const renderForm = () => {
        return (
            <React.Fragment>
                <h3 className="mb-8 title-2 white-text font-semibold">Reset Password</h3>
                <h5 className="mb-24 text-sm grey-text">
                    We send an email to your address, please check your inbox and find the confirmation code we've sent
                    you
                </h5>

                <p className="white-text text-sm mb-8">Pin Code</p>
                <PinInput
                    length={6}
                    onChange={(e) => handleChangeOTP(e)}
                    onComplete={(e) => handleChangeOTP(e)}
                    type="numeric"
                    inputMode="number"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '8px',
                    }}
                    inputStyle={{
                        background: 'transparent',
                        borderRadius: '4px',
                        borderColor: '#23262F',
                        fontSize: '20px',
                        color: '#F2F0FF',
                    }}
                    inputFocusStyle={{ fontSize: '20px', color: '#F2F0FF' }}
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
                <p className="text-right text-sm grey-text">Send Code</p>
                <div>
                    <CustomInput
                        type="password"
                        label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                        placeholder={intl.formatMessage({
                            id: 'page.body.profile.header.account.content.password.new',
                        })}
                        defaultLabel="New password"
                        handleChangeInput={handleChangeNewPassword}
                        inputValue={newPassword}
                        handleFocusInput={handleFocusNewPassword}
                        classNameLabel="white-text text-sm mb-8"
                        classNameInput=""
                        autoFocus={false}
                        labelVisible
                    />
                </div>
                <div>
                    <PasswordStrengthMeter
                        minPasswordEntropy={passwordMinEntropy()}
                        currentPasswordEntropy={props.currentPasswordEntropy}
                        passwordExist={newPassword !== ''}
                        passwordErrorFirstSolved={passwordErrorFirstSolved}
                        passwordErrorSecondSolved={passwordErrorSecondSolved}
                        passwordErrorThirdSolved={passwordErrorThirdSolved}
                        passwordPopUp={passwordPopUp}
                        translate={translate}
                    />
                </div>
                <div className="mt-3">
                    <CustomInput
                        type="password"
                        label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.conf' })}
                        placeholder={intl.formatMessage({
                            id: 'page.body.profile.header.account.content.password.conf',
                        })}
                        defaultLabel="Password confirmation"
                        handleChangeInput={setConfirmationPassword}
                        inputValue={confirmationPassword}
                        handleFocusInput={() => setConfirmPasswordFocus(!confirmPasswordFocus)}
                        classNameLabel="white-text text-sm mb-8"
                        classNameInput=""
                        autoFocus={false}
                        labelVisible
                    />
                </div>

                <div className="form-button-group mt-4">
                    <div className="footer-section">
                        <Button block={true} disabled={!isValidForm()} onClick={handleShow} size="lg" variant="primary">
                            {intl.formatMessage({
                                id: 'page.body.profile.header.account.content.password.button.change',
                            })}
                        </Button>
                    </div>
                </div>

                <Modal centered show={show} onHide={handleClose} className="w-100">
                    <Modal.Header className="rounded-top-10 p-0 mt-24 mb-24 justify-content-center border-none">
                        <h6 className="text-md white-text m-0">Reset Password</h6>
                    </Modal.Header>
                    <Modal.Body className="tos-content mb-24 p-0">
                        <p className="grey-text-accent text-center m-0">
                            Are you sure you want to change your password? ,make sure you remember your new password
                        </p>
                    </Modal.Body>
                    <Modal.Footer className="d-flex justify-content-center p-0 mb-24 border-none rounded-bottom-10">
                        <Button type="button" className="btn-danger mr-24" onClick={handleClose}>
                            Close
                        </Button>
                        <Button className="btn-primary" onClick={handleChangePassword}>
                            Continue
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        );
    };

    return <React.Fragment>{renderForm()}</React.Fragment>;
};

export const ChangePassword = React.memo(ChangePasswordComponent);
