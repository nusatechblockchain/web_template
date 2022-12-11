import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import { CardMarket } from '../../components';
import './MarketListHeader.pcss';

export const MarketListHeader: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    return (
        <React.Fragment>
            <h1 className="m-0 mb-24 text-lg white-text">Markets</h1>

            <div className="cr-market-list-header__card-container">
                <CardMarket title="Top Volume Coins" />
                <CardMarket title="Highlight Coins" />
                <CardMarket title="New Listing" />
                <CardMarket title="Top Gainers" />
            </div>
        </React.Fragment>
    );
};
