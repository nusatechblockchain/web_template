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
    User,
} from '../../../modules';
import { selectApiKeys, selectApiKeysDataLoaded, selectApiKeysModal } from 'src/modules/user/apiKeys/selectors';
import { ArrowLeft } from '../../assets/Arrow';
import { Table } from '../../../components';
import { Form } from 'react-bootstrap';
import { ModalDanger } from '../../assets/Modal';
import { ModalMobile } from '../../components';

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

    const [state, setState] = React.useState(true);
    const [otpCode, setOtpCode] = React.useState('');
    const [showModalDelete, setShowModalDelete] = React.useState(false);

    const handleTwoFa = () => {
        setState(!state);
    };

    const translate = (key: string) => {
        return intl.formatMessage({ id: key });
    };

    const copy = (id: string) => {
        const copyText: HTMLInputElement | null = document.querySelector(`#${id}`);

        if (copyText) {
            copyText.select();

            document.execCommand('copy');
            (window.getSelection() as any).removeAllRanges(); // tslint:disable-line
        }
    };

    React.useEffect(() => {
        dispatch(apiKeysFetch({ pageIndex: 0, limit: 4 }));
    }, []);

    // const handleToggleStateKeyClick = (apiKey) => () => {
    //     // const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
    //     // this.props.toggleApiKeys2FAModal(payload);
    // };

    const handleDeleteApi = () => {
        setShowModalDelete(false);
        history.push('/api-key');
    };

    const handleHide2FAModal = () => {
        const payload: ApiKeys2FAModal['payload'] = { active: false };
        dispatch(apiKeys2FAModal(payload));
        setOtpCode('');
    };

    const handleOtpCodeChange = (value: string) => {
        setOtpCode(value);
    };

    const renderOnClick = () => {
        switch (modal.action) {
            case 'createKey':
                handleCreateKey();
                break;
            case 'createSuccess':
                handleCreateSuccess();
                break;
            case 'updateKey':
                handleUpdateKey();
                break;
            case 'deleteKey':
                handleDeleteKey();
                break;
            default:
                break;
        }
    };

    const handleEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            renderOnClick();
        }
    };

    const handleCreateKeyClick = () => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'createKey' };
        apiKeys2FAModal(payload);
    };

    const handleCreateKey = () => {
        const payload: ApiKeyCreateFetch['payload'] = { totp_code: otpCode };
        dispatch(apiKeyCreateFetch(payload));
        setOtpCode('');
    };

    const handleCreateSuccess = () => {
        const payload: ApiKeys2FAModal['payload'] = { active: false };
        dispatch(apiKeys2FAModal(payload));
    };

    const handleToggleStateKeyClick = (apiKey) => () => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
        dispatch(apiKeys2FAModal(payload));
    };

    const handleUpdateKey = () => {
        const apiKey: ApiKeyDataInterface = { ...modal.apiKey } as any;
        apiKey.state = apiKey.state === 'active' ? 'disabled' : 'active';
        const payload: ApiKeyUpdateFetch['payload'] = { totp_code: otpCode, apiKey: apiKey };
        dispatch(apiKeyUpdateFetch(payload));
        setOtpCode('');
    };

    const handleDeleteKeyClick = (apiKey) => {
        const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'deleteKey', apiKey };
        dispatch(apiKeys2FAModal(payload));
    };

    const handleDeleteKey = () => {
        const payload: ApiKeyDeleteFetch['payload'] = {
            kid: (modal.apiKey && modal.apiKey.kid) || '',
            totp_code: otpCode,
        };
        dispatch(apiKeyDeleteFetch(payload));
        setOtpCode('');
    };

    const renderModal = () => (
        <React.Fragment>
            <div className="d-flex justify-content-center">
                <ModalDanger />
            </div>
            <h5 className="text-md font-extrabold contrast-text text-center mb-3">Delete All API Address</h5>
            <p className="text-center text-sm grey-text">
                Are you sure you want to delete all the API addresses you have?
            </p>
            <button onClick={handleDeleteApi} className="btn btn-primary btn-mobile btn-block mb-3">
                Continue
            </button>
            <button className="btn btn-success btn-mobile btn-outline w-100" onClick={() => setShowModalDelete(false)}>
                Cancle
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
                        onChange={handleToggleStateKeyClick(item)}
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
                <div className="table-mobile-wrapper">
                    <Table header={getTableHeaders()} data={getTableData(apiKeys)} />
                </div>
                <div className="mt-3 mb-4">
                    <Link to="/create-api" className="btn btn-primary btn-mobile btn-block">
                        Create Api
                    </Link>
                    <button
                        type="button"
                        className="btn btn-secondary btn-outline btn-mobile btn-block"
                        onClick={() => setShowModalDelete(true)}>
                        Delete All
                    </button>
                </div>
            </div>
            <ModalMobile content={renderModal()} show={showModalDelete} />
        </React.Fragment>
    );
};

export { ApiListMobileScreen };
