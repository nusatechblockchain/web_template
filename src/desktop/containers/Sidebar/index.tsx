import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import {
    Market,
    RootState,
    Currency,
    selectCurrentColorTheme,
    selectCurrentMarket,
    selectCurrencies,
    setMobileWalletUi,
    toggleMarketSelector,
} from '../../../modules';
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
    OverviewIcon,
    DepositIcon,
    WithdrawlIcon,
    InternalTransferIcon,
} from '../../../assets/images/sidebar';
import './Sidebar.pcss';
import '../../../styles/colors.pcss';

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
    currencies: Currency | any;
}

interface DispatchProps {
    setMobileWalletUi?: typeof setMobileWalletUi;
}

interface LocationProps extends RouterProps {
    location?: {
        pathname: string;
    };
}

export interface SidebarState {
    menuProfileActive: string;
    menuWalletActive: string;
    dataProfile: any;
}

const sidebarProfile = [
    '/profile',
    '/profile/referral',
    '/profile/api-key',
    '/markets-open',
    '/security/2fa',
    '/wallets',
    '/history-transaction',
    '/trade-history',
    'change-email',
];

type Props = DispatchProps & LocationProps;

class Side extends React.Component<Props, SidebarState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            menuProfileActive: 'Dashboard',
            menuWalletActive: 'Overview',
            dataProfile: [],
        };
    }

    componentDidMount() {
        console.log(this.state.menuProfileActive);
        this.setState({
            dataProfile: [
                {
                    name: 'Dashboard',
                    icon: (
                        <UserIcon
                            strokeColor={
                                this.state.menuProfileActive === 'Dashboard'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile',
                },
                {
                    name: 'Wallet',
                    icon: (
                        <WalletIcon
                            fillColor={
                                this.state.menuProfileActive === 'Wallet'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/wallets',
                },
                {
                    name: 'Market Order',
                    icon: (
                        <AnalysIcon
                            fillColor={
                                this.state.menuProfileActive === 'Market Order'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/markets-open',
                },
                {
                    name: 'Trade History',
                    icon: (
                        <CalendarIcon
                            fillColor={
                                this.state.menuProfileActive === 'Trade History'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/trade-history',
                },
                {
                    name: 'Profile Setting',
                    icon: (
                        <SettingIcon
                            fillColor={
                                this.state.menuProfileActive === 'Profile Setting'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile-setting',
                },
                {
                    name: 'Security',
                    icon: (
                        <SecurityIcon
                            fillColor={
                                this.state.menuProfileActive === 'Security'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile/security',
                },
                {
                    name: 'Referral',
                    icon: (
                        <AddUserIcon
                            fillColor={
                                this.state.menuProfileActive === 'Referral'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile/referral',
                },
                {
                    name: 'API Management',
                    icon: (
                        <ApiIcon
                            fillColor={
                                this.state.menuProfileActive === 'API Management'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/profile/api-key',
                },
                {
                    name: 'Announcement',
                    icon: (
                        <AnnouncementIcon
                            fillColor={
                                this.state.menuProfileActive === 'Announcement'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/announcement',
                },
                {
                    name: 'FAQ',
                    icon: (
                        <FaqIcon
                            fillColor={
                                this.state.menuProfileActive === 'FAQ'
                                    ? 'var(--text-primary-color)'
                                    : 'var(--text-secondary-color)'
                            }
                        />
                    ),
                    path: '/faq',
                },
            ],
        });
    }

    public render() {
        const thisSidebarProfile = sidebarProfile.some(
            (r) =>
                location.pathname.includes(r) &&
                !location.pathname.includes('deposit') &&
                !location.pathname.includes('withdraw')
        );

        return (
            <React.Fragment>
                {thisSidebarProfile && (
                    <div className="sidebar dark-bg-accent">
                        <div className="mb-36"></div>
                        <ul>
                            {this.state.dataProfile.slice(0, 4).map((el, i) => (
                                <Link key={i} to={`${el.path}`}>
                                    <li
                                        onClick={() => this.setState({ menuProfileActive: el.name })}
                                        className="d-flex align-items-center cursor-pointer ml-20 mt-8 mb-8">
                                        <div className="mr-8">{el.icon}</div>
                                        <p
                                            className={`font-bold text-sm mb-0 ${
                                                this.state.menuProfileActive === el.name ? 'white-text' : 'grey-text'
                                            }`}>
                                            {el.name}
                                        </p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                        <div className="devider"></div>
                        <ul>
                            {this.state.dataProfile.slice(4).map((el, i) => (
                                <Link key={i} to={`${el.path}`}>
                                    <li
                                        onClick={() => this.setState({ menuProfileActive: el.name })}
                                        className="d-flex align-items-center cursor-pointer ml-20 mt-8 mb-8">
                                        <div className="mr-8">{el.icon}</div>
                                        <p
                                            className={`font-bold text-sm mb-0 ${
                                                this.state.menuProfileActive === el.name ? 'white-text' : 'grey-text'
                                            }`}>
                                            {el.name}
                                        </p>
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                )}

                {!thisSidebarProfile && <React.Fragment />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    currentMarket: selectCurrentMarket(state),
    colorTheme: selectCurrentColorTheme(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    setMobileWalletUi: (payload) => dispatch(setMobileWalletUi(payload)),
    toggleMarketSelector: () => dispatch(toggleMarketSelector()),
});

export const Sidebar = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Side) as React.ComponentClass;
