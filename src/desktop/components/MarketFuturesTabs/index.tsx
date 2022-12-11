import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import { Table } from 'src/components';
import { StarIconOutline } from 'src/assets/images/StarIcon';
import './MarketFuturesTabs.pcss';

export const MarketFuturesTabs: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    const dataTable = [
        {
            name: 'TRX/USDT',
            status: 'Preptual',
            price: '16,813.93 ... / Rp261,064 ...',
            change: '-0.82%',
            volume: '$19.358.255',
            cap: '$19.358.255',
        },
        {
            name: 'TRX/USDT',
            status: 'Preptual',
            price: '16,813.93 ... / Rp261,064 ...',
            change: '+1.37%',
            volume: '$19.358.255',
            cap: '$19.358.255',
        },
        {
            name: 'TRX/USDT',
            status: 'Preptual',
            price: '16,813.93 ... / Rp261,064 ...',
            change: '-0.82%',
            volume: '$19.358.255',
            cap: '$19.358.255',
        },
        {
            name: 'TRX/USDT',
            status: 'Preptual',
            price: '16,813.93 ... / Rp261,064 ...',
            change: '+1.37%',
            volume: '$19.358.255',
            cap: '$19.358.255',
        },
    ];

    const getTableHeaders = () => {
        return ['Name', 'Price', '24 Change', '24 Volume', 'Market Cap', '', ''];
    };

    const getTableData = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                <span className="mr-8 ">
                    <StarIconOutline />
                </span>
                <p className="m-0 mr-12 white-text font-bold">{item.name}</p>
                <p className="m-0 grey-text-accent">{item.status}</p>
            </div>,
            <p className="m-0 text-sm white-text">{item.price}</p>,
            <p className={`text-sm ${item.change.includes('-') ? 'danger-text' : 'green-text'}`}>{item.change}</p>,
            <p className="m-0 text-sm white-text">{item.volume}</p>,
            <p className="m-0 text-sm white-text">{item.cap}</p>,
            <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Detail</p>,
            <p className="m-0 text-sm font-bold gradient-text cursor-pointer">Trade</p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="com-market-futures-tabs">
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
