import cx from 'classnames';
import React, { useState } from 'react';
import './KycScreen.pcss';
import { KycDocument, KycProfile } from '../../containers';

export const KycScreen: React.FC = () => {
    return (
        <React.Fragment>
            <div className="content-wrapper kyc-screen dark-bg-accent pb-5">
                <KycProfile />
            </div>
        </React.Fragment>
    );
};
