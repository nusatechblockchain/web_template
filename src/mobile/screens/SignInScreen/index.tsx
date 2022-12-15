import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectSignInRequire2FA } from '../../../modules/user/auth';
import { CustomInput } from '../../../desktop/components';

const SignInMobileScreen: React.FC = () => {
    const require2FA = useSelector(selectSignInRequire2FA);

    return (
        <React.Fragment>
            <div className="mobile-container dark-bg-main">
                <a href="../../Home/BeforeLogin/index.html">
                    <img src="../../../assets/icons/arrow-left.svg" alt="back" className="back" />
                </a>
                <h1 className="heading-one">Digicoins Login</h1>
                <div className="d-flex justify-content-start align-items-center">
                    <img src="/assets/icons/unlock.svg" alt="unlock" className="icon" />
                    <p className="text-unlock">https://apps.digicoins.co/signin</p>
                </div>
                <form
                    className="form-sign-up tab-pane fade show active"
                    id="nav-email"
                    role="tabpanel"
                    aria-labelledby="nav-email-tab">
                    <CustomInput
                        defaultLabel="email"
                        inputValue={'value'}
                        label="email"
                        placeholder="your email address"
                        type="email"
                        classNameLabel="white-text "
                    />
                    <div className="form-group">
                        <label htmlFor="password" className="label-form">
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                type="password"
                                className="form-control input-password"
                                id="password"
                                placeholder="Password"
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
                        <p
                            data-toggle="modal"
                            data-target="#modal-forgot-password"
                            className="text-right w-100 progress-desc">
                            Forgot Password?
                        </p>
                    </div>
                    <a href="../AuthenticationCode/index.html" className="btn btn-login">
                        Login
                    </a>
                    <p className="create-account">
                        Create Digicoins account? <a href="../SignUp/index.html">Sign up</a>
                    </p>
                </form>
            </div>
        </React.Fragment>
    );
};

export { SignInMobileScreen };
