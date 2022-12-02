import { History } from 'history';
import * as React from 'react';
import {Button, Spinner} from 'react-bootstrap';
import {
    injectIntl,
} from 'react-intl';
import { connect, MapStateToProps } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { captchaType } from '../../../api/config';
import { IntlProps } from '../../../';
import { Captcha } from '../../../components';
import { EMAIL_REGEX, setDocumentTitle } from '../../../helpers';
import {
    emailVerificationFetch,
    GeetestCaptchaResponse,
    resetCaptchaState,
    RootState,
    selectCaptchaResponse,
    selectCurrentLanguage,
    selectGeetestCaptchaSuccess,
    selectMobileDeviceState,
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
import { Link } from 'react-router-dom';
import PinInput from 'react-pin-input';

interface OwnProps {
    history: History;
    location: {
        state: {
            email: string;
        };
    };
    success: boolean;
    error?: CommonError;
}

interface DispatchProps {
    emailVerificationFetch: typeof emailVerificationFetch;
    resetCaptchaState: typeof resetCaptchaState;
    createConfirmationCodeFetch: typeof createConfirmationCodeFetch;
}

interface ReduxProps {
    emailVerificationLoading: boolean;
    isMobileDevice: boolean;
    captcha_response?: string | GeetestCaptchaResponse;
    reCaptchaSuccess: boolean;
    geetestCaptchaSuccess: boolean;
    user: User;
    ConfirmationCodeCreateSuccess: boolean;
}

type Props = DispatchProps & ReduxProps & OwnProps & IntlProps;

class EmailVerificationComponent extends React.Component<Props> {
    public readonly state = {
        code: ''
    };
    public componentDidMount() {
        setDocumentTitle('Email verification');

        if (!this.props.location.state) {
            this.props.history.push('/login');
        }
    }

    public componentDidUpdate(prevProps: Props) {
        const { history, ConfirmationCodeCreateSuccess } = this.props;
        if (ConfirmationCodeCreateSuccess === true) {
            history.push('/login');
        }
    }

    public translate = (id: string) => this.props.intl.formatMessage({ id });

    public renderCaptcha = () => {
        const { error, success } = this.props;

        return (
            <Captcha
                error={error}
                success={success}
            />
        );
    };

    public render() {
        const { emailVerificationLoading } = this.props;

        const button = this.props.intl.formatMessage({ id: 'page.resendConfirmation' });

        return (
            <React.Fragment>
                <div className='text-center'>
                    <h3 className='font-weight-bold mb-4 text-center'>Confirm your Email address</h3>
                    <h5 className='text-center'>We send an email to {this.props.location.state?.email}, please check your inbox and find the confirmation code we've sent you</h5>
                    <div className='mt-5'>
                        <div className='mb-2'>Enter the 6 digits code from email</div>
                        <PinInput 
                            length={6} 
                            secret 
                            onChange={this.handleChangeConfirmChange}
                            onComplete={this.handleChangeConfirmChange}
                            type="numeric" 
                            inputMode="number"
                            style={{padding: '5px'}}  
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </div>
                    <div className='mt-4 mb-2'>
                        {this.renderCaptcha()}
                    </div>
                    <div className='font-weight-bold'>Didn't receive code</div>
                    <div>
                        {emailVerificationLoading ? <Spinner animation="border" variant="primary"/> :
                            <button className="btn-send-again"
                                    onClick={this.handleClick}
                                    disabled={this.disableButton()}>{button}
                            </button>                          
                        }
                    </div>
                    <Button
                        block={true}
                        type="button"
                        disabled={this.disableButton()}
                        onClick={this.codeConfirm}
                        size="lg"
                        className='button registration__button mt-3'
                        variant="primary">
                        Activate
                    </Button>

                </div>
            </React.Fragment>
        );
    }

    private handleChangeConfirmChange = (value: string) => {
        this.setState({
            code: value,
        });        
    };

    private codeConfirm = () => {
        const payload = {
            email: this.props.location.state.email,
            code: this.state.code
        };
        this.props.createConfirmationCodeFetch(payload);             
    };

    private handleClick = () => {
        const { captcha_response } = this.props;

        switch (captchaType()) {
            case 'recaptcha':
            case 'geetest':
                this.props.emailVerificationFetch({
                    email: this.props.location.state.email,
                    captcha_response,
                });
                break;
            default:
                this.props.emailVerificationFetch({
                    email: this.props.location.state.email,
                });
                break;
        }

        this.props.resetCaptchaState();
    };

    private disableButton = (): boolean => {
        const {
            location,
            geetestCaptchaSuccess,
            reCaptchaSuccess,
        } = this.props;
        const captchaTypeValue = captchaType();

        if (location.state && location.state.email && !location.state.email.match(EMAIL_REGEX)) {
            return true;
        }

        if (captchaTypeValue === 'recaptcha' && !reCaptchaSuccess) {
            return true;
        }

        if (captchaTypeValue === 'geetest' && !geetestCaptchaSuccess) {
            return true;
        }

        return false;
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = state => ({
    emailVerificationLoading: selectSendEmailVerificationLoading(state),
    i18n: selectCurrentLanguage(state),
    isMobileDevice: selectMobileDeviceState(state),
    error: selectSendEmailVerificationError(state),
    success: selectSendEmailVerificationSuccess(state),
    captcha_response: selectCaptchaResponse(state),
    reCaptchaSuccess: selectRecaptchaSuccess(state),
    geetestCaptchaSuccess: selectGeetestCaptchaSuccess(state),
    user: selectUserInfo(state),
    ConfirmationCodeCreateSuccess: selectConfirmationCodeCreateSuccess(state),
});

const mapDispatchToProps = {
    emailVerificationFetch,
    resetCaptchaState,
    createConfirmationCodeFetch,
};

export const EmailVerificationScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(EmailVerificationComponent) as React.ComponentClass;
