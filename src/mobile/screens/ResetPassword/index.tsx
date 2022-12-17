import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { passwordMinEntropy } from '../../../api/config';
import { CustomInput, PasswordStrengthMeter } from '../../../desktop/components';
import {
    changeForgotPasswordFetch,
    changeLanguage,
    entropyPasswordFetch,
    forgotPassword,
    resetCaptchaState,
    selectChangeForgotPasswordSuccess,
    selectCurrentPasswordEntropy,
    selectCaptchaResponse,
    selectCurrentLanguage,
    selectForgotPasswordError,
    selectForgotPasswordSuccess,
    selectGeetestCaptchaSuccess,
    selectRecaptchaSuccess,
} from '../../../modules';
import {
    passwordErrorFirstSolution,
    passwordErrorSecondSolution,
    passwordErrorThirdSolution,
    PASSWORD_REGEX,
    USERNAME_REGEX,
    EMAIL_REGEX,
    setDocumentTitle,
} from '../../../helpers';
import { captchaType } from '../../../api/config';
import { Captcha } from 'src/components';
import { ModalMobile } from '../../components';
import { ModalResetPassword } from '../../assets/Modal';
import { ModalCheck } from '../../assets/Modal';
import { ArrowLeft } from '../../assets/Arrow';
import PinInput from 'react-pin-input';

type LocationProps = {
    search: string;
    state: {
        email: string;
    };
};

