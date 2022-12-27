import * as React from 'react';
import { useIntl } from 'react-intl';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Button, Form, Modal } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import {
    alertPush,
    ApiKeyCreateFetch,
    apiKeyCreateFetch,
    ApiKeyDataInterface,
    ApiKeyDeleteFetch,
    apiKeyDeleteFetch,
    ApiKeys2FAModal,
    apiKeys2FAModal,
    apiKeysFetch,
    ApiKeyStateModal,
    ApiKeyUpdateFetch,
    apiKeyUpdateFetch,
    selectUserInfo,
    selectMobileDeviceState,
    User,
    RootState,
} from '../../../modules';
import { IntlProps } from '../../../';
import {
    selectApiKeys,
    selectApiKeysDataLoaded,
    selectApiKeysFirstElemIndex,
    selectApiKeysLastElemIndex,
    selectApiKeysModal,
    selectApiKeysNextPageExists,
    selectApiKeysPageIndex,
} from '../../../modules/user/apiKeys/selectors';
import { ArrowLeft } from '../../assets/Arrow';
import { CloseIcon } from 'src/assets/images/CloseIcon';
import { TrashIcon } from '../../../assets/images/TrashIcon';
import { Table, CopyableTextField } from '../../../components';
import { CodeVerification } from 'src/desktop/components';

interface ReduxProps {
    apiKeys: ApiKeyDataInterface[];
    dataLoaded: boolean;
    modal: ApiKeyStateModal;
    user: User;
    pageIndex: number;
    firstElemIndex: number;
    lastElemIndex: number;
    nextPageExists: boolean;
    isMobile: boolean;
}

interface DispatchProps {
    toggleApiKeys2FAModal: typeof apiKeys2FAModal;
    apiKeysFetch: typeof apiKeysFetch;
    createApiKey: typeof apiKeyCreateFetch;
    updateApiKey: typeof apiKeyUpdateFetch;
    deleteApiKey: typeof apiKeyDeleteFetch;
    fetchSuccess: typeof alertPush;
}

interface ProfileApiKeysState {
    otpCode: string;
    codeFocused: boolean;
}

type Props = ReduxProps & DispatchProps & IntlProps;

class ApiListMobileScreenComponent extends React.Component<Props, ProfileApiKeysState> {
    public state = {
        otpCode: '',
        codeFocused: false,
    };

    public t = (key: string) => {
        return this.props.intl.formatMessage({ id: key });
    };

    public componentDidMount() {
        this.props.apiKeysFetch({ pageIndex: 0, limit: 4 });
    }

    public copy = (id: string) => {
        const copyText: HTMLInputElement | null = document.querySelector(`#${id}`);

        if (copyText) {
            copyText.select();

            document.execCommand('copy');
            (window.getSelection() as any).removeAllRanges(); // tslint:disable-line
        }
    };

