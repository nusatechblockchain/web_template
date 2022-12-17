import React, { FC, ReactElement } from 'react';
import { ReferralProgram } from '../../containers';
import { useDocumentTitle } from 'src/hooks';

export const ReferralScreen: FC = (): ReactElement => {
    useDocumentTitle('Profile');
    return <ReferralProgram />;
};
