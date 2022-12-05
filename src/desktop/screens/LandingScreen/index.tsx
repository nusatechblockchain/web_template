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
import { BtcIcon, EthIcon, LitecoinIcon, MoneroIcon } from '../../../assets/images/LandingPatternIcon';

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
                        <BtcIcon className="image-coin btc" />
                        <EthIcon className="image-coin eth" />
                        <LitecoinIcon className="image-coin lite" />
                        <MoneroIcon className="image-coin monero" />
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
                                    <a href="" className="btn btn-rounded btn-primary mx-3">
                                        Trade Now
                                    </a>
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
                                                <img src="./Assets/Icon/Coin/bnb.svg" className="mr-2" alt="" />
                                                BNB
                                            </p>
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <img src="./Assets/Icon/Coin/btc.svg" className="mr-2" alt="" />
                                                BINANCE
                                            </p>
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <img src="./Assets/Icon/Coin/eth.svg" className="mr-2" alt="" />
                                                Etherum
                                            </p>
                                            <p className="mb-0 font-semibold white-text mr-4">
                                                <img src="./Assets/Icon/Coin/bnb.svg" className="mr-2" alt="" />
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
                                            DOGE/USD <span className="contrast-text text-ms">+0.83%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">875.33</p>
                                        <p className="mb-0 text-ms grey-text-accent">$ 571,333.265</p>
                                    </div>
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            CDN/USD <span className="contrast-text text-ms">+0.90%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">998.22</p>
                                        <p className="mb-0 text-ms grey-text-accent">$324.221</p>
                                    </div>
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            DOGE/USD <span className="contrast-text text-ms">+0.83%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">875.33</p>
                                        <p className="mb-0 text-ms grey-text-accent">$ 571,333.265</p>
                                    </div>
                                    <div className="market-item py-24 mx-4">
                                        <p className="mb-0 text-lg white-text font-bold mb-8">
                                            CDN/USD <span className="contrast-text text-ms">+0.90%</span>
                                        </p>
                                        <p className="mb-0 text-lg white-text font-bold">998.22</p>
                                        <p className="mb-0 text-ms grey-text-accent">$324.221</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {/* end hero */}

                    <div>
                        <MarketsTable />
                    </div>
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
