import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import './TradingFutureRecentTrades.pcss';

export const TradingFutureRecentTrades: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    return (
        <React.Fragment>
            <div className="p-3">
                <div className="d-flex justify-content-between">
                    <p className="white-text font-bold text-sm mb-6">Recent Trades</p>
                    <p className="white-text font-bold text-sm mb-6">Market Depth</p>
                </div>
                <div className="max-250 position-relative">
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <thead>
                            <tr className="dark-bg-main grey-text-accent text-xs font-bold">
                                <th className="text-left">Price</th>
                                <th className="text-right">Amount</th>
                                <th className="text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.120<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.120<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.120<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.120<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.120<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.120<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">17.7123</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">12:22:24</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};
