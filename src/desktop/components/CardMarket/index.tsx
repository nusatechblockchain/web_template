import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import './CardMarket.pcss';
import { BtcIcon, DogeIcon, BnbIcon } from '../../../assets/images/CoinIcon';

export interface CardMarketProps {
    title: string;
    data?: [];
}

export const CardMarket: React.FunctionComponent<CardMarketProps> = (props) => {
    const currencies = useSelector(selectCurrencies);
    const { title, data } = props;

    return (
        <React.Fragment>
            <div className="com-card-market dark-bg-accent radius-md mb-24">
                <h3 className="text-xs font-bold grey-text-accent">{title}</h3>
                <table>
                    <tr className="text-sm font-bold com-card-market__data">
                        <td className="d-flex align-items-center pr-8">
                            <BtcIcon className="mr-8 coin" />
                            <p className="white-text m-0">BTC</p>
                        </td>
                        <td className="white-text pr-8">19385.01</td>
                        <td className="primary">+0.17%</td>
                    </tr>
                    <tr className="text-sm font-bold com-card-market__data">
                        <td className="d-flex align-items-center pr-8">
                            <BnbIcon className="mr-8 icon" />
                            <p className="white-text m-0">BNB</p>
                        </td>
                        <td className="white-text pr-8">0.4436</td>
                        <td className="primary">+0.25%</td>
                    </tr>
                    <tr className="text-sm font-bold com-card-market__data">
                        <td className="d-flex align-items-center pr-8">
                            <DogeIcon className="mr-8 coin" />
                            <p className="white-text m-0">DOGE</p>
                        </td>
                        <td className="white-text pr-8">225.6</td>
                        <td className="danger">-0.82%</td>
                    </tr>
                </table>
            </div>
        </React.Fragment>
    );
};
