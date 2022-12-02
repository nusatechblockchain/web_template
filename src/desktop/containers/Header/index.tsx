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

type Props = ReduxProps & DispatchProps & IntlProps & LocationProps;

class Head extends React.Component<Props> {
    public render() {
        return (
            <div className='border-bottom'>Header</div>
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
