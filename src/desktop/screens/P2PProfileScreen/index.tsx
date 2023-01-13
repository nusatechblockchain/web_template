import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';

export const P2PProfileScreen: React.FC = () => {
    useDocumentTitle('P2P || Profile');

    return (
        <React.Fragment>
            <h1>P2P Profile</h1>
        </React.Fragment>
    );
};
