import { History } from 'history';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
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
            <div className="border-top" onClick={()=>this.handleClick()}>
                <div>Footer Area</div>
            </div>
        );
    }

    private handleClick = () => {
        alert('ini untuk footer')
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
