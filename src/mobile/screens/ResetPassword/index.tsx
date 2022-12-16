import * as React from 'react';
import { useIntl } from 'react-intl';
import { CustomInput, PasswordStrengthMeter } from '../../../desktop/components';
import { ArrowLeft } from '../../assets/Arrow';
import { useDispatch, useSelector } from 'react-redux';
import { passwordMinEntropy } from '../../../api/config';
import { entropyPasswordFetch, selectCurrentPasswordEntropy } from '../../../modules';
import {
    passwordErrorFirstSolution,
    passwordErrorSecondSolution,
    passwordErrorThirdSolution,
    PASSWORD_REGEX,
    USERNAME_REGEX,
    EMAIL_REGEX,
} from '../../../helpers';

const ResetPasswordMobileScreen: React.FC = () => {
    const [pinCodeValue, setPinCodevalue] = React.useState('');
    const [passwordNewFocus, setPasswordNewFocus] = React.useState(false);
    const [passwordValue, setPasswordvalue] = React.useState('');
    const dispatch = useDispatch();
    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);
    const [passwordPopUp, setPasswordPopUp] = React.useState(false);
    const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);
    const intl = useIntl();

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

    return (
        <React.Fragment>
            <div className="mobile-container dark-bg-main">
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
                <div className="form-group">
                    <div className="form-group">
                        <label htmlFor="password" className="label-form p-0 m-0">
                            Confirm Password
                        </label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control input-password"
                                id="password"
                                placeholder="Confirm Password"
                            />
                            <div className="input-group-append">
                                <span className="input-group-text" id="basic-addon2">
                                    <img
                                        src="../../../assets/icons/eye-off.svg"
                                        alt="visibility"
                                        className="visibility"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>
                    <button data-toggle="modal" data-target="#modal-confirmation" className="btn btn-primary">
                        Submit
                    </button>
                </div>
            </div>
        </React.Fragment>
    );
};

export { ResetPasswordMobileScreen };
