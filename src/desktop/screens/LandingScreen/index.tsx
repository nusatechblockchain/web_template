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
import { AndroidIcon, AppleStoreIcon, GooglePlayIcon, MacOsIcon, WindowsIcon } from '../../../assets/images/DeviceIcon';
import BitcoinIcon from '../../../assets/png/Bitcoin.png';
import EtherumIcon from '../../../assets/png/Etherium.png';
import LiteIcon from '../../../assets/png/LiteCoin.png';
import MoneroIcon from '../../../assets/png/Monero.png';
import MarketAnalysisImage from '../../../assets/png/image-blog.png';
import MarketAnalysisImage2 from '../../../assets/png/image-blog2.png';
import LandingAplicationImage from '../../../assets/png/application.png';
import features1 from '../../../assets/png/features.png';
import features2 from '../../../assets/png/features2.png';
import features3 from '../../../assets/png/features3.png';
import features4 from '../../../assets/png/features4.png';
import features5 from '../../../assets/png/features5.png';
import features6 from '../../../assets/png/features6.png';

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
                                    Crypto Increases, Money Saved For Better Life <br /> with{' '}
                                    <span className="gradient-text">HEX Exchange</span>
                                </h1>
                                <p className="text-md grey-text-accent text-center mb-24">
                                    Enjoy your arbitrage on the HEX platform
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
                                Trade will be enjoyfull and cheerfull
                            </p>
                            <div className="row">
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={features1} alt="icon" width={65} height={65} />
                                        <p className="mb-0 ml-2 text-ms white-text">Up to Date Notification</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        We provide the most updated information about latest markets
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={features2} alt="icon" width={65} height={65} />
                                        <p className="mb-0 ml-2 text-ms white-text">Safe & Secure Trading Platform</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Buy & Sell Assets with no worries with Heaven Exchange
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={features3} alt="icon" width={65} height={65} />
                                        <p className="mb-0 ml-2 text-ms white-text">Easy to Use</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        With a simple interface, crypto investing is easy for everyone
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={features4} alt="icon" width={65} height={65} />
                                        <p className="mb-0 ml-2 text-ms white-text">Withdraw Anytime & Anywhere</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        In anytime & anywhere you can withdraw your assets just one click away
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={features5} alt="icon" width={65} height={65} />
                                        <p className="mb-0 ml-2 text-ms white-text">Transaparent Transactions</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        With HEX Exchange you can track your transaction easily
                                    </p>
                                </div>
                                <div className="col-lg-4 col-sm-6 mb-24">
                                    <div className="d-flex align-items-center mb-3">
                                        <img src={features6} alt="icon" width={65} height={65} />
                                        <p className="mb-0 ml-2 text-ms white-text">Stand by Support Team</p>
                                    </div>
                                    <p className="mb-0 text-ms grey-text-accent">
                                        Connect Through chat support with our customer service for your better
                                        experience
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
                                Analysis news about crypto market
                            </p>
                            <div className="row mt-5">
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex align-items-start">
                                        <img src={MarketAnalysisImage} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">
                                                New Exchange Website Heaven Its Coming!
                                            </p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Lest trade and get rich with heaven exchange
                                            </p>
                                            <a href="#" className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex align-items-start">
                                        <img src={MarketAnalysisImage} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">
                                                Tips for Cut Loss in Crypto Trading
                                            </p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                HEX Exchange members who are beginners in the crypto world, at least
                                                they have heard of the term cut loss.
                                            </p>
                                            <a href="#" className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex align-items-start">
                                        <img src={MarketAnalysisImage2} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">
                                                Bitcoin Price Crosses $20K as US Dollar Strength Falls
                                            </p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Lest trade and get rich with heaven exchange
                                            </p>
                                            <a href="#" className="gradient-text text-ms ">
                                                Learn more
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 mb-4">
                                    <div className="d-flex align-items-start">
                                        <img src={MarketAnalysisImage2} className="image-analysis" alt="image" />
                                        <div className="ml-4">
                                            <p className="mb-8 text-lg white-text font-bold">
                                                New Exchange Website Heaven Its Coming!
                                            </p>
                                            <p className="mb-36 text-sm grey-text-accent">
                                                Lest trade and get rich with heaven exchange
                                            </p>
                                            <a href="#" className="gradient-text text-ms ">
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
