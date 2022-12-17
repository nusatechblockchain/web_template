import * as React from 'react';
import { ArrowLeft } from '../../assets/Arrow';
import { CustomInput } from '../../../desktop/components';
import { EMAIL_REGEX } from '../../../helpers';
import { useHistory } from 'react-router';

const ForgotPasswordMobileScreen: React.FC = () => {
    const [emailValue, setEmailvalue] = React.useState('');
    const isValidForm = () => !emailValue.match(EMAIL_REGEX);
    const history = useHistory();

    const handleForgotPassword = () => {
        history.push('/reset-password');
    };

    return (
        <React.Fragment>
            <div className="mobile-container  no-header dark-bg-main">
                <ArrowLeft className={'back'} />
                <h1 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Forgot Password</h1>
                <p className="text-sm grey-text">
                    Please enter your email address or phone. You will receive a code to create a new password{' '}
                </p>
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
                <button
                    type="button"
                    className="btn btn-primary btn-block btn-mobile"
                    disabled={isValidForm()}
                    onClick={handleForgotPassword}>
                    Submit
                </button>
            </div>
        </React.Fragment>
    );
};

export { ForgotPasswordMobileScreen };
