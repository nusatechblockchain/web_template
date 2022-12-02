import cr from 'classnames';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CustomInput, PasswordStrengthMeter } from '../';
import { isUsernameEnabled } from '../../../api';
import { captchaType, passwordMinEntropy } from '../../../api/config';
import {
    EMAIL_REGEX,
    ERROR_LONG_USERNAME,
    ERROR_SHORT_USERNAME,
    PASSWORD_REGEX,
    USERNAME_REGEX,
} from '../../../helpers';
import { GeetestCaptchaResponse } from '../../../modules';
import { selectMobileDeviceState } from '../../../modules/public/globalSettings';

export interface SignUpFormProps {
    isLoading?: boolean;
    title?: string;
    onSignUp: () => void;
    onSignIn?: () => void;
    className?: string;
    image?: string;
    labelSignIn?: string;
    labelSignUp?: string;
    usernameLabel?: string;
    emailLabel?: string;
    passwordLabel?: string;
    confirmPasswordLabel?: string;
    referalCodeLabel?: string;
    termsMessage?: string;
    refId: string;
    password: string;
    username: string;
    email: string;
    confirmPassword: string;
    handleChangeUsername: (value: string) => void;
    handleChangeEmail: (value: string) => void;
    handleChangePassword: (value: string) => void;
    handleChangeConfirmPassword: (value: string) => void;
    handleChangeRefId: (value: string) => void;
    hasConfirmed: boolean;
    clickCheckBox: (e: any) => void;
    validateForm: () => void;
    emailError: string;
    passwordError: string;
    confirmationError: string;
    handleFocusUsername: () => void;
    handleFocusEmail: () => void;
    handleFocusPassword: () => void;
    handleFocusConfirmPassword: () => void;
    handleFocusRefId: () => void;
    confirmPasswordFocused: boolean;
    refIdFocused: boolean;
    usernameFocused: boolean;
    emailFocused: boolean;
    passwordFocused: boolean;
    renderCaptcha: JSX.Element | null;
    reCaptchaSuccess: boolean;
    geetestCaptchaSuccess: boolean;
    captcha_response?: string | GeetestCaptchaResponse;
    currentPasswordEntropy: number;
    passwordErrorFirstSolved: boolean;
    passwordErrorSecondSolved: boolean;
    passwordErrorThirdSolved: boolean;
    passwordPopUp: boolean;
    myRef: any;
    passwordWrapper: any;
    translate: (id: string) => string;
}

