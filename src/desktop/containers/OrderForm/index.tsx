import * as React from 'react';

const OrderFormComponent = (props) => {
    const [orderType, setOrderType] = React.useState('');
    const [orderPrecentageBuy, setOrderPrecentageBuy] = React.useState(0);
    const [orderPrecentageSell, setOrderPrecentageSell] = React.useState(0);
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
                                    onClick={() => setOrderType('market')}
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
                                    onClick={() => setOrderType('limit')}
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
                                    onClick={() => setOrderType('spot')}
                                    htmlFor="stop-order-sell"
                                    className="btn btn-transparent w-auto text-xs font-bold cursor-pointer px-0 mr-4">
                                    SPOT
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
                                    <div className="line" id="line-order" style={{ width: orderPrecentageBuy + '%' }} />
                                </div>
                                <div className="main-input">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-item start" onClick={() => setOrderPrecentageBuy(0)}>
                                            <label htmlFor="percent-buy-buy-0" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 0 ? 'active' : 'check'
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy == 0 ? '' : 'check'}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                id="percent-buy-0"
                                                name="order-form"
                                                defaultValue="market"
                                                className="d-none"
                                            />
                                            <label
                                                htmlFor="percent-buy-0"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                0%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageBuy(25)}>
                                            <label htmlFor="percent-buy-25" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 25
                                                            ? 'active'
                                                            : orderPrecentageBuy > 25
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy > 25 ? 'check' : ''}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-25"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-25"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                25%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageBuy(50)}>
                                            <label htmlFor="percent-buy-50" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 50
                                                            ? 'active'
                                                            : orderPrecentageBuy > 50
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy > 50 ? 'check' : ''}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-50"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-50"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                50%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageBuy(75)}>
                                            <label htmlFor="percent-buy-75" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 75
                                                            ? 'active'
                                                            : orderPrecentageBuy > 75
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div className={`dots ${orderPrecentageBuy > 75 ? 'check' : ''}`} />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-75"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-75"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                75%
                                            </label>
                                        </div>
                                        <div className="input-item end" onClick={() => setOrderPrecentageBuy(100)}>
                                            <label htmlFor="percent-buy-100" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageBuy == 100
                                                            ? 'active'
                                                            : orderPrecentageBuy > 100
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageBuy == 100 ? 'check' : ''}`}
                                                    />
                                                </div>
                                            </label>
                                            <input
                                                type="radio"
                                                className="d-none"
                                                id="percent-buy-100"
                                                name="order-form"
                                                defaultValue="market"
                                            />
                                            <label
                                                htmlFor="percent-buy-100"
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
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
                                    <div
                                        className="line"
                                        id="line-order"
                                        style={{ width: orderPrecentageSell + '%' }}
                                    />
                                </div>
                                <div className="main-input">
                                    <div className="d-flex justify-content-between">
                                        <div className="input-item start" onClick={() => setOrderPrecentageSell(0)}>
                                            <label htmlFor="percent-sell-buy-0" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 0 ? 'active' : 'check'
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell == 0 ? '' : 'check'}`}
                                                    />
                                                </div>
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
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                0%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageSell(25)}>
                                            <label htmlFor="percent-sell-25" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 25
                                                            ? 'active'
                                                            : orderPrecentageSell > 25
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell > 25 ? 'check' : ''}`}
                                                    />
                                                </div>
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
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                25%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageSell(50)}>
                                            <label htmlFor="percent-sell-50" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 50
                                                            ? 'active'
                                                            : orderPrecentageSell > 50
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell > 50 ? 'check' : ''}`}
                                                    />
                                                </div>
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
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                50%
                                            </label>
                                        </div>
                                        <div className="input-item" onClick={() => setOrderPrecentageSell(75)}>
                                            <label htmlFor="percent-sell-75" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 75
                                                            ? 'active'
                                                            : orderPrecentageSell > 75
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell > 75 ? 'check' : ''}`}
                                                    />
                                                </div>
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
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
                                                75%
                                            </label>
                                        </div>
                                        <div className="input-item end" onClick={() => setOrderPrecentageSell(100)}>
                                            <label htmlFor="percent-sell-100" className="cursor-pointer">
                                                <div
                                                    className={`dots-wrap ${
                                                        orderPrecentageSell == 100
                                                            ? 'active'
                                                            : orderPrecentageSell > 100
                                                            ? 'check'
                                                            : ''
                                                    }`}>
                                                    <div
                                                        className={`dots ${orderPrecentageSell == 100 ? 'check' : ''}`}
                                                    />
                                                </div>
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
                                                className="btn btn-transparent dark-text w-auto text-xs font-bold cursor-pointer p-0 d-block">
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
