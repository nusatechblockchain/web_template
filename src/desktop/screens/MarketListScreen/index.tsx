import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import { MarketListHeader, MarketListTable } from '../../containers';
import './MarketListScreen.pcss';

export const MarketListScreen: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    useDocumentTitle('Market List');
    useWalletsFetch();

    return (
        <React.Fragment>
            <div className="pg-market-list-screen dark-bg-main">
                <div className="dark-bg-main pt-4">
                    <div className="container py-3">
                        <MarketListHeader />
                    </div>
                </div>

                <div className="list-market dark-bg-accent ">
                    <div className="container ">
                        <MarketListTable />
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
