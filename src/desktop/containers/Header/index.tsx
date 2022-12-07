import * as React from 'react';
import { History } from 'history';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import {
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
    setMobileWalletUi,
    toggleMarketSelector,
    selectUserLoggedIn,
} from '../../../modules';
import { Logo } from '../../../assets/images/Logo';
import ProfileAvatar from '../../../assets/png/avatar.png';
import { IndonesianFlag, AmericanFlag, ChinaFlag, KoreaFlag } from '../../../assets/images/Flags';
import { Api, Dashboard, Logout, Referral, Security, Setting, Wallet } from '../../../assets/images/ProfileDropdown';

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    isLoggedIn: boolean;
}

interface OwnProps {
    history: History;
}

interface DispatchProps {
    setMobileWalletUi: typeof setMobileWalletUi;
}

interface LocationProps extends RouterProps {
    location: {
        pathname: string;
    };
}

export interface HeaderState {
    showLanguage: boolean;
    showProfileDropdown: boolean;
}

const authHeader = ['/signin', '/signup', '/email-verification', '/forgot_password', '/password_reset'];

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps & OwnProps;

class Head extends React.Component<Props, HeaderState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showLanguage: false,
            showProfileDropdown: false,
        };
    }

    public render() {
        const thisAuthHeader = authHeader.some((r) => location.pathname.includes(r)) && location.pathname !== '/';
        const { showLanguage, showProfileDropdown } = this.state;
        const { isLoggedIn } = this.props;

        const logoutButton = async () => {
            await localStorage.clear();
            this.props.history.push('/trading');
        };

        const ProfileDropdown = [
            {
                name: 'Dashboard',
                desc: 'Dashboard summary profile',
                icon: <Dashboard />,
                url: '/profile',
            },
            {
                name: 'Wallet',
                desc: 'deposit and withdraw wallet',
                icon: <Wallet />,
                url: '/wallet',
            },
            {
                name: 'Profile Setting',
                desc: 'setting your perosenal profile',
                icon: <Setting />,
                url: '/setting',
            },
            {
                name: 'Security',
                desc: 'secure your account',
                icon: <Security />,
                url: '/security',
            },
            {
                name: 'Refferal',
                desc: 'invite friend to reach bonus',
                icon: <Referral />,
                url: '/referral',
            },
            {
                name: 'API Management',
                desc: 'api Management for your account',
                icon: <Api />,
                url: '/api',
            },
        ];

        const LanguageDropdown = [
            {
                flag: <IndonesianFlag className="mr-2" />,
                name: 'Indonesia',
            },
            {
                flag: <AmericanFlag className="mr-2" />,
                name: 'American',
            },
            {
                flag: <KoreaFlag className="mr-2" />,
                name: 'Korean',
            },
            {
                flag: <ChinaFlag className="mr-2" />,
                name: 'China',
            },
        ];

        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg dark-bg-main py-2 px-24">
                    <Link to="/" className="navbar-brand">
                        <Logo />
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-between py-2" id="navbarNavDropdown">
                        <div>
                            {!thisAuthHeader ? (
                                <ul className="navbar-nav main-navbar">
                                    <li className="nav-item active">
                                        <Link to={'/'} className="nav-link text-sm font-bold">
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/market'} className="nav-link text-sm font-bold">
                                            Market
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/faq'} className="nav-link text-sm font-bold">
                                            Support
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/announcement'} className="nav-link text-sm font-bold">
                                            Announcement
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to={'/market'} className="nav-link text-sm font-bold">
                                            Discover
                                        </Link>
                                    </li>
                                </ul>
                            ) : (
                                ''
                            )}
                        </div>

                        {/* right navbar */}
                        <ul className="navbar-nav align-items-center">
                            <li className="nav-item dropdown px-3">
                                <a
                                    className="nav-link dropdown-toggle grey-text-accent text-sm"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    onClick={() => this.setState({ showLanguage: !showLanguage })}>
                                    EN/USD
                                </a>
                                {showLanguage ? (
                                    <div
                                        className="dropdown-menu dark-bg-accent p-3 radius-sm"
                                        aria-labelledby="navbarDropdownMenuLink">
                                        <div className="d-flex">
                                            <div className="language">
                                                <p className="text-xs font-bold mb-3 grey-text-accent">Language</p>
                                                {LanguageDropdown.map((item, key) => (
                                                    <div
                                                        key={`language-${key}`}
                                                        onClick={() => this.setState({ showLanguage: false })}
                                                        className="dropdown-item grey-text-accent text-sm active cursor-pointer">
                                                        {item.flag} {item.name}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="line"></div>
                                            <div
                                                className="currency"
                                                onClick={() => this.setState({ showLanguage: false })}>
                                                <p className="text-xs font-bold mb-3 grey-text-accent">Currency</p>
                                                <div className="dropdown-item grey-text-accent text-sm active cursor-pointer">
                                                    <div className="dots" />
                                                    USD
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <div className="dots" />
                                                    RUB
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <div className="dots" />
                                                    EUR
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <div className="dots" />
                                                    JPY
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <div className="dots" />
                                                    IDR
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    ''
                                )}
                            </li>

                            {isLoggedIn ? (
                                // Profile Dropdown
                                <li className="nav-item dropdown avatar px-3">
                                    <div
                                        className="nav-link cursor-pointer dropdown-toggle grey-text-accent text-sm"
                                        onClick={() => this.setState({ showProfileDropdown: !showProfileDropdown })}>
                                        <img src={ProfileAvatar} className="avatar-image" alt="" />
                                    </div>
                                    {showProfileDropdown ? (
                                        <div
                                            className="dropdown-menu dark-bg-accent p-3 radius-sm"
                                            aria-labelledby="navbarDropdownMenuLink">
                                            {ProfileDropdown.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="dropdown-wallets-item"
                                                    onClick={() => this.setState({ showProfileDropdown: false })}>
                                                    <Link to={item.url} className="d-flex">
                                                        {item.icon}
                                                        <div className="pl-3">
                                                            <p className="mb-0 text-sm font-bold white-text">
                                                                {item.name}
                                                            </p>
                                                            <span className="text-xs grey-text-accent font-normal">
                                                                {item.desc}
                                                            </span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            ))}
                                            <div
                                                className="dropdown-wallets-item cursor-pointer"
                                                onClick={() => this.setState({ showProfileDropdown: false })}>
                                                <div className="d-flex" onClick={logoutButton}>
                                                    <Logout />
                                                    <div className="pl-3">
                                                        <p className="mb-0 text-sm font-bold white-text">Logout</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        ''
                                    )}
                                </li>
                            ) : (
                                // Sign In and Sign Up
                                <React.Fragment>
                                    <li className="nav-item dropdown avatar px-3">
                                        <Link to={'/signin'} className="gradient-text text-sm font-bold mr-3">
                                            Sign In
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown avatar px-3">
                                        <Link to={'/signup'} className="btn btn-primary">
                                            Sign Up
                                        </Link>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
    isLoggedIn: selectUserLoggedIn(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
    toggleMarketSelector: () => dispatch(toggleMarketSelector()),
});

export const Header = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Head) as React.ComponentClass;
