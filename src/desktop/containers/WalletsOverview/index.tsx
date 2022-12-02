import React, { FC, ReactElement, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Decimal, formatWithSeparators, Table } from 'src/components';
import { useMarketsFetch, useMarketsTickersFetch, useWalletsFetch } from 'src/hooks';
import {
    selectAbilities,
    selectCurrencies,
    selectMarkets,
    selectMarketTickers,
    selectWallets,
    Wallet,
    User,
    selectUserInfo,
} from 'src/modules';
import { estimateUnitValue } from 'src/helpers/estimateValue';
import { VALUATION_PRIMARY_CURRENCY } from 'src/constants';
import { WalletsHeader } from '../../components';
import { useHistory } from 'react-router';

interface Props {
    isP2PEnabled?: boolean;
}

interface ExtendedWallet extends Wallet {
    spotBalance?: string;
    spotLocked?: string;
    p2pBalance?: string;
    p2pLocked?: string;
}

const WalletsOverview: FC<Props> = (props: Props): ReactElement => {
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [filteredWallets, setFilteredWallets] = React.useState<ExtendedWallet[]>([]);
    const [nonZeroSelected, setNonZeroSelected] = React.useState<boolean>(false);

    const { formatMessage } = useIntl();
    const { isP2PEnabled } = props;
    const history = useHistory();
    const translate = useCallback((id: string, value?: any) => formatMessage({ id: id }, { ...value }), [formatMessage]);
    const wallets = useSelector(selectWallets);
    const abilities = useSelector(selectAbilities);
    const currencies = useSelector(selectCurrencies);
    const markets = useSelector(selectMarkets);
    const tickers = useSelector(selectMarketTickers);
    const user: User = useSelector(selectUserInfo);

    useWalletsFetch();
    useMarketsTickersFetch();
    useMarketsFetch();

    useEffect(() => {
        if (wallets.length && currencies.length) {
            const extendedWallets: ExtendedWallet[] = currencies.map(cur => {
                if (cur.status === 'hidden' && user.role !== 'admin' && user.role !== 'superadmin') {
                    return null;
                }
                const spotWallet = wallets.find(i => i.currency === cur.id);
                return {
                    ...spotWallet,
                    spotBalance: spotWallet ? spotWallet.balance : '0',
                    spotLocked: spotWallet ? spotWallet.locked : '0',
                };
            });

            const extendedWalletsFilter = extendedWallets.filter(item => item && item.currency);
            setFilteredWallets(extendedWalletsFilter);
        }
    }, [wallets, currencies, isP2PEnabled]);

    const headerTitles = useCallback(() => ([
        'Code',
        translate('page.body.wallets.overview.header.wallet'),
        translate('page.body.wallets.overview.header.total'),
        translate('page.body.wallets.overview.header.estimated'),
        'Locked Balance',
        '',
    ]), [isP2PEnabled]);

    const handleClickDeposit = useCallback(currency => {
        history.push(`/wallets/${currency}/deposit`);
    }, [history]);

    const handleClickWithdraw = useCallback(currency => {
        history.push(`/wallets/${currency}/withdraw`);
    }, [history]);


    const retrieveData = React.useCallback(() => {
        const list = nonZeroSelected ? filteredWallets.filter(i => i.balance && Number(i.balance) > 0) : filteredWallets;
        const filteredList = list.filter(i => !filterValue || i.name?.toLocaleLowerCase().includes(filterValue.toLowerCase()) || i.currency?.toLocaleLowerCase().includes(filterValue.toLowerCase()));

        return !filteredList.length ? [[]] : filteredList.map((item, index) => {
            const {
                currency,
                iconUrl,
                name,
                fixed,
                spotBalance,
                spotLocked,
            } = item;
            const totalBalance = Number(spotBalance) + Number(spotLocked);
            const estimatedValue = Number(totalBalance) && currency ? estimateUnitValue(currency.toUpperCase(), VALUATION_PRIMARY_CURRENCY, +totalBalance, currencies, markets, tickers) : Decimal.format(0, fixed);

            return [
                <div>{currency.toUpperCase()}</div>,
                <div key={index}>
                    <img alt={currency?.toUpperCase()} src={iconUrl} style={{height:'24px'}}/>
                    {name}
                </div>,
                <Decimal key={index} fixed={fixed} thousSep=",">{totalBalance ? totalBalance.toString() : '0'}</Decimal>,
                formatWithSeparators(estimatedValue, ','),
                <Decimal key={index} fixed={fixed} thousSep=",">{spotLocked}</Decimal>,
                <div key={index}>
                    <Button onClick={() => handleClickDeposit(currency)} variant="primary">
                        {translate('page.body.wallets.overview.action.deposit')}
                    </Button>
                    <Button onClick={() => handleClickWithdraw(currency)} variant="danger">
                        {translate('page.body.wallets.overview.action.withdraw')}
                    </Button>
                </div>,
            ];
        })
    }, [
        filteredWallets,
        nonZeroSelected,
        abilities,
        currencies,
        markets,
        tickers,
    ]);

    return (
        <div>
            <h3>Search</h3>
            <WalletsHeader
                wallets={wallets}
                nonZeroSelected={nonZeroSelected}
                setFilterValue={setFilterValue}
                setFilteredWallets={setFilteredWallets}
                handleClickCheckBox={setNonZeroSelected}
            />
            <h3>Wallet Data</h3>
            <Table header={headerTitles()} data={retrieveData()}/>
        </div>
    );
};

export {
    WalletsOverview,
};
