import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import './TradingFutureOrderBook.pcss';
import { DownloadIcon } from 'src/assets/images/DownloadIcon';

export const TradingFutureOrderBook: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    return (
        <React.Fragment>
            <div className="px-3">
                <p className="white-text font-bold text-sm mb-6">Order Book</p>
                <div className="max-140 position-relative">
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
                        <thead className="dark-bg-main grey-text-accent text-xs font-bold">
                            <tr>
                                <th className="text-left grey-text-accent">Price</th>
                                <th className="text-right grey-text-accent">Amount</th>
                                <th className="text-right grey-text-accent">Total</th>
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
                        0.059132 <DownloadIcon />
                    </h3>
                </div>
                <div className="max-140 position-relative">
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
