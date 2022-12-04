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
    selectCurrentColorTheme,
    selectCurrentMarket,
    setMobileWalletUi,
    toggleMarketSelector,
} from '../../../modules';
import { Logo } from '../../../assets/images/Logo';
import { IndonesianFlag, AmericanFlag, ChinaFlag, KoreaFlag } from '../../../assets/images/Flags';

interface ReduxProps {
    currentMarket: Market | undefined;
    colorTheme: string;
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
}

const authHeader = ['/signin', '/signup'];

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps;

class Head extends React.Component<Props, HeaderState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showLanguage: false,
        };
    }

    public render() {
        const thisAuthHeader = authHeader.some((r) => location.pathname.includes(r)) && location.pathname !== '/';
        const { showLanguage } = this.state;

        return (
            <React.Fragment>
                {/* <div className="container-fluid dark-bg-main position-relative p-0 "> */}
                <nav className="navbar navbar-expand-lg dark-bg-main py-2 px-24">
                    <Link to="/signin" className="navbar-brand">
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
                            {thisAuthHeader ? (
                                ''
                            ) : (
                                <ul className="navbar-nav main-navbar">
                                    <li className="nav-item active">
                                        <a
                                            className="nav-link text-sm font-bold"
                                            href="../../Screen/ProfileScreen/index.html">
                                            Home
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link text-sm font-bold"
                                            href="../../Screen/MarketList/index.html">
                                            Market
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-sm font-bold" href="../../Screen/Faq/index.html">
                                            Support
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link text-sm font-bold"
                                            href="../../Screen/Announcement/index.html">
                                            Announcement
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link text-sm font-bold" href="#">
                                            Discover
                                        </a>
                                    </li>
                                </ul>
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
                                                <div className="dropdown-item grey-text-accent text-sm active cursor-pointer">
                                                    <IndonesianFlag className="mr-2" /> Indonesia
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <AmericanFlag className="mr-2" />
                                                    Amerika
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <ChinaFlag className="mr-2" />
                                                    China
                                                </div>
                                                <div className="dropdown-item grey-text-accent text-sm cursor-pointer">
                                                    <KoreaFlag className="mr-2" />
                                                    Korea
                                                </div>
                                            </div>
                                            <div className="line"></div>
                                            <div className="currency">
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

                            {thisAuthHeader ? (
                                ''
                            ) : (
                                <React.Fragment>
                                    <li className="nav-item dropdown avatar px-3">
                                        <a
                                            className="gradient-text text-sm font-bold mr-3"
                                            href="../../Screen/SignIn/index.html">
                                            Sign In
                                        </a>
                                    </li>
                                    <li className="nav-item dropdown avatar px-3">
                                        <a className="btn btn-primary" href="../../Screen/SignUp/index.html">
                                            Sign Up
                                        </a>
                                    </li>
                                </React.Fragment>
                            )}
                        </ul>
                    </div>
                </nav>
                {/* </div> */}
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

export const Header = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Head) as React.ComponentClass;
