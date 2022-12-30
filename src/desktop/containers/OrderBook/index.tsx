import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentMarket, selectDepthBids, selectDepthAsks } from '../../../modules';
import { useOpenOrdersFetch } from '../../../hooks';
import { TradeDown, TradeUp } from '../../../assets/images/TradeIcon';
import { numberFormat, accumulateVolume, calcMaxVolume } from '../../../helpers';
import { Decimal } from '../../../components';

const OrderBookComponent = (props) => {
    useOpenOrdersFetch();

    const currentMarket = useSelector(selectCurrentMarket);
    const asks = useSelector(selectDepthAsks);
    const bids = useSelector(selectDepthBids);

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
                    </table>
                </div>
                <div className="price-highlight py-3">
                    <h3 className={`text-md font-bold mb-0 ${MarketDeal > 0 ? 'green-text' : 'danger-text'}`}>
                        0.059132 {MarketDeal > 0 ? <TradeUp /> : <TradeDown />}
                    </h3>
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
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export const OrderBook = React.memo(OrderBookComponent);
