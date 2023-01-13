import * as React from 'react';
import { useDocumentTitle } from '../../../hooks';

export const P2POrderScreen: React.FC = () => {
    useDocumentTitle('P2P || Order');

    return (
        <React.Fragment>
            <h1>P2P Order</h1>
        </React.Fragment>
    );
};
