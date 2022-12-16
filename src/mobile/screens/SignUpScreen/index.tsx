import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectSignInRequire2FA } from '../../../modules/user/auth';
import { Link } from 'react-router-dom';
import { CustomInput, PasswordStrengthMeter } from '../../../desktop/components';
import { passwordMinEntropy } from '../../../api/config';
import { ArrowLeft } from '../../assets/Arrow';
import { DropdownSmall } from '../../assets/Dropdown';
import { entropyPasswordFetch, selectCurrentPasswordEntropy } from '../../../modules';
import {
    passwordErrorFirstSolution,
    passwordErrorSecondSolution,
    passwordErrorThirdSolution,
    PASSWORD_REGEX,
    USERNAME_REGEX,
    EMAIL_REGEX,
} from '../../../helpers';

const SignUpMobileScreen: React.FC = () => {
    const require2FA = useSelector(selectSignInRequire2FA);
    const [usernameValue, setUsernamevalue] = React.useState('');
    const [emailValue, setEmailvalue] = React.useState('');
    const [passwordValue, setPasswordvalue] = React.useState('');
    const [referralValue, setReferralvalue] = React.useState('');
    const [showReferral, setShowReferral] = React.useState(false);
    const [passwordNewFocus, setPasswordNewFocus] = React.useState(false);
    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);
    const [passwordPopUp, setPasswordPopUp] = React.useState(false);
    const dispatch = useDispatch();
    const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);
    const intl = useIntl();

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

    const translate = (key: string) => intl.formatMessage({ id: key });

    const isValidForm = () => {
        if (
            !passwordErrorFirstSolved ||
            !passwordErrorSecondSolved ||
            !passwordErrorThirdSolved ||
            !emailValue.match(EMAIL_REGEX) ||
            !passwordValue ||
            !usernameValue.match(USERNAME_REGEX)
        ) {
            return true;
        }
    };

    console.log(isValidForm);

    return (
        <React.Fragment>
            <div className="mobile-container dark-bg-main">
                <Link to={''}>
                    <ArrowLeft className={'back'} />
                </Link>
                <h2 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Create Personal Account</h2>
                <form
                    className="form-sign-up tab-pane fade show active"
                    id="nav-username"
                    role="tabpanel"
                    aria-labelledby="nav-username-tab">
                    <CustomInput
                        defaultLabel="username"
                        inputValue={usernameValue}
                        label="username"
                        placeholder="Your Username"
                        type="username"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setUsernamevalue(e)}
                        labelVisible
                    />
                    <CustomInput
                        defaultLabel="email"
                        inputValue={emailValue}
                        label="Email"
                        placeholder="your email address"
                        type="email"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setEmailvalue(e)}
                        labelVisible
                    />
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

                    <div className="group mb-3">
                        <label
                            className="text-sm white-text font-normal"
                            onClick={() => setShowReferral(!showReferral)}>
                            Referral ID (Optional) <DropdownSmall className={showReferral ? 'rotate-180' : ''} />
                        </label>
                        {showReferral ? (
                            <CustomInput
                                defaultLabel="Referral ID"
                                inputValue={referralValue}
                                label="Referral ID"
                                placeholder="Referral ID"
                                type="text"
                                classNameLabel="white-text text-sm d-none"
                                classNameInput="text-ms input-mobile"
                                handleChangeInput={(e) => setReferralvalue(e)}
                                labelVisible={false}
                            />
                        ) : (
                            ''
                        )}
                    </div>

                    <button className="btn btn-primary btn-block btn-mobile" disabled={isValidForm()}>
                        Create Account
                    </button>
                    <p className="create-account text-xs text-center font-semibold grey-text-accent mt-3">
                        Already have an Account?
                        <Link to={'/signin'} className="contrast-text">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </React.Fragment>
    );
};

export { SignUpMobileScreen };
