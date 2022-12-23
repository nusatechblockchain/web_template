import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { useParams } from 'react-router-dom';
import './TradingFutureChart.pcss';

export const TradingFutureChart: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);
    const { currency = '' } = useParams<{ currency?: string }>();

    return (
        <React.Fragment>
            <TradingViewEmbed
                widgetType={widgetType.ADVANCED_CHART}
                widgetConfig={{
                    colorTheme: 'dark',
                    symbol: currency,
                    width: '100%',
                    height: '767',
                }}
            />
        </React.Fragment>
    );
};
