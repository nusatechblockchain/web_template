import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectCurrencies, Currency } from 'src/modules';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { Link } from 'react-router-dom';
import { BtcIcon } from 'src/assets/images/CoinIcon';
import { InfoIcon } from 'src/assets/images/InfoIcon';
import Select from 'react-select';
import { CustomStylesSelect } from 'src/desktop/components';
import './MarketDetailInfo.pcss';

export interface InfoMarketDetailProps {
    amount_precision: string;
    base_unit: string;
    change: string;
    currency: Currency;
    high: string;
    id: string;
    kline: [];
    last: string;
    max_price: string;
    min_amount: string;
    min_price: string;
    name: string;
    open: string;
    price_change_percent: string;
    price_precision: number;
    quote_unit: string;
    state: string;
    symbol: string;
    type: string;
    volume: string;
}

export interface MarketDetailInfoProps {
    detail: InfoMarketDetailProps | any;
}

export const MarketDetailInfo: React.FC<MarketDetailInfoProps> = ({ detail }) => {
    const currencies = useSelector(selectCurrencies);
    const { currency = '' } = useParams<{ currency?: string }>();

    const optionCurrency = [
        { label: <p className="m-0 text-sm grey-text-accent">USD - $</p>, value: 'USD' },
        { label: <p className="m-0 text-sm grey-text-accent">EUR - €</p>, value: 'EUR' },
        { label: <p className="m-0 text-sm grey-text-accent">PHP - ₱</p>, value: 'PHP' },
        { label: <p className="m-0 text-sm grey-text-accent">JPY(¥)</p>, value: 'JPY' },
    ];

    return (
        <React.Fragment>
            <div className="com-market-detail-info mb-24 d-flex justify-content-between align-items-center">
                <div className="name d-flex align-items-center position-relative">
                    <img
                        src={detail && detail.currency && detail.currency.icon_url}
                        alt="icon"
                        className="icon mr-24"
                    />
                    <h2 className="white-text m-0 text-title-2 mr-24">
                        {detail && detail.currency && detail.currency.name} Price
                    </h2>
                    <span className="grey-text-accent text-ms font-extrabold">
                        ({detail && detail.base_unit && detail.base_unit.toUpperCase()})
                    </span>
                </div>
                <div className="w-25">
                    <Select
                        value={optionCurrency.filter(function (option) {
                            return option.value === 'USD';
                        })}
                        styles={CustomStylesSelect}
                        options={optionCurrency}
                    />
                </div>
            </div>
            <div className="d-flex align-items-center mb-24">
                <h3 className="white-text m-0 text-title-2 mr-24">
                    $ {detail && detail.currency && detail.currency.price}
                </h3>
                <h6
                    className={`text-lg font-bold m-0 mr-24 ${
                        detail && detail.price_change_percent && detail.price_change_percent.includes('-')
                            ? 'danger-text'
                            : 'contrast-text'
                    }`}>
                    {detail && detail.price_change_percent}
                </h6>
                <span className="text-ms grey-text font-normal">(1D)</span>
            </div>

            <div className="mb-24 mr-12">
                <TradingViewEmbed
                    widgetType={widgetType.ADVANCED_CHART}
                    widgetConfig={{
                        colorTheme: 'dark',
                        symbol: currency,
                        width: '100%',
                        height: '500px',
                    }}
                />
            </div>

            <>
                <div className="information">
                    <h5 className=" white-text text-xl ">
                        {detail && detail.base_unit && detail.base_unit.toUpperCase()} Information
                    </h5>
                    <p className="grey-text-accent text-ms mb-24">
                        The live price of {detail && detail.currency && detail.currency.name} is $ 19,544.40 per (
                        {detail && detail.base_unit && detail.base_unit.toUpperCase()} / USD) today with a current
                        market cap of $ 375.03B USD. 24-hour trading volume is $ 28.46B USD.
                        {detail && detail.base_unit && detail.base_unit.toUpperCase()} to USD price is updated in
                        real-time.
                        {detail && detail.currency && detail.currency.name} is -0.21% in the last 24 hours. It has a
                        circulating supply of 19.19M USD.
                    </p>
                    <p className="grey-text-accent light mb-3">
                        24 Low &amp; High
                        <InfoIcon />
                    </p>
                    <div className="d-flex align-items-center mb-24">
                        <p className="grey-text-accent light mb-0">Low : $ {detail && detail.min_price}</p>
                        <div className="bar position-relative">
                            <div className="positive" style={{ width: '12%' }} />
                        </div>
                        <p className="grey-text-accent light mb-0">High : $ {detail && detail.max_price}</p>
                    </div>
                    <div className="row px-3">
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                24 Low &amp; High <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold white-text">$ 19,398.39</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Price Change (1h) <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold contrast-text">+0.23%</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Price Change (24h) <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold danger-text">-0.17%</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Price Change (7d) <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold danger-text">-0.25%</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Popularity <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold white-text">#1</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Market Cap <InfoIcon />
                            </p>
                            <p className="mb-0  font-bold white-text">$ 987.654</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Price Change (24h) <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold white-text">$ 201.632</p>
                        </div>
                        <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                            <p className="grey-text-accent mb-12 light">
                                Price Change (7d) <InfoIcon />
                            </p>
                            <p className="mb-0 font-bold white-text">$ 845.112</p>
                        </div>
                    </div>
                </div>
                <div className="about-coin mt-4 height-300">
                    <h5 className="text-lg white-text">
                        About {detail && detail.currency && detail.currency.name} (
                        {detail && detail.base_unit && detail.base_unit.toUpperCase()})
                    </h5>
                    <p className="text-ms grey-text-accent mb-24">
                        {detail && detail.currency && detail.currency.name} is one of the most popular cryptocurrencies
                        in the market. First introduced in 2009 by Satoshi Nakamoto,{' '}
                        {detail && detail.currency && detail.currency.name} has held the crypto market’s number one spot
                        according to market capitalization. {detail && detail.currency && detail.currency.name} paved
                        the way for many existing altcoins in the market and marked a pivotal moment for digital payment
                        solutions. As the world’s first cryptocurrency,{' '}
                        {detail && detail.currency && detail.currency.name} has come a long way in terms of its value.
                        However, one does not have to buy an entire bitcoin as bitcoins can be divided into small units
                        called satoshis, named after the creator. A satoshi is equivalent to 0.00000001 bitcoin. token
                        so you can think of bitcoin as digital money.{' '}
                        {detail && detail.currency && detail.currency.name}
                        transactions are fully transparent and can’t be censored. You can send money
                    </p>
                    <p className="text-ms grey-text-accent  mb-24">
                        {detail && detail.currency && detail.currency.name} is one of the most popular cryptocurrencies
                        in the market. First introduced in 2009 by Satoshi Nakamoto,{' '}
                        {detail && detail.currency && detail.currency.name} has held the crypto market’s number one spot
                        according to market capitalization. {detail && detail.currency && detail.currency.name} paved
                        the way for many existing altcoins in the market and marked a pivotal moment for digital payment
                        solutions. As the world’s first cryptocurrency,{' '}
                        {detail && detail.currency && detail.currency.name} has come a long way in terms of its value.
                        However, one does not have to buy an entire bitcoin as bitcoins can be divided into small units
                        called satoshis, named after the creator. A satoshi is equivalent to 0.00000001 bitcoin. token
                        so you can think of bitcoin as digital money.{' '}
                        {detail && detail.currency && detail.currency.name}
                        transactions are fully transparent and can’t be censored. You can send money
                    </p>
                    <div className="d-flex justify-content-center">
                        <p className="text-center gradient-text font-bold m-0">View All</p>
                    </div>
                </div>
            </>
        </React.Fragment>
    );
};
