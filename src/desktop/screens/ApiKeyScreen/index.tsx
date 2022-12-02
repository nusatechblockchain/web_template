import React, { FC, ReactElement,useCallback } from 'react';
import {
    ProfileApiKeys,
} from '../../containers';
import { useDocumentTitle } from 'src/hooks';
import { useHistory } from 'react-router-dom';


export const ApiKeyScreen: FC = (): ReactElement => {
    useDocumentTitle('Profile');
    const history = useHistory();


    return (
        <ProfileApiKeys/>
    );
};
