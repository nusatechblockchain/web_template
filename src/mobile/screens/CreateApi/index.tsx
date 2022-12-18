import * as React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { ArrowLeft } from '../../assets/Arrow';
import { Table } from '../../../components';
import { ModalMobile } from '../../components';
import { CopyableTextField } from '../../../components';

const CreateApiMobileScreen: React.FC = () => {
    const keyId = 'f8a6a5e60cc7e2d8';

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
                            <CopyableTextField value={keyId} className="ml-3" fieldId="referral-code" />
                        </div>
                        <div className="mb-3">
                            <label className="mb-3 grey-text-accent text-sm font-semibold">Secret Key</label>
                            <CopyableTextField value={keyId} className="ml-3" fieldId="referral-code" />
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
                <button type="button" className="btn btn-primary btn-mobile btn-block">
                    Submit
                </button>
            </div>
        </React.Fragment>
    );
};

export { CreateApiMobileScreen };