    public render() {
        const { apiKeys, dataLoaded, firstElemIndex, lastElemIndex, nextPageExists, pageIndex, user } = this.props;

        return (
            <React.Fragment>
                <div className="mobile-container api-mobile-screen no-header home-screen dark-bg-main">
                    <div className="head-container position-relative">
                        <Link to={'/profile'} className="cursor-pointer position-absolute">
                            <ArrowLeft className={'back'} />
                        </Link>
                        <h1 className="text-center text-md grey-text-accent font-bold">API Management</h1>
                    </div>
                    <div className="mt-5">
                        <h6 className="subtitle">My API Keys</h6>
                        <ul className="pl-0">
                            <li className="grey-text text-sm">1. Each account can create up to 30 API Keys.</li>
                            <li className="grey-text text-sm">
                                2. Do not disclose your API Key to anyone to avoid asset losses. It is recommended to
                                bind IP for API Key to increase your account security.
                            </li>
                            <li className="grey-text text-sm">
                                3. Be aware that your API Key may be disclosed by authorizing it to a third-party
                                platform.
                            </li>
                            <li className="grey-text text-sm">
                                4. You will not be able to create an API if KYC is not completed.
                            </li>
                        </ul>
                    </div>

                    {!user.otp && (
                        <div className="px-24">
                            <p className="mt-4  warning-text font-semibold text-md">
                                {this.t('page.mobile.profile.apiKeys.noOtp')}
                            </p>{' '}
                        </div>
                    )}

                    {user.otp && !apiKeys.length && (
                        <div className="text-center mt-4 grey-text-accent text-ms">
                            {this.t('page.mobile.profile.apiKeys.noKeys')}
                        </div>
                    )}

                    {user.otp && apiKeys.length > 0 && (
                        <div className="table-mobile-wrapper">
                            <Table header={this.getTableHeaders()} data={this.getTableData(apiKeys)} />
                        </div>
                    )}

                    {user.otp && (!apiKeys.length || apiKeys.length > 0) && (
                        <div className="mt-3 mb-4">
                            <button
                                onClick={this.handleCreateKeyClick}
                                type="button"
                                className="btn btn-primary btn-mobile btn-block">
                                Create New Api
                            </button>
                        </div>
                    )}
                </div>
                <Modal
                    show={this.props.modal.active}
                    onHide={() => this.props.toggleApiKeys2FAModal({ active: false })}>
                    <div className="p-4 modal-mobile-screen">
                        {this.renderModalHeader()}
                        {this.renderModalBody()}
                    </div>
                </Modal>
            </React.Fragment>
        );
    }

    private getTableHeaders = () => {
        return [
            this.t('page.mobile.profile.apiKeys.item.kid'),
            this.t('page.mobile.profile.apiKeys.item.algorithm'),
            this.t('page.mobile.profile.apiKeys.item.state'),
            this.t('page.mobile.profile.apiKeys.item.status'),
            this.t('page.mobile.profile.apiKeys.item.action'),
        ];
    };

    private getTableData(apiKeysData: ApiKeyDataInterface[]) {
        return apiKeysData.map((item) => [
            item.kid,
            item.algorithm,
            <div>
                <span className={item.state === 'active' ? 'active' : 'disabled'}>{item.state}</span>
            </div>,
            <div>
                <Form>
                    <Form.Check
                        className="cursor-pointer"
                        type="switch"
                        id={`apiKeyCheck-${item.kid}`}
                        label=""
                        onChange={this.handleToggleStateKeyClick(item)}
                        checked={item.state === 'active'}
                    />
                </Form>
            </div>,
            <p
                className="d-flex  align-items-center justify-content-center text-sm cursor-pointer"
                onClick={() => this.handleDeleteKeyClick(item)}>
                <TrashIcon />
            </p>,
        ]);
    }

    private renderModalHeader = () => {
        const headerText =
            this.props.modal.action === 'createSuccess'
                ? this.t('page.mobile.profile.apiKeys.modal.created_header')
                : this.t('page.mobile.profile.apiKeys.modal.header');

        return (
            <div className="d-flex justify-content-between">
                <h3 className="mb-24 white-text text-xl font-bold">{headerText}</h3>
                {/* <div className="">
                    <h5 className="text-md font-extrabold contrast-text text-center mb-3">Two Factor-Authentication</h5>
                    <p className="text-center text-sm grey-text">
                        To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily
                        unavailable for 24 hours after changing the security settings.
                    </p>
                </div> */}
                <span className="cursor-pointer" onClick={this.handleHide2FAModal}>
                    <CloseIcon className="close-icon" />
                </span>
            </div>
        );
    };

