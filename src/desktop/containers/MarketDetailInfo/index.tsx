import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Currency } from 'src/modules';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { InfoIcon } from 'src/assets/images/InfoIcon';
import './MarketDetailInfo.pcss';
import { numberFormat } from '../../../helpers';
import { TradingChart } from '../../containers';

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
    const { currency = '' } = useParams<{ currency?: string }>();

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
            </div>
            <div className="d-flex align-items-center mb-24">
                <h3 className="white-text m-0 text-title-2 mr-24">
                    $ {numberFormat(detail?.last, 'USD').toString().split('.')[0]}
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
                <div className="trading-wrap">
                    <TradingChart />
                </div>
            </div>

            <div className="information">
                <h5 className=" white-text text-xl ">
                    {detail && detail.base_unit && detail.base_unit.toUpperCase()} Information
                </h5>
                <p className="grey-text-accent text-ms mb-24">
                    The live price of {detail && detail.currency && detail.currency.name} is ${' '}
                    {
                        numberFormat(detail && detail.last, 'USD')
                            .toString()
                            .split('.')[0]
                    }{' '}
                    per ({detail && detail.base_unit && detail.base_unit.toUpperCase()} / USD) . 24-hour trading volume
                    is ${' '}
                    {
                        numberFormat(detail && detail.volume, 'USD')
                            .toString()
                            .split('.')[0]
                    }{' '}
                    USD.
                    {detail && detail.base_unit && detail.base_unit.toUpperCase()} to USD price is updated in real-time.
                    {detail && detail.currency && detail.currency.name} is &nbsp;
                    {detail && detail.price_change_percent} in the last 24 hours.
                </p>
                <p className="grey-text-accent light mb-3">
                    24 Low &amp; High
                    <InfoIcon />
                </p>
                <div className="d-flex align-items-center mb-24">
                    <p className="grey-text-accent light mb-0">
                        Low : ${' '}
                        {
                            numberFormat(detail && detail.min_price, 'USD')
                                .toString()
                                .split('.')[0]
                        }
                    </p>
                    <div className="bar position-relative">
                        <div className="positive" style={{ width: '50%' }} />
                    </div>
                    <p className="grey-text-accent light mb-0">
                        High : ${' '}
                        {
                            numberFormat(detail && detail.max_price, 'USD')
                                .toString()
                                .split('.')[0]
                        }
                    </p>
                </div>
                <div className="row px-3">
                    <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                        <p className="grey-text-accent mb-12 light">
                            24 Low <InfoIcon />
                        </p>
                        <p className="mb-0 font-bold white-text">
                            ${' '}
                            {
                                numberFormat(detail && detail.min_price, 'USD')
                                    .toString()
                                    .split('.')[0]
                            }
                        </p>
                    </div>
                    <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                        <p className="grey-text-accent mb-12 light">
                            24 High <InfoIcon />
                        </p>
                        <p className="mb-0 font-bold white-text">
                            ${' '}
                            {
                                numberFormat(detail && detail.max_price, 'USD')
                                    .toString()
                                    .split('.')[0]
                            }
                        </p>
                    </div>

                    <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                        <p className="grey-text-accent mb-12 light">
                            Price Change (24h) <InfoIcon />
                        </p>
                        <p
                            className={`text-sm font-bold m-0 mr-24 ${
                                detail && detail.price_change_percent && detail.price_change_percent.includes('-')
                                    ? 'danger-text'
                                    : 'contrast-text'
                            }`}>
                            {detail && detail.price_change_percent}
                        </p>
                    </div>
                    <div className="col-lg-4 px-0 box col-xl-3 col-sm-6 mb-24">
                        <p className="grey-text-accent mb-12 light">
                            Popularity <InfoIcon />
                        </p>
                        <p className="mb-0 font-bold white-text">
                            #{detail && detail.currency && detail.currency.position}
                        </p>
                    </div>
                </div>
            </div>
            <div className="about-coin mt-4 height-300">
                <h5 className="text-lg white-text">
                    About {detail && detail.currency && detail.currency.name} (
                    {detail && detail.base_unit && detail.base_unit.toUpperCase()})
                </h5>
                <p className="text-ms grey-text-accent mb-24">
                    {detail && detail.currency && detail.currency.name} is one of the most popular cryptocurrencies in
                    the market. First introduced in 2009 by Satoshi Nakamoto,{' '}
                    {detail && detail.currency && detail.currency.name} has held the crypto market’s number one spot
                    according to market capitalization. {detail && detail.currency && detail.currency.name} paved the
                    way for many existing altcoins in the market and marked a pivotal moment for digital payment
                    solutions. As the world’s first cryptocurrency, {detail && detail.currency && detail.currency.name}{' '}
                    has come a long way in terms of its value. However, one does not have to buy an entire bitcoin as
                    bitcoins can be divided into small units called satoshis, named after the creator. A satoshi is
                    equivalent to 0.00000001 bitcoin. token so you can think of bitcoin as digital money.{' '}
                    {detail && detail.currency && detail.currency.name}
                    transactions are fully transparent and can’t be censored. You can send money
                </p>
                <p className="text-ms grey-text-accent  mb-24">
                    {detail && detail.currency && detail.currency.name} is one of the most popular cryptocurrencies in
                    the market. First introduced in 2009 by Satoshi Nakamoto,{' '}
                    {detail && detail.currency && detail.currency.name} has held the crypto market’s number one spot
                    according to market capitalization. {detail && detail.currency && detail.currency.name} paved the
                    way for many existing altcoins in the market and marked a pivotal moment for digital payment
                    solutions. As the world’s first cryptocurrency, {detail && detail.currency && detail.currency.name}{' '}
                    has come a long way in terms of its value. However, one does not have to buy an entire bitcoin as
                    bitcoins can be divided into small units called satoshis, named after the creator. A satoshi is
                    equivalent to 0.00000001 bitcoin. token so you can think of bitcoin as digital money.{' '}
                    {detail && detail.currency && detail.currency.name}
                    transactions are fully transparent and can’t be censored. You can send money
                </p>
                <div className="d-flex justify-content-center">
                    <p className="text-center gradient-text font-bold m-0">View All</p>
                </div>
            </div>
        </React.Fragment>
    );
};
