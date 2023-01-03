import classnames from 'classnames';
import React, { FC, ReactElement, useMemo, useCallback, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useOpenOrdersFetch } from 'src/hooks';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { Decimal } from '../../../components';
import { localeDate, setTradeColor } from '../../../helpers';
import {
    selectCurrentMarket,
    openOrdersCancelFetch,
    ordersCancelAllFetch,
    selectMarkets,
    selectOpenOrdersFetching,
    selectOpenOrdersList,
} from 'src/modules';
import { OpenOrders, OrderBook, MarketListTrade, RecentTrades, OrderForm, TradingChart } from '../../containers';
import { OrderCommon } from '../../../modules/types';
import { getTriggerSign } from './helpers';

export const TradingScreen: FC = (): ReactElement => {
    const [hideOtherPairs, setHideOtherPairs] = useState<boolean>(true);
    const currentMarket = useSelector(selectCurrentMarket);
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();
    const list = useSelector(selectOpenOrdersList);
    const fetching = useSelector(selectOpenOrdersFetching);
    const markets = useSelector(selectMarkets);
    const translate = React.useCallback((id: string) => formatMessage({ id: id }), [formatMessage]);

    useOpenOrdersFetch(currentMarket, hideOtherPairs);

    const headersKeys = useMemo(
        () => ['Date', 'Market', 'Type', 'Price', 'Amount', 'Total', 'Trigger', 'Filled', ''],
        []
    );

    const renderHeaders = useMemo(
        () => ['Date', 'Market', 'Type', 'Price', 'Amount', 'Total', 'Trigger', 'Filled', ''],
        []
    );

    const renderData = useCallback(
        (data) => {
            if (!data.length) {
                return [[[''], [''], [''], [''], translate('page.noDataToShow'), [''], [''], [''], ['']]];
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
                ];
            });
        },
        [markets]
    );

    const handleCancel = useCallback(
        (index: number) => {
            const orderToDelete = list[index];
            dispatch(openOrdersCancelFetch({ order: orderToDelete, list }));
        },
        [list]
    );

    const handleCancelAll = useCallback(() => {
        currentMarket && dispatch(ordersCancelAllFetch({ market: currentMarket.id }));
    }, [currentMarket]);

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

    return (
        <React.Fragment>
            <div className="market-trade-screen">
                <div className="content-wrapper no-sidebar dark-bg-accent pb-5">
                    <div className="px-24 pt-1">
                        <div className="grid-wrapper">
                            <div className="grid-item order-book">
                                <OrderBook />
                            </div>
                            <div className="grid-item chart">
                                <TradingChart />
                            </div>
                            <div className="grid-item market-list">
                                <MarketListTrade />
                            </div>
                            <div className="grid-item order-form">
                                <OrderForm />
                            </div>
                            <div className="grid-item recent-trades">
                                <RecentTrades />
                            </div>
                            <div className="grid-item open-orders mt-50">
                                {/* <OpenOrders
                                    headersKeys={headersKeys}
                                    headers={renderHeaders}
                                    data={renderData(list)}
                                    onCancel={handleCancel}
                                    handleCancelAll={handleCancelAll}
                                    handleToggle={handleToggleCheckbox}
                                    hideOthrerPairs={hideOtherPairs}
                                /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
