import * as React from 'react';
import { ArrowLeft } from '../../assets/Arrow';
import { Link, useHistory } from 'react-router-dom';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { WarningIcon } from '../../assets/Warning';
import Select from 'react-select';
import { CustomStylesSelect } from 'src/desktop/components';

const MarketDetailMobileScreen: React.FC = () => {
    const optionStatus = [
        { label: <p className="m-0 text-sm grey-text-accent">USD</p>, value: 'usd' },
        { label: <p className="m-0 text-sm grey-text-accent">IDR</p>, value: 'idr' },
        { label: <p className="m-0 text-sm grey-text-accent">USDT</p>, value: 'usdt' },
    ];
    return (
        <React.Fragment>
            <div className="mobile-container no-header market-detail dark-bg-main">
                <div className="head-container position-relative mb-5">
                    <Link to={'/profile'} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <h1 className="text-center text-md grey-text-accent font-bold">API Management</h1>
                </div>
                <div className="d-flex flex-column align-items-center justify-content-center detail-card-coin w-100 mb-3">
                    <div className="d-flex justify-content-between align-items-center card-coin-head w-100">
                        <div className="d-flex align-items-center justify-content-start card-coin-price">
                            <BtcIcon />
                            <h3 className="p-0 m-0">
                                Bitcoin Price <span className="p-0 m-0">(BTC)</span>
                            </h3>
                        </div>

                        <Select
                            value={optionStatus.filter(function (option) {
                                return option.value === 'usd';
                            })}
                            styles={CustomStylesSelect}
                            options={optionStatus}
                        />
                    </div>

                    <div className="price-container d-flex justify-content-start align-items-center w-100">
                        <h1 className="p-0 m-0">$ 19,856,981.8</h1>
                        <h4 className="p-0 m-0">+0.02%</h4>
                        <p className="p-0 m-0">1D</p>
                    </div>
                </div>
                <TradingViewEmbed
                    widgetType={widgetType.ADVANCED_CHART}
                    widgetConfig={{
                        colorTheme: 'dark',
                        symbol: 'BITMEX:XBTUSD',
                        width: '100%',
                        height: '100%',
                    }}
                />
                <>
                    <div className="info-coin-container d-flex flex-column mt-5">
                        <h4>BTC Information</h4>
                        <p className="m-0 p-0 grey-text">
                            The live price of Bitcoin is € 19,544.40 per (BTC / EUR) today with a current market cap of
                            € 375.03B EUR. 24-hour trading volume is € 28.46B EUR. BTC to EUR price is updated in
                            real-time. Bitcoin is -0.21% in the last 24 hours. It has a circulating supply of 19.19M
                            EUR.
                        </p>
                    </div>
                    <div className="low-high-container d-flex flex-column w-100">
                        <div className="d-flex align-items-center low-high-info mt-4">
                            <p className="m-0 p-0 grey-text-accent">24 Low &amp; High</p>
                            <WarningIcon className={''} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100 low-high-progress">
                            <p>Low : € 19,398.39</p>
                            <div className="progress-bar">
                                <div className="progress" />
                            </div>
                            <p>High : € 19,398.39</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100 price-change-container">
                            <div className="d-flex flex-column justify-content-start align-items-start card-price-change w-100">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="m-0 p-0">All Time</h4>
                                    <WarningIcon className={''} />
                                </div>
                                <h4 className="p-0 m-0">High</h4>
                                <p className="p-0 m-0 all-time">$ 19,398.39</p>
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-start card-price-change w-100">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="m-0 p-0">Price</h4>
                                    <WarningIcon className={''} />
                                </div>
                                <h4 className="p-0 m-0">Change (1h)</h4>
                                <p className="p-0 m-0 success">+0.23%</p>
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-start card-price-change w-100">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="m-0 p-0">Price</h4>
                                    <WarningIcon className={''} />
                                </div>
                                <h4 className="p-0 m-0">Change (24h)</h4>
                                <p className="p-0 m-0 danger">-0.17%</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Link to={'/trading'} className="btn btn-primary btn-mobile btn-block">
                                Trade Now
                            </Link>
                        </div>
                    </div>
                </>
            </div>
        </React.Fragment>
    );
};

export { MarketDetailMobileScreen };
