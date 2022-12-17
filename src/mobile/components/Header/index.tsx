import * as React from 'react';
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

const noHeaderRoutes = ['/', '/dashboard'];

const HeaderComponent: React.FC = () => {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const intl = useIntl();
    const [showSidebar, setShowSidebar] = React.useState(false);
    const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));
    const uid = '533221334';
    if (!shouldRenderHeader) {
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

    return (
        <React.Fragment>
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
                <div className="sidebar d-flex justify-content-between align-items-start w-100">
                    <div className="sidebar-container w-100">
                        <div className="sidebar-head mb-24 px-24" onClick={() => setShowSidebar(false)}>
                            <ArrowLeft className={'cursorPointer'} />
                        </div>
                        {userLoggedIn ? (
                            <Link to={''}>
                                <div className="card-user-info d-flex align-items-center px-24 mb-24">
                                    <img src={Avatar} className="avatar-image" alt="ava" />
                                    <div className="user-info d-flex justify-content-between align-items-center ml-2 w-100">
                                        <div>
                                            <div className="user-name d-flex align-items-center">
                                                <h1 className="gradient-text text-md font-bold mb-2">
                                                    Hi, Nusatech Dev
                                                </h1>
                                                <p className="badge badge-warning white-text mb-0 ml-3">Unverifed</p>
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
                            <Link to={''}>
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
                                                <h3 className="text-sm grey-text font-bold mb-0 ml-2">{item.name}</h3>
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
        </React.Fragment>
    );
};

export const Header = React.memo(HeaderComponent);