    private renderModalBody = () => {
        const { otpCode, codeFocused } = this.state;
        const { modal, isMobile } = this.props;
        const secret = modal && modal.apiKey ? modal.apiKey.secret : '';
        let body;
        let button;
        const isDisabled = !otpCode.match(/.{6}/g);
        switch (this.props.modal.action) {
            case 'createKey':
                button = (
                    <Button
                        block={true}
                        onClick={this.handleCreateKey}
                        disabled={isDisabled}
                        size="lg"
                        variant="primary">
                        {/* {this.t('page.body.profile.apiKeys.modal.btn.create')} */}
                        Submit
                    </Button>
                );
                break;
            case 'createSuccess':
                button = (
                    <Button block={true} onClick={this.handleCreateSuccess} size="lg" variant="primary">
                        {/* {this.t('page.body.profile.apiKeys.modal.btn.create')} */}
                        Submit
                    </Button>
                );

                // This is modal body for success creating API
                body = (
                    <form>
                        <div className="mb-3">
                            <h6 className="text-ms grey-text-accent font-bold">Secret Key</h6>
                            <p className="text-sm grey-text">
                                This information will be shown only once and cannot be retrieved once lost. Please store
                                it properly.
                            </p>
                            <div className="mb-3">
                                <label className="mb-3 grey-text-accent text-sm font-semibold">Key ID</label>
                                <fieldset onClick={() => this.handleCopy('access-key-id', 'access')}>
                                    <CopyableTextField
                                        className="ml-3 w-100"
                                        fieldId={'access-key-id'}
                                        value={(modal.apiKey && modal.apiKey.kid) || ''}
                                        copyButtonText={this.t('page.mobile.profile.content.copyLink')}
                                        label={this.t('page.mobile.profile.apiKeys.modal.access_key')}
                                    />
                                </fieldset>
                            </div>
                            {/* <div className="secret-section">
                            <p className="secret-warning grey-text-accent text-xs">
                                <span className="secret-sign warning-text text-ms mr-2">&#9888;</span>
                                <span className="white-text text-sm">
                                    {this.t('page.body.profile.apiKeys.modal.secret_key')}
                                </span>
                                <br />
                                {this.t('page.body.profile.apiKeys.modal.secret_key_info')}
                                <span className="grey-text-accent text-sm">
                                    {this.t('page.body.profile.apiKeys.modal.secret_key_store')}
                                </span>
                            </p>
                        </div> */}
                            <div className="mb-3">
                                <label className="mb-3 grey-text-accent text-sm font-semibold">Secret Key</label>
                                <fieldset onClick={() => this.handleCopy('secret-key-id', 'secret')}>
                                    <CopyableTextField
                                        className=""
                                        fieldId={'secret_key-id'}
                                        value={secret || ''}
                                        copyButtonText={this.t('page.mobile.profile.content.copyLink')}
                                        label={this.t('page.mobile.profile.apiKeys.modal.access_key')}
                                    />
                                </fieldset>
                            </div>
                            {/* <p className="note-section grey-text-accent text-xs">
                                <span className="secret-sign warning-text text-ms mr-2">&#9888;</span>
                                <span className="white-text text-sm">
                                    {this.t('page.body.profile.apiKeys.modal.note')}{' '}
                                </span>
                                <br />
                                {this.t('page.body.profile.apiKeys.modal.note_content')}
                            </p> */}

                            <ul className="pl-2">
                                <span className="text-xxs grey-text">Note:</span>
                                <li className="text-xxs grey-text">
                                    To avoid asset loss, please do not tell your Secret Key and Private Key to others
                                </li>
                                <li className="text-xxs grey-text">
                                    If you forget your Secret Key, please delete it and apply for the new Secret Key
                                    pair{' '}
                                </li>
                            </ul>
                            <div className="button-confirmation">{button}</div>
                        </div>
                    </form>
                );
                break;
            case 'updateKey':
                button = (
                    <Button
                        block={true}
                        onClick={this.handleUpdateKey}
                        disabled={isDisabled}
                        size="lg"
                        variant="primary">
                        {modal.apiKey && modal.apiKey.state === 'active'
                            ? this.t('page.mobile.profile.apiKeys.modal.btn.disabled')
                            : this.t('page.mobile.profile.apiKeys.modal.btn.activate')}
                    </Button>
                );
                break;
            case 'deleteKey':
                button = (
                    <Button
                        block={true}
                        onClick={this.handleDeleteKey}
                        disabled={isDisabled}
                        size="lg"
                        variant="primary">
                        {this.t('page.mobile.profile.apiKeys.modal.btn.delete')}
                    </Button>
                );
                break;
            default:
                break;
        }
        body = !body ? (
            <div>
                <div className="text-sm white-text mb-12">{this.t('page.mobile.profile.apiKeys.modal.title')}</div>
                <div>
                    <CodeVerification
                        code={otpCode}
                        onChange={this.handleOtpCodeChange}
                        onSubmit={this.handleEnterPress}
                        codeLength={6}
                        type="text"
                        placeholder="______"
                        inputMode="decimal"
                        showPaste2FA={false}
                        isMobile={isMobile}
                    />
                </div>
                <div>{button}</div>
            </div>
        ) : (
            body
        );

        return <React.Fragment>{body}</React.Fragment>;
    };

