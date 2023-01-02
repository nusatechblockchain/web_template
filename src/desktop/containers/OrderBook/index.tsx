import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMarket, selectDepthBids, selectDepthAsks, selectLastRecentTrade } from '../../../modules';
import { useOpenOrdersFetch } from '../../../hooks';
import { TradeDown, TradeUp } from '../../../assets/images/TradeIcon';
import { numberFormat, accumulateVolume, calcMaxVolume } from '../../../helpers';
import { Decimal } from '../../../components';
import { NoData } from '../../../desktop/components';

const OrderBookComponent = (props) => {
    useOpenOrdersFetch();

    const currentMarket = useSelector(selectCurrentMarket);
    const lastTrade = useSelector(selectLastRecentTrade);
    const ask = useSelector(selectDepthAsks);
    const bid = useSelector(selectDepthBids);

    const mapValues = (maxVolume?: number, data?: number[]) => {
        const resultData =
            data && maxVolume && data.length
                ? data.map((currentVolume) => {
                      // tslint:disable-next-line:no-magic-numbers
                      return { value: (currentVolume / maxVolume) * 100 };
                  })
                : [];

        return resultData;
    };

    const asks = [...ask].sort((a, b) => Number(b[0]) - Number(a[0]));
    const bids = [...bid].sort((a, b) => Number(b[0]) - Number(a[0]));

    const bgWitdhBids = mapValues(calcMaxVolume(bids, asks), accumulateVolume(bids, false));
    const bgWidthAsk = mapValues(calcMaxVolume(bids, asks), accumulateVolume(asks, false));

    const MarketDeal = 1; //dummy value
    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm">Order Book</p>
                <div className="max-400 position-relative">
                    <div className="table-background">
                        {asks &&
                            asks.map((item, i) => (
                                <div
                                    key={i}
                                    className="table-background-row danger"
                                    style={{ width: bgWidthAsk[i].toString() }}
                                />
                            ))}
                    </div>
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th className="text-left grey-text">Price</th>
                                <th className="text-right grey-text">Amount</th>
                                <th className="text-right grey-text">Total</th>
                            </tr>
                        </thead>
                        {!asks || !asks[0] ? (
                            <tbody>
                                <tr>
                                    <td colSpan={3}>
                                        <NoData text="No data yet" />
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <tbody>
                                {asks &&
                                    asks.map((item, i) => (
                                        <tr key={i}>
                                            <td>
                                                <p className="text-sm danger-text font-bold mb-0 text-left">
                                                    {
                                                        numberFormat(+item[0], 'USD')
                                                            .toString()
                                                            .split('.')[0]
                                                    }
                                                </p>
                                            </td>
                                            <td>
                                                <p className="text-sm grey-text-accent font-bold mb-0 text-right">
                                                    <Decimal fixed={currentMarket.amount_precision} thousSep=",">
                                                        {item[1]}
                                                    </Decimal>
                                                </p>
                                            </td>
                                            <td>
                                                <p className="text-sm mb-0 grey-text-accent font-bold text-right">
                                                    {
                                                        numberFormat(+item[0] * +item[1], 'USD')
                                                            .toString()
                                                            .split('.')[0]
                                                    }
                                                </p>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        )}
                    </table>
                </div>
                <div className="price-highlight py-3 d-flex justify-content-between align-items-center">
                    <h3
                        className={`text-md font-bold mb-0 ${
                            lastTrade && +lastTrade.price_change > 0 ? 'green-text' : 'danger-text'
                        }`}>
                        {
                            numberFormat(lastTrade && +lastTrade.price, 'USD')
                                .toString()
                                .split('.')[0]
                        }
                        {lastTrade && +lastTrade.price_change > 0 ? <TradeUp /> : <TradeDown />}
                    </h3>
                    <p
                        className={`p-0 m-0 text-sm font-normal ${
                            lastTrade && +lastTrade.price_change > 0 ? 'green-text' : 'danger-text'
                        }`}>
                        {lastTrade && lastTrade.price_change}
                    </p>
                </div>
                <div className="max-400 position-relative">
                    <div className="table-background top-30">
                        {bids &&
                            bids.map((item, i) => (
                                <div
                                    key={i}
                                    className="table-background-row good"
                                    style={{ width: bgWitdhBids[i].toString() }}
                                />
                            ))}
                    </div>
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        {!bids || !bids[0] ? (
                            <NoData text="No data yet" />
                        ) : (
                            <tbody>
                                {bids.map((item, i) => (
                                    <tr key={i}>
                                        <td>
                                            <p className="text-sm green-text font-bold mb-0 text-left">
                                                {
                                                    numberFormat(+item[0], 'USD')
                                                        .toString()
                                                        .split('.')[0]
                                                }
                                            </p>
                                        </td>
                                        <td>
                                            <p className="text-sm grey-text-accent font-bold mb-0 text-right">
                                                <Decimal fixed={currentMarket.amount_precision} thousSep=",">
                                                    {item[1]}
                                                </Decimal>
                                            </p>
                                        </td>
                                        <td>
                                            <p className="text-sm mb-0 grey-text-accent font-bold text-right">
                                                {
                                                    numberFormat(+item[0] * +item[1], 'USD')
                                                        .toString()
                                                        .split('.')[0]
                                                }
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export const OrderBook = React.memo(OrderBookComponent);
