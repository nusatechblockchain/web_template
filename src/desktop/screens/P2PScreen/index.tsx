import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';

export const P2PScreen: React.FC = () => {
    useDocumentTitle('P2P');

    return (
        <React.Fragment>
            <h1>P2P</h1>
        </React.Fragment>
    );
};
