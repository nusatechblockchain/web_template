import React from 'react';
import { useIntl } from 'react-intl';
import { Market } from '../../../modules';
import { Decimal } from '../../../components';
import { Link } from 'react-router-dom';

interface Props {
    currentBidUnit: string;
    currentBidUnitsList: string[];
    markets: Market[];
    redirectToTrading: (key: string) => void;
    setCurrentBidUnit: (key: string) => void;
}

export const TickerTable: React.FC<Props> = ({
    currentBidUnit,
    markets,
    setCurrentBidUnit,
    currentBidUnitsList,
    redirectToTrading,
}) => {
    const { formatMessage } = useIntl();

    const renderItem = React.useCallback(
        (market, index: number) => {
            const marketChangeColor = +(market.change || 0) < 0 ? 'negative' : 'positive';
            return (
                <tr key={index} onClick={() => redirectToTrading(market.id)}>
                    <td>
                        <div className="d-flex align-items-center">
                            <img
                                src={market && market.currency && market.currency.icon_url}
                                className="small-coin-icon"
                                alt=""
                            />
                            <div className="font-bold ml-2 text-uppercase">{market && market.base_unit}</div>
                            <div className="font-normal text-sm grey-text-accent ml-3">
                                {market && market.currency && market.currency.name}
                            </div>
                        </div>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.amount_precision} thousSep=",">
                                {market.last}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span className={marketChangeColor}>{market.price_change_percent}</span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.amount_precision} thousSep="," floatSep=",">
                                {market.high}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.amount_precision} thousSep=".">
                                {market.low}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <div className="d-flex">
                            <Link
                                to={`/market-detail/${market.base_unit}`}
                                className="gradient-text font-normal mx-2 text-sm">
                                Detail
                            </Link>
                            <Link to={`/trading/${market.id}`} className="gradient-text font-normal mx-2 text-sm">
                                Trade
                            </Link>
                        </div>
                    </td>
                </tr>
            );
        },
        [redirectToTrading]
    );

    return (
        <div>
            <div className="navbar__ticker-table">
                <ul className="navbar-nav__ticker-table" role="tablist">
                    {currentBidUnitsList.map((item, i) => (
                        <li
                            key={i}
                            className={`nav-item__ticker-table ${item === currentBidUnit ? 'active' : ''}`}
                            onClick={() => setCurrentBidUnit(item)}>
                            <span>
                                {item ? item.toUpperCase() : formatMessage({ id: 'page.body.marketsTable.filter.all' })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <table className="pg-ticker-table__table">
                <thead>
                    <tr>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.pair' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.change' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.high' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.low' })}</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {markets[0] ? (
                        markets.map(renderItem)
                    ) : (
                        <tr>
                            <td>
                                <span className="no-data">{formatMessage({ id: 'page.noDataToShow' })}</span>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
