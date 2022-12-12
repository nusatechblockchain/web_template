import * as React from 'react';

const ChartsComponent = (props) => {
    return (
        <React.Fragment>
            {/* TradingView Widget BEGIN */}
            <div className="tradingview-widget-container">
                <div id="tradingview_2d0d5" />
                <div className="tradingview-widget-copyright">
                    <a
                        href="https://www.tradingview.com/symbols/BTCUSDT/?exchange=BINANCE"
                        rel="noopener"
                        target="_blank">
                        <span className="blue-text">BTCUSDT Chart</span>
                    </a>
                    by TradingView
                </div>
            </div>
            {/* TradingView Widget END */}
        </React.Fragment>
    );
};

export const Charts = React.memo(ChartsComponent);
