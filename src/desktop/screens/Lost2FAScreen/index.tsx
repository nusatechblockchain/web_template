import cx from 'classnames';
import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './Lost2FAScreen.pcss';
import { ArrowLeftGradient } from 'src/assets/images/ArrowLeftIcon';
import { Lost2FAStep } from '../../containers';

export const Lost2FAScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { formatMessage } = useIntl();

    return (
        <React.Fragment>
            <div className="container-fluid lost-two-fa-screen dark-bg-accent">
                <div className="background-image" style={{ backgroundImage: `url('img/background-landing.png')` }}>
                    {/* main content */}
                    <div className="content-wrapper pb-5">
                        <div className="container">
                            <div className="pt-5 mb-36">
                                <div className="__breadcrumb d-flex align-items-center">
                                    <Link className="__highlight" to={'/signin'}>
                                        <ArrowLeftGradient />
                                        <span className="gradient-text text-ms font-extrabold breadcrumb-link">
                                            Back to Home
                                        </span>
                                    </Link>
                                    <span className="white-text text-ms">Lost 2FA</span>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-10 dark-bg-main py-5 px-5">
                                    <Lost2FAStep />
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* end main content */}
                </div>
            </div>
        </React.Fragment>
    );
};
