import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { EstimatedValue, WalletsOverview } from '../../containers';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies, selectWallets } from 'src/modules';
import { Sidebar } from '../../containers/Sidebar';

export const WalletsScreen: FC = (): ReactElement => {
    const wallets = useSelector(selectWallets) || [];
    const currencies = useSelector(selectCurrencies);

    useDocumentTitle('Wallets');
    useWalletsFetch();

    console.log(wallets);

    return (
        <React.Fragment>
            <div className="content-wrapper dark-bg-main">
                <h3>Estimated</h3>
                <EstimatedValue wallets={wallets} />
                <WalletsOverview />
            </div>
        </React.Fragment>
    );
};
