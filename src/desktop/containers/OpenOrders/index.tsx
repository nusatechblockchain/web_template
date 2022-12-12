import * as React from 'react';

const OpenOrdersComponent = (props) => {
    return (
        <React.Fragment>
            <div className="max-400">
                <div className="d-flex justify-content-between dark-bg-main sort-filter">
                    <p className="white-text font-bold text-sm">Open orders</p>
                    <div className="filter">
                        <div className="d-flex align-items-center">
                            <p className="text-sm grey-text font-bold mb-0 mr-2">Sort by: </p>
                            <button className="btn btn-transparent w-auto danger-text text-sm font-bold">
                                Sell
                                <img src="../../Assets/Icon/sell.svg" />
                            </button>
                            <button className="btn btn-transparent w-auto contrast-text text-sm font-bold">
                                Buy
                                <img src="../../Assets/Icon/buy.svg" />
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
                <table
                    id="example"
                    className="table table-open-order  hidden-filter table-small"
                    style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Market</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Volume</th>
                            <th>Exceute</th>
                            <th>Unexceute</th>
                            <th className="content-right">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                        <tr>
                            <td>24-10-2022 - 13:54</td>
                            <td>Limit Order</td>
                            <td>
                                <span className="contrast-text">buy</span>
                            </td>
                            <td>$ 252.125.536</td>
                            <td>1 TRX</td>
                            <td>0.8 TRX</td>
                            <td>0.2 TRX</td>
                            <td className="content-right">
                                <button className="btn btn-danger sm text-sm">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
};

export const OpenOrders = React.memo(OpenOrdersComponent);
