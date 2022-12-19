import * as React from 'react';
import { useDispatch } from 'react-redux';
import { alertPush } from 'src/modules';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { ArrowLeft } from '../../assets/Arrow';
import { copy } from '../../../helpers';
import { CopyableTextField } from '../../../components';

type LocationProps = {
    state: {
        kid: string;
        secret: string;
    };
};

const CreateApiMobileScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = (useLocation() as unknown) as LocationProps;

    const kid = location.state?.kid;
    const secret = location.state?.secret;

    console.log(location);

    const doCopyKid = () => {
        copy('kid-code');
        dispatch(alertPush({ message: ['Key ID copied'], type: 'success' }));
    };

    const doCopySecret = () => {
        copy('secret-code');
        dispatch(alertPush({ message: ['Secret Key copied'], type: 'success' }));
    };

    const handleSubmit = () => {
        history.push('/api-key');
    };

    return (
        <React.Fragment>
            <div className="mobile-container create-api-mobile-screen no-header home-screen dark-bg-main">
                <div className="head-container position-relative">
                    <Link to={'/profile'} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <h1 className="text-center text-md grey-text-accent font-bold">Create New API Keys</h1>
                </div>
                <div className="mt-5">
                    <h6 className="text-ms grey-text-accent font-bold">Secret Key</h6>
                    <p className="text-sm grey-text">
                        This information will be shown only once and cannot be retrieved once lost. Please store it
                        properly.
                    </p>

                    <form action="">
                        <div className="mb-3">
                            <label className="mb-3 grey-text-accent text-sm font-semibold">Key ID</label>

                            <fieldset onClick={doCopyKid}>
                                <CopyableTextField value={kid} className="ml-3 w-100 " fieldId="kid-code" />
                            </fieldset>
                        </div>
                        <div className="mb-3">
                            <label className="mb-3 grey-text-accent text-sm font-semibold">Secret Key</label>
                            <fieldset onClick={doCopySecret}>
                                <CopyableTextField value={secret} className="ml-3 w-100 " fieldId="secret-code" />
                            </fieldset>
                        </div>
                    </form>
                    <ul className="pl-2">
                        <span className="text-xxs grey-text">Note:</span>
                        <li className="text-xxs grey-text">
                            To avoid asset loss, please do not tell your Secret Key and Private Key to others
                        </li>
                        <li className="text-xxs grey-text">
                            If you forget your Secret Key, please delete it and apply for the new Secret Key pair{' '}
                        </li>
                    </ul>
                </div>
                {/* <Link to="/api-key"> */}
                <button onClick={handleSubmit} type="button" className="btn btn-primary btn-mobile btn-block">
                    Submit
                </button>
                {/* </Link> */}
            </div>
        </React.Fragment>
    );
};

export { CreateApiMobileScreen };
