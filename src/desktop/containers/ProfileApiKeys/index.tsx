import cr from 'classnames';
import * as React from 'react';
import { Button, Form } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { withRouter } from 'react-router';
import { IntlProps } from '../../../';
import { CodeVerification,Pagination } from '../../components'
import {
    CopyableTextField,
    Table,
} from '../../../components';
import { localeDate } from '../../../helpers/localeDate';
import Modal from 'react-bootstrap/Modal';

import {
    alertPush,
    ApiKeyCreateFetch,
    apiKeyCreateFetch, ApiKeyDataInterface,
    ApiKeyDeleteFetch,
    apiKeyDeleteFetch,
    ApiKeys2FAModal,
    apiKeys2FAModal, apiKeysFetch,
    ApiKeyStateModal, ApiKeyUpdateFetch,
    apiKeyUpdateFetch,
    RootState,
    selectMobileDeviceState,
    selectUserInfo,
    User,
} from '../../../modules';

import {
    selectApiKeys,
    selectApiKeysDataLoaded,
    selectApiKeysFirstElemIndex,
    selectApiKeysLastElemIndex,
    selectApiKeysModal,
    selectApiKeysNextPageExists,
    selectApiKeysPageIndex,
} from '../../../modules/user/apiKeys/selectors';

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

class ProfileApiKeysComponent extends React.Component<Props, ProfileApiKeysState> {
    public state = {
        otpCode: '',
        codeFocused: false,
    };

    public t = (key: string) => {
        return this.props.intl.formatMessage({id: key});
    };

    public copy = (id: string) => {
        const copyText: HTMLInputElement | null = document.querySelector(`#${id}`);

        if (copyText) {
            copyText.select();

            document.execCommand('copy');
            (window.getSelection() as any).removeAllRanges(); // tslint:disable-line
        }
    };

    public componentDidMount() {
        this.props.apiKeysFetch({ pageIndex: 0, limit: 4 });
    }

    public render() {
        const {
            apiKeys,
            dataLoaded,
            firstElemIndex,
            lastElemIndex,
            nextPageExists,
            pageIndex,
            user,
        } = this.props;

        return (
            <React.Fragment>
                {this.t('page.body.profile.apiKeys.header')}

                {!user.otp && (
                    <div>
                        <p>
                            {this.t('page.body.profile.apiKeys.noOtp')}
                        </p>
                    </div>
                )}

                {user.otp && dataLoaded && (
                    <div className='btn btn-primary' onClick={this.handleCreateKeyClick}>
                        {this.t('page.body.profile.apiKeys.header.create')}
                    </div>
                )}

                {user.otp && dataLoaded && !apiKeys.length && (
                    <div>
                        {this.t('page.body.profile.apiKeys.noKeys')}
                    </div>
                )}

                {user.otp && dataLoaded && apiKeys.length > 0 && (
                    <React.Fragment>
                        <Table
                            header={this.getTableHeaders()}
                            data={this.getTableData(apiKeys)}
                        />
                        <Pagination
                            firstElemIndex={firstElemIndex}
                            lastElemIndex={lastElemIndex}
                            page={pageIndex}
                            nextPageExists={nextPageExists}
                            onClickPrevPage={this.onClickPrevPage}
                            onClickNextPage={this.onClickNextPage}
                        />
                    </React.Fragment>
                )}

                <Modal show={this.props.modal.active} onHide={()=>this.props.toggleApiKeys2FAModal({active: false})}>
                    <div className='p-4'>
                        {this.renderModalHeader()}
                        {this.renderModalBody()}
                    </div>
            </Modal>
            </React.Fragment>
        );
    }

    private getTableHeaders = () => {
        return [
            this.t('page.body.profile.apiKeys.table.header.kid'),
            this.t('page.body.profile.apiKeys.table.header.algorithm'),
            this.t('page.body.profile.apiKeys.table.header.state'),
            '',
            this.t('page.body.profile.apiKeys.table.header.created'),
            this.t('page.body.profile.apiKeys.table.header.updated'),
            '',
        ];
    };

