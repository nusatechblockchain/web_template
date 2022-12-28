import React from 'react';
import { useHistory } from 'react-router';
import { useWalletsFetch } from 'src/hooks';
import { useSelector } from 'react-redux';
import { selectWallets } from 'src/modules';
import { Table } from '../../../components';
import { FilterInput } from 'src/desktop/components';

const CoinTransfer = () => {
    const wallets = useSelector(selectWallets);
    const history = useHistory();
    const [filterValue, setFilterValue] = React.useState<string>('');
    const [filteredWallets, setFilteredWallets] = React.useState([]);

    useWalletsFetch();

    const handleClickTransfer = React.useCallback(
        (currency) => {
            history.push(`/wallets/${currency}/transfer`);
        },
        [history]
    );

    const searchFilter = (row, searchKey: string) => {
        setFilterValue(searchKey);
        return row
            ? row.name?.toLowerCase().includes(searchKey.toLowerCase()) ||
                  row.currency?.toLowerCase().includes(searchKey.toLowerCase())
            : false;
    };

    const handleFilter = (result: object[]) => {
        setFilteredWallets(result);
    };

    const renderWallet = React.useCallback(
        (data) => {
            const filteredList = data.filter(
                (i) =>
                    !filterValue ||
                    i.name?.toLocaleLowerCase().includes(filterValue.toLowerCase()) ||
                    i.currency?.toLocaleLowerCase().includes(filterValue.toLowerCase())
            );

            return !filteredList.length
                ? [[]]
                : filteredList.map((item, index) => {
                      return [
                          <div
                              onClick={() => handleClickTransfer(item.currency)}
                              key={index}
                              className="d-flex justify-content-between align-items-center w-100 cursor-pointer">
                              <div>
                                  <div className="d-flex justify-content-start align-items-center div-coin">
                                      <img
                                          src={item.iconUrl}
                                          alt="logo"
                                          className="rounded-full icon-coin-transfer mr-3"
                                      />
                                      <div className="d-flex flex-column justify-content-start align-items-start">
                                          <h3 className="p-0 m-0 text-one">{item.name}</h3>
                                          <h4 className="p-0 m-0 text-two">{item.currency.toUpperCase()}</h4>
                                      </div>
                                  </div>
                              </div>
                          </div>,
                      ];
                  });
        },
        [filteredWallets]
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
        <div className="form-search">
            <div className="d-flex align-items-center justify-space-between">
                <FilterInput
                    data={wallets}
                    onFilter={handleFilter}
                    filter={searchFilter}
                    placeholder={''}
                    className="search-wallet placeholder-search"
                />
            </div>
            <Table data={renderWallet(wallets)} />
        </div>
    );
};

export default CoinTransfer;
