import { LandingBlock } from '@openware/react-components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { IntlProps } from '../../../';
import { MarketsTable } from '../../containers';
import { toggleColorTheme } from '../../../helpers';
import { RootState, selectCurrentColorTheme, selectUserLoggedIn } from '../../../modules';
import { BnbIcon, BtcIcon, DogeIcon, TronIcon } from '../../../assets/images/CoinIcon';
import { ArrowDownLarge } from '../../../assets/images/ArrowDownIcon';
import AnouncementIcon from '../../../assets/png/landing-announcement.png';
import SliderBgImage from '../../../assets/png/bg-slider-item.png';
import BitcoinIcon from '../../../assets/png/Bitcoin.png';
import EtherumIcon from '../../../assets/png/Etherium.png';
import LiteIcon from '../../../assets/png/LiteCoin.png';
import MoneroIcon from '../../../assets/png/Monero.png';

interface ReduxProps {
    isLoggedIn: boolean;
    colorTheme: string;
}

type Props = ReduxProps & RouteProps & IntlProps;

class Landing extends React.Component<Props> {
    public componentDidMount() {
        if (this.props.colorTheme === 'light') {
            toggleColorTheme('dark');
        }
    }

    public componentWillReceiveProps(next: Props) {
        if (next.colorTheme === 'light') {
            toggleColorTheme('dark');
        }
    }

    public componentWillUnmount() {
        if (this.props.colorTheme === 'light') {
            toggleColorTheme(this.props.colorTheme);
        }
    }

