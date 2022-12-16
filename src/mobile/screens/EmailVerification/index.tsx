import * as React from 'react';
import { ArrowLeft } from '../../assets/Arrow';
import PinInput from 'react-pin-input';
import { CheckSuccess } from '../../assets/CheckIcon';
import { ErrorIcon } from '../../assets/ErrorIcon';
import { useHistory } from 'react-router';

const EmailVerificationMobileScreen: React.FC = () => {
    const [pinCode, setPinCode] = React.useState('');
    const [verificationStatus, setVerificationStatus] = React.useState({ type: '', show: false });
    const history = useHistory();
    const isValidForm = () => pinCode.length < 6;

    const handleSignUp = () => {
        history.push('/signin');
    };

    return (
        <React.Fragment>
            <div className="mobile-container dark-bg-main">
                <ArrowLeft className={'back'} />
                <h1 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Verification</h1>
                <p className="text-sm grey-text">Enter the code we just sent you on your email address</p>
                <PinInput
                    length={6}
                    onChange={(e) => setPinCode(e)}
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
                <div className=" text-right countdown-container mb-3">
                    <p className="mb-0 grey-text text-xs">
                        Resend Code
                        {/* <span>: (00:59)</span> */}
                    </p>
                </div>
                {verificationStatus.show && (
                    <div
                        id="success-verify"
                        className={`"alert mb-3 w-100 " ${
                            verificationStatus.type == 'success' ? 'alert-success-mobile ' : 'alert-danger-mobile '
                        }`}>
                        {verificationStatus.type == 'success' ? <CheckSuccess /> : <ErrorIcon />}
                        Verification Successfull
                    </div>
                )}
                <button
                    type="button"
                    className="btn btn-primary btn-mobile w-100 px-4 validate"
                    disabled={isValidForm()}
                    onClick={handleSignUp}>
                    Verify
                </button>
            </div>
        </React.Fragment>
    );
};

export { EmailVerificationMobileScreen };
