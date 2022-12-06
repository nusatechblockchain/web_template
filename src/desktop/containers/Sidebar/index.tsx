import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import {
    Market,
    RootState,
    selectCurrentColorTheme,
    selectCurrentMarket,
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

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
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
    dataWallet: any;
}

const sidebarProfile = ['/profile', '/profile/referral', '/profile/api-key', '/security/2fa'];
const sidebarWallet = ['/wallets'];

type Props = DispatchProps & LocationProps;

class Side extends React.Component<Props, SidebarState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            menuProfileActive: 'Dashboard',
            menuWalletActive: 'Overview',
            dataProfile: [],
            dataWallet: [],
        };
    }

    componentDidMount() {
        console.log(this.props);
        this.setState({
            dataProfile: [
                {
                    name: 'Dashboard',
                    icon: (
                        <UserIcon strokeColor={this.state.menuProfileActive === 'Dashboard' ? '#F2F0FF' : '#B5B3BC'} />
                    ),
                    path: '/profile',
                },
                {
                    name: 'Wallet',
                    icon: <WalletIcon fillColor={this.state.menuProfileActive === 'Wallet' ? '#F2F0FF' : '#B5B3BC'} />,
                    path: '/wallets',
                },
                {
                    name: 'Market Order',
                    icon: (
                        <AnalysIcon
                            fillColor={this.state.menuProfileActive === 'Market Order' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/market-order',
                },
                {
                    name: 'Trade History',
                    icon: (
                        <CalendarIcon
                            fillColor={this.state.menuProfileActive === 'Trade History' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/trade-history',
                },
                {
                    name: 'Profile Setting',
                    icon: (
                        <SettingIcon
                            fillColor={this.state.menuProfileActive === 'Profile Setting' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/profile-setting',
                },
                {
                    name: 'Security',
                    icon: (
                        <SecurityIcon fillColor={this.state.menuProfileActive === 'Security' ? '#F2F0FF' : '#B5B3BC'} />
                    ),
                    path: '/security',
                },
                {
                    name: 'Referral',
                    icon: (
                        <AddUserIcon fillColor={this.state.menuProfileActive === 'Referral' ? '#F2F0FF' : '#B5B3BC'} />
                    ),
                    path: '/profile/referral',
                },
                {
                    name: 'API Management',
                    icon: (
                        <ApiIcon
                            fillColor={this.state.menuProfileActive === 'API Management' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/api-management',
                },
                {
                    name: 'Announcement',
                    icon: (
                        <AnnouncementIcon
                            fillColor={this.state.menuProfileActive === 'Announcement' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/announcement',
                },
                {
                    name: 'FAQ',
                    icon: <FaqIcon fillColor={this.state.menuProfileActive === 'FAQ' ? '#F2F0FF' : '#B5B3BC'} />,
                    path: '/faq',
                },
            ],
            dataWallet: [
                {
                    name: 'Overview',
                    icon: (
                        <OverviewIcon fillColor={this.state.menuWalletActive === 'Overview' ? '#F2F0FF' : '#B5B3BC'} />
                    ),
                    path: '/wallets',
                },
                {
                    name: 'Deposit',
                    icon: <DepositIcon fillColor={this.state.menuWalletActive === 'Deposit' ? '#F2F0FF' : '#B5B3BC'} />,
                    path: '/wallets/deposit',
                },
                {
                    name: 'Withdrawl',
                    icon: (
                        <WithdrawlIcon
                            fillColor={this.state.menuWalletActive === 'Withdrawl' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/wallets/withdrawl',
                },
                {
                    name: 'Internal Transfer',
                    icon: (
                        <InternalTransferIcon
                            fillColor={this.state.menuWalletActive === 'Internal Transfer' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/wallets/internal-transfer',
                },
                {
                    name: 'Market Order',
                    icon: (
                        <AnalysIcon
                            fillColor={this.state.menuWalletActive === 'Market Order' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/market-order',
                },
                {
                    name: 'Trade History',
                    icon: (
                        <CalendarIcon
                            fillColor={this.state.menuWalletActive === 'Trade History' ? '#F2F0FF' : '#B5B3BC'}
                        />
                    ),
                    path: '/trade-history',
                },
            ],
        });
    }

    public render() {
        const thisSidebarProfile = sidebarProfile.some((r) => location.pathname.includes(r));
        const thisSidebarWallet = sidebarWallet.some(
            (r) =>
                location.pathname.includes(r) &&
                !location.pathname.includes('deposit' || 'withdrawl' || 'internal-transfer')
        );
        return (
            <React.Fragment>
                {thisSidebarProfile && (
                    <div className="sidebar dark-bg-main">
                        <ul>
                            {this.state.dataProfile.slice(0, 4).map((el, i) => (
                                // <Link key={i} to={`${el.path}`}>
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
                                // </Link>
                            ))}
                        </ul>
                        <div className="devider"></div>
                        <ul>
                            {this.state.dataProfile.slice(4).map((el, i) => (
                                // <Link key={i} to={`${el.path}`}>
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
                                // </Link>
                            ))}
                        </ul>
                    </div>
                )}
                {thisSidebarWallet && (
                    <div className="sidebar dark-bg-main">
                        <ul>
                            {this.state.dataWallet.slice(0, 4).map((el, i) => (
                                // <Link key={i} to={`${el.path}`}>
                                <li
                                    onClick={() => this.setState({ menuWalletActive: el.name })}
                                    className="d-flex align-items-center cursor-pointer ml-20 mt-8 mb-8">
                                    <div className="mr-8">{el.icon}</div>
                                    <p
                                        className={`font-bold text-sm mb-0 ${
                                            this.state.menuWalletActive === el.name ? 'white-text' : 'grey-text'
                                        }`}>
                                        {el.name}
                                    </p>
                                </li>
                                // </Link>
                            ))}
                        </ul>
                        <div className="devider"></div>

                        <ul>
                            {this.state.dataWallet.slice(4).map((el, i) => (
                                // <Link key={i} to={`${el.path}`}>
                                <li
                                    onClick={() => this.setState({ menuWalletActive: el.name })}
                                    className="d-flex align-items-center cursor-pointer ml-20 mt-8 mb-8">
                                    <div className="mr-8">{el.icon}</div>
                                    <p
                                        className={`font-bold text-sm mb-0 ${
                                            this.state.menuWalletActive === el.name ? 'white-text' : 'grey-text'
                                        }`}>
                                        {el.name}
                                    </p>
                                </li>
                                // </Link>
                            ))}
                        </ul>
                    </div>
                )}
                {(!thisSidebarProfile || !thisSidebarWallet) && <React.Fragment />}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
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
