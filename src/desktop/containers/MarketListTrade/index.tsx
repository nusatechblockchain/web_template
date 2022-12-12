import * as React from 'react';

const MarketListTradeComponent = (props) => {
    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm mb-24">Market List</p>
                <div className="d-flex align-items-center">
                    <div className="form-group mb-0 position-relative  w-100">
                        <input
                            type="text"
                            className="form-control input-search"
                            id="search"
                            placeholder="Search Coin"
                        />
                        <img src="../../Assets/Icon/profile-search.svg" className="search-icon" alt="search icon" />
                    </div>
                </div>
                <div className="max-300 position-relative mt-2">
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th className="grey-text-accent text-left">Price</th>
                                <th className="grey-text-accent text-right">Amount</th>
                                <th className="grey-text-accent text-right">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="mr-3 d-flex align-items-center">
                                            <span className="cr-crypto-icon">
                                                <img src="../../Assets/Icon/Coin/eth.svg" alt="btc icon" />
                                            </span>
                                            <div className="name ml-3">
                                                <p className="text-sm text-white font-bold mb-0">ETH</p>
                                                <span className="text-xs grey-text-accent">Etherum</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs green-text my-auto  mb-0 text-right">20,245.22</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs mb-0 green-text text-right">+4.50%</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="mr-3 d-flex align-items-center">
                                            <span className="cr-crypto-icon">
                                                <img src="../../Assets/Icon/Coin/eth.svg" alt="btc icon" />
                                            </span>
                                            <div className="name ml-3">
                                                <p className="text-sm text-white font-bold mb-0">ETH</p>
                                                <span className="text-xs grey-text-accent">Etherum</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs green-text my-auto  mb-0 text-right">20,245.22</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs mb-0 green-text text-right">+4.50%</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="mr-3 d-flex align-items-center">
                                            <span className="cr-crypto-icon">
                                                <img src="../../Assets/Icon/Coin/eth.svg" alt="btc icon" />
                                            </span>
                                            <div className="name ml-3">
                                                <p className="text-sm text-white font-bold mb-0">ETH</p>
                                                <span className="text-xs grey-text-accent">Etherum</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs green-text my-auto  mb-0 text-right">20,245.22</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs mb-0 green-text text-right">+4.50%</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="mr-3 d-flex align-items-center">
                                            <span className="cr-crypto-icon">
                                                <img src="../../Assets/Icon/Coin/eth.svg" alt="btc icon" />
                                            </span>
                                            <div className="name ml-3">
                                                <p className="text-sm text-white font-bold mb-0">ETH</p>
                                                <span className="text-xs grey-text-accent">Etherum</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs green-text my-auto  mb-0 text-right">20,245.22</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs mb-0 green-text text-right">+4.50%</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="mr-3 d-flex align-items-center">
                                            <span className="cr-crypto-icon">
                                                <img src="../../Assets/Icon/Coin/eth.svg" alt="btc icon" />
                                            </span>
                                            <div className="name ml-3">
                                                <p className="text-sm text-white font-bold mb-0">ETH</p>
                                                <span className="text-xs grey-text-accent">Etherum</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs green-text my-auto  mb-0 text-right">20,245.22</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs mb-0 green-text text-right">+4.50%</p>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="d-flex justify-content-between">
                                        <div className="mr-3 d-flex align-items-center">
                                            <span className="cr-crypto-icon">
                                                <img src="../../Assets/Icon/Coin/eth.svg" alt="btc icon" />
                                            </span>
                                            <div className="name ml-3">
                                                <p className="text-sm text-white font-bold mb-0">ETH</p>
                                                <span className="text-xs grey-text-accent">Etherum</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs green-text my-auto  mb-0 text-right">20,245.22</p>
                                    </div>
                                </td>
                                <td>
                                    <div className="py-2">
                                        <p className="text-xs mb-0 green-text text-right">+4.50%</p>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    );
};

export const MarketListTrade = React.memo(MarketListTradeComponent);
