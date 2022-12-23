import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Tabs, Tab } from 'react-bootstrap';
import { StarIconFill } from 'src/assets/images/StarIcon';
import {
    MarketAllCryptoTabs,
    MarketFavoriteTabs,
    MarketFuturesTabs,
    MarketNewListingTabs,
    MarketSpotTabs,
} from '../../components';
import './MarketListTable.pcss';

export const MarketListTable: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    const returnFavorite = () => {
        return (
            <div className="d-flex align-items-center">
                <span className="m-0 mr-8">
                    <StarIconFill />
                </span>
                <p className="m-0">Favorite</p>
            </div>
        );
    };

    return (
        <React.Fragment>
            <div className="cr-market-list-table">
                <Tabs defaultActiveKey="all-crypto" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="favorite" title={returnFavorite()}>
                        <MarketFavoriteTabs />
                    </Tab>
                    <Tab eventKey="all-crypto" title="All Cryptos">
                        <MarketAllCryptoTabs />
                    </Tab>
                    <Tab eventKey="spot-markets" title="Spot Markets">
                        <MarketSpotTabs />
                    </Tab>
                    <Tab eventKey="futures-markets" title="Futures Markets">
                        <MarketFuturesTabs />
                    </Tab>
                    <Tab eventKey="new-listing" title="New Listing">
                        <MarketNewListingTabs />
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    );
};
