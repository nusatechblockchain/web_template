import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useMarketsFetch, useMarketsTickersFetch, useWalletsFetch } from 'src/hooks';
import { formatWithSeparators } from '../../../components';
import { VALUATION_PRIMARY_CURRENCY, VALUATION_SECONDARY_CURRENCY } from '../../../constants';
import { estimateUnitValue, estimateValue } from '../../../helpers/estimateValue';
import { selectCurrencies, selectMarkets, selectMarketTickers, Wallet } from '../../../modules';

interface EstimatedValueProps {
    wallets: Wallet[];
}

type Props = EstimatedValueProps;

const EstimatedValue: React.FC<Props> = (props: Props): React.ReactElement => {
    const { formatMessage } = useIntl();
    const translate = React.useCallback((id: string, value?: any) => formatMessage({ id: id }, { ...value }), [
        formatMessage,
    ]);

    const { wallets } = props;
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const tickers = useSelector(selectMarketTickers);

    useMarketsTickersFetch();
    useMarketsFetch();
    useWalletsFetch();

    const renderSecondaryCurrencyValuation = React.useCallback(
        (value: string) => {
            const estimatedValueSecondary = estimateUnitValue(
                VALUATION_SECONDARY_CURRENCY,
                VALUATION_PRIMARY_CURRENCY,
                +value,
                currencies,
                markets,
                tickers
            );

            return (
                <div className="pl-5">
                    <p className="text-ms grey-text-accent font-extrabold mb-12">Locked</p>
                    <div className="d-flex align-items-center">
                        <span className="value-container text-md white-text">
                            <span className="value">{formatWithSeparators(estimatedValueSecondary, ',')}</span>
                            <span className="value-sign mr-24"> {VALUATION_SECONDARY_CURRENCY.toUpperCase()}</span>
                        </span>
                    </div>
                </div>
            );
        },
        [currencies, markets, tickers]
    );

    const estimatedValue = React.useMemo(() => {
        return estimateValue(VALUATION_PRIMARY_CURRENCY, currencies, wallets, markets, tickers);
    }, [currencies, wallets, markets, tickers]);

    return (
        <div className="d-flex mb-24">
            <div>
                <p className="text-ms grey-text-accent font-extrabold mb-12">Available</p>
                <div className="d-flex align-items-center">
                    <span className="value-container text-md white-text">
                        <span className="value">{formatWithSeparators(estimatedValue, ',')} </span>
                        <span className="value-sign mr-24">{VALUATION_PRIMARY_CURRENCY.toUpperCase()}</span>
                    </span>
                </div>
            </div>
            <div>{VALUATION_SECONDARY_CURRENCY && renderSecondaryCurrencyValuation(estimatedValue)}</div>
        </div>
    );
};

export { EstimatedValue };
