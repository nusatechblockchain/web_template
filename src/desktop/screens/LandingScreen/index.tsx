import { LandingBlock } from '@openware/react-components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { IntlProps } from '../../../';
import { MarketsTable } from '../../containers';
import { toggleColorTheme } from '../../../helpers';
import {
    RootState,
    selectCurrentColorTheme,
    selectUserLoggedIn,
} from '../../../modules';

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
            <div>
                <h1>Landing Screen</h1>
                <div>
                    <Link to="/signin" className='btn btn-prrimary'>Login</Link>
                    <Link to="/signup" className='btn btn-success'>Register</Link>
                </div>
                <div className='border-top'>Market</div>
                <div><MarketsTable/></div>
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
