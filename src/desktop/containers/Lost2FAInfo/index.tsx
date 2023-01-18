import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './Lost2FAInfo.pcss';

export const Lost2FAInfo: React.FC = () => {
    return (
        <React.Fragment>
            <h6 className="gradient-text font-bold text-md mb-8">Security Verification</h6>
            <p className="grey-text text-sm mb-8 font-normal">
                1.To ensure your account security, the withdrawal services and Futures will be temporarily closed for 24
                hours after the setting is approved.
            </p>
            <p className="grey-text text-sm mb-24">
                2.You may use 'key' to retrieve the Google 2-step verification code. View Help Document.
            </p>
        </React.Fragment>
    );
};
