import classnames from 'classnames';
import React, { FC, ReactElement, useMemo, useCallback, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useDepthFetch, useOpenOrdersFetch } from 'src/hooks';
import { Decimal } from '../../../components';
import { localeDate, setTradeColor } from '../../../helpers';
import {
    selectCurrentMarket,
    openOrdersCancelFetch,
    ordersCancelAllFetch,
    selectMarkets,
    selectOpenOrdersFetching,
    selectOpenOrdersList,
    selectMarketTickers,
    selectCurrencies,
    userOpenOrdersFetch,
    setCurrentMarket,
    Market,
    selectDepthAsks,
    selectDepthBids,
    depthFetch,
    depthIncrementSubscribeResetLoading,
} from 'src/modules';
import { incrementalOrderBook } from 'src/api';
import { useMarketsFetch, useMarketsTickersFetch } from 'src/hooks';
import { OpenOrders, OrderBook, MarketListTrade, RecentTrades, OrderForm, TradingChart } from '../../containers';
import { OrderCommon } from '../../../modules/types';
import { getTriggerSign } from './helpers';

export const TradingScreen: FC = (): ReactElement => {
    const [hideOtherPairs, setHideOtherPairs] = useState<boolean>(false);
    const [list, setList] = useState([]);
    const [filterSell, setFilterSell] = useState(false);
    const [filterBuy, setFilterBuy] = useState(false);

    const asks = useSelector(selectDepthAsks);
    const bids = useSelector(selectDepthBids);
    const listOrder = useSelector(selectOpenOrdersList);
    const fetching = useSelector(selectOpenOrdersFetching);
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const currencies = useSelector(selectCurrencies);
    const currentMarket = useSelector(selectCurrentMarket);

    useOpenOrdersFetch(currentMarket, hideOtherPairs);
    useDepthFetch();

    const { currency = '' } = useParams<{ currency?: string }>();
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const history = useHistory();

    const translate = React.useCallback((id: string) => formatMessage({ id: id }), [formatMessage]);

    const current: Market | undefined = markets.find((item) => item.id === currency);
    React.useEffect(() => {
        if (current) {
            dispatch(setCurrentMarket(current));
        }
    }, [current]);

    React.useEffect(() => {
        if (listOrder) {
            const data =
                listOrder.length && listOrder.filter((item) => item.market.toLowerCase() === currency.toLowerCase());
            setList(data);
        }
        if (list && list[0] && filterSell) {
            const sell = list.filter((item) => item.side === 'sell');
            setList(sell);
        }

        if (list && list[0] && filterBuy) {
            const buy = list.filter((item) => item.side === 'buy');
            setList(buy);
        }

        if (hideOtherPairs) {
            setList([]);
        }
    }, [listOrder, filterBuy, filterSell, hideOtherPairs]);

    const handleRedirectToTrading = (id: string) => {
        const currentMarket: Market | undefined = markets.find((item) => item.id === id);

        if (currentMarket) {
            dispatch(setCurrentMarket(currentMarket));
            console.log(currentMarket);

            dispatch(depthIncrementSubscribeResetLoading());

            if (!incrementalOrderBook()) {
                dispatch(depthFetch(currentMarket));
            }

            history.push(
                `/markets/${currentMarket.type == 'spot' ? 'trading/' : '/trading-future/'}${currentMarket.id}`
            );
        }
    };

    const handleCancel = (order: OrderCommon) => {
        dispatch(openOrdersCancelFetch({ order, list }));
        setTimeout(() => {
            if (current) {
                dispatch(userOpenOrdersFetch({ market: current }));
            }
        }, 1000);
    };

    const handleCancelAll = () => {
        if (currency) {
            dispatch(ordersCancelAllFetch({ market: currency }));
        }

        setTimeout(() => {
            if (currency) {
                dispatch(userOpenOrdersFetch({ market: current }));
            }
        }, 1000);
    };

    const headersKeys = useMemo(
        () => [
            'Date',
            'Market',
            'Type',
            'Price',
            'Amount',
            'Total',
            'Trigger',
            'Filled',
            'Side',
            <p className="text-sm danger-text font-bold mb-0 ml-2 cursor-pointer" onClick={() => handleCancelAll()}>
                Cancel All
            </p>,
        ],
        []
    );

    const renderHeaders = useMemo(
        () => [
            'Date',
            'Market',
            'Type',
            'Price',
            'Amount',
            'Total',
            'Trigger',
            'Filled',
            'Side',
            <p className="text-sm danger-text font-bold mb-0 ml-2 cursor-pointer" onClick={() => handleCancelAll()}>
                Cancel All
            </p>,
        ],
        []
    );

    const renderData = useCallback(
        (data) => {
            if (!data.length) {
                return [[[''], [''], [''], [''], [''], translate('page.noDataToShow'), [''], [''], [''], ['']]];
            }

            return data.map((item: OrderCommon) => {
                const {
                    id,
                    price,
                    created_at,
                    remaining_volume,
                    origin_volume,
                    side,
                    ord_type,
                    market,
                    trigger_price,
                } = item;
                const executedVolume = Number(origin_volume) - Number(remaining_volume);
                const filled = ((executedVolume / Number(origin_volume)) * 100).toFixed(2);
                const curMarket = markets.find((i) => i.id === market);
                const priceFixed = curMarket?.price_precision || 0;
                const amountFixed = curMarket?.amount_precision || 0;

                return [
                    <span key={id} className="split-lines">
                        <span className="secondary">{localeDate(created_at, 'date')}</span>&nbsp;
                        <span>{localeDate(created_at, 'time')}</span>
                    </span>,
                    <span key={id} className="bold">
                        {curMarket?.name.toUpperCase()}
                    </span>,
                    <span key={id}>
                        {ord_type ? translate(`page.body.trade.header.openOrders.content.type.${ord_type}`) : '-'}
                    </span>,
                    <span style={{ color: setTradeColor(side).color }} key={id}>
                        <Decimal fixed={priceFixed} thousSep=",">
                            {price}
                        </Decimal>
                    </span>,
                    <span key={id}>
                        <Decimal fixed={amountFixed} thousSep=",">
                            {+remaining_volume}
                        </Decimal>
                    </span>,
                    <span key={id}>
                        <Decimal fixed={amountFixed} thousSep=",">
                            {+remaining_volume * +price}
                        </Decimal>{' '}
                        <span className="cr-text__opacity">{curMarket?.quote_unit?.toUpperCase()}</span>
                    </span>,
                    <span key={id} className="split-lines">
                        {trigger_price ? (
                            <React.Fragment>
                                <span>{translate('page.body.trade.header.openOrders.lastPrice')}</span>&nbsp;
                                {getTriggerSign(ord_type, side)}&nbsp;&nbsp;
                                <span style={{ color: setTradeColor(side).color }}>
                                    {Decimal.format(trigger_price, priceFixed, ',')}
                                </span>
                            </React.Fragment>
                        ) : (
                            '-'
                        )}
                    </span>,
                    <span style={{ color: setTradeColor(side).color }} key={id}>
                        <Decimal fixed={2} thousSep=",">
                            {+filled}
                        </Decimal>
                        %
                    </span>,
                    side,
                    <button className="btn-danger" type="button" onClick={() => handleCancel(item)}>
                        Cancel
                    </button>,
                ];
            });
        },
        [markets]
    );

    const classNames = useMemo(
        () =>
            classnames('pg-open-orders', {
                'pg-open-orders--empty': !list.length,
                'pg-open-orders--loading': fetching,
            }),
        [list, fetching]
    );

    const handleToggleCheckbox = React.useCallback(
        (event) => {
            event.preventDefault();
            setHideOtherPairs(!hideOtherPairs);
        },
        [hideOtherPairs]
    );

    const handleFilterSell = () => {
        setFilterSell(!filterSell);
    };

    const handleFilterBuy = () => {
        setFilterBuy(!filterBuy);
    };

    return (
        <React.Fragment>
            <div className="market-trade-screen">
                <div className="content-wrapper no-sidebar dark-bg-accent pb-5">
                    <div className="px-24 pt-1">
                        <div className="grid-wrapper">
                            <div className="grid-item order-book">
                                <OrderBook asks={asks} bids={bids} />
                            </div>
                            <div className="grid-item chart">
                                <TradingChart />
                            </div>
                            <div className="grid-item market-list">
                                <MarketListTrade handleRedirectToTrading={handleRedirectToTrading} />
                            </div>
                            <div className="grid-item order-form">
                                <OrderForm />
                            </div>
                            <div className="grid-item recent-trades">
                                <RecentTrades />
                            </div>
                            <div className="grid-item open-orders mt-50">
                                <OpenOrders
                                    headersKeys={headersKeys}
                                    headers={renderHeaders}
                                    data={renderData(list)}
                                    // onCancel={handleCancel}
                                    handleCancelAll={handleCancelAll}
                                    handleToggle={handleToggleCheckbox}
                                    hideOtherPair={hideOtherPairs}
                                    handleFilterBuy={handleFilterBuy}
                                    handleFilterSell={handleFilterSell}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
