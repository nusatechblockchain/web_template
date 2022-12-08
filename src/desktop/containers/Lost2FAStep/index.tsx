import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useReduxSelector } from '../../../hooks';
import { selectMobileDeviceState } from '../../../modules';
import './Lost2FAStep.pcss';
import bgImage from '../../../assets/png/background.png';
import { ArrowLeftGradient } from 'src/assets/images/ArrowLeftIcon';
import { InputFile } from '../../components';
import lostImg from '../../../assets/png/lost-two-fa.svg';

interface StepElement {
    stepOne;
    stepTwo;
    stepThree;
    handleNextStep;
    handleSubmit;
}

type Props = StepElement;

export const Lost2FAStep: React.FC<Props> = (props: Props): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { formatMessage } = useIntl();
    const { stepOne, stepTwo, stepThree, handleNextStep, handleSubmit } = props;

    return (
        <React.Fragment>
            {stepOne && (
                <div className="tabs-item" id="tabs-one">
                    <p className="grey-text text-sm">Send email verification to get the code</p>
                    <div className="form">
                        <InputFile />
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={handleNextStep}
                                type="button"
                                className="btn btn-primary w-150"
                                id="tabs-one-button">
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {stepTwo && (
                <div className="tabs-item" id="tabs-two">
                    <p className="grey-text text-sm">Upload multiple documents for identity verification purposes</p>
                    <div className="form">
                        <div className="group mb-12">
                            <label htmlFor="custom-file" className="text-ms white-text mb-1">
                                Front ID <span className="danger-text">*</span>
                            </label>
                            <InputFile />
                            <label htmlFor="custom-file" className="text-xs grey-text">
                                Supported formats : JPG and PNG. Max file size 4MB
                            </label>
                        </div>
                        <div className="group mb-12">
                            <label htmlFor="custom-file" className="text-ms white-text mb-1">
                                Back ID <span className="danger-text">*</span>
                            </label>
                            <InputFile />
                            <label htmlFor="custom-file" className="text-xs grey-text">
                                Supported formats : JPG and PNG. Max file size 4MB
                            </label>
                        </div>
                        <div className="group mb-12">
                            <label htmlFor="custom-file" className="text-ms white-text mb-1">
                                Upload Selfie With Identitity Document <span className="danger-text">*</span>
                            </label>
                            <InputFile />
                            <label htmlFor="custom-file" className="text-xs grey-text">
                                Upload Selfie With Identitity Document *
                            </label>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button
                                onClick={handleSubmit}
                                type="button"
                                className="btn btn-primary w-150"
                                id="tabs-two-button">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {stepThree && (
                <div className="tabs-item" id="tabs-three">
                    <div className="__three  show">
                        <div className="d-flex justify-content-center mb-24">
                            <img src={lostImg} alt="lost two fa icon" />
                        </div>
                        <h3 className="white-text text-center mb-24">Waiting for Review</h3>
                        <p className=" grey-text-accent text-center">
                            We will complete the verification within 1 to 3 business days and notify the result to you
                            through SMS and email.
                        </p>
                        <p className=" grey-text-accent text-center mb-24">
                            To ensure your account security, the withdrawal services on KuCoin and Futures will be
                            temporarily closed for 24 hours after the setting is approved.
                        </p>
                    </div>
                </div>
            )}
        </React.Fragment>
    );
};
