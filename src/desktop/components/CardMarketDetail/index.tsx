import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import './CardMarketDetail.pcss';
import { BtcIcon, BnbIcon, DogeIcon } from 'src/assets/images/CoinIcon';

export interface CardMarketDetailProps {
    title: string;
    data?: [];
}

export const CardMarketDetail: React.FunctionComponent<CardMarketDetailProps> = (props) => {
    const currencies = useSelector(selectCurrencies);
    const { title, data } = props;

    const dataDummy = [
        {
            icon: <BtcIcon className="com-card-market-detail__icon" />,
            currency: 'BTC',
            name: 'Bitcoin',
            price: '$ 19385.01',
            gain: '+0.24%',
        },
        {
            icon: <BtcIcon className="com-card-market-detail__icon" />,
            currency: 'BTC',
            name: 'Bitcoin',
            price: '$ 19385.01',
            gain: '-0.24%',
        },
        {
            icon: <BtcIcon className="com-card-market-detail__icon" />,
            currency: 'BTC',
            name: 'Bitcoin',
            price: '$ 19385.01',
            gain: '+0.24%',
        },
    ];

    return (
        <React.Fragment>
            <div className="com-card-market-detail">
                <h1 className="text-lg white-text mb-24">{title}</h1>

                {dataDummy.map((el, i) => (
                    <div className="d-flex justify-content-between align-items-start mb-24">
                        <div className="d-flex">
                            <span className="mr-8">{el.icon}</span>
                            <div>
                                <p className="mb-8 text-sm white-text font-bold">{el.currency}</p>
                                <p className="m-0 text-xs grey-text-accent">{el.name}</p>
                            </div>
                        </div>

                        <div>
                            <p className="mb-8 text-sm white-text font-bold">{el.price}</p>
                            <p className={`m-0 text-xs ${el.gain.includes('-') ? 'danger-text' : 'green-text'}`}>
                                {el.gain}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
};
