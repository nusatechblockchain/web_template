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
import {
    FeatureIcon1,
    FeatureIcon2,
    FeatureIcon3,
    FeatureIcon4,
    FeatureIcon5,
    FeatureIcon6,
} from '../../../assets/images/LandingFeatureIcon';
import { AndroidIcon, AppleStoreIcon, GooglePlayIcon, MacOsIcon, WindowsIcon } from '../../../assets/images/DeviceIcon';
import AnouncementIcon from '../../../assets/png/landing-announcement.png';
import SliderBgImage from '../../../assets/png/bg-slider-item.png';
import BitcoinIcon from '../../../assets/png/Bitcoin.png';
import EtherumIcon from '../../../assets/png/Etherium.png';
import LiteIcon from '../../../assets/png/LiteCoin.png';
import MoneroIcon from '../../../assets/png/Monero.png';
import MarketAnalysisImage from '../../../assets/png/image-blog.png';
import LandingAplicationImage from '../../../assets/png/application.png';

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
                        </div>
                    </section>

                    <MarketsTable />

                    <section className="feature-section position-relative py-5">
                        <img src={LiteIcon} className="image-coin feature lite" alt="" />
                        <img src={BitcoinIcon} className="image-coin feature btc" alt="" />
                        <div className="container index-2">
                            <h2 className="text-title-1 white-text text-center font-extrabold ">Attractive Features</h2>
                            <p className=" mb-24 text-md font-normal grey-text-accent text-center mb-36">
                                Windaful makes playing the UK's best raffles easy and fun.
                            </p>
                            <div className="row">
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <FeatureIcon1 />
                                        <p className="mb-0 ml-2 text-ms white-text">Weekly Trading Contest</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare risus.
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <FeatureIcon2 />
                                        <p className="mb-0 ml-2 text-ms white-text">Less Commission On Trade</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare risus.
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <FeatureIcon3 />
                                        <p className="mb-0 ml-2 text-ms white-text">Safe And Secure Trading platform</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare risus.
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <FeatureIcon4 />
                                        <p className="mb-0 ml-2 text-ms white-text">Instant Withdraw Process</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare risus.
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <FeatureIcon5 />
                                        <p className="mb-0 ml-2 text-ms white-text">Monthly Commition</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare risus.
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <FeatureIcon6 />
                                        <p className="mb-0 ml-2 text-ms white-text">24/7 Support Team</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare risus.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="aplication-section py-5">
                        <div className="container">
                            <div className="row align-items-center">
                                <div className="col-lg-6">
                                    <img src={LandingAplicationImage} className="w-100" alt="" />
                                </div>
                                <div className="col-lg-6">
                                    <h4 className="mb-0 text-title-2 text-white font-extrabold">
                                        Trade Anytime, Anywhere
                                    </h4>
                                    <p className="text-ms grey-text-accent font-normal mb-24">
                                        Compatible with multiple devices, start trading with safety and convenience.
                                    </p>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="mr-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                                                <AndroidIcon className="icon-aplication" />
                                                <p className="text-ms white-text mt-2 mb-0">Android APK</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mr-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                                                <AppleStoreIcon className="icon-aplication" />
                                                <p className="text-ms white-text mt-2 mb-0">App Store</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mr-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                                                <GooglePlayIcon className="icon-aplication" />
                                                <p className="text-ms white-text mt-2 mb-0">Google Play</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mr-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                                                <WindowsIcon className="icon-aplication" />
                                                <p className="text-ms white-text mt-2 mb-0">Windows</p>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="mr-3 mb-3 d-flex flex-column justify-content-center align-items-center">
                                                <MacOsIcon className="icon-aplication" />
                                                <p className="text-ms white-text mt-2 mb-0">Mac Os</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="analysis-section position-relative py-5">
                        <img src={EtherumIcon} className="image-coin analysis eth" alt="" />
                        <img src={BitcoinIcon} className="image-coin analysis btc" alt="" />
                        <img src={MoneroIcon} className="image-coin analysis monero" alt="" />
                        <div className="container index-2">
                            <h2 className="text-title-1 white-text text-center font-extrabold ">
                                Crypto Market Analysis
                            </h2>
                            <p className=" mb-24 text-md font-normal grey-text-accent text-center mb-36">
                                Tincidunt id nibh orci nibh justo. Purus et turpis nulla elementum, sed vel.
                            </p>
                            <div className="row mt-5">
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex">
                                        <img src={MarketAnalysisImage} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">Gain the best exchange</p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare
                                                risus.
                                            </p>
                                            <a
                                                href="./Screen/Announcement/index.html"
                                                className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex">
                                        <img src={MarketAnalysisImage} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">Gain the best exchange</p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare
                                                risus.
                                            </p>
                                            <a
                                                href="./Screen/Announcement/index.html"
                                                className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex">
                                        <img src={MarketAnalysisImage} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">Gain the best exchange</p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare
                                                risus.
                                            </p>
                                            <a
                                                href="./Screen/Announcement/index.html"
                                                className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex">
                                        <img src={MarketAnalysisImage} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">Gain the best exchange</p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Eu tellus quam id sed ultrices. Integer nunc lectus nisi, erat et ornare
                                                risus.
                                            </p>
                                            <a
                                                href="./Screen/Announcement/index.html"
                                                className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <a href="" className="btn btn-primary lg">
                                    Show More
                                </a>
                            </div>
                        </div>
                    </section>
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
