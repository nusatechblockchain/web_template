import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useReduxSelector } from '../../../hooks';
import { selectMobileDeviceState } from '../../../modules';
import './Lost2FAScreen.pcss';
import bgImage from '../../../assets/png/background.png';
import { ArrowLeftGradient } from 'src/assets/images/ArrowLeftIcon';
import { InputFile } from '../../components';
import { Lost2FAInfo, Lost2FATimeline, Lost2FAStep } from '../../containers';

export const Lost2FAScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { formatMessage } = useIntl();
    const [stepOne, setStepOne] = useState(true);
    const [stepTwo, setStepTwo] = useState(false);
    const [stepThree, setStepThree] = useState(false);

    const handleNextStep = () => {
        setStepOne(false);
        setStepTwo(true);
    };

    const handleSubmit = () => {
        setStepTwo(false);
        setStepThree(true);
    };

    return (
        <React.Fragment>
            <div className="container-fluid lost-two-fa-screen dark-bg-accent">
                <div className="background-image" style={{ backgroundImage: `url(${bgImage})` }}>
                    {/* main content */}
                    <div className="content-wrapper pb-5">
                        <div className="container">
                            <div className="pt-5 mb-36">
                                <div className="__breadcrumb d-flex align-items-center">
                                    <a className="__highlight" href="/signin">
                                        <ArrowLeftGradient />
                                        <span className="gradient-text text-ms font-extrabold breadcrumb-link">
                                            Back to Home
                                        </span>
                                    </a>
                                    <span className="white-text text-ms">Lost 2FA</span>
                                </div>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-8 dark-bg-main py-5 px-5">
                                    {!stepThree && <Lost2FAInfo />}
                                    <Lost2FATimeline stepOne={stepOne} stepTwo={stepTwo} stepThree={stepThree} />
                                    <Lost2FAStep
                                        stepOne={stepOne}
                                        stepTwo={stepTwo}
                                        stepThree={stepThree}
                                        handleNextStep={handleNextStep}
                                        handleSubmit={handleSubmit}
                                    />
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
