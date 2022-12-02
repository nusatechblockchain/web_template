import React, { FC, ReactElement, useCallback, useEffect, useState } from 'react';
import {
    ProfileAuthDetails,
} from '../../containers';
import { useDocumentTitle } from 'src/hooks';

export const ProfileScreen: FC = (): ReactElement => {
    useDocumentTitle('Profile');
    return (
        <ProfileAuthDetails/>
    );
};
