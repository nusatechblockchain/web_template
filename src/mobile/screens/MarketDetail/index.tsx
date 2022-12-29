import * as React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDocumentTitle, useWalletsFetch, useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { selectCurrencies, selectMarkets, selectMarketTickers } from 'src/modules';
import { TradingViewEmbed, widgetType } from 'react-tradingview-embed';
import { WarningIcon } from '../../assets/Warning';
import { Decimal } from 'src/components';

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

const MarketDetailMobileScreen: React.FC = () => {
    useDocumentTitle('Market Detail');
    useWalletsFetch();
    useMarketsFetch();
    useMarketsTickersFetch();
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const { currency } = useParams<{ currency?: string }>();

    const marketList = markets
        .map((market) => ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
            high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
            currency: currencies.find((cur) => cur.id === market.base_unit),
            volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.price_precision),
        }))
        .map((market) => ({
            ...market,
            change: Decimal.format(
                (+market.last - +market.open).toFixed(market.price_precision),
                market.price_precision
            ),
        }));

    const detail = marketList.find((obj) => {
        return obj.base_unit === currency;
    });

    console.log(detail);

    const optionStatus = [{ label: <p className="m-0 text-sm grey-text-accent">USDT</p>, value: 'usdt' }];
    return (
        <React.Fragment>
            <div className="mobile-container no-header market-detail dark-bg-main">
                <div className="d-flex flex-column align-items-center justify-content-center detail-card-coin w-100 mb-3">
                    <div className="d-flex justify-content-between align-items-center card-coin-head w-100">
                        <div className="d-flex align-items-center justify-content-start card-coin-price">
                            <img
                                src={detail && detail.currency && detail.currency.icon_url}
                                alt="coin"
                                className="small-coin-icon"
                            />
                            <h3 className="p-0 m-0">
                                {detail && detail.currency && detail.currency.name} Price{' '}
                                <span className="p-0 m-0">
                                    ({detail && detail.base_unit && detail.base_unit.toUpperCase()})
                                </span>
                            </h3>
                        </div>
                    </div>

                    <div className="price-container d-flex justify-content-start align-items-center w-100">
                        <h1 className="p-0 m-0">$ {detail && detail.currency && detail.currency.price}</h1>
                        <h4
                            className={`p-0 m-0 ${
                                detail && detail.price_change_percent && detail.price_change_percent.includes('-')
                                    ? 'danger-text'
                                    : 'contrast-text'
                            }`}>
                            {detail && detail.price_change_percent}
                        </h4>
                        <p className="p-0 m-0">1D</p>
                    </div>
                </div>
                <TradingViewEmbed
                    widgetType={widgetType.ADVANCED_CHART}
                    widgetConfig={{
                        colorTheme: 'dark',
                        symbol: currency,
                        width: '100%',
                        height: '100%',
                    }}
                />
                <>
                    <div className="info-coin-container d-flex flex-column mt-5">
                        <h4>{detail && detail.base_unit && detail.base_unit.toUpperCase()} Information</h4>
                        <p className="m-0 p-0 grey-text">
                            The live price of {detail && detail.currency && detail.currency.name} is ${' '}
                            {detail && detail.currency && detail.currency.price} per (
                            {detail && detail.base_unit && detail.base_unit.toUpperCase()} / USD) today with a current
                            market cap of $ 375.03B USD. Trading volume is {detail && detail.volume} USD.
                            {detail && detail.base_unit && detail.base_unit.toUpperCase()} to USD price is updated in
                            real-time. {detail && detail.currency && detail.currency.name} is{' '}
                        </p>
                    </div>
                    <div className="low-high-container d-flex flex-column w-100">
                        <div className="d-flex align-items-center low-high-info mt-4">
                            <p className="m-0 p-0 grey-text-accent">24 Low &amp; High</p>
                            <WarningIcon className={''} />
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100 low-high-progress">
                            <p>Low : $ {detail && detail.min_price}</p>
                            <div className="progress-bar">
                                <div className="progress" style={{ width: '50%' }} />
                            </div>
                            <p>High : $ {detail && detail.max_price}</p>
                        </div>
                        <div className="d-flex justify-content-between align-items-center w-100 price-change-container">
                            <div className="d-flex flex-column justify-content-start align-items-start card-price-change w-100">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="m-0 p-0">All Time</h4>
                                    <WarningIcon className={''} />
                                </div>
                                <h4 className="p-0 m-0">High</h4>
                                <p className="p-0 m-0 all-time">{detail && detail.high}</p>
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-start card-price-change w-100">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="m-0 p-0">Price</h4>
                                    <WarningIcon className={''} />
                                </div>
                                <h4 className="p-0 m-0">Change (1h)</h4>
                                <p
                                    className={`p-0 m-0 ${
                                        detail && detail.price_change_percent.includes('+')
                                            ? 'green-text'
                                            : detail && detail.price_change_percent.includes('-')
                                            ? 'danger-text'
                                            : 'grey-text-accent'
                                    }`}>
                                    {detail && detail.price_change_percent}
                                </p>
                            </div>
                            <div className="d-flex flex-column justify-content-start align-items-start card-price-change w-100">
                                <div className="d-flex justify-content-between align-items-center w-100">
                                    <h4 className="m-0 p-0">Last</h4>
                                    <WarningIcon className={''} />
                                </div>
                                <h4 className="p-0 m-0">Price</h4>
                                <p className="p-0 m-0 grey-text-accent">{detail && detail.last}</p>
                            </div>
                        </div>
                        <div className="mb-4">
                            <Link
                                to={
                                    detail && detail.type == 'spot'
                                        ? `/trading/${detail && detail.base_unit}`
                                        : `/trading-future/${detail && detail.base_unit}`
                                }
                                className="btn btn-primary btn-mobile btn-block">
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
