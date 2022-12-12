import * as React from 'react';

const OrderFormComponent = (props) => {
    return (
        <React.Fragment>
            <div className="p-3">
                <p className="white-text font-bold text-sm mb-3">Order Form</p>
                <div className="row">
                    <div className="col-6">
                        <form action="">
                            <div className="d-flex mb-1 order-tab">
                                <input
                                    type="radio"
                                    id="market-order-sell"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="market"
                                />
                                <label
                                    htmlFor="market-order-sell"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    MARKET
                                </label>
                                <input
                                    type="radio"
                                    id="limit-order-sell"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="limit"
                                />
                                <label
                                    htmlFor="limit-order-sell"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    LIMIT
                                </label>
                                <input
                                    type="radio"
                                    id="stop-order-sell"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="stop"
                                />
                                <label
                                    htmlFor="stop-order-sell"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    STOP
                                </label>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input type="text" className="form-control input-order-form" id="input-order" />
                                <label htmlFor="input-order" className="input-order-label-left">
                                    Price
                                </label>
                                <label htmlFor="input-order" className="input-order-label-right">
                                    USDT
                                </label>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input type="text" className="form-control input-order-form" id="input-order" />
                                <label htmlFor="input-order" className="input-order-label-left">
                                    Ammount
                                </label>
                                <label htmlFor="input-order" className="input-order-label-right">
                                    BTC
                                </label>
                            </div>
                            <div className="input-timeline mb-24 position-relative">
                                <div className="line-wrap">
                                    <div className="line" id="line-order" style={{ width: '0%' }} />
                                </div>
                                <div className="main-input">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-item start">
                                            <label htmlFor="percent-0" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-0-default"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline.svg"
                                                    id="percent-0-active"
                                                    className="show"
                                                />
                                                <img src="../../Assets/Icon/timeline-check.svg" id="percent-0-check" />
                                            </label>
                                            <input
                                                type="radio"
                                                id="percent-0"
                                                name="order-form"
                                                defaultValue="market"
                                                className="d-none"
                                            />
                                            <label
                                                htmlFor="percent-0"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                0%
                                            </label>
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="percent-25" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-25-default"
                                                    className="show"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline.svg"
                                                    id="percent-25-active"
                                                    className=""
                                                />
                                                <img src="../../Assets/Icon/timeline-check.svg" id="percent-25-check" />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-25"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-25"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                25%
                                            </label>
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="percent-50" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-50-default"
                                                    className="show"
                                                />
                                                <img src="../../Assets/Icon/timeline.svg" id="percent-50-active" />
                                                <img src="../../Assets/Icon/timeline-check.svg" id="percent-50-check" />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-50"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-50"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                50%
                                            </label>
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="percent-75" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-75-default"
                                                    className="show"
                                                />
                                                <img src="../../Assets/Icon/timeline.svg" id="percent-75-active" />
                                                <img src="../../Assets/Icon/timeline-check.svg" id="percent-75-check" />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-75"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-75"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                75%
                                            </label>
                                        </div>
                                        <div className="input-item end">
                                            <label htmlFor="percent-100" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-100-default"
                                                    className="show"
                                                />
                                                <img src="../../Assets/Icon/timeline.svg" id="percent-100-active" />
                                                <img
                                                    src="../../Assets/Icon/timeline-check.svg"
                                                    id="percent-100-check"
                                                />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-100"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-100"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                100%
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input type="text" className="form-control input-order-form" id="input-order" />
                                <label htmlFor="input-order" className="input-order-label-left">
                                    Total
                                </label>
                                <label htmlFor="input-order" className="input-order-label-right">
                                    BTC
                                </label>
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <p className="text-sm grey-text-accent"> Avaliable </p>
                                <p className="text-sm white-text"> 0.000000 BTC </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-success btn-block"
                                data-toggle="modal"
                                data-target="#buy-order">
                                Buy BTC
                            </button>
                        </form>
                    </div>
                    <div className="col-6">
                        <form action="">
                            <div className="d-flex mb-1 order-tab">
                                <input
                                    type="radio"
                                    id="market-order"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="market"
                                />
                                <label
                                    htmlFor="market-order"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    MARKET
                                </label>
                                <input
                                    type="radio"
                                    id="limit-order"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="limit"
                                />
                                <label
                                    htmlFor="limit-order"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    LIMIT
                                </label>
                                <input
                                    type="radio"
                                    id="stop-order"
                                    className="d-none"
                                    name="order-form"
                                    defaultValue="stop"
                                />
                                <label
                                    htmlFor="stop-order"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    STOP
                                </label>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input type="text" className="form-control input-order-form" id="input-order" />
                                <label htmlFor="input-order" className="input-order-label-left">
                                    Price
                                </label>
                                <label htmlFor="input-order" className="input-order-label-right">
                                    USDT
                                </label>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input type="text" className="form-control input-order-form" id="input-order" />
                                <label htmlFor="input-order" className="input-order-label-left">
                                    Ammount
                                </label>
                                <label htmlFor="input-order" className="input-order-label-right">
                                    BTC
                                </label>
                            </div>
                            <div className="input-timeline mb-24 position-relative">
                                <div className="line-wrap">
                                    <div className="line" id="line-order" style={{ width: '0%' }} />
                                </div>
                                <div className="main-input">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-item start">
                                            <label htmlFor="percent-sell-0" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-sell-0-default"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline.svg"
                                                    id="percent-sell-0-active"
                                                    className="show"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline-check.svg"
                                                    id="percent-sell-0-check"
                                                />
                                            </label>
                                            <input
                                                type="radio"
                                                id="percent-sell-0"
                                                name="order-form"
                                                defaultValue="market"
                                                className="d-none"
                                            />
                                            <label
                                                htmlFor="percent-sell-0"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                0%
                                            </label>
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="percent-sell-25" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-sell-25-default"
                                                    className="show"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline.svg"
                                                    id="percent-sell-25-active"
                                                    className=""
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline-check.svg"
                                                    id="percent-sell-25-check"
                                                />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-25"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-25"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                25%
                                            </label>
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="percent-sell-50" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-sell-50-default"
                                                    className="show"
                                                />
                                                <img src="../../Assets/Icon/timeline.svg" id="percent-sell-50-active" />
                                                <img
                                                    src="../../Assets/Icon/timeline-check.svg"
                                                    id="percent-sell-50-check"
                                                />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-50"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-50"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                50%
                                            </label>
                                        </div>
                                        <div className="input-item">
                                            <label htmlFor="percent-sell-75" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-sell-75-default"
                                                    className="show"
                                                />
                                                <img src="../../Assets/Icon/timeline.svg" id="percent-sell-75-active" />
                                                <img
                                                    src="../../Assets/Icon/timeline-check.svg"
                                                    id="percent-sell-75-check"
                                                />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-75"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-75"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                75%
                                            </label>
                                        </div>
                                        <div className="input-item end">
                                            <label htmlFor="percent-sell-100" className="cursor-pointer">
                                                <img
                                                    src="../../Assets/Icon/timeline-default.svg"
                                                    id="percent-sell-100-default"
                                                    className="show"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline.svg"
                                                    id="percent-sell-100-active"
                                                />
                                                <img
                                                    src="../../Assets/Icon/timeline-check.svg"
                                                    id="percent-sell-100-check"
                                                />
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-sell-100"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-sell-100"
                                                className="btn btn-transparent w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                100%
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group mb-3 position-relative  w-100">
                                <input type="text" className="form-control input-order-form" id="input-order" />
                                <label htmlFor="input-order" className="input-order-label-left">
                                    Total
                                </label>
                                <label htmlFor="input-order" className="input-order-label-right">
                                    BTC
                                </label>
                            </div>
                            <div className="mb-3 d-flex justify-content-between">
                                <p className="text-sm grey-text-accent"> Avaliable </p>
                                <p className="text-sm white-text"> 0.000000 BTC </p>
                            </div>
                            <button
                                type="button"
                                className="btn btn-danger btn-block"
                                data-toggle="modal"
                                data-target="#sell-order">
                                Sell BTC
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export const OrderForm = React.memo(OrderFormComponent);
