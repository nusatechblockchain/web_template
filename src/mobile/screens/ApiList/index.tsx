import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
    apiKeyCreate,
} from '../../../modules';
import { selectApiKeys, selectApiKeysDataLoaded, selectApiKeysModal } from 'src/modules/user/apiKeys/selectors';
import { ArrowLeft } from '../../assets/Arrow';
import { Table } from '../../../components';
import { Form } from 'react-bootstrap';
import { ModalResetPassword, ModalDanger } from '../../assets/Modal';
import { ModalMobile } from '../../components';
import PinInput from 'react-pin-input';

interface ModalProps {
    modal: ApiKeyStateModal;
}

const ApiListMobileScreen: React.FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const intl = useIntl();

    const apiKeys = useSelector(selectApiKeys);
    const dataLoaded = useSelector(selectApiKeysDataLoaded);
    const modal = useSelector(selectApiKeysModal);
    const user = useSelector(selectUserInfo);
    const apiKeyCreates = useSelector(apiKeyCreate);

    const [otpCreate, setOtpCreate] = React.useState('');
    const [showModalTwoFaCreate, setShowModalTwoFaCreate] = React.useState(false);

    const [otpDelete, setOtpDelete] = React.useState('');
    const [showModalTwoFaDelete, setShowModalTwoFaDelete] = React.useState(false);
    const [showModalDelete, setShowModalDelete] = React.useState(false);

    const translate = (key: string) => {
        return intl.formatMessage({ id: key });
    };

    const handleOtpCreateChange = (value: string) => {
        setOtpCreate(value);
    };

    const handleOtpDeleteChange = (value: string) => {
        setOtpDelete(value);
    };

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

    const handleCreateKey = () => {
        const payload: ApiKeyCreateFetch['payload'] = { totp_code: otpCreate };
        dispatch(apiKeyCreateFetch(payload));
        setOtpCreate('');
    };

    const success = modal.action === 'createSuccess';

    React.useEffect(() => {
        if (success) {
            setShowModalTwoFaCreate(false);
            history.push('/create-api', { kid: modal.apiKey.kid, secret: modal.apiKey.secret });
        }
    }, [success]);

    const handleCreateSuccess = () => {
        setShowModalTwoFaCreate(false);
        history.push('/create-api', { kid: 'test' });
    };

    // const handleUpdateKey = () => {
    //     const apiKey: ApiKeyDataInterface = { ...modal.apiKey } as any;
    //     apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
    //     const payload: ApiKeyUpdateFetch['payload'] = { totp_code: otpCreate, apiKey: apiKey };
    //     dispatch(apiKeyUpdateFetch(payload));
    //     setOtpCreate('');
    // };

    const handleDeleteKey = () => {
        const payload: ApiKeyDeleteFetch['payload'] = {
            kid: (modal.apiKey && modal.apiKey.kid) || '',
            totp_code: otpDelete,
        };
        dispatch(apiKeyDeleteFetch(payload));
        setShowModalTwoFaDelete(false);
        setOtpDelete('');
    };

    const handleToggleActive = (apiKey) => () => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
        dispatch(apiKeys2FAModal(payload));
    };

    const handleToggleNonActive = (apiKey) => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'deleteKey', apiKey };
        dispatch(apiKeys2FAModal(payload));
    };

    const renderModalDelete = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalDanger />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Delete All API Address</h5>
            <p className="text-center text-sm grey-text">
                Are you sure you want to delete all the API addresses you have?
            </p>
            <button
                onClick={() => {
                    setShowModalDelete(false);
                    setShowModalTwoFaDelete(true);
                }}
                className="btn btn-primary btn-mobile btn-block mb-3">
                Continue
            </button>
            <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModalDelete(false)}>
                Cancle
            </button>
        </React.Fragment>
    );

    const renderModalTwoFaDelete = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalResetPassword />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Two Factor-Authentication</h5>
            <p className="text-center text-sm grey-text">
                To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable for
                24 hours after changing the security settings.
            </p>
            <div className="mb-4">
                <PinInput
                    length={6}
                    onChange={handleOtpDeleteChange}
                    onComplete={handleOtpDeleteChange}
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
            <button
                type="button"
                className="btn btn-primary btn-mobile btn-block w-100"
                disabled={otpCreate.length < 6}
                onClick={handleDeleteKey}>
                Submit
            </button>
        </React.Fragment>
    );

    const renderModalTwoFaCreate = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalResetPassword />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Two Factor-Authentication</h5>
            <p className="text-center text-sm grey-text">
                To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable for
                24 hours after changing the security settings.
            </p>
            <div className="mb-4">
                <PinInput
                    length={6}
                    onChange={handleOtpCreateChange}
                    onComplete={handleOtpCreateChange}
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
            <button
                type="button"
                className="btn btn-primary btn-mobile btn-block w-100"
                disabled={otpCreate.length < 6}
                onClick={handleCreateKey}>
                Submit
            </button>
        </React.Fragment>
    );

    const getTableHeaders = () => {
        return ['KID', 'Algorythm', 'State', 'Status'];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            item.kid,
            item.algorithm,
            <div>
                <span className={item.state === 'active' ? 'active' : 'disabled'}>{item.state}</span>
            </div>,
            <div>
                <Form>
                    <Form.Check
                        type="switch"
                        id={`apiKeyCheck-${item.kid}`}
                        label=""
                        onChange={handleToggleActive(item)}
                        checked={item.state === 'active'}
                    />
                </Form>
            </div>,
        ]);
    };

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
                            2. Do not disclose your API Key to anyone to avoid asset losses. It is recommended to bind
                            IP for API Key to increase your account security.
                        </li>
                        <li className="grey-text text-sm">
                            3. Be aware that your API Key may be disclosed by authorizing it to a third-party platform.
                        </li>
                        <li className="grey-text text-sm">
                            4. You will not be able to create an API if KYC is not completed.
                        </li>
                    </ul>
                </div>

                {!user.otp && (
                    <div className="px-24">
                        <p className="mt-4  warning-text font-semibold text-md">
                            {translate('page.body.profile.apiKeys.noOtp')}
                        </p>
                    </div>
                )}

                {user.otp && !apiKeys.length && (
                    <div className="text-center mt-4 grey-text-accent text-ms">
                        {translate('page.body.profile.apiKeys.noKeys')}
                    </div>
                )}

                {user.otp && apiKeys.length > 0 && (
                    <div className="table-mobile-wrapper">
                        <Table header={getTableHeaders()} data={getTableData(apiKeys)} />
                    </div>
                )}

                {user.otp && (!apiKeys.length || apiKeys.length > 0) && (
                    <div className="mt-3 mb-4">
                        <button
                            onClick={() => setShowModalTwoFaCreate(true)}
                            type="button"
                            className="btn btn-primary btn-mobile btn-block">
                            Create Api
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary btn-outline btn-mobile btn-block"
                            disabled={!apiKeys[0]}
                            onClick={() => setShowModalDelete(true)}>
                            Delete All
                        </button>
                    </div>
                )}
            </div>
            <ModalMobile content={renderModalDelete()} show={showModalDelete} />
            <ModalMobile content={renderModalTwoFaDelete()} show={showModalTwoFaDelete} />
            <ModalMobile content={renderModalTwoFaCreate()} show={showModalTwoFaCreate} />
        </React.Fragment>
    );
};

export { ApiListMobileScreen };