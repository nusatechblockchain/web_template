import * as React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { selectSignInRequire2FA } from '../../../modules/user/auth';
import { CustomInput } from '../../../desktop/components';
import { ModalMobile } from '../../components';
import { ArrowLeft } from '../../assets/Arrow';
import { UnlockIcon } from '../../assets/UnlockIcon';
import { ModalCheck } from '../../assets/Modal';

const SignInMobile: React.FC = () => {
    const require2FA = useSelector(selectSignInRequire2FA);
    const [showModal, setShowModal] = React.useState(false);
    const [emailValue, setEmailvalue] = React.useState('');
    const [passwordValue, setPasswordvalue] = React.useState('');
    const history = useHistory();

    const disabelButton = () => emailValue == '' || passwordValue == '';

    const handleSignIn = () => {
        history.push('profile');
    };

    const renderModal = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalCheck className={''} />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Forgot Password?</h5>
            <p className="text-center text-sm grey-text">
                Please reset the password by entering the username that has been given
            </p>
            <Link to={'/forgot-password'} className="btn btn-primary btn-mobile btn-block mb-3">
                Continue
            </Link>
            <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModal(false)}>
                Close
            </button>
        </React.Fragment>
    );
    return (
        <React.Fragment>
            <Link to={''}>
                <ArrowLeft className={'back'} />
            </Link>
            <h1 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Digicoins Login</h1>
            <div className="d-flex justify-content-start align-items-center mb-4">
                <UnlockIcon className={'mr-2'} />
                <p className="text-xs grey-text font-bold mb-0">https://apps.digicoins.co/signin</p>
            </div>
            <form
                className="form-sign-up tab-pane fade show active"
                id="nav-email"
                role="tabpanel"
                aria-labelledby="nav-email-tab">
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
                    defaultLabel="Password"
                    inputValue={passwordValue}
                    label="Password"
                    placeholder="your password"
                    type="password"
                    classNameLabel="white-text text-sm"
                    classNameInput="text-ms input-mobile"
                    handleChangeInput={(e) => setPasswordvalue(e)}
                    labelVisible
                />
                <p className="text-right w-100 contrast-text text-sm" onClick={() => setShowModal(true)}>
                    Forgot Password?
                </p>
                <button
                    className="btn btn-primary btn-block btn-mobile"
                    disabled={disabelButton()}
                    onClick={handleSignIn}>
                    Login
                </button>
                <p className="create-account text-xs text-center font-semibold grey-text-accent mt-3">
                    Create Digicoins account?{' '}
                    <Link to={'/signup'} className="contrast-text">
                        Sign up
                    </Link>
                </p>
            </form>

            <ModalMobile content={renderModal()} show={showModal} />
        </React.Fragment>
    );
};

export { SignInMobile };
