import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { History } from 'history';
import { RouterProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { setDocumentTitle } from '../../../helpers';
interface ProfileSettingState {
    showTwoFaModal: boolean;
}

interface OwnProps {
    history: History;
}

type Props = RouterProps & IntlProps & OwnProps;

class ProfileSettingComponent extends React.Component<Props, ProfileSettingState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showTwoFaModal: false,
        };
    }

    public componentDidMount() {
        setDocumentTitle('Profile Security');
    }

    public render() {
        return <React.Fragment></React.Fragment>;
    }
}
export const ProfileSetting = compose(
    injectIntl,
    withRouter,
    connect()
)(ProfileSettingComponent) as React.ComponentClass;
