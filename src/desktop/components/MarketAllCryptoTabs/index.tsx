import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from '../../../components';
import './MarketAllCryptoTabs.pcss';
import { BtcIcon, BnbIcon } from 'src/assets/images/CoinIcon';

export const MarketAllCryptoTabs: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    const dataTable = [
        {
            name: 'Bitcoin',
            currency: 'BTC',
            price: '$10,098.36',
            change: '-0.82%',
            cap: '$19.358.255',
            icon: <BtcIcon />,
        },
        {
            name: 'Binance',
            currency: 'BNB',
            price: '$10,098.36',
            change: '+1.37%',
            cap: '$19.358.255',
            icon: <BnbIcon />,
        },
        {
            name: 'Bitcoin',
            currency: 'BTC',
            price: '$10,098.36',
            change: '-0.82%',
            cap: '$19.358.255',
            icon: <BtcIcon />,
        },
        {
            name: 'Binance',
            currency: 'BNB',
            price: '$10,098.36',
            change: '+1.37%',
            cap: '$19.358.255',
            icon: <BnbIcon />,
        },
    ];

    const getTableHeaders = () => {
        return ['Name', 'Price', '24 Change', 'Market Cap', '', ''];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                <span className="mr-12 ">{item.icon}</span>
                <p className="m-0 mr-24 white-text font-bold">{item.currency}</p>
                <p className="m-0 grey-text-accent">{item.name}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.price}</p>,
            <p className={`text-sm ${item.change.includes('-') ? 'danger-text' : 'green-text'}`}>{item.change}</p>,
            <p className="m-0 text-sm white-text">{item.cap}</p>,
            <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Detail</p>,
            <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Trade</p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="com-market-all-tabs">
                <Tabs defaultActiveKey="all" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="all" title="All">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                    <Tab eventKey="metaverse" title="Metaverse">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                    <Tab eventKey="games" title="Games">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                    <Tab eventKey="defi" title="DeFi">
                        <Table header={getTableHeaders()} data={getTableData(dataTable)} />
                    </Tab>
                </Tabs>
            </div>
        </React.Fragment>
    );
};