    private handleHide2FAModal = () => {
        const payload: ApiKeys2FAModal['payload'] = { active: false };
        this.props.toggleApiKeys2FAModal(payload);
        this.setState({ otpCode: '' });
    };

    private handleOtpCodeChange = (value: string) => {
        this.setState({
            otpCode: value,
        });
    };

    private renderOnClick = () => {
        switch (this.props.modal.action) {
            case 'createKey':
                this.handleCreateKey();
                break;
            case 'createSuccess':
                this.handleCreateSuccess();
                break;
            case 'updateKey':
                this.handleUpdateKey();
                break;
            case 'deleteKey':
                this.handleDeleteKey();
                break;
            default:
                break;
        }
    };

    private handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.renderOnClick();
        }
    };

    private handleCreateKeyClick = () => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'createKey' };
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleCreateKey = () => {
        const payload: ApiKeyCreateFetch['payload'] = { totp_code: this.state.otpCode };
        this.props.createApiKey(payload);
        this.setState({ otpCode: '' });
    };

    private handleCreateSuccess = () => {
        const payload: ApiKeys2FAModal['payload'] = { active: false };
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleToggleStateKeyClick = (apiKey) => () => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleUpdateKey = () => {
        const apiKey: ApiKeyDataInterface = { ...this.props.modal.apiKey } as any;
        apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
        const payload: ApiKeyUpdateFetch['payload'] = { totp_code: this.state.otpCode, apiKey: apiKey };
        this.props.updateApiKey(payload);
        this.setState({ otpCode: '' });
    };

    private handleCopy = (id: string, type: string) => {
        this.copy(id);
        this.props.fetchSuccess({ message: [`success.api_keys.copied.${type}`], type: 'success' });
    };

    private handleDeleteKeyClick = (apiKey) => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'deleteKey', apiKey };
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleDeleteKey = () => {
        const { modal } = this.props;
        const payload: ApiKeyDeleteFetch['payload'] = {
            kid: (modal.apiKey && modal.apiKey.kid) || '',
            totp_code: this.state.otpCode,
        };
        this.props.deleteApiKey(payload);
        this.setState({ otpCode: '' });
    };

    private onClickPrevPage = () => {
        const { pageIndex } = this.props;
        this.props.apiKeysFetch({ pageIndex: Number(pageIndex) - 1, limit: 4 });
    };

    private onClickNextPage = () => {
        const { pageIndex } = this.props;
        this.props.apiKeysFetch({ pageIndex: Number(pageIndex) + 1, limit: 4 });
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    apiKeys: selectApiKeys(state),
    dataLoaded: selectApiKeysDataLoaded(state),
    modal: selectApiKeysModal(state),
    user: selectUserInfo(state),
    pageIndex: selectApiKeysPageIndex(state),
    firstElemIndex: selectApiKeysFirstElemIndex(state, 4),
    lastElemIndex: selectApiKeysLastElemIndex(state, 4),
    nextPageExists: selectApiKeysNextPageExists(state),
    isMobile: selectMobileDeviceState(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    toggleApiKeys2FAModal: (payload: ApiKeys2FAModal['payload']) => dispatch(apiKeys2FAModal(payload)),
    apiKeysFetch: (payload) => dispatch(apiKeysFetch(payload)),
    createApiKey: (payload) => dispatch(apiKeyCreateFetch(payload)),
    updateApiKey: (payload) => dispatch(apiKeyUpdateFetch(payload)),
    deleteApiKey: (payload) => dispatch(apiKeyDeleteFetch(payload)),
    fetchSuccess: (payload) => dispatch(alertPush(payload)),
});

