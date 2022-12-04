import React, { FC, ReactElement } from 'react';
import { ProfileAuthDetails } from '../../containers';
import { useDocumentTitle } from 'src/hooks';

export const ProfileScreen: FC = (): ReactElement => {
    useDocumentTitle('Profile');
    return <ProfileAuthDetails />;
};
