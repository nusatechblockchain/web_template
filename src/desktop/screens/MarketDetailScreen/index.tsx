import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch } from 'src/hooks';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import { MarketDetailCalculator, MarketDetailInfo } from '../../containers';
import { CardMarketDetail } from '../../components';
import { ArrowLeftIcon } from 'src/assets/images/ArrowLeftIcon';
import './MarketDetailScreen.pcss';

export const MarketDetailScreen: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    useDocumentTitle('Market Detail');
    useWalletsFetch();

    return (
        <React.Fragment>
            <div className="d-flex pg-market-detail-screen dark-bg-main">
                <div className="w-70">
                    <div className="mb-24">
                        <div className="d-flex align-items-center pg-market-detail-screen__title">
                            <ArrowLeftIcon className={'mr-8'} />
                            <span className="text-ms font-extrabold grey-text-accent pl-3 pr-4 market">Market</span>
                            <p className="text-ms font-extrabold white-text pl-4 mb-0">Bitcoin</p>
                        </div>
                    </div>

                    <MarketDetailInfo />
                </div>
                <div className="w-30 d-flex flex-column pg-market-detail-screen__content-right">
                    <MarketDetailCalculator />
                    <CardMarketDetail title="Most Tranding" />
                    <CardMarketDetail title="Top 3 Gainers" />
                    <CardMarketDetail title="Top 3 Losers" />
                </div>
            </div>
        </React.Fragment>
    );
};