const connected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ApiListMobileScreenComponent)) as any;
const ApiListMobileScreen = withRouter(connected);

export { ApiListMobileScreen };

//const ApiListMobileScreen: React.FC = () => {
// const history = useHistory();
//const navigate = useNavigate();
// const dispatch = useDispatch();
// const intl = useIntl();

// const apiKeys = useSelector(selectApiKeys);
// const dataLoaded = useSelector(selectApiKeysDataLoaded);
// const modal = useSelector(selectApiKeysModal);
// const user = useSelector(selectUserInfo);
// const apiKeyCreates = useSelector(apiKeyCreate);

// const [otpCreate, setOtpCreate] = React.useState('');
// const [showModalTwoFaCreate, setShowModalTwoFaCreate] = React.useState(false);

// const [otpDelete, setOtpDelete] = React.useState('');
// const [showModalTwoFaDelete, setShowModalTwoFaDelete] = React.useState(false);
// const [showModalDelete, setShowModalDelete] = React.useState(false);

// const translate = (key: string) => {
//     return intl.formatMessage({ id: key });
// };

// const handleOtpCreateChange = (value: string) => {
//     setOtpCreate(value);
// };

// const handleOtpDeleteChange = (value: string) => {
//     setOtpDelete(value);
// };

// const handleToggleActive = (apiKey) => () => {
//     // const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
//     // this.props.toggleApiKeys2FAModal(payload);
// };

// const handleHide2FAModal = () => {
//     const payload: ApiKeys2FAModal['payload'] = { active: false };
//     dispatch(apiKeys2FAModal(payload));
//     setOtpCreate('');
// };

// const renderOnClick = () => {
//     switch (modal.action) {
//         case 'createKey':
//             handleCreateKey();
//             break;
//         case 'createSuccess':
//             handleCreateSuccess();
//             break;
//         case 'updateKey':
//             handleUpdateKey();
//             break;
//         case 'deleteKey':
//             handleDeleteKey();
//             break;
//         default:
//             break;
//     }
// };

// const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     if (event.key === 'Enter') {
//         event.preventDefault();
//         renderOnClick();
//     }
// };

// const handleCreateKeyClick = () => {
//     const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'createKey' };
//     apiKeys2FAModal(payload);
// };

// const handleCreateKey = () => {
//     const payload: ApiKeyCreateFetch['payload'] = { totp_code: otpCreate };
//     dispatch(apiKeyCreateFetch(payload));
//     setOtpCreate('');
// };

// const success = modal.active;

// React.useEffect(() => {
//     if (success) {
//         //setShowModalTwoFaCreate(false);
//         history.push('/create-api', { kid: modal.apiKey.kid, secret: modal.apiKey.secret });
//         // navigate('/crete-api', { kid: modal.apiKey.kid, secret: modal.apiKey.secret });
//         dispatch(apiKeys2FAModal({ active: false }));
//     }
// }, [success]);

// React.useEffect(() => {
//     dispatch(apiKeysFetch({ pageIndex: 0, limit: 5 }));
// }, []);

// const handleCreateSuccess = () => {
//     setShowModalTwoFaCreate(false);
//     history.push('/create-api', { kid: 'test' });
// };

// const handleUpdateKey = () => {
//     const apiKey: ApiKeyDataInterface = { ...modal.apiKey } as any;
//     apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
//     const payload: ApiKeyUpdateFetch['payload'] = { totp_code: otpCreate, apiKey: apiKey };
//     dispatch(apiKeyUpdateFetch(payload));
//     setOtpCreate('');
// };

// const handleDeleteKeyClick = (apiKey) => {
//     const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'deleteKey', apiKey };
//     apiKeys2FAModal(payload);
// };

