import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { EstimatedValue, WalletsOverview } from '../../containers';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies, selectWallets } from 'src/modules';


export const WalletsScreen: FC = (): ReactElement => {
    const wallets = useSelector(selectWallets) || [];
    const currencies = useSelector(selectCurrencies);

    useDocumentTitle('Wallets');
    useWalletsFetch();

    return (
        <React.Fragment>
            <h3>Estimated</h3>
            <EstimatedValue wallets={wallets} />
            <WalletsOverview />
        </React.Fragment>

    );
};
