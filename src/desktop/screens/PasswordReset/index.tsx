import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction, MapStateToProps } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { ChangePassword } from '../../components';
import { setDocumentTitle } from '../../../helpers';
import {
    changeForgotPasswordFetch,
    changeLanguage,
    entropyPasswordFetch,
    RootState,
    selectChangeForgotPasswordSuccess,
    selectCurrentPasswordEntropy,
    selectMobileDeviceState,
} from '../../../modules';

interface ChangeForgottenPasswordState {
    confirmToken: string;
    seconds: number;
    timerActive: boolean;
}

interface ReduxProps {
    changeForgotPassword?: boolean;
    isMobileDevice: boolean;
    currentPasswordEntropy: number;
}

interface DispatchProps {
    changeForgotPasswordFetch: typeof changeForgotPasswordFetch;
    changeLanguage: typeof changeLanguage;
    fetchCurrentPasswordEntropy: typeof entropyPasswordFetch;
}

interface HistoryProps {
    history: {
        location: {
            search: string;
            state: {
                email: string;
            };
        };
    };
}

type Props = RouterProps & DispatchProps & HistoryProps & ReduxProps & IntlProps;

class PasswordResetComponent extends React.Component<Props, ChangeForgottenPasswordState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            confirmToken: '',
            seconds: 30000,
            timerActive: false,
        };
    }

    public componentWillReceiveProps(next: Props) {
        if (next.changeForgotPassword && !this.props.changeForgotPassword) {
            this.props.history.push('/signin');
        }
    }

    public render() {
        const { isMobileDevice, currentPasswordEntropy } = this.props;
        return (
            <React.Fragment>
                <div className="row sign-up-screen">
                    <div className="col-md-5 dark-bg-accent min-h-full px-0">
                        <div className="bg-auth" style={{ backgroundImage: `url('/img/bg-auth1.png')` }}></div>
                    </div>
                    <div className="col-md-7 dark-bg-main min-h-full position-relative">
                        <div className="text-to-signup mb-24">
                            <span>
                                <p className="white-text font-bold">
                                    Already have an account?
                                    <Link to="/signin">
                                        <span className="contrast-text ml-1 cursor-pointer">Sign In</span>{' '}
                                    </Link>
                                </p>
                            </span>
                        </div>
                        <div className="main-wrapper d-flex align-items-center">
                            <div className="main-form position-relative">
                                <ChangePassword
                                    handleChangePassword={this.handleSendNewPassword}
                                    handleChangePin={this.handleChangePin}
                                    title={
                                        !isMobileDevice &&
                                        this.props.intl.formatMessage({ id: 'page.header.signIn.resetPassword.title' })
                                    }
                                    currentPasswordEntropy={currentPasswordEntropy}
                                    fetchCurrentPasswordEntropy={this.props.fetchCurrentPasswordEntropy}
                                    hideOldPassword={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private handleChangePin = (e) => {
        this.setState({
            confirmToken: e,
        });
    };

    private handleSendNewPassword = (payload) => {
        const { confirmToken } = this.state;
        const { history } = this.props;
        this.props.changeForgotPasswordFetch({
            ...payload,
            reset_password_token: confirmToken,
            email: history.location.state.email || '',
        });
    };
}

const mapStateToProps: MapStateToProps<ReduxProps, {}, RootState> = (state) => ({
    changeForgotPassword: selectChangeForgotPasswordSuccess(state),
    isMobileDevice: selectMobileDeviceState(state),
    currentPasswordEntropy: selectCurrentPasswordEntropy(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    changeForgotPasswordFetch: (credentials) => dispatch(changeForgotPasswordFetch(credentials)),
    changeLanguage: (lang) => dispatch(changeLanguage(lang)),
    fetchCurrentPasswordEntropy: (payload) => dispatch(entropyPasswordFetch(payload)),
});

export const PasswordResetScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(PasswordResetComponent) as React.ComponentClass;
