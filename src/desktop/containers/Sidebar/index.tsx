import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import {
    AddUserIcon,
    AnalysIcon,
    AnnouncementIcon,
    ApiIcon,
    CalendarIcon,
    FaqIcon,
    SecurityIcon,
    SettingIcon,
    UserIcon,
    WalletIcon,
} from '../../../assets/images';
import './Sidebar.pcss';

const Sidebar = () => {
    const [menuActive, setMenuActive] = useState('Dashboard');

    const data = [
        {
            name: 'Dashboard',
            icon: <UserIcon strokeColor={menuActive === 'Dashboard' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/dashboard',
        },
        {
            name: 'Wallet',
            icon: <WalletIcon fillColor={menuActive === 'Wallet' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/wallets',
        },
        {
            name: 'Market Order',
            icon: <AnalysIcon fillColor={menuActive === 'Market Order' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/market-order',
        },
        {
            name: 'Trade History',
            icon: <CalendarIcon fillColor={menuActive === 'Trade History' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/trade-history',
        },
        {
            name: 'Profile Setting',
            icon: <SettingIcon fillColor={menuActive === 'Profile Setting' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/profile-setting',
        },
        {
            name: 'Security',
            icon: <SecurityIcon fillColor={menuActive === 'Security' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/security',
        },
        {
            name: 'Referral',
            icon: <AddUserIcon fillColor={menuActive === 'Referral' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/referral',
        },
        {
            name: 'API Management',
            icon: <ApiIcon fillColor={menuActive === 'API Management' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/api-management',
        },
        {
            name: 'Announcement',
            icon: <AnnouncementIcon fillColor={menuActive === 'Announcement' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/announcement',
        },
        {
            name: 'FAQ',
            icon: <FaqIcon fillColor={menuActive === 'FAQ' ? '#F2F0FF' : '#B5B3BC'} />,
            path: '/faq',
        },
    ];

    console.log(data.length);

    return (
        <div className="sidebar dark-bg-main">
            <ul>
                {data &&
                    data.map((el, i) => (
                        // <Link key={i} to={`${el.path}`}>
                        <li onClick={() => setMenuActive(el.name)} className="d-flex align-items-center cursor-pointer">
                            {el.icon}
                            <p
                                className={`font-bold text-sm pl-2 mb-0 ${
                                    menuActive === el.name ? 'white-text' : 'grey-text'
                                }`}>
                                {el.name}
                            </p>
                        </li>
                        // </Link>
                    ))}
            </ul>
            <div className="devider"></div>
        </div>
    );
};

export default Sidebar;
//
