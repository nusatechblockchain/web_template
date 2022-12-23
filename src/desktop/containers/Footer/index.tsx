import { History } from 'history';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import {
    changeLanguage,
    changeUserDataFetch,
    RootState,
    selectCurrentColorTheme,
    selectCurrentLanguage,
    selectUserInfo,
    selectUserLoggedIn,
    User,
} from '../../../modules';
import { Logo } from '../../../assets/images/Logo';
import { Facebook, Linkedin, Youtube } from '../../../assets/images/SocialMedia';

interface State {
    isOpenLanguage: boolean;
}

interface DispatchProps {
    changeLanguage: typeof changeLanguage;
}

interface ReduxProps {
    lang: string;
    colorTheme: string;
    isLoggedIn: boolean;
    user: User;
}

interface OwnProps {
    onLinkChange?: () => void;
    history: History;
    location: {
        pathnname: string;
    };
    changeUserDataFetch: typeof changeUserDataFetch;
}

type Props = OwnProps & ReduxProps & RouteProps & DispatchProps;

class FooterContainer extends React.Component<Props, State> {
    public render() {
        const { isLoggedIn, lang } = this.props;
        return (
            <React.Fragment>
                <footer className=" pt-5">
                    <div className="container pb-5">
                        <div className="d-flex justify-content-between flex-wrap">
                            <div className="name px-3">
                                <Logo className="mb-3" />
                                <p className="text-ms grey-text-accent">
                                    Massa blandit semper varius faucibus. Suspendisse viverra venenatis placerat nam ut.
                                    Pellentesque sit id tempor turpis.
                                </p>
                            </div>
                            <div className="link px-3">
                                <p className="text-lg gradient-text mb-36">LINKS</p>
                                <a href="#" className="mb-8 d-block text-ms grey-text-accent">
                                    How it works
                                </a>
                                <a href="#" className="mb-8 d-block text-ms grey-text-accent">
                                    Cryapos
                                </a>
                                <a href="#" className="mb-8 d-block text-ms grey-text-accent">
                                    Features
                                </a>
                                <a href="#" className="mb-8 d-block text-ms grey-text-accent">
                                    Testimonial
                                </a>
                                <a href="#" className="mb-8 d-block text-ms grey-text-accent">
                                    Blogs
                                </a>
                            </div>
                            <div className="legal px-3">
                                <p className="text-lg gradient-text mb-36">LEGAL</p>
                                <a href="#" className="mb-8 text-ms d-block grey-text-accent">
                                    Terms of use
                                </a>
                                <a href="#" className="mb-8 text-ms d-block grey-text-accent">
                                    Terms of conditions
                                </a>
                                <a href="#" className="mb-8 text-ms d-block grey-text-accent">
                                    Privecy policy
                                </a>
                                <a href="#" className="mb-8 text-ms d-block grey-text-accent">
                                    Cookie policy
                                </a>
                            </div>
                            <div className="newsletter px-3">
                                <p className="text-lg gradient-text mb-36">NEWSLETTER</p>
                                <p className="mb-12 text-ms d-block grey-text">Over 25000 people have subscribed</p>
                                <div className="input-group mb-0">
                                    <input
                                        type="text"
                                        className="form-control newsletter-input"
                                        placeholder="Enter Your Email"
                                    />
                                    <label htmlFor="newslatter" className=" newsletter-input-label">
                                        SUBSCRIBE
                                    </label>
                                </div>
                                <span className=" text-sm grey-text-accent">We don’t sell your email and spam</span>
                            </div>
                        </div>
                    </div>
                    <div className="container pb-5">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="mr-2">
                                <a href="" className="text-sm font-normal white-text">
                                    Privacy &amp; Terms
                                </a>
                                <a href="" className="text-sm font-normal white-text">
                                    Contact
                                </a>
                            </div>
                            <p className="text-sm font-normal white-text mb-0">Copyright @ 2022 Heaven Exchange</p>
                            <div className="d-flex">
                                <a href="">
                                    <div className="mx-1">
                                        <Facebook />
                                    </div>
                                </a>
                                <a href="">
                                    <div className="mx-1">
                                        <Linkedin />
                                    </div>
                                </a>
                                <a href="">
                                    <div className="mx-1">
                                        <Youtube />
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </React.Fragment>
        );
    }

    private handleClick = () => {
        alert('ini untuk footer');
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    colorTheme: selectCurrentColorTheme(state),
    isLoggedIn: selectUserLoggedIn(state),
    lang: selectCurrentLanguage(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    changeLanguage: (payload) => dispatch(changeLanguage(payload)),
    changeUserDataFetch: (payload) => dispatch(changeUserDataFetch(payload)),
});

export const Footer = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(FooterContainer) as React.ComponentClass;
