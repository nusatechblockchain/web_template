import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { useMarketsFetch, useMarketsTickersFetch, useDocumentTitle } from '../../../hooks';
import {
    selectCurrencies,
    selectMarketTickers,
    MarketsTickersData,
    Currency,
    selectMarkets,
    Market,
} from '../../../modules';
import { Decimal } from '../../../components';
import { ModalMobile } from 'src/mobile/components';

export const TradingMobileScreen: React.FC = (): React.ReactElement => {
    useDocumentTitle('Trading');
    return (
        <React.Fragment>
            <h1>Trading</h1>
        </React.Fragment>
    );
};