    private getTableData(apiKeysData: ApiKeyDataInterface[]) {
        return apiKeysData.map(item => (
            [
                item.kid,
                item.algorithm,
                (
                    <div>
                        <span
                            className={item.state === 'active' ? 'active'
                                : 'disabled'}
                        >
                            {item.state}
                        </span>
                    </div>
                ),
                (
                    <div>
                        <Form>
                            <Form.Check
                                type="switch"
                                id={`apiKeyCheck-${item.kid}`}
                                label=""
                                onChange={this.handleToggleStateKeyClick(item)}
                                checked={item.state === 'active'}
                            />
                        </Form>
                    </div>
                )
                ,
                localeDate(item.created_at, 'fullDate'),
                localeDate(item.updated_at, 'fullDate'),
                (
                    <span
                        className=""
                        key={item.kid}
                        onClick={() => this.handleDeleteKeyClick(item)}
                    />
                ),
            ]
        ));
    }

    private renderModalHeader = () => {
        const headerText = this.props.modal.action === 'createSuccess' ? this.t('page.body.profile.apiKeys.modal.created_header')
            : this.t('page.body.profile.apiKeys.modal.header');

        return (
            <div>
                {headerText}
                <span
                    className=""
                    onClick={this.handleHide2FAModal}
                />
            </div>
        );
    };

    private renderModalBody = () => {
        const {otpCode, codeFocused} = this.state;
        const { modal, isMobile } = this.props;
        const secret = (modal && modal.apiKey) ? modal.apiKey.secret : '';
        let body;
        let button;
        const isDisabled = !otpCode.match(/.{6}/g);
        switch (this.props.modal.action) {
            case 'createKey':
                button =
                    (
                        <Button
                            block={true}
                            onClick={this.handleCreateKey}
                            disabled={isDisabled}
                            size="lg"
                            variant="primary"
                        >
                            {this.t('page.body.profile.apiKeys.modal.btn.create')}
                        </Button>
                    );
                break;
            case 'createSuccess':
                button =
                    (
                        <Button
                            block={true}
                            onClick={this.handleCreateSuccess}
                            size="lg"
                            variant="primary"
                        >
                            {this.t('page.body.profile.apiKeys.modal.btn.create')}
                        </Button>
                    );
                body = (
                    <div>
                        <div>
                            <fieldset onClick={() => this.handleCopy('access-key-id', 'access')}>
                                <CopyableTextField
                                  className=""
                                  fieldId={'access-key-id'}
                                  value={(modal.apiKey && modal.apiKey.kid) || ''}
                                  copyButtonText={this.t('page.body.profile.content.copyLink')}
                                  label={this.t('page.body.profile.apiKeys.modal.access_key')}
                                />
                            </fieldset>
                        </div>
                        <div className="secret-section">
                            <span className="secret-sign">&#9888;</span>
                            <p className="secret-warning">
                                <span>{this.t('page.body.profile.apiKeys.modal.secret_key')}</span>
                                <br/>
                                {this.t('page.body.profile.apiKeys.modal.secret_key_info')}
                                <span> {this.t('page.body.profile.apiKeys.modal.secret_key_store')}</span>
                            </p>
                        </div>
                        <div>
                            <fieldset onClick={() => this.handleCopy('secret-key-id', 'secret')}>
                                <CopyableTextField
                                  className=""
                                  fieldId={'secret_key-id'}
                                  value={secret || ''}
                                  copyButtonText={this.t('page.body.profile.content.copyLink')}
                                  label={this.t('page.body.profile.apiKeys.modal.secret_key')}
                                />
                            </fieldset>
                        </div>
                        <p className="note-section">
                            <span>{this.t('page.body.profile.apiKeys.modal.note')} </span>
                            <br/>
                            {this.t('page.body.profile.apiKeys.modal.note_content')}
                        </p>
                        <div className="button-confirmation">
                            {button}
                        </div>
                    </div>
                );
                break;
            case 'updateKey':
                button = (
                    <Button
                        block={true}
                        onClick={this.handleUpdateKey}
                        disabled={isDisabled}
                        size="lg"
                        variant="primary"
                    >
                        {modal.apiKey && modal.apiKey.state === 'active' ?
                            this.t('page.body.profile.apiKeys.modal.btn.disabled') :
                            this.t('page.body.profile.apiKeys.modal.btn.activate')}
                    </Button>
                );
                break;
            case 'deleteKey':
                button =
                    (
                        <Button
                            block={true}
                            onClick={this.handleDeleteKey}
                            disabled={isDisabled}
                            size="lg"
                            variant="primary"
                        >
                            {this.t('page.body.profile.apiKeys.modal.btn.delete')}
                        </Button>
                    );
                break;
            default:
                break;
        }
        body = !body ? (
            <div>
                <div>
                    {this.t('page.body.profile.apiKeys.modal.title')}
                </div>
                <div>
                    <CodeVerification
                        code={otpCode}
                        onChange={this.handleOtpCodeChange}
                        onSubmit={this.handleEnterPress}
                        codeLength={6}
                        type="text"
                        placeholder="X"
                        inputMode="decimal"
                        showPaste2FA={true}
                        isMobile={isMobile}
                    />
                </div>
                <div>
                    {button}
                </div>
            </div>
        ) : body;

        return (
            <React.Fragment>
                {body}
            </React.Fragment>
        );
    };

