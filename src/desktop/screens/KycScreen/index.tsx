import cx from 'classnames';
import React, { useState } from 'react';
import './KycScreen.pcss';
import { KycDocument, KycProfile } from '../../containers';
import { selectUserInfo } from '../../../modules';
import { useSelector } from 'react-redux';

export const KycScreen: React.FC = () => {
    const user = useSelector(selectUserInfo);
    const profileExist = user.profiles.length;

    const kycStep = () => {
        if (profileExist > 0) {
            const kycReverse = user.profiles.slice(-1);
            const profileStatus = kycReverse[0].state;
            if (profileStatus != 'rejected') {
                return <KycDocument />;
            } else {
                return <KycProfile />;
            }
        } else {
            return <KycProfile />;
        }
    };

    return (
        <React.Fragment>
            <div className="content-wrapper kyc-screen dark-bg-accent pb-5">{kycStep()}</div>
        </React.Fragment>
    );
};