// const handleDeleteKey = (apiKey) => {
//     const payload: ApiKeyDeleteFetch['payload'] = {
//         kid: (modal.apiKey && modal.apiKey.kid) || '',
//         totp_code: otpDelete,
//     };
//     dispatch(apiKeyDeleteFetch(payload));
//     setShowModalTwoFaDelete(false);
//     setOtpDelete('');
// };

// const handleDeleteKeyClick = (apiKey) => {
//     // const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'deleteKey', apiKey };

//     const handleDeleteKeyClick = (apiKey) => {
//         const payload = { active: true, action: 'deleteKey', apiKey };
//         dispatch(apiKeyDeleteFetch(payload));
//     };
// };

//     const handleToggleActive = (apiKey) => () => {
//         const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
//         dispatch(apiKeys2FAModal(payload));
//     };

//     const handleToggleNonActive = (apiKey) => {
//         const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'deleteKey', apiKey };
//         dispatch(apiKeys2FAModal(payload));
//     };

//     const renderModalDelete = () => (
//         <React.Fragment>
//             <div className="d-flex justify-content-center">
//                 <ModalDanger />
//             </div>
//             <h5 className="text-md font-extrabold contrast-text text-center mb-3">Delete API Address</h5>
//             <p className="text-center text-sm grey-text">Are you sure you want to delete this API addresses?</p>
//             <button
//                 onClick={() => {
//                     setShowModalDelete(false);
//                     setShowModalTwoFaDelete(true);
//                 }}
//                 className="btn btn-primary btn-mobile btn-block mb-3">
//                 Continue
//             </button>
//             <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModalDelete(false)}>
//                 Cancel
//             </button>
//         </React.Fragment>
//     );

//     const renderModalTwoFaDelete = () => (
//         <React.Fragment>
//             <div className="d-flex justify-content-center">
//                 <ModalResetPassword />
//             </div>
//             <h5 className="text-md font-extrabold contrast-text text-center mb-3">Two Factor-Authentication</h5>
//             <p className="text-center text-sm grey-text">
//                 To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable for
//                 24 hours after changing the security settings.
//             </p>
//             <div className="mb-4">
//                 <PinInput
//                     length={6}
//                     onChange={handleOtpDeleteChange}
//                     onComplete={handleOtpDeleteChange}
//                     type="numeric"
//                     inputMode="number"
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         marginBottom: '8px',
//                     }}
//                     inputStyle={{
//                         background: '#15191D',
//                         borderRadius: '4px',
//                         borderColor: '#15191D',
//                         fontSize: '20px',
//                         color: ' #DEDEDE',
//                     }}
//                     inputFocusStyle={{ fontSize: '20px', color: 'color: #23262F' }}
//                     autoSelect={true}
//                     regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
//                 />
//             </div>
//             <button
//                 type="button"
//                 className="btn btn-primary btn-mobile btn-block w-100"
//                 disabled={otpCreate.length < 6}
//                 onClick={handleDeleteKey}>
//                 Submit
//             </button>
//         </React.Fragment>
//     );

//     const renderModalTwoFaCreate = () => (
//         <React.Fragment>
//             <div className="d-flex justify-content-center">
//                 <ModalResetPassword />
//             </div>
//             <h5 className="text-md font-extrabold contrast-text text-center mb-3">Two Factor-Authentication</h5>
//             <p className="text-center text-sm grey-text">
//                 To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable for
//                 24 hours after changing the security settings.
//             </p>
//             <div className="mb-4">
//                 <PinInput
//                     length={6}
//                     onChange={handleOtpCreateChange}
//                     onComplete={handleOtpCreateChange}
//                     type="numeric"
//                     inputMode="number"
//                     style={{
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         marginBottom: '8px',
//                     }}
//                     inputStyle={{
//                         background: '#15191D',
//                         borderRadius: '4px',
//                         borderColor: '#15191D',
//                         fontSize: '20px',
//                         color: ' #DEDEDE',
//                     }}
//                     inputFocusStyle={{ fontSize: '20px', color: 'color: #23262F' }}
//                     autoSelect={true}
//                     regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
//                 />
//             </div>
//             <button
//                 type="button"
//                 className="btn btn-primary btn-mobile btn-block w-100"
//                 disabled={otpCreate.length < 6}
//                 onClick={handleCreateKey}>
//                 Submit
//             </button>
//         </React.Fragment>
//     );