const ResetPasswordMobileScreen: React.FC = () => {
    const intl = useIntl();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = (useLocation() as unknown) as LocationProps;

    const [codeValue, setCodeValue] = React.useState('');
    const [passwordValue, setPasswordvalue] = React.useState('');
    const [confirmPasswordValue, setConfirmPasswordValue] = React.useState('');

    const [passwordFocus, setPasswordFocus] = React.useState(false);
    const [confirmPasswordFocus, setConfirmPasswordFocus] = React.useState(false);

    const [passwordError, setPasswordError] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    const [showModalConfirm, setShowModalConfirm] = React.useState(false);
    const [showModalResendCode, setShowModalResendCode] = React.useState(false);

    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);

    const [passwordPopUp, setPasswordPopUp] = React.useState(false);
    const [passwordMatch, setPasswordMatch] = React.useState(true);

    const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);
    const changeForgotPassword = useSelector(selectChangeForgotPasswordSuccess);
    const captcha_response = useSelector(selectCaptchaResponse);
    const success = useSelector(selectForgotPasswordSuccess);
    const error = useSelector(selectForgotPasswordError);
    const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
    const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
    const i18n = useSelector(selectCurrentLanguage);

    const translate = (key: string) => intl.formatMessage({ id: key });

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

        setPasswordvalue(value);
        setTimeout(() => {
            dispatch(entropyPasswordFetch({ password: value }));
        }, 100);
    };

    const handleChangeConfirmPassword = (value: string) => {
        setConfirmPasswordValue(value);
        setConfirmPasswordFocus(true);
    };

    const handleFocusNewPassword = () => {
        setPasswordPopUp(!passwordPopUp);
        setPasswordFocus(!passwordFocus);
    };

    const handleFocusConfirmPassword = () => {
        setConfirmPasswordFocus(!confirmPasswordFocus);
    };

    const isValidForm = () => {
        if (
            !passwordErrorFirstSolved ||
            !passwordErrorSecondSolved ||
            !passwordErrorThirdSolved ||
            codeValue.length < 6 ||
            !passwordValue ||
            passwordValue != confirmPasswordValue
        ) {
            return true;
        }
    };

    const handleChangeCode = (value: string) => {
        setCodeValue(value);
    };

    const handleDispatchCode = (payload) => {
        dispatch(
            changeForgotPasswordFetch({
                ...payload,
                reset_password_token: codeValue,
                email: location.state.email || '',
            })
        );
    };

    const handleChangePassword = () => {
        const payload = {
            password: passwordValue,
            confirm_password: confirmPasswordValue,
        };

        handleDispatchCode(payload);

        setShowModalConfirm(false);
    };

    const handleResendCode = () => {
        const email = location.state.email;

        switch (captchaType()) {
            case 'recaptcha':
            case 'geetest':
                dispatch(forgotPassword({ email, captcha_response }));
                break;
            default:
                dispatch(forgotPassword({ email }));
                break;
        }

        // if (success) {
        setShowModalResendCode(!showModalResendCode);
        // }

        dispatch(resetCaptchaState());
    };

    React.useEffect(() => {
        setDocumentTitle('Reset Password');
        const lang = new URLSearchParams(location.search).get('lang');
        if (lang) {
            changeLanguage(lang.toLowerCase());
        }
        const state = location.state;
        if (!state || (state && !state.email)) {
            history.push('/signin');
        }
    }, []);

    React.useEffect(() => {
        if (passwordValue == confirmPasswordValue) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [confirmPasswordValue]);

    React.useEffect(() => {
        if (changeForgotPassword) {
            history.push('/signin');
        }
    }, [changeForgotPassword]);

    const renderModalConfirm = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalResetPassword />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Change Password Confirmation</h5>
            <p className="text-center text-sm grey-text">
                Are you sure you want to change your password? ,make sure you remember your new password
            </p>
            <button onClick={handleChangePassword} className="btn btn-primary btn-mobile btn-block mb-3">
                Continue
            </button>
            <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModalConfirm(false)}>
                Close
            </button>
        </React.Fragment>
    );

    const renderModalResendCode = () => (
        <React.Fragment>
            <div className="text-center w-100">
                <h6 className="text-md white-text mb-24">Resend Code</h6>
            </div>
            <div className="mb-24">
                <Captcha error={error} success={success} />
            </div>
            <div className="d-flex justify-content-center p-0 border-none rounded-bottom-10">
                <button
                    type="button"
                    className="btn-danger mr-24"
                    onClick={() => setShowModalResendCode(!showModalResendCode)}>
                    Close
                </button>
                <button className="btn-primary" disabled={!captcha_response ? true : false} onClick={handleResendCode}>
                    Resend
                </button>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className="mobile-container no-header dark-bg-main">
                <ArrowLeft className={'back'} />
                <h1 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Change Password</h1>
                <p className="text-sm grey-text">
                    Change your password and by entering the code that has been sent previously
                </p>
                <div className="mb-2">
                    <div>
                        <p className="white-text text-sm">Pin Code</p>
                        <PinInput
                            length={6}
                            onChange={handleChangeCode}
                            onComplete={handleChangeCode}
                            type="numeric"
                            inputMode="number"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: '8px',
                            }}
                            inputStyle={{
                                background: '#15191D',
                                borderRadius: '4px',
                                borderColor: '#15191D',
                                fontSize: '20px',
                                color: ' #DEDEDE',
                            }}
                            inputFocusStyle={{ fontSize: '20px', color: 'color: #23262F' }}
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>
                    <div className="text-right">
                        <span
                            onClick={() => setShowModalResendCode(!showModalResendCode)}
                            className="text-right mb-0 text-sm grey-text cursor-pointer">
                            Resend Code
                        </span>
                    </div>
                </div>

                <CustomInput
                    defaultLabel="Password "
                    inputValue={passwordValue}
                    label="Password"
                    placeholder="Password"
                    type="password"
                    labelVisible
                    classNameLabel="white-text text-sm"
                    classNameInput={`input-mobile ${
                        passwordFocus &&
                        (!passwordErrorFirstSolved || !passwordErrorSecondSolved || !passwordErrorThirdSolved) &&
                        'error'
                    }`}
                    autoFocus={false}
                    handleFocusInput={handleFocusNewPassword}
                    handleChangeInput={handleChangeNewPassword}
                />

                {passwordFocus &&
                    (!passwordErrorFirstSolved || !passwordErrorSecondSolved || !passwordErrorThirdSolved) && (
                        <p className="danger-text m-0 mb-24 text-xs">Password Strength must be GOOD</p>
                    )}
                <div>
                    <PasswordStrengthMeter
                        minPasswordEntropy={passwordMinEntropy()}
                        currentPasswordEntropy={currentPasswordEntropy}
                        passwordExist={passwordValue !== ''}
                        passwordErrorFirstSolved={passwordErrorFirstSolved}
                        passwordErrorSecondSolved={passwordErrorSecondSolved}
                        passwordErrorThirdSolved={passwordErrorThirdSolved}
                        passwordPopUp={passwordPopUp}
                        translate={translate}
                    />
                </div>
                <CustomInput
                    defaultLabel="Confirm Password"
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                    classNameLabel="white-text text-sm"
                    classNameInput={`text-ms input-mobile ${
                        confirmPasswordFocus && confirmPasswordValue !== passwordValue && 'error'
                    }`}
                    autoFocus={false}
                    inputValue={confirmPasswordValue}
                    handleFocusInput={handleFocusConfirmPassword}
                    handleChangeInput={handleChangeConfirmPassword}
                    labelVisible
                />
                {confirmPasswordFocus && confirmPasswordValue !== passwordValue && (
                    <p className="text-xs danger-text m-0 mb-24">Password Confirmation doesn't match</p>
                )}

                <button
                    type="button"
                    className="btn btn-primary btn-block btn-mobile"
                    onClick={() => setShowModalConfirm(true)}
                    disabled={isValidForm()}>
                    Submit
                </button>
            </div>

            <ModalMobile content={renderModalConfirm()} show={showModalConfirm} />

            {showModalResendCode && <ModalMobile content={renderModalResendCode()} show={showModalResendCode} />}
        </React.Fragment>
    );
};

export { ResetPasswordMobileScreen };
