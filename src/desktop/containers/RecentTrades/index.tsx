import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectRecentTrades, recentTradesFetch, selectCurrentMarket } from '../../../modules';
import { NoData } from '../../../desktop/components';
import moment from 'moment';
import { numberFormat } from '../../../helpers';

const RecentTradesComponent = (props) => {
    const dispatch = useDispatch();
    const recentTrades = useSelector(selectRecentTrades);
    const currentMarket = useSelector(selectCurrentMarket);

    React.useEffect(() => {
        if (currentMarket) {
            dispatch(recentTradesFetch(currentMarket));
        }
    }, [dispatch, currentMarket]);

    return (
        <React.Fragment>
            <div className="p-3">
                <div className="d-flex justify-content-between">
                    <p className="white-text font-bold text-sm">Recent Trades</p>
                    <p className="white-text font-bold text-sm">Market Depth</p>
                </div>
                <div className="max-400 position-relative">
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th className="text-left grey-text dark-bg-accent">Price</th>
                                <th className="text-right grey-text dark-bg-accent">Amount</th>
                                <th className="text-right grey-text dark-bg-accent">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentTrades?.map((trade, i) => (
                                <tr key={i}>
                                    <td>
                                        <p
                                            className={`text-sm font-bold mb-0 text-left ${
                                                trade.taker_type === 'sell' ? 'danger-text' : 'contrast-text'
                                            }`}>
                                            {
                                                numberFormat(+trade.price, 'USD')
                                                    .toString()
                                                    .split('.')[0]
                                            }
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-sm grey-text-accent font-bold mb-0 text-right">
                                            {/* {
                                                numberFormat(+trade.amount, 'USD')
                                                    .toString()
                                                    .split('.')[0]
                                            } */}
                                            {trade.amount}
                                        </p>
                                    </td>
                                    <td>
                                        <p className="text-sm mb-0 grey-text-accent font-bold text-right">
                                            {moment(trade.created_at).format('hh:mm:ss')}
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

export const RecentTrades = React.memo(RecentTradesComponent);