//     const getTableHeaders = () => {
//         return ['KID', 'Algorythm', 'State', 'Status', 'Action'];
//     };

//     const getTableData = (data) => {
//         return data.map((item) => [
//             item.kid,
//             item.algorithm,
//             <div>
//                 <span className={item.state === 'active' ? 'active' : 'disabled'}>{item.state}</span>
//             </div>,
//             <div>
//                 <Form>
//                     <Form.Check
//                         type="switch"
//                         id={`apiKeyCheck-${item.kid}`}
//                         label=""
//                         onChange={handleToggleActive(item)}
//                         checked={item.state === 'active'}
//                     />
//                 </Form>
//             </div>,
//             <div onClick={() => setShowModalDelete(true)}>
//                 <TrashIcon />
//             </div>,
//         ]);
//     };

//     return (
//         <React.Fragment>
//             <div className="mobile-container api-mobile-screen no-header home-screen dark-bg-main">
//                 <div className="head-container position-relative">
//                     <Link to={'/profile'} className="cursor-pointer position-absolute">
//                         <ArrowLeft className={'back'} />
//                     </Link>
//                     <h1 className="text-center text-md grey-text-accent font-bold">API Management</h1>
//                 </div>
//                 <div className="mt-5">
//                     <h6 className="subtitle">My API Keys</h6>
//                     <ul className="pl-0">
//                         <li className="grey-text text-sm">1. Each account can create up to 30 API Keys.</li>
//                         <li className="grey-text text-sm">
//                             2. Do not disclose your API Key to anyone to avoid asset losses. It is recommended to bind
//                             IP for API Key to increase your account security.
//                         </li>
//                         <li className="grey-text text-sm">
//                             3. Be aware that your API Key may be disclosed by authorizing it to a third-party platform.
//                         </li>
//                         <li className="grey-text text-sm">
//                             4. You will not be able to create an API if KYC is not completed.
//                         </li>
//                     </ul>
//                 </div>

//                 {!user.otp && (
//                     <div className="px-24">
//                         <p className="mt-4  warning-text font-semibold text-md">
//                             {translate('page.body.profile.apiKeys.noOtp')}
//                         </p>
//                     </div>
//                 )}

//                 {user.otp && !apiKeys.length && (
//                     <div className="text-center mt-4 grey-text-accent text-ms">
//                         {translate('page.body.profile.apiKeys.noKeys')}
//                     </div>
//                 )}

//                 {user.otp && apiKeys.length > 0 && (
//                     <div className="table-mobile-wrapper">
//                         <Table header={getTableHeaders()} data={getTableData(apiKeys)} />
//                     </div>
//                 )}

//                 {user.otp && (!apiKeys.length || apiKeys.length > 0) && (
//                     <div className="mt-3 mb-4">
//                         <button
//                             onClick={() => setShowModalTwoFaCreate(true)}
//                             type="button"
//                             className="btn btn-primary btn-mobile btn-block">
//                             Create Api
//                         </button>
//                         <button
//                             type="button"
//                             className="btn btn-secondary btn-outline btn-mobile btn-block"
//                             disabled={!apiKeys[0]}
//                             onClick={() => setShowModalDelete(true)}>
//                             Delete All
//                         </button>
//                     </div>
//                 )}
//             </div>
//             <ModalMobile content={renderModalDelete()} show={showModalDelete} />
//             <ModalMobile content={renderModalTwoFaDelete()} show={showModalTwoFaDelete} />
//             <ModalMobile content={renderModalTwoFaCreate()} show={showModalTwoFaCreate} />
//         </React.Fragment>
//     );
// };
