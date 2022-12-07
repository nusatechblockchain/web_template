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

    return (
        <React.Fragment>
            <div className="content-wrapper dark-bg-main">
                <div className="d-flex justify-content-between align-items-center mb-24">
                    <h1 className="text-xl white-text">Wallet Overview</h1>

                    <div>
                        <button type="button" className="btn-secondary mr-24 text-sm white-text font-bold">
                            Trade History
                        </button>
                        <button type="button" className="btn-secondary text-sm white-text font-bold">
                            Transaction History
                        </button>
                    </div>
                </div>
                <EstimatedValue wallets={wallets} />
                <WalletsOverview />
            </div>
        </React.Fragment>
    );
};
