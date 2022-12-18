import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeft } from '../../assets/Arrow';
import { Table } from '../../../components';
import { Form } from 'react-bootstrap';
import { ModalDanger } from '../../assets/Modal';
import { ModalMobile } from '../../components';

const ApiListMobileScreen: React.FC = () => {
    const [state, setState] = React.useState(true);
    const [showModalDelete, setShowModalDelete] = React.useState(false);
    const history = useHistory();

    const handleTwoFa = () => {
        setState(!state);
    };

    const apiKeys = [
        { kid: 'fe69d2....', algorithm: 'HS256', state: 'active' },
        { kid: 'fe69d2....', algorithm: 'HS256', state: 'active' },
        { kid: 'fe69d2....', algorithm: 'HS256', state: 'active' },
        { kid: 'fe69d2....', algorithm: 'HS256', state: 'active' },
    ];

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

    const getTableHeaders = () => {
        return ['KID', 'Algorythm', 'State', 'Status'];
    };

    const handleToggleStateKeyClick = (apiKey) => () => {
        // const payload: ApiKeys2FAModal['payload'] = { active: true, action: 'updateKey', apiKey };
        // this.props.toggleApiKeys2FAModal(payload);
    };

    const handleDeleteApi = () => {
        setShowModalDelete(false);
        history.push('/api-key');
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
                <Table header={getTableHeaders()} data={getTableData(apiKeys)} />
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
