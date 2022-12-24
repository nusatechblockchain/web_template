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
            <div className="pg-market-list-screen">
                <div className="dark-bg-main container">
                    <MarketListHeader />
                </div>

                <div className="dark-bg-accent container">
                    <MarketListTable />
                </div>
            </div>
        </React.Fragment>
    );
};
