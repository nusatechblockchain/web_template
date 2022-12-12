import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import './TradingFutureChart.pcss';
import trading from '../../../assets/png/trading-future.png';

export const TradingFutureChart: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    return (
        <React.Fragment>
            <img src={trading} alt="trading" width={840} height={767} />
        </React.Fragment>
    );
};
