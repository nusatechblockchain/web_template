import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { CustomInput, PasswordStrengthMeter } from '../../../desktop/components';
import { ArrowLeft } from '../../assets/Arrow';
import { useDispatch, useSelector } from 'react-redux';
import { passwordMinEntropy } from '../../../api/config';
import { ModalMobile } from '../../components';
import { ModalResetPassword } from '../../assets/Modal';
import { useHistory } from 'react-router';
import { entropyPasswordFetch, selectCurrentPasswordEntropy } from '../../../modules';
import {
    passwordErrorFirstSolution,
    passwordErrorSecondSolution,
    passwordErrorThirdSolution,
    PASSWORD_REGEX,
    USERNAME_REGEX,
    EMAIL_REGEX,
} from '../../../helpers';
import { ModalCheck } from '../../assets/Modal';

const ResetPasswordMobileScreen: React.FC = () => {
    const [pinCodeValue, setPinCodevalue] = React.useState('');
    const [passwordNewFocus, setPasswordNewFocus] = React.useState(false);
    const [passwordValue, setPasswordvalue] = React.useState('');
    const [showModal, setShowModal] = React.useState(false);
    const [confirmPasswordValue, setConfirmPasswordvalue] = React.useState('');
    const dispatch = useDispatch();
    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);
    const [passwordPopUp, setPasswordPopUp] = React.useState(false);
    const [passwordMatch, setPasswordMatch] = React.useState(true);
    const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);
    const intl = useIntl();
    const history = useHistory();

    const translate = (key: string) => intl.formatMessage({ id: key });

    const handleFocusNewPassword = () => {
        setPasswordPopUp(!passwordPopUp);
        setPasswordNewFocus(!passwordNewFocus);
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

        setPasswordvalue(value);
        setTimeout(() => {
            dispatch(entropyPasswordFetch({ password: value }));
        }, 100);
    };

    const isValidForm = () => {
        if (
            !passwordErrorFirstSolved ||
            !passwordErrorSecondSolved ||
            !passwordErrorThirdSolved ||
            pinCodeValue.length < 6 ||
            !passwordValue ||
            passwordValue != confirmPasswordValue
        ) {
            return true;
        }
    };

    React.useEffect(() => {
        if (passwordValue == confirmPasswordValue) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [confirmPasswordValue]);

    const handleResetPassword = () => {
        history.push('/signin');
    };

    const renderModal = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalResetPassword />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Change Password Confirmation</h5>
            <p className="text-center text-sm grey-text">
                Are you sure you want to change your password? ,make sure you remember your new password
            </p>
            <button onClick={handleResetPassword} className="btn btn-primary btn-mobile btn-block mb-3">
                Continue
            </button>
            <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModal(false)}>
                Close
            </button>
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
                    <CustomInput
                        defaultLabel="Pin Code"
                        inputValue={pinCodeValue}
                        label="Pin Code"
                        placeholder="Your Pin Code"
                        type="text"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setPinCodevalue(e)}
                        labelVisible
                        classNameGroup="mb-2"
                    />
                    <p className="text-right mb-0 text-sm grey-text">Resend Code</p>
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
                        passwordNewFocus &&
                        (!passwordErrorFirstSolved || !passwordErrorSecondSolved || !passwordErrorThirdSolved) &&
                        'error'
                    }`}
                    autoFocus={false}
                    handleFocusInput={handleFocusNewPassword}
                    handleChangeInput={handleChangeNewPassword}
                />

                {passwordNewFocus &&
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
                    inputValue={confirmPasswordValue}
                    label="Confirm Password"
                    placeholder="Confirm password"
                    type="password"
                    classNameLabel="white-text text-sm"
                    classNameInput="text-ms input-mobile"
                    handleChangeInput={(e) => setConfirmPasswordvalue(e)}
                    labelVisible
                />
                {!passwordMatch && <p className="danger-text font-normal text-xs">Password doesn't match</p>}
                <button
                    type="button"
                    className="btn btn-primary btn-block btn-mobile"
                    onClick={() => setShowModal(true)}
                    disabled={isValidForm()}>
                    Submit
                </button>
            </div>
            <ModalMobile content={renderModal()} show={showModal} />
        </React.Fragment>
    );
};

export { ResetPasswordMobileScreen };
