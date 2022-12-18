import * as React from 'react';
import Background1 from '../../assets/Images/home/background-1.png';
import Background2 from '../../assets/Images/home/background-2.png';
import Background3 from '../../assets/Images/home/background-3.png';
import Background4 from '../../assets/Images/home/background-4.png';
import ImgCard from '../../assets/Images/home/img-card.png';
import { BgCardSmall } from '../../assets/BackgroundCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Table } from '../../../components';
import { BnbIcon } from '../../../assets/images/CoinIcon';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import GrapUp from '../../assets/Images/home/grap-up.png';
import GrapDown from '../../assets/Images/home/grapH-down.png';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectUserLoggedIn } from '../../../modules';
import { LogoIcon } from '../../assets/Logo';
import { ScanIcon } from '../../assets/ScanIcon';
import { SearchIcon } from '../../assets/SearchIcon';
import { UserIcon } from '../../assets/UserIcon';
import { ArrowLeft, ArrowRight } from '../../assets/Arrow';
import { CopyableTextField } from '../../../components';
import Avatar from '../../assets/Images/avatar.png';
import {
    Announcement,
    ApiManagement,
    Dashboard,
    Faq,
    MarketOrder,
    Referral,
    Security,
    TradeHistory,
    Wallet,
} from '../../assets/Sidebar';

const noHeaderRoutes = ['/'];

