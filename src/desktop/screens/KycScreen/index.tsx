import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouterProps, withRouter } from 'react-router';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { setDocumentTitle } from '../../../helpers';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { CustomInput, Modal } from '../../components';
import { KycDrivingLicense, KycNationalCard, KycPasport } from '../../containers';
import { PasportIcon, DrivingLlicenseIcon, NationalIDIcon } from '../../../assets/images/KycIcon';

interface KycScreenState {
    docType: string;
    idNumber: string;
    date: string;
    showModal: boolean;
}

interface HistoryProps {
    history: {
        location: {
            search: string;
            state: {
                email: string;
            };
        };
    };
}

type Props = RouterProps & HistoryProps & IntlProps;

class KycComponent extends React.Component<Props, KycScreenState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            docType: '',
            idNumber: '',
            date: '',
            showModal: false,
        };
    }

    public componentDidMount() {
        setDocumentTitle('Kyc Screen');
    }

    public render() {
        const { docType, date, idNumber, showModal } = this.state;

        const checkForm = docType != '' && date != '' && idNumber != '';

        return (
            <React.Fragment>
                <div className="content-wrapper kyc-screen dark-bg-accent pb-5">
                    <div className="header dark-bg-main py-4 px-24 mb-24">
                        <h2 className="mb-0 text-xl white-text font-bold pt-2">Document Verification</h2>
                    </div>
                    <div className="px-24">
                        <h6 className="text-lg white-text font-bold mb-24">Get Verifed your Government Issued ID</h6>
                        <div className="row">
                            <div className="col-lg-10 col-12">
                                <div className="notification-warning notification alert show text-ms white-text font-normal position-relative mb-24">
                                    Complete your identity verify to start trading with heaven exchange
                                    <div className="close-icon">
                                        <CloseIcon fill="#fff" />
                                    </div>
                                </div>
                                <form action="">
                                    <ul className="nav nav-tabs" id="myTab" role="tablist">
                                        <li className="nav-item" onClick={() => this.setState({ docType: 'pasport' })}>
                                            <a className={`nav-link ${docType == 'pasport' ? 'active' : ''}`}>
                                                <PasportIcon
                                                    className="mr-2"
                                                    fill={docType == 'pasport' ? '#fff' : '#B5B3BC'}
                                                />
                                                Pasport
                                            </a>
                                        </li>
                                        <li
                                            className="nav-item"
                                            onClick={() => this.setState({ docType: 'national-id' })}>
                                            <a className={`nav-link ${docType == 'national-id' ? 'active' : ''}`}>
                                                <NationalIDIcon
                                                    className="mr-2"
                                                    fill={docType == 'national-id' ? '#fff' : '#B5B3BC'}
                                                />
                                                National
                                            </a>
                                        </li>
                                        <li
                                            className="nav-item"
                                            onClick={() => this.setState({ docType: 'driving-license' })}>
                                            <a className={`nav-link ${docType == 'driving-license' ? 'active' : ''}`}>
                                                <DrivingLlicenseIcon
                                                    className="mr-2"
                                                    fill={docType == 'driving-license' ? '#fff' : '#B5B3BC'}
                                                />
                                                Driving License
                                            </a>
                                        </li>
                                    </ul>
                                    <div className="information mt-5">
                                        <p className="font-bold white-text text-ms mb-3">
                                            To avoid delays when verifying account, Please make sure bellow:
                                        </p>
                                        <ul className="pl-3">
                                            <li className="grey-text-accent mb-1 font-normal text-sm">
                                                Chosen credential must not be expired.
                                            </li>
                                            <li className="grey-text-accent mb-1 font-normal text-sm">
                                                Document should be good condition and clearly visible.
                                            </li>
                                            <li className="grey-text-accent mb-1 font-normal text-sm">
                                                Make sure that there is no light glare on the card.
                                            </li>
                                        </ul>
                                        <div className="row">
                                            <div className="col-lg-5 col-6">
                                                <CustomInput
                                                    defaultLabel="ID Number"
                                                    inputValue={this.state.idNumber}
                                                    label="ID Number"
                                                    placeholder="ID Number"
                                                    type="text"
                                                    labelVisible
                                                    classNameLabel="white-text text-sm"
                                                    handleChangeInput={(e) => this.setState({ idNumber: e })}
                                                />
                                            </div>
                                            <div className="col-lg-5 col-6">
                                                <CustomInput
                                                    defaultLabel="Issued Date"
                                                    inputValue={this.state.date}
                                                    label="Issued Date"
                                                    placeholder="Issued Date"
                                                    type="date"
                                                    labelVisible
                                                    classNameLabel="white-text text-sm"
                                                    handleChangeInput={(e) => this.setState({ date: e })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    {docType == 'pasport' ? (
                                        <KycPasport />
                                    ) : docType == 'national-id' ? (
                                        <KycNationalCard />
                                    ) : docType == 'driving-license' ? (
                                        <KycDrivingLicense />
                                    ) : (
                                        ''
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-primary px-lg mt-4"
                                        onClick={() => this.setState({ showModal: true })}
                                        disabled={!checkForm}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <Modal
                    content={this.renderContentModal()}
                    header={this.renderHeaderModal()}
                    footer={this.renderFooterModal()}
                    show={showModal}
                />
            </React.Fragment>
        );
    }

    private renderHeaderModal() {
        return <h6 className="text-md white-text font-semibold">Document Upload Success</h6>;
    }

    private renderContentModal() {
        return (
            <p className="text-sm grey-text-accent mb-0">
                The verification process takes up to 7 days, always check your email to find out the information of the
                documents you uploaded
            </p>
        );
    }

    private renderFooterModal() {
        return (
            <button
                type="button"
                onClick={() => this.setState({ showModal: false })}
                className="btn btn-primary sm mx-2 px-5">
                Continue
            </button>
        );
    }
}

export const KycScreen = compose(injectIntl, withRouter, connect())(KycComponent) as React.ComponentClass;
