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

export const Lost2FAScreen: React.FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { formatMessage } = useIntl();

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
                                    <h6 className="gradient-text font-bold text-md mb-8">Security Verification</h6>
                                    <p className="grey-text text-sm mb-8 font-normal">
                                        1.To ensure your account security, the withdrawal services and Futures will be
                                        temporarily closed for 24 hours after the setting is approved.
                                    </p>
                                    <p className="grey-text text-sm mb-24">
                                        2.You may use 'key' to retrieve the Google 2-step verification code. View Help
                                        Document.
                                    </p>
                                    <div className="__tabs mb-24">
                                        <div className="d-flex justify-content-between">
                                            <div className="__items">
                                                <div className="d-flex align-items-center">
                                                    <div className="__number active" id="tabs-icon-one">
                                                        <p className="mb-0">1</p>
                                                    </div>
                                                    <p className="white-text text-xs mb-0">Security Verification</p>
                                                </div>
                                            </div>
                                            <div className="__items">
                                                <div className="d-flex align-items-center">
                                                    <div className="__number" id="tabs-icon-two">
                                                        <p className="mb-0">2</p>
                                                    </div>
                                                    <p className="white-text text-xs mb-0">identity Verification</p>
                                                </div>
                                            </div>
                                            <div className="__items">
                                                <div className="d-flex align-items-center">
                                                    <div className="__number " id="tabs-icon-three">
                                                        <p className="mb-0">3</p>
                                                    </div>
                                                    <p className="white-text text-xs mb-0">Done</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* tabs one */}
                                    <div className="tabs-item show" id="tabs-one">
                                        <p className="grey-text text-sm">Send email verification to get the code</p>
                                        <div className="form">
                                            <InputFile />
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary w-150"
                                                    id="tabs-one-button">
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* tabs two */}
                                    <div className="tabs-item hidden" id="tabs-two">
                                        <p className="grey-text text-sm">
                                            Upload multiple documents for identity verification purposes
                                        </p>
                                        <div className="form">
                                            <div className="group mb-12">
                                                <label htmlFor="custom-file" className="text-ms white-text mb-1">
                                                    Front ID <span className="danger-text">*</span>
                                                </label>
                                                <div className="input-group">
                                                    <div className="input-cover" />
                                                    <input
                                                        placeholder="Email Verification Code"
                                                        aria-label="Email Verification Code"
                                                        aria-describedby="basic-addon2"
                                                        id="custom-file"
                                                        type="file"
                                                        className="__input form-control"
                                                    />
                                                    <div className="__input-button input-group-append">
                                                        <label
                                                            htmlFor="custom-file"
                                                            className="btn btn-outline-secondary w-150 mb-0 d-flex align-items-center justify-content-center white-text border-0 green-bg cursor-pointer">
                                                            Upload File
                                                        </label>
                                                    </div>
                                                </div>
                                                <label htmlFor="custom-file" className="text-xs grey-text">
                                                    Supported formats : JPG and PNG. Max file size 4MB
                                                </label>
                                            </div>
                                            <div className="group mb-12">
                                                <label htmlFor="custom-file" className="text-ms white-text mb-1">
                                                    Back ID <span className="danger-text">*</span>
                                                </label>
                                                <div className="input-group">
                                                    <div className="input-cover" />
                                                    <input
                                                        placeholder="Email Verification Code"
                                                        aria-label="Email Verification Code"
                                                        aria-describedby="basic-addon2"
                                                        id="custom-file"
                                                        type="file"
                                                        className="__input form-control"
                                                    />
                                                    <div className="__input-button input-group-append">
                                                        <label
                                                            htmlFor="custom-file"
                                                            className="btn btn-outline-secondary w-150 mb-0 d-flex align-items-center justify-content-center white-text border-0 green-bg cursor-pointer">
                                                            Upload File
                                                        </label>
                                                    </div>
                                                </div>
                                                <label htmlFor="custom-file" className="text-xs grey-text">
                                                    Supported formats : JPG and PNG. Max file size 4MB
                                                </label>
                                            </div>
                                            <div className="group mb-12">
                                                <label htmlFor="custom-file" className="text-ms white-text mb-1">
                                                    Upload Selfie With Identitity Document{' '}
                                                    <span className="danger-text">*</span>
                                                </label>
                                                <div className="input-group">
                                                    <div className="input-cover" />
                                                    <input
                                                        placeholder="Email Verification Code"
                                                        aria-label="Email Verification Code"
                                                        aria-describedby="basic-addon2"
                                                        id="custom-file"
                                                        type="file"
                                                        className="__input form-control"
                                                    />
                                                    <div className="__input-button input-group-append">
                                                        <label
                                                            htmlFor="custom-file"
                                                            className="btn btn-outline-secondary w-150 mb-0 d-flex align-items-center justify-content-center white-text border-0 green-bg cursor-pointer">
                                                            Upload File
                                                        </label>
                                                    </div>
                                                </div>
                                                <label htmlFor="custom-file" className="text-xs grey-text">
                                                    Upload Selfie With Identitity Document *
                                                </label>
                                            </div>
                                            <div className="d-flex justify-content-end">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary w-150"
                                                    id="tabs-two-button">
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    {/* tabs three */}
                                    <div className="tabs-item hidden" id="tabs-three">
                                        <div className="__three  show">
                                            <div className="d-flex justify-content-center mb-24">
                                                <img src="../../Assets/Images/lost-two-fa.svg" alt="lost two fa icon" />
                                            </div>
                                            <h3 className="white-text text-center mb-24">Waiting for Review</h3>
                                            <p className=" grey-text-accent text-center">
                                                We will complete the verification within 1 to 3 business days and notify
                                                the result to you through SMS and email.
                                            </p>
                                            <p className=" grey-text-accent text-center mb-24">
                                                To ensure your account security, the withdrawal services on KuCoin and
                                                Futures will be temporarily closed for 24 hours after the setting is
                                                approved.
                                            </p>
                                        </div>
                                    </div>
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