const HomeMobileScreen: React.FC = () => {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const [key, setKey] = React.useState('tranding');
    const [showSidebar, setShowSidebar] = React.useState(false);
    const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));
    const uid = '533221334';
    if (shouldRenderHeader) {
        return <React.Fragment />;
    }

    const sidebarMenu = [
        { icon: <Dashboard />, name: 'Dashborad', path: '/profile' },
        { icon: <Wallet />, name: 'Wallet', path: '/wallet' },
        { icon: <MarketOrder />, name: 'MarketOrder', path: '/market-order' },
        { icon: <TradeHistory />, name: 'Trade History', path: '/history-trade' },
        { icon: <Security />, name: 'Security', path: '/security' },
        { icon: <Referral />, name: 'Referral', path: '/referral' },
        { icon: <ApiManagement />, name: 'Api Management', path: '/api-key' },
        { icon: <Faq />, name: 'Faq', path: '/faq' },
    ];

    const banner = [
        { background: Background1 },
        { background: Background2 },
        { background: Background3 },
        { background: Background4 },
    ];

    const bannerSmall = [
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
        { title: 'Menu Card Image', date: '20-12-2022', desc: 'body card image' },
    ];

    const trading = [
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+0.20%',
        },
    ];

    const newVolume = [
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+0.20%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
    ];

    const Gainers = [
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+0.20%',
        },
    ];

    const Losers = [
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-1.00%',
        },
        {
            icon: <BnbIcon />,
            iconName: 'BNB',
            iconCode: 'Bnb',
            tradingCart: <img src={GrapDown}></img>,
            change: '-2.00%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+0.20%',
        },
        {
            icon: <BtcIcon />,
            iconName: 'Bitcoin',
            iconCode: 'Btc',
            tradingCart: <img src={GrapUp}></img>,
            change: '+2.00%',
        },
    ];

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 6000,
        pauseOnHover: true,
    };

    const settings2 = {
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        pauseOnHover: true,
    };

    const renderDataTable = (data) => {
        return data.map((item) => [
            <div className="d-flex align-items-center text-sm">
                {item.icon}
                <p className="mb-0 white-text text-sm ml-2">{item.iconName}</p>
                <p className="mb-0 grey-text text-xs ml-2">{item.iconCode}</p>
            </div>,
            <div>{item.tradingCart}</div>,
            <p className={`badge white-text font-bold ${item.change.includes('-') ? 'badge-danger' : 'badge-success'}`}>
                {item.change}
            </p>,
        ]);
    };

    return (
        <React.Fragment>
            <div className="mobile-container home-screen dark-bg-main">
                <nav className="navbar-mobile fixed-top px-24 py-3 dark-bg-main">
                    <a className="navbar-brand">
                        <LogoIcon className={''} />
                    </a>
                    <div className="d-flex align-items-center">
                        <ScanIcon className={'mr-2'} />
                        <SearchIcon className={'mr-2'} />
                        <div className="cursor-pointer" onClick={() => setShowSidebar(true)}>
                            <UserIcon className={'cursor-pointer'} />
                        </div>
                    </div>
                </nav>
                <div id="sidebar" className={`sidebar-offcanvas dark-bg-accent ${showSidebar ? 'show' : 'hide'}`}>
                    <div className="sidebar d-flex justify-content-between align-items-start w-100 pb-5">
                        <div className="sidebar-container w-100">
                            <div className="sidebar-head mb-24 px-24" onClick={() => setShowSidebar(false)}>
                                <ArrowLeft className={'cursorPointer'} />
                            </div>
                            {userLoggedIn ? (
                                <Link to={'/profile'}>
                                    <div className="card-user-info d-flex align-items-center px-24 mb-24">
                                        <img src={Avatar} className="avatar-image" alt="ava" />
                                        <div className="user-info d-flex justify-content-between align-items-center ml-2 w-100">
                                            <div>
                                                <div className="user-name d-flex align-items-center">
                                                    <h1 className="gradient-text text-md font-bold mb-2">
                                                        Hi, Nusatech Dev
                                                    </h1>
                                                    <p className="badge badge-warning white-text mb-0 ml-3">
                                                        Unverifed
                                                    </p>
                                                </div>
                                                <div className="user-id d-flex align-items-center">
                                                    <h3 className="text-sm grey-text d-flex align-items-center">
                                                        UID :{' '}
                                                        <CopyableTextField
                                                            value={uid}
                                                            className="ml-3"
                                                            fieldId="referral-code"
                                                        />
                                                    </h3>
                                                </div>
                                            </div>
                                            <ArrowRight className={'cursor-pointer'} />
                                        </div>
                                    </div>
                                </Link>
                            ) : (
                                <Link to={'/signin'}>
                                    <div className="card-user-info d-flex align-items-center px-24 mb-24">
                                        <div className="user-info d-flex justify-content-between align-items-center w-100">
                                            <div className="login-user d-flex flex-column">
                                                <h1 className="gradient-text text-md font-bold">Login</h1>
                                                <h3 className="grey-text text-sm font-normal">Welcome to Digicoins</h3>
                                            </div>
                                            <ArrowRight className={'cursor-pointer'} />
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {sidebarMenu &&
                                sidebarMenu.map((item, key) => (
                                    <React.Fragment>
                                        {key % 3 == 0 && <div className="divider" />}
                                        <Link to={item.path}>
                                            <div className=" w-100 px-24 py-3 d-flex justify-content-between align-items-center cursor-ointer">
                                                <div className="card-menu-name d-flex align-items-center">
                                                    {item.icon}
                                                    <h3 className="text-sm grey-text font-bold mb-0 ml-2">
                                                        {item.name}
                                                    </h3>
                                                </div>
                                                <ArrowRight className={''} />
                                            </div>
                                        </Link>
                                    </React.Fragment>
                                ))}

                            <div className="px-24 mt-5">
                                <button className="btn btn-primary btn-mobile btn-block btn-outline">Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="heros" className="content-container w-100 mb-3">
                        <Slider {...settings}>
                            {banner &&
                                banner.map((item, key) => (
                                    <div className="heroid" key={key}>
                                        <div
                                            className="hero one w-100 d-flex align-items-center justify-content-start position-relative"
                                            style={{
                                                backgroundImage: `url(${item.background})`,
                                            }}></div>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                    <div className="beginner-wrapper mb-3">
                        <h5 className="text-ms font-bold grey-text-accent">For Beginners</h5>
                        <h6 className="mb-3 text-xs grey-text font-normal">
                            Most popular and widely known coin for early investment
                        </h6>
                        <Slider {...settings2}>
                            {bannerSmall &&
                                bannerSmall.map((item, key) => (
                                    <div key={key} className="p-2">
                                        <div className="card-item position-relative">
                                            <BgCardSmall className={'bg-card'} />
                                            <div className="w-100 d-flex justify-content-center align-items-center mb-8">
                                                <img src={ImgCard} alt="card" className="text-center" />
                                            </div>
                                            <div className=" d-flex justify-content-between align-items-center">
                                                <div>
                                                    <p className="text-xxs grey-text mb-0">{item.date}</p>
                                                    <h4 className="text-xs white-text font-bold mb-0">{item.title}</h4>
                                                    <p className="text-xxs grey-text mb-0">{item.desc}</p>
                                                </div>
                                                <ArrowRight className={''} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                        </Slider>
                    </div>
                    <Tabs id="controlled-tab-example" activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
                        <Tab eventKey="tranding" title="Tranding">
                            <Table data={renderDataTable(trading)} />
                        </Tab>
                        <Tab eventKey="new-volume" title="New Volume">
                            <Table data={renderDataTable(newVolume)} />
                        </Tab>
                        <Tab eventKey="gainers" title="Gainers">
                            <Table data={renderDataTable(Gainers)} />
                        </Tab>
                        <Tab eventKey="loser" title="Loser">
                            <Table data={renderDataTable(Losers)} />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    );
};

export { HomeMobileScreen };