    public render() {
        return (
            <div className="landing-screen dark-bg-accent">
                <div className="content-wrapper no-sidebar ">
                    {/* hero */}
                    <section className="hero position-relative">
                        <img src={BitcoinIcon} className="image-coin btc" alt="" />
                        <img src={EtherumIcon} className="image-coin eth" alt="" />
                        <img src={LiteIcon} className="image-coin lite" alt="" />
                        <img src={MoneroIcon} className="image-coin monero" alt="" />
                        <div className="wrapper d-flex justify-content-around align-items-center flex-column index-2">
                            <div className="my-5">
                                <h1 className="text-main-title white-text text-center mb-24">
                                    The World’s <span className="gradient-text">Fastest Growing</span> <br />
                                    Crypto Web App
                                </h1>
                                <p className="text-md grey-text-accent text-center mb-24">
                                    Discover the largest and fastest crypto exchange with
                                    <br />
                                    Heaven Exchange and Enjoy
                                </p>
                                <div className="d-flex justify-content-center">
                                    <Link to={'/market'} className="btn btn-rounded btn-primary mx-3">
                                        Trade Now
                                    </Link>
                                    <a href="" className="btn btn-rounded btn-outline white-text font-bold mx-3">
                                        Download App
                                    </a>
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="d-flex new-coin justify-content-center">
                                    <div className="new-coin-content">
                                        <p className="mb-0 text-md white-text font-semibold mb-24 text-center">
                                            New Coins
                                        </p>
                                        <div className="d-flex">
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <BtcIcon className="mr-2 small-coin-icon" />
                                                BTC
                                            </p>
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <BnbIcon className="mr-2 small-coin-icon" />
                                                BINANCE
                                            </p>
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <DogeIcon className="mr-2 small-coin-icon" />
                                                DOGE
                                            </p>
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <TronIcon className="mr-2 small-coin-icon" />
                                                BNB
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="dark-bg-main full-width">
                                <div className="d-flex justify-content-center">
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            DOGE/USD <span className="contrast-text font-bold text-ms">+0.83%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">875.33</p>
                                        <p className="mb-0 text-xs grey-text-accent">
                                            <span>Volume: </span> 6,407,080,688.47 USD
                                        </p>
                                    </div>
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            CDN/USD <span className="contrast-text font-bold text-ms">+0.90%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">998.22</p>
                                        <p className="mb-0 text-xs grey-text-accent">
                                            <span>Volume: </span> 6,407,080,688.47 USD
                                        </p>
                                    </div>
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            DOGE/USD <span className="contrast-text font-bold text-ms">+0.83%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">875.33</p>
                                        <p className="mb-0 text-xs grey-text-accent">
                                            <span>Volume: </span>6,407,080,688.47 USD
                                        </p>
                                    </div>
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            CDN/USD <span className="contrast-text font-bold text-ms">+0.90%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">998.22</p>
                                        <p className="mb-0 text-xs grey-text-accent">
                                            <span>Volume: </span> 6,407,080,688.47 USD
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end hero */}

                    {/* popular crypto */}
                    <section className="popular-crypto position-relative pb-5">
                        <img src={MoneroIcon} className="image-coin popular monero" alt="" />
                        <div className="container index-2">
                            <div className="overflow-auto py-5">
                                <div className="slider-announcement mb-12">
                                    <div className="dark-bg-main mr-4 radius-md">
                                        <div
                                            className="slider-item"
                                            style={{
                                                backgroundImage: `url(${SliderBgImage})`,
                                            }}>
                                            <div className="content">
                                                <div className="d-flex justify-content-end">
                                                    <img src={AnouncementIcon} className="icon-slider" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="mr-2">
                                                        <p className="text-ms grey-text-accent mb-8">21Hours Ago</p>
                                                        <p className="text-sm font-bold white-text mb-1">
                                                            Menu card image
                                                        </p>
                                                        <p className="text-xs grey-text-accent">Body menu card</p>
                                                    </div>
                                                    <a href="">
                                                        <ArrowDownLarge className={'mx-1'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dark-bg-main mr-4 radius-md">
                                        <div
                                            className="slider-item"
                                            style={{
                                                backgroundImage: `url(${SliderBgImage})`,
                                            }}>
                                            <div className="content">
                                                <div className="d-flex justify-content-end">
                                                    <img src={AnouncementIcon} className="icon-slider" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="mr-2">
                                                        <p className="text-ms grey-text-accent mb-8">21Hours Ago</p>
                                                        <p className="text-sm font-bold white-text mb-1">
                                                            Menu card image
                                                        </p>
                                                        <p className="text-xs grey-text-accent">Body menu card</p>
                                                    </div>
                                                    <a href="">
                                                        <ArrowDownLarge className={'mx-1'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dark-bg-main mr-4 radius-md">
                                        <div
                                            className="slider-item"
                                            style={{
                                                backgroundImage: `url(${SliderBgImage})`,
                                            }}>
                                            <div className="content">
                                                <div className="d-flex justify-content-end">
                                                    <img src={AnouncementIcon} className="icon-slider" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="mr-2">
                                                        <p className="text-ms grey-text-accent mb-8">21Hours Ago</p>
                                                        <p className="text-sm font-bold white-text mb-1">
                                                            Menu card image
                                                        </p>
                                                        <p className="text-xs grey-text-accent">Body menu card</p>
                                                    </div>
                                                    <a href="">
                                                        <ArrowDownLarge className={'mx-1'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dark-bg-main mr-4 radius-md">
                                        <div
                                            className="slider-item"
                                            style={{
                                                backgroundImage: `url(${SliderBgImage})`,
                                            }}>
                                            <div className="content">
                                                <div className="d-flex justify-content-end">
                                                    <img src={AnouncementIcon} className="icon-slider" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="mr-2">
                                                        <p className="text-ms grey-text-accent mb-8">21Hours Ago</p>
                                                        <p className="text-sm font-bold white-text mb-1">
                                                            Menu card image
                                                        </p>
                                                        <p className="text-xs grey-text-accent">Body menu card</p>
                                                    </div>
                                                    <a href="">
                                                        <ArrowDownLarge className={'mx-1'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="dark-bg-main mr-4 radius-md">
                                        <div
                                            className="slider-item"
                                            style={{
                                                backgroundImage: `url(${SliderBgImage})`,
                                            }}>
                                            <div className="content">
                                                <div className="d-flex justify-content-end">
                                                    <img src={AnouncementIcon} className="icon-slider" alt="" />
                                                </div>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="mr-2">
                                                        <p className="text-ms grey-text-accent mb-8">21Hours Ago</p>
                                                        <p className="text-sm font-bold white-text mb-1">
                                                            Menu card image
                                                        </p>
                                                        <p className="text-xs grey-text-accent">Body menu card</p>
                                                    </div>
                                                    <a href="">
                                                        <ArrowDownLarge className={'mx-1'} />
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-main-title white-text text-center font-extrabold ">
                                Popular Crypto Coins
                            </h2>
                            <p className=" mb-24 text-md font-normal grey-text-accent text-center">
                                Most popular coins to trade
                            </p>
                            <div className="market-list">
                                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a
                                            className="nav-link active"
                                            id="pills-deposit-tab"
                                            data-toggle="pill"
                                            href="#pills-deposit"
                                            role="tab"
                                            aria-controls="pills-deposit"
                                            aria-selected="true">
                                            Hot List
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-withdrawl-tab"
                                            data-toggle="pill"
                                            href="#pills-withdrawl"
                                            role="tab"
                                            aria-controls="pills-withdrawl"
                                            aria-selected="false">
                                            New Coins
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a
                                            className="nav-link"
                                            id="pills-transfer-tab"
                                            data-toggle="pill"
                                            href="#pills-transfer"
                                            role="tab"
                                            aria-controls="pills-transfer"
                                            aria-selected="false">
                                            Top Gainers
                                        </a>
                                    </li>
                                </ul>

                                <div>
                                    <MarketsTable />
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end popular crypto */}
                </div>
            </div>
        );
    }

    private handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    private translate = (key: string) => this.props.intl.formatMessage({ id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    isLoggedIn: selectUserLoggedIn(state),
    colorTheme: selectCurrentColorTheme(state),
});

export const LandingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, null)
)(Landing) as React.ComponentClass;
