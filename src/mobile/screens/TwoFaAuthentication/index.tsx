import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../assets/Arrow';
import { useHistory } from 'react-router';
import QRCode from 'react-qr-code';
import { CopyableTextField } from '../../../components';
import { WarningIcon } from '../../assets/Warning';
import PinInput from 'react-pin-input';

const TwoFaAuthenticationMobileScreen: React.FC = () => {
    const [otpCode, setOtpCode] = React.useState('');
    const [state, setState] = React.useState(true);
    const history = useHistory();
    const twoFactorAuthQr = '1N4Vf8BG2GWxYRv4VKm2BPzyFFMSR4fmYP';

    const isValidForm = () => {
        if (otpCode.length < 6) {
            return true;
        }
    };

    const handleTwoFa = () => {
        setState(!state);
    };

    const handleActivateTwoFa = () => {
        history.push('/two-fa');
    };

    return (
        <React.Fragment>
            <div className="mobile-container two-fa-auth-mobile no-header pt-5  home-screen dark-bg-main">
                <div className="head-container position-relative mb-36">
                    <Link to={''} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <h1 className="text-center text-md grey-text-accent font-bold">Two-factor Authentication</h1>
                </div>
                <div className="mb-24">
                    <h6 className="grey-text mb-0 text-sm font-bold">Step 1</h6>
                    <p className="mb-0 text-sm grey-text">
                        Download and install Google Authenticator application from
                        <span className="contrast-text">AppStore </span> <span className="white-text">or</span>
                        <span className="contrast-text"> Google play</span>
                    </p>
                </div>
                <div className="mb-24">
                    <h6 className="grey-text mb-0 text-sm font-bold">Step 2</h6>
                    <p className="mb-0 text-sm grey-text mb-5">Scan QR code or use secret MFA Code :</p>
                    <div className=" d-flex justify-content-center">
                        <div className="qr-code">
                            <QRCode size={148} value={twoFactorAuthQr} />
                        </div>
                    </div>
                </div>
                <CopyableTextField value={twoFactorAuthQr} className="ml-3 mva-code" fieldId="two-fa-code" />
                <div className="d-flex align-items-start mb-24">
                    <div className="mr-2">
                        <WarningIcon className={''} />
                    </div>
                    <p className="mb-0 text-xxs grey-text">
                        Save this secret in a secure location. This code can be used to gain 2FA access from a different
                        device.
                    </p>
                </div>
                <div className="mb-24">
                    <h6 className="grey-text mb-2 text-sm font-bold">Step 3</h6>
                    <p className="mb-0 text-sm grey-text ">Enter two-factor Authentication code from the apps</p>
                </div>
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
                <button className="btn btn-primary btn-mobile" disabled={isValidForm()}>
                    Activate
                </button>
                <div className="pb-5"></div>
            </div>
        </React.Fragment>
    );
};

export { TwoFaAuthenticationMobileScreen };
