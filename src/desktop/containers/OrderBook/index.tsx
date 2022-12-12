import * as React from 'react';

const OrderBookComponent = (props) => {
    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm">Order Book</p>
                <div className="max-400 position-relative">
                    <div className="table-background">
                        <div className="table-background-row danger" style={{ width: '70%' }} />
                        <div className="table-background-row danger" style={{ width: '20%' }} />
                        <div className="table-background-row danger" style={{ width: '30%' }} />
                        <div className="table-background-row danger" style={{ width: '33%' }} />
                        <div className="table-background-row danger" style={{ width: '12%' }} />
                        <div className="table-background-row danger" style={{ width: '98%' }} />
                        <div className="table-background-row danger" style={{ width: '34%' }} />
                        <div className="table-background-row danger" style={{ width: '34%' }} />
                        <div className="table-background-row danger" style={{ width: '34%' }} />
                        <div className="table-background-row danger" style={{ width: '23%' }} />
                        <div className="table-background-row danger" style={{ width: '62%' }} />
                        <div className="table-background-row danger" style={{ width: '70%' }} />
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.090<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.090<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.090<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.090<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.090<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm danger-text font-bold mb-0 text-left">
                                        0.090<span className="danger-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="price-highlight py-3">
                    <h3 className="green-text text-md font-bold mb-0">
                        0.059132 <img src="../../Assets/Icon/trade-up.svg" className="ml-2" alt="trade-up" />
                    </h3>
                </div>
                <div className="max-400 position-relative">
                    <div className="table-background top-30">
                        <div className="table-background-row good" style={{ width: '70%' }} />
                        <div className="table-background-row good" style={{ width: '20%' }} />
                        <div className="table-background-row good" style={{ width: '30%' }} />
                        <div className="table-background-row good" style={{ width: '33%' }} />
                        <div className="table-background-row good" style={{ width: '12%' }} />
                        <div className="table-background-row good" style={{ width: '98%' }} />
                        <div className="table-background-row good" style={{ width: '34%' }} />
                        <div className="table-background-row good" style={{ width: '34%' }} />
                        <div className="table-background-row good" style={{ width: '34%' }} />
                        <div className="table-background-row good" style={{ width: '23%' }} />
                        <div className="table-background-row good" style={{ width: '62%' }} />
                        <div className="table-background-row good" style={{ width: '70%' }} />
                    </div>
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <tbody>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.090<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.090<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.090<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.090<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.090<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
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
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.641310513</p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p className="text-sm green-text font-bold mb-0 text-left">
                                        0.090<span className="green-text-accent">765</span>
                                    </p>
                                </td>
                                <td>
                                    <p className="text-sm grey-text-accent font-bold mb-0 text-right">1123.711</p>
                                </td>
                                <td>
                                    <p className="text-sm mb-0 grey-text-accent font-bold text-right">1.1221313</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export const OrderBook = React.memo(OrderBookComponent);
