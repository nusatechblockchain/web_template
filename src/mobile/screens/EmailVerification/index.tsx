import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory, useLocation } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { Captcha } from '../../../components';
import { captchaType } from '../../../api';
import { EMAIL_REGEX, setDocumentTitle } from '../../../helpers';
import {
    emailVerificationFetch,
    GeetestCaptchaResponse,
    resetCaptchaState,
    selectCaptchaResponse,
    selectCurrentLanguage,
    selectGeetestCaptchaSuccess,
    selectRecaptchaSuccess,
    selectSendEmailVerificationError,
    selectSendEmailVerificationLoading,
    selectSendEmailVerificationSuccess,
    selectUserInfo,
    User,
    createConfirmationCodeFetch,
    selectConfirmationCodeCreateSuccess,
} from '../../../modules';
import { CommonError } from '../../../modules/types';
import { ArrowLeft } from '../../assets/Arrow';
import PinInput from 'react-pin-input';
import { CheckSuccess } from '../../assets/CheckIcon';
import { ErrorIcon } from '../../assets/ErrorIcon';

type LocationProps = {
    state: {
        email: string;
    };
};

// type ErrorProps = {
//     error?: CommonError;
// };

// type CaptchaResponseProps = {
//     captcha_response?: string | GeetestCaptchaResponse;
// };

const EmailVerificationMobileScreen: React.FC = () => {
    const dispatch = useDispatch();
    const intl = useIntl();
    const history = useHistory();
    const location = (useLocation() as unknown) as LocationProps;
    const email = location.state?.email;

    const captcha_response = useSelector(selectCaptchaResponse);
    const error = useSelector(selectSendEmailVerificationError);
    const emailVerificationLoading = useSelector(selectSendEmailVerificationLoading);
    const i18n = useSelector(selectCurrentLanguage);
    const success = useSelector(selectSendEmailVerificationSuccess);
    const reCaptchaSuccess = useSelector(selectRecaptchaSuccess);
    const geetestCaptchaSuccess = useSelector(selectGeetestCaptchaSuccess);
    const user = useSelector(selectUserInfo);
    const ConfirmationCodeCreateSuccess = useSelector(selectConfirmationCodeCreateSuccess);

    const [code, setCode] = React.useState('');
    const [verificationStatus, setVerificationStatus] = React.useState({ type: '', show: false });

    React.useEffect(() => {
        setDocumentTitle('Email Verification');
        if (!location.state) {
            history.push('/signin');
        }
    }, []);

    React.useEffect(() => {
        if (ConfirmationCodeCreateSuccess === true) {
            setVerificationStatus({ type: 'success', show: true });
            setTimeout(() => {
                setVerificationStatus({ ...verificationStatus, show: false });
                history.push('/signin');
            }, 1000);
        }
    }, [ConfirmationCodeCreateSuccess]);

    const translate = (id: string) => intl.formatMessage({ id });

    const handleChangeCode = (value: string) => {
        setCode(value);
    };

    const handleVerify = () => {
        dispatch(createConfirmationCodeFetch({ email, code }));
    };

    const handleResend = () => {
        switch (captchaType()) {
            case 'recaptcha':
            case 'geetest':
                dispatch(
                    emailVerificationFetch({
                        email,
                        captcha_response,
                    })
                );
                break;
            default:
                dispatch(
                    emailVerificationFetch({
                        email,
                    })
                );
                break;
        }
        resetCaptchaState();
    };

    const disableButtonVerify = (): boolean => {
        const captchaTypeValue = captchaType();

        if (location.state && email && !email.match(EMAIL_REGEX)) {
            return true;
        }

        if (captchaTypeValue === 'recaptcha' && !reCaptchaSuccess) {
            return true;
        }

        if (captchaTypeValue === 'geetest' && !geetestCaptchaSuccess) {
            return true;
        }

        if (code.length < 6) {
            return true;
        }

        return false;
    };

    const renderCaptcha = () => {
        return <Captcha error={error} success={success} />;
    };

    return (
        <React.Fragment>
            <div className="mobile-container no-header dark-bg-main">
                <ArrowLeft className={'back'} />
                <h1 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Verification</h1>
                <p className="text-sm grey-text">Enter the code we just sent you on your email address</p>
                <PinInput
                    length={6}
                    onChange={handleChangeCode}
                    onComplete={handleChangeCode}
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
                    {emailVerificationLoading ? (
                        <Spinner animation="border" variant="primary" />
                    ) : (
                        <button onClick={handleResend} className="mb-0 grey-text text-xs bg-transparent border-0">
                            Resend Code
                            {/* <span>: (00:59)</span> */}
                        </button>
                    )}
                </div>

                <div className="mt-4 mb-2">{renderCaptcha()}</div>

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
                    onClick={handleVerify}
                    disabled={disableButtonVerify()}>
                    Verify
                </button>
            </div>
        </React.Fragment>
    );
};

export { EmailVerificationMobileScreen };
