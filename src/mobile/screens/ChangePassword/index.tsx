import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { CustomInput, PasswordStrengthMeter } from '../../../desktop/components';
import { ArrowLeft } from '../../assets/Arrow';
import { useDispatch, useSelector } from 'react-redux';
import { passwordMinEntropy } from '../../../api/config';
import { useHistory } from 'react-router';
import { entropyPasswordFetch, selectCurrentPasswordEntropy } from '../../../modules';
import { passwordErrorFirstSolution, passwordErrorSecondSolution, passwordErrorThirdSolution } from '../../../helpers';

const ChangePasswordMobileScreen: React.FC = () => {
    const [pinCodeValue, setPinCodevalue] = React.useState('');
    const [passwordNewFocus, setPasswordNewFocus] = React.useState(false);
    const [passwordValue, setPasswordvalue] = React.useState('');
    const [oldPasswordValue, setOldPasswordvalue] = React.useState('');
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
        } else {
            return false;
        }
    };

    console.log(isValidForm);

    React.useEffect(() => {
        if (passwordValue == confirmPasswordValue) {
            setPasswordMatch(true);
        } else {
            setPasswordMatch(false);
        }
    }, [confirmPasswordValue]);

    const handleChangePassword = () => {
        history.push('/profile');
    };
    return (
        <React.Fragment>
            <div className="mobile-container change-password home-screen dark-bg-main">
                <div className="head-container position-relative">
                    <Link to={''} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <h1 className="text-center text-md grey-text-accent font-bold">Profile Setting</h1>
                </div>
                <div className="divider" />
                <form className="form-container">
                    <p className="text-sm grey-text">
                        Change your password and by entering the code that has been sent previously
                    </p>
                    <CustomInput
                        defaultLabel="Old Password"
                        inputValue={oldPasswordValue}
                        label="Old Password"
                        placeholder="Old password"
                        type="password"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setOldPasswordvalue(e)}
                        labelVisible
                    />
                    <CustomInput
                        defaultLabel="Set New Password "
                        inputValue={passwordValue}
                        label="Set New Password"
                        placeholder="Set New Password"
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
                        defaultLabel="Confirm New Password"
                        inputValue={confirmPasswordValue}
                        label="Confirm New Password"
                        placeholder="Confirm New password"
                        type="password"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setConfirmPasswordvalue(e)}
                        labelVisible
                    />
                    {!passwordMatch && <p className="danger-text font-normal text-xs">Password doesn't match</p>}
                    <button
                        type="button"
                        className="btn-primary btn-block btn-mobile"
                        onClick={handleChangePassword}
                        disabled={isValidForm()}>
                        Submit
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
};

export { ChangePasswordMobileScreen };
