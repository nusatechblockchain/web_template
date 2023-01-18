import * as React from 'react';
import './CardMarket.pcss';
import { numberFormat } from '../../../helpers';
import { NoData } from '../../components';

export interface CardMarketProps {
    title: string;
    data?: any;
}

export const CardMarket: React.FunctionComponent<CardMarketProps> = (props) => {
    const { title, data } = props;

    return (
        <React.Fragment>
            <div className="com-card-market dark-bg-accent radius-md mb-24">
                <h3 className="text-xs font-bold grey-text-accent">{title}</h3>
                <table>
                    {data.slice(0, 3).map((el, i) => (
                        <tr className="text-sm font-bold com-card-market__data" key={i}>
                            <td className="d-flex align-items-center pr-8">
                                <div className="mr-8">
                                    <img
                                        src={el && el.currency && el.currency.icon_url}
                                        alt="coin"
                                        className="coin rounded-pill"
                                    />
                                </div>
                                <p className="white-text m-0">{el && el.currency && el.currency.id.toUpperCase()}</p>
                            </td>
                            <td className="white-text pr-8">$ {el.last}</td>
                            <td className={el && el.price_change_percent?.includes('-') ? 'danger' : 'primary'}>
                                {el && el.price_change_percent}
                            </td>
                        </tr>
                    ))}

                    {data.length < 1 && <NoData text="There is no market data" />}
                </table>
            </div>
        </React.Fragment>
    );
};
