import * as React from 'react';
import { useSelector } from 'react-redux';
import { Sell, Buy } from '../../../assets/images/TradeIcon';
import { selectUserLoggedIn } from '../../../modules';
import { NoData } from '../../../desktop/components';

const OpenOrdersComponent = (props) => {
    const isLoggedIn = useSelector(selectUserLoggedIn);
    return (
        <React.Fragment>
            <div className="max-400">
                <div className="d-flex justify-content-between dark-bg-accent sort-filter">
                    <p className="white-text font-bold text-sm">Open orders</p>
                    <div className="filter">
                        <div className="d-flex align-items-center">
                            <p className="text-sm grey-text font-bold mb-0 mr-2">Sort by: </p>
                            <button className="btn btn-transparent w-auto danger-text text-sm font-bold">
                                Sell
                                <Sell />
                            </button>
                            <button className="btn btn-transparent w-auto contrast-text text-sm font-bold">
                                Buy
                                <Buy />
                            </button>
                            <div className="form-group form-check mb-0">
                                <input type="checkbox" className="form-check-input" id="hide-all" />
                                <label className="form-check-label text-sm font-semibold white-text" htmlFor="hide-all">
                                    Hide All Pairs
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                {isLoggedIn ? (
                    <table
                        id="example"
                        className="table table-open-order  hidden-filter table-small"
                        style={{ width: '100%' }}>
                        <thead className="open-order-table">
                            <tr>
                                <th className="grey-text-accent dark-bg-accent">Date</th>
                                <th className="grey-text-accent dark-bg-accent">Market</th>
                                <th className="grey-text-accent dark-bg-accent">Type</th>
                                <th className="grey-text-accent dark-bg-accent">Price</th>
                                <th className="grey-text-accent dark-bg-accent">Volume</th>
                                <th className="grey-text-accent dark-bg-accent">Exceute</th>
                                <th className="grey-text-accent dark-bg-accent">Unexceute</th>
                                <th className="grey-text-accent dark-bg-accent content-right">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                            <tr>
                                <td className="white-text text-sm">24-10-2022 - 13:54</td>
                                <td className="white-text text-sm">Limit Order</td>
                                <td className="white-text text-sm">
                                    <span className="contrast-text">buy</span>
                                </td>
                                <td className="white-text text-sm">$ 252.125.536</td>
                                <td className="white-text text-sm">1 TRX</td>
                                <td className="white-text text-sm">0.8 TRX</td>
                                <td className="white-text text-sm">0.2 TRX</td>
                                <td className="white-text text-sm content-right">
                                    <button className="btn btn-danger sm text-sm py-1">Cancel</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ) : (
                    <NoData text="No data to show" />
                )}
            </div>
        </React.Fragment>
    );
};

export const OpenOrders = React.memo(OpenOrdersComponent);
