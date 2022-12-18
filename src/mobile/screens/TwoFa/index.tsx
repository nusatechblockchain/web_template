import * as React from 'react';
import { ArrowLeft } from '../../assets/Arrow';
import { Link } from 'react-router-dom';
import { CheckSuccess } from '../../assets/CheckIcon';
import PinInput from 'react-pin-input';
import { useHistory } from 'react-router';

const TwoFaMobileScreen: React.FC = () => {
    const [otpCode, setOtpCode] = React.useState('');
    const [otpStatus, setOtpStatus] = React.useState(false);
    const history = useHistory();

    const handleBackTwoFA = () => {
        history.push('/profile');
    };

    return (
        <React.Fragment>
            <div className="mobile-container home-screen dark-bg-main">
                <Link to={''}>
                    <ArrowLeft className={'back'} />
                </Link>
                <h1 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Two-factor Authentication</h1>
                <p className="text-sm grey-text">
                    To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable
                    for 24 hours after changing the security settings.
                </p>
                <div className="mb-2">
                    <PinInput
                        length={6}
                        onChange={(e) => setOtpCode(e)}
                        onComplete={(e) => console.log('')}
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
                <div className="d-flex justify-content-end mb-3">
                    <p className="w-100 text-right grey-text text-xs ">Resen Code</p>
                </div>

                {otpStatus ? (
                    <div className="alert-success-mobile px-2 py-3 alert d-flex align-items-center mb-24">
                        <CheckSuccess />
                        <span className="text-ms green-text font-normal">Verification Successful</span>
                    </div>
                ) : (
                    ''
                )}

                {otpStatus ? (
                    <button
                        type="button"
                        onClick={handleBackTwoFA}
                        disabled={otpCode.length < 6}
                        className="btn btn-primary btn-block btn-mobile px-4 mb-3">
                        Close
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={() => setOtpStatus(true)}
                        disabled={otpCode.length < 6}
                        className="btn btn-primary btn-block btn-mobile px-4 mb-3">
                        Verify
                    </button>
                )}
            </div>
        </React.Fragment>
    );
};

export { TwoFaMobileScreen };
