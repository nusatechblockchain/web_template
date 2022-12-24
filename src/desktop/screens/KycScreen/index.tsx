import cx from 'classnames';
import React, { useState } from 'react';
import './KycScreen.pcss';
import { KycDocument, KycProfile } from '../../containers';
import { selectUserInfo } from '../../../modules';
import { useSelector } from 'react-redux';

export const KycScreen: React.FC = () => {
    const user = useSelector(selectUserInfo);
    const profileExist = user.profiles.length;
    return (
        <React.Fragment>
            <div className="content-wrapper kyc-screen dark-bg-accent pb-5">
                {profileExist > 0 ? <KycDocument /> : <KycProfile />}
            </div>
        </React.Fragment>
    );
};
