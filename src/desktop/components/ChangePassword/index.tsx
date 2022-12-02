import * as React from 'react';
import { Button } from 'react-bootstrap';
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


export const ChangePasswordComponent = props => {
    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmationPassword, setConfirmationPassword] = React.useState('');
    const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);
    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);
    const [passwordPopUp, setPasswordPopUp] = React.useState(false);
    const [code, setCode] = React.useState('');

    const intl = useIntl();

    const handleChangePassword = () => {
        const payload = props.hideOldPassword
        ? {
            password: newPassword,
            confirm_password: confirmationPassword,
        } : {
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
        setCode(e)
        props.handleChangePin(e)
    }

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

    const translate = (key: string) => intl.formatMessage({id: key});

    const isValidForm = () => {
        const isNewPasswordValid = newPassword.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = newPassword === confirmationPassword;
        const isOldPasswordValid = (!props.hideOldPassword && oldPassword) || true;

        return isOldPasswordValid && isNewPasswordValid && isConfirmPasswordValid;
    };

     const renderForm = () => {
        return (
            <React.Fragment>
                <h5 className='mb-2'>We send an email to your address, please check your inbox and find the confirmation code we've sent you</h5>  
                <PinInput 
                    length={6} 
                    secret 
                    onChange={(e) => handleChangeOTP(e)}
                    onComplete={(e) => handleChangeOTP(e)}
                    type="numeric" 
                    inputMode="number"
                    style={{padding: '5px'}}  
                    autoSelect={true}
                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                />
                <div>
                    <CustomInput
                        type="password"
                        label={intl.formatMessage({id: 'page.body.profile.header.account.content.password.new'})}
                        placeholder={intl.formatMessage({id: 'page.body.profile.header.account.content.password.new'})}
                        defaultLabel="New password"
                        handleChangeInput={handleChangeNewPassword}
                        inputValue={newPassword}
                        handleFocusInput={handleFocusNewPassword}
                        classNameLabel=""
                        classNameInput=""
                        autoFocus={false}
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
                <div className='mt-3'>
                    <CustomInput
                        type="password"
                        label={intl.formatMessage({id: 'page.body.profile.header.account.content.password.conf'})}
                        placeholder={intl.formatMessage({id: 'page.body.profile.header.account.content.password.conf'})}
                        defaultLabel="Password confirmation"
                        handleChangeInput={setConfirmationPassword}
                        inputValue={confirmationPassword}
                        handleFocusInput={() => setConfirmPasswordFocus(!confirmPasswordFocus)}
                        classNameLabel=""
                        classNameInput=""
                        autoFocus={false}
                    />
                </div>

                <div className="form-button-group mt-4">
                    <div className='footer-section'>
                        <Button
                            block={true}
                            disabled={!isValidForm()}
                            onClick={handleChangePassword}
                            size="lg"
                            variant="primary"
                        >
                            {intl.formatMessage({id: 'page.body.profile.header.account.content.password.button.change'})}
                        </Button>
                    </div>
                </div>
            </React.Fragment>
        );
    };


    return (
        <React.Fragment>
            {renderForm()}
        </React.Fragment>
    );
};

export const ChangePassword = React.memo(ChangePasswordComponent);