const SignUpFormComponent: React.FC<SignUpFormProps> = ({
    username,
    email,
    confirmPassword,
    refId,
    onSignIn,
    image,
    isLoading,
    labelSignIn,
    labelSignUp,
    usernameLabel,
    emailLabel,
    confirmPasswordLabel,
    passwordFocused,
    referalCodeLabel,
    termsMessage,
    geetestCaptchaSuccess,
    hasConfirmed,
    reCaptchaSuccess,
    currentPasswordEntropy,
    passwordPopUp,
    password,
    passwordLabel,
    emailError,
    translate,
    confirmationError,
    usernameFocused,
    emailFocused,
    passwordErrorFirstSolved,
    passwordErrorSecondSolved,
    confirmPasswordFocused,
    handleChangePassword,
    passwordErrorThirdSolved,
    handleFocusPassword,
    refIdFocused,
    validateForm,
    onSignUp,
    handleChangeUsername,
    handleFocusUsername,
    handleChangeEmail,
    handleFocusEmail,
    handleChangeConfirmPassword,
    handleFocusConfirmPassword,
    handleChangeRefId,
    handleFocusRefId,
    clickCheckBox,
    renderCaptcha,
}) => {
    const isMobileDevice = useSelector(selectMobileDeviceState);
    const disableButton = React.useMemo((): boolean => {
        const captchaTypeValue = captchaType();

        if (!hasConfirmed || isLoading || !email.match(EMAIL_REGEX) || !password || !confirmPassword ||
            (isUsernameEnabled() && !username.match(USERNAME_REGEX))) {

            return true;
        }

        if (captchaTypeValue === 'recaptcha' && !reCaptchaSuccess) {
            return true;
        }

        if (captchaTypeValue === 'geetest' && !geetestCaptchaSuccess) {
            return true;
        }

        return false;
    }, [
        captchaType,
        confirmPassword,
        username,
        email,
        geetestCaptchaSuccess,
        hasConfirmed,
        isLoading,
        password,
        reCaptchaSuccess,
    ]);

    const renderPasswordInput = React.useCallback(() => {
        return (
            <div>
                <CustomInput
                    type="password"
                    label={passwordLabel || 'Password'}
                    placeholder={passwordLabel || 'Password'}
                    defaultLabel="Password"
                    handleChangeInput={handleChangePassword}
                    inputValue={password}
                    handleFocusInput={handleFocusPassword}
                    classNameLabel=""
                    classNameInput=""
                    autoFocus={false}
                />
                {password ? (
                    <PasswordStrengthMeter
                        minPasswordEntropy={passwordMinEntropy()}
                        currentPasswordEntropy={currentPasswordEntropy}
                        passwordExist={password !== ''}
                        passwordErrorFirstSolved={passwordErrorFirstSolved}
                        passwordErrorSecondSolved={passwordErrorSecondSolved}
                        passwordErrorThirdSolved={passwordErrorThirdSolved}
                        passwordPopUp={passwordPopUp}
                        translate={translate}
                    />
                ) : null}
            </div>
        );
    }, [
        currentPasswordEntropy,
        password,
        passwordFocused,
        passwordLabel,
        passwordPopUp,
        handleChangePassword,
        handleFocusPassword,
        passwordErrorFirstSolved,
        passwordErrorSecondSolved,
        passwordErrorThirdSolved,
        translate,
    ]);

    const handleSubmitForm = React.useCallback(() => {
        onSignUp();
    }, [onSignUp]);

    const isValidForm = React.useCallback(() => {
        const isEmailValid = email.match(EMAIL_REGEX);
        const isPasswordValid = password.match(PASSWORD_REGEX);
        const isConfirmPasswordValid = password === confirmPassword;

        return email && isEmailValid && password && isPasswordValid && confirmPassword && isConfirmPasswordValid;
    }, [confirmPassword, email, password]);

    const handleClick = React.useCallback(
        (e?: React.FormEvent<HTMLInputElement>) => {
            if (e) {
                e.preventDefault();
            }

            if (!isValidForm()) {
                validateForm();
            } else {
                handleSubmitForm();
            }
        },
        [handleSubmitForm, isValidForm, validateForm]
    );


    const renderUsernameError = (nick: string) => {
        return nick.length < 4 ? translate(ERROR_SHORT_USERNAME) : translate(ERROR_LONG_USERNAME);
    };

    return (
        <React.Fragment>
            <h3>Register</h3>
            <div className="field">
                <CustomInput
                    type="text"
                    label={usernameLabel || 'Username'}
                    placeholder={usernameLabel || 'Username'}
                    defaultLabel="Username"
                    handleChangeInput={handleChangeUsername}
                    inputValue={username}
                    handleFocusInput={handleFocusUsername}
                    classNameLabel=""
                    classNameInput=""
                    autoFocus={!isMobileDevice}
                />
                {!username.match(USERNAME_REGEX) && !usernameFocused && username.length ? (
                    <div className="invalid-feedback">
                        {renderUsernameError(username)}
                    </div>
                ) : null}        
            </div>

            <div className="field">
                <CustomInput
                    type="email"
                    label={emailLabel || 'Email'}
                    placeholder={emailLabel || 'Email'}
                    defaultLabel="Email"
                    handleChangeInput={handleChangeEmail}
                    inputValue={email}
                    handleFocusInput={handleFocusEmail}
                    classNameLabel=""
                    classNameInput=""
                    autoFocus={!isUsernameEnabled() && !isMobileDevice}
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}      
            </div>

            {renderPasswordInput()} 

            <div className="field">
                <CustomInput
                    type="password"
                    label={confirmPasswordLabel || 'Confirm Password'}
                    placeholder={confirmPasswordLabel || 'Confirm Password'}
                    defaultLabel="Confirm Password"
                    handleChangeInput={handleChangeConfirmPassword}
                    inputValue={confirmPassword}
                    handleFocusInput={handleFocusConfirmPassword}
                    classNameLabel=""
                    classNameInput=""
                    autoFocus={false}
                />
            </div> 

            <CustomInput
                type="text"
                label={referalCodeLabel || 'Referral code'}
                placeholder={referalCodeLabel || 'Referral code'}
                defaultLabel="Referral code"
                handleChangeInput={handleChangeRefId}
                inputValue={refId}
                handleFocusInput={handleFocusRefId}
                classNameLabel=""
                classNameInput=""
                autoFocus={false}
            />   

            <div className='mt-4 mb-4'>
                {renderCaptcha}
            </div>


            <label className="checkbox" onClick={clickCheckBox}>
                <input className="checkbox__input" type="checkbox" id="agreeWithTerms" checked={hasConfirmed} onChange={clickCheckBox}/>
                <span className="checkbox__inner">
                <span className="checkbox__tick" />
                <span className="checkbox__text">
                    By signing up I agree that I’m 18 years of age or older, to the{" "}
                    <a className="checkbox__link" href="#">
                        User Agreements 
                    </a> , <a className="checkbox__link" href="#">
                        Privacy Policy
                    </a> , <a className="checkbox__link" href="#">
                        Cookie Policy
                    </a>
                </span>
                </span>
            </label>

            <Button
                block={true}
                type="button"
                disabled={disableButton}
                onClick={(e) => handleClick(e as any)}
                size="lg"
                className='button registration__button'
                variant="primary">
                {isLoading ? 'Loading...' : labelSignUp ? labelSignUp : 'Sign up'}
            </Button>
        </React.Fragment>
    );
};

export const SignUpForm = React.memo(SignUpFormComponent);