    private handleHide2FAModal = () => {
        const payload: ApiKeys2FAModal['payload'] = {active: false};
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
        const payload: ApiKeys2FAModal['payload'] = {active: true, action: 'createKey'};
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleCreateKey = () => {
        const payload: ApiKeyCreateFetch['payload'] = {totp_code: this.state.otpCode};
        this.props.createApiKey(payload);
        this.setState({otpCode: ''});
    };

    private handleCreateSuccess = () => {
        const payload: ApiKeys2FAModal['payload'] = {active: false};
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleToggleStateKeyClick = apiKey => () => {
        const payload: ApiKeys2FAModal['payload'] = {active: true, action: 'updateKey', apiKey};
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleUpdateKey = () => {
        const apiKey: ApiKeyDataInterface = {...this.props.modal.apiKey} as any;
        apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
        const payload: ApiKeyUpdateFetch['payload'] = {totp_code: this.state.otpCode, apiKey: apiKey};
        this.props.updateApiKey(payload);
        this.setState({otpCode: ''});
    };

    private handleCopy = (id: string, type: string) => {
        this.copy(id);
        this.props.fetchSuccess({ message: [`success.api_keys.copied.${type}`], type: 'success'});
    };

    private handleDeleteKeyClick = apiKey => {
        const payload: ApiKeys2FAModal['payload'] = {active: true, action: 'deleteKey', apiKey};
        this.props.toggleApiKeys2FAModal(payload);
    };

    private handleDeleteKey = () => {
        const { modal } = this.props;
        const payload: ApiKeyDeleteFetch['payload'] = {kid: (modal.apiKey && modal.apiKey.kid) || '', totp_code: this.state.otpCode};
        this.props.deleteApiKey(payload);
        this.setState({otpCode: ''});
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

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        toggleApiKeys2FAModal: (payload: ApiKeys2FAModal['payload']) => dispatch(apiKeys2FAModal(payload)),
        apiKeysFetch: payload => dispatch(apiKeysFetch(payload)),
        createApiKey: payload => dispatch(apiKeyCreateFetch(payload)),
        updateApiKey: payload => dispatch(apiKeyUpdateFetch(payload)),
        deleteApiKey: payload => dispatch(apiKeyDeleteFetch(payload)),
        fetchSuccess: payload => dispatch(alertPush(payload)),
    });

const connected = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ProfileApiKeysComponent)) as any;
const ProfileApiKeys = withRouter(connected);

export {
    ProfileApiKeys,
};
