import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';

export const P2PWalletScreen: React.FC = () => {
    useDocumentTitle('P2P || Wallet');

    return (
        <React.Fragment>
            <h1>P2P Wallet</h1>
        </React.Fragment>
    );
};
