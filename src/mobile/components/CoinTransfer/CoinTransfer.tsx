import React from 'react';
import { useHistory } from 'react-router';
import { useWalletsFetch } from 'src/hooks';
import { useSelector } from 'react-redux';
import { selectWallets } from 'src/modules';
import { Table } from '../../../components';

const CoinTransfer = () => {
    const wallets = useSelector(selectWallets);
    const history = useHistory();

    useWalletsFetch();

    const handleClickTransfer = React.useCallback(
        (currency) => {
            history.push(`/wallets/${currency}/transfer`);
        },
        [history]
    );

    const getWalletData = (data) => {
        return data.map((item, i) => [
            <div
                onClick={() => handleClickTransfer(item.currency)}
                key={i}
                className="d-flex justify-content-between align-items-center w-100 cursor-pointer">
                <div>
                    <div className="d-flex justify-content-start align-items-center div-coin">
                        <img src={item.iconUrl} alt="logo" className="rounded-full icon-coin-transfer mr-3" />
                        <div className="d-flex flex-column justify-content-start align-items-start">
                            <h3 className="p-0 m-0 text-one">{item.name}</h3>
                            <h4 className="p-0 m-0 text-two">{item.currency.toUpperCase()}</h4>
                        </div>
                    </div>
                </div>
            </div>,
        ]);
    };

    return (
        <div>
            <Table data={getWalletData(wallets)} />
        </div>
    );
};

export default CoinTransfer;
