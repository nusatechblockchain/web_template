import cx from 'classnames';
import React, { useState } from 'react';
// import { KycDocument, KycProfile } from '../../containers';
import { selectUserInfo } from '../../../modules';
import { useSelector } from 'react-redux';
import { KycDocument } from 'src/mobile/containers/KycDocumentMobile';

export const KycMobileScreen: React.FC = () => {
    const user = useSelector(selectUserInfo);
    const profileExist = user.profiles.length;

    const kycStep = () => {
        return <KycDocument />;
    };

    return <React.Fragment>{kycStep()}</React.Fragment>;
};
