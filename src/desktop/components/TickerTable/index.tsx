import React from 'react';
import { useIntl } from 'react-intl';
import { Market } from '../../../modules';
import { Decimal } from '../../../components';

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
                        <div>{market && market.name}</div>
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
                            <Decimal fixed={market.amount_precision} thousSep=",">
                                {market.high}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.amount_precision} thousSep=",">
                                {market.low}
                            </Decimal>
                        </span>
                    </td>
                    <td>
                        <span>
                            <Decimal fixed={market.amount_precision} thousSep=",">
                                {market.volume}
                            </Decimal>
                        </span>
                    </td>
                </tr>
            );
        },
        [redirectToTrading]
    );

    return (
        <div>
            <h5>Selector</h5>
            <div className="navbar">
                <ul className="navbar-nav" role="tablist">
                    {currentBidUnitsList.map((item, i) => (
                        <li
                            key={i}
                            className={`nav-item ${item === currentBidUnit ? 'active' : ''}`}
                            onClick={() => setCurrentBidUnit(item)}>
                            <span>
                                {item ? item.toUpperCase() : formatMessage({ id: 'page.body.marketsTable.filter.all' })}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <h5>Market</h5>
            <table className="pg-ticker-table__table">
                <thead>
                    <tr>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.pair' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.lastPrice' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.change' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.high' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.low' })}</th>
                        <th scope="col">{formatMessage({ id: 'page.body.marketsTable.header.volume' })}</th>
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
