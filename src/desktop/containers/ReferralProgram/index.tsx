import * as React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { IntlProps } from '../../../';
import { CopyableTextField } from '../../../components';
import { copy } from '../../../helpers';
import { alertPush, RootState, selectUserInfo, User } from '../../../modules';
import ReferralImage from '../../../assets/png/referral.png';

interface ReduxProps {
    user: User;
}

interface DispatchProps {
    fetchSuccess: typeof alertPush;
}

type Props = ReduxProps & DispatchProps & IntlProps;

class ReferralProgramClass extends React.Component<Props> {
    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public doCopy = () => {
        copy('referral-id');
        this.props.fetchSuccess({ message: ['page.body.wallets.tabs.deposit.ccy.message.success'], type: 'success' });
    };

    public render() {
        const { user } = this.props;
        const referralLink = `${window.document.location.origin}/signup?refid=${user.uid}`;

        return (
            <div className="content-wrapper dark-bg-accent">
                <div className="header dark-bg-main py-4 px-24 mb-24">
                    <h2 className="mb-0 text-xl white-text font-bold pt-2">Refferal Bonus</h2>
                </div>
                <div className="px-24">
                    <div className="d-flex mt-3 mb-48">
                        <img src={ReferralImage} className="referral-image" alt="referral-image" />
                        <div className="ml-4">
                            <h6 className="text-sm white-text font-bold">Your total rewards</h6>
                            <h2 className="gradient-text text-xl font-bold">00 USDT</h2>
                            <p className="text-sm white-text font-normal">
                                Invite your friend and earn 50% commission on their exchange trasaction, Copy link
                                bellow and share referral link to your friends
                            </p>
                        </div>
                    </div>
                    <div className="dark-bg-main radius-md d-inline-block mb-36">
                        <div className="p-3 d-flex">
                            <div className="item">
                                <div className="pl-3 py-1">
                                    <p className="text-ms grey-text-accent font-normal ">Total Invites</p>
                                    <h6 className="font-normal text-ms white-text">0 Person</h6>
                                </div>
                            </div>
                            <div className="item">
                                <div className="px-5 py-1">
                                    <p className="text-ms grey-text-accent font-normal mb-0">Referal Code</p>
                                    <fieldset onClick={this.doCopy}>
                                        <CopyableTextField value={'rPf3Xs'} fieldId="referral-code" />
                                    </fieldset>
                                </div>
                            </div>
                            <div className="item">
                                <div className="px-5 py-1">
                                    <p className="text-ms grey-text-accent font-normal mb-0">Referal Link</p>
                                    <fieldset onClick={this.doCopy}>
                                        <CopyableTextField value={referralLink} fieldId="referral-id" />
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h6 className="text-ms white-text font-normal mb-0">Referral List</h6>
                    <table id="example" className="table hidden-filter table-small" style={{ width: '100%' }}>
                        <thead>
                            <tr>
                                <th>Registered At</th>
                                <th>Email</th>
                                <th>Username</th>
                                <th>Level Verification</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>24-10-2022 - 13:54</td>
                                <td>email@email.com</td>
                                <td>adminusername</td>
                                <td>level 3</td>
                                <td>
                                    <span className="contrast-text">success</span>
                                </td>
                            </tr>
                            <tr>
                                <td>24-10-2022 - 13:54</td>
                                <td>email@email.com</td>
                                <td>adminusername</td>
                                <td>level 2</td>
                                <td>
                                    <span className="contrast-text">success</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = (dispatch) => ({
    fetchSuccess: (payload) => dispatch(alertPush(payload)),
});

// tslint:disable-next-line
export const ReferralProgram = injectIntl(
    connect(mapStateToProps, mapDispatchToProps)(ReferralProgramClass) as any
) as any;
