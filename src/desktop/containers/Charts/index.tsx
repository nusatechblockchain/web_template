import * as React from 'react';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';

const ChartsComponent = (props) => {
    return (
        <React.Fragment>
            <TradingViewEmbed
                widgetType={widgetType.ADVANCED_CHART}
                widgetConfig={{
                    colorTheme: 'dark',
                    symbol: 'BITMEX:XBTUSD',
                    width: '100%',
                    height: '100%',
                }}
            />
        </React.Fragment>
    );
};

export const Charts = React.memo(ChartsComponent);
