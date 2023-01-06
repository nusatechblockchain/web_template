import cr from 'classnames';
import * as countries from 'i18n-iso-countries';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import MaskInput from 'react-maskinput';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { accountUploadSizeMaxRange, accountUploadSizeMinRange, languages } from '../../../api/config';
import { CustomInput, UploadFile } from '../../components';
import { formatDate, isDateInFuture, randomSecureHex } from '../../../helpers';
import {
    alertPush,
    RootState,
    selectCurrentLanguage,
    selectMobileDeviceState,
    selectSendDocumentsSuccess,
    selectUserInfo,
    User,
    sendDocuments,
    UserOffersData,
} from '../../../modules';
import { DrivingLlicenseIcon, NationalIDIcon, PasportIcon, UploadFileIcon } from '../../../assets/images/KycIcon';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import DocumentFrontExample from 'src/assets/images/kyc/DocumentFrontExample.svg';
import DocumentBackExample from 'src/assets/images/kyc/DocumentBackExample.svg';
import DocumentSelfieExample from 'src/assets/images/kyc/DocumentSelfieExample.svg';

interface ReduxProps {
    lang: string;
    success?: string;
    isMobileDevice: boolean;
    user: User;
}

interface DispatchProps {
    sendDocuments: typeof sendDocuments;
    fetchAlert: typeof alertPush;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface DocumentsState {
    documentsType: string;
    issuedDate: string;
    expireDate: string;
    idNumber: string;
    fileFront: File[];
    fileBack: File[];
    fileSelfie: File[];
    frontFileSizeErrorMessage: string;
    backFileSizeErrorMessage: string;
    selfieFileSizeErrorMessage: string;
    birthDate: string;
    placeBirth: string;
    name: string;
    address: string;
    district: string;
    city: string;
    province: string;
    step: string;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class KycDocumentComponent extends React.Component<Props, DocumentsState> {
    public translate = (key: string, value?: string, min?: string) =>
        this.props.intl.formatMessage({ id: key }, { value, min });

    public data = [
        this.translate('page.body.kyc.documents.select.passport'),
        this.translate('page.body.kyc.documents.select.identityCard'),
        this.translate('page.body.kyc.documents.select.driverLicense'),
    ];

    public state = {
        documentsType: '',
        issuedDate: '',
        expireDate: '',
        idNumber: '',
        fileFront: [],
        fileBack: [],
        fileSelfie: [],
        frontFileSizeErrorMessage: '',
        backFileSizeErrorMessage: '',
        selfieFileSizeErrorMessage: '',
        name: '',
        address: '',
        district: '',
        city: '',
        province: '',
        birthDate: '',
        placeBirth: '',
        step: 'profile',
    };

    public UNSAFE_componentWillReceiveProps(next: Props) {
        if (next.success && !this.props.success) {
            this.props.history.push('/profile');
        }
    }

    public render() {
        const { isMobileDevice } = this.props;
        const {
            documentsType,
            fileFront,
            fileBack,
            fileSelfie,
            issuedDate,
            expireDate,
            idNumber,
            frontFileSizeErrorMessage,
            backFileSizeErrorMessage,
            selfieFileSizeErrorMessage,
            name,
            address,
            district,
            city,
            province,
            birthDate,
            placeBirth,
            step,
        }: DocumentsState = this.state;

        /* tslint:disable */
        languages.map((l: string) => countries.registerLocale(require(`i18n-iso-countries/langs/${l}.json`)));
        /* tslint:enable */

        const onSelect = (value) => this.handleChangeDocumentsType(this.data[value]);

        return (
            <React.Fragment>
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
                                {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                    <li className="nav-item" onClick={() => this.handleChangeDocumentsType('Passport')}>
                                        <a className={`nav-link ${documentsType == 'Passport' ? 'active' : ''}`}>
                                            <PasportIcon
                                                className="mr-2"
                                                fill={documentsType == 'Passport' ? '#fff' : '#B5B3BC'}
                                            />
                                            Passport
                                        </a>
                                    </li>
                                    <li
                                        className="nav-item"
                                        onClick={() => this.handleChangeDocumentsType('Identity card')}>
                                        <a className={`nav-link ${documentsType == 'Identity card' ? 'active' : ''}`}>
                                            <NationalIDIcon
                                                className="mr-2"
                                                fill={documentsType == 'Identity card' ? '#fff' : '#B5B3BC'}
                                            />
                                            National
                                        </a>
                                    </li>
                                    <li
                                        className="nav-item"
                                        onClick={() => this.handleChangeDocumentsType('Driver license')}>
                                        <a className={`nav-link ${documentsType == 'Driver license' ? 'active' : ''}`}>
                                            <DrivingLlicenseIcon
                                                className="mr-2"
                                                fill={documentsType == 'Driver license' ? '#fff' : '#B5B3BC'}
                                            />
                                            Driving License
                                        </a>
                                    </li>
                                </ul> */}
                                {this.state.step == 'profile' && (
                                    <div className="row">
                                        <div className="col-md-6">
                                            <CustomInput
                                                defaultLabel="Full name"
                                                label="Full name"
                                                placeholder="Full name"
                                                type="text"
                                                labelVisible
                                                classNameLabel="white-text text-sm"
                                                classNameGroup="mb-24"
                                                inputValue={this.state.name}
                                                handleChangeInput={this.handleChangeName}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                defaultLabel="Your Home Address"
                                                label="Your Home Address"
                                                placeholder="Your Home Address"
                                                type="text"
                                                labelVisible
                                                classNameLabel="white-text text-sm"
                                                classNameGroup="mb-24"
                                                inputValue={address}
                                                handleChangeInput={this.handleChangeAddress}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                defaultLabel="District"
                                                label="District"
                                                placeholder="District"
                                                type="text"
                                                labelVisible
                                                classNameLabel="white-text text-sm"
                                                classNameGroup="mb-24"
                                                inputValue={district}
                                                handleChangeInput={this.handleChangedistrict}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                defaultLabel="City"
                                                label="City"
                                                placeholder="City"
                                                type="text"
                                                labelVisible
                                                classNameLabel="white-text text-sm"
                                                classNameGroup="mb-24"
                                                inputValue={city}
                                                handleChangeInput={this.handleChangecity}
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                defaultLabel="Province"
                                                label="Province"
                                                placeholder="Province"
                                                type="text"
                                                labelVisible
                                                classNameLabel="white-text text-sm"
                                                classNameGroup="mb-24"
                                                inputValue={province}
                                                handleChangeInput={this.handleChangeprovince}
                                            />
                                        </div>
                                        {/* <div className="col-md-6">
                                            <label className="text-sm mb-8 white-text">Country</label>
                                            <SearchDropdown
                                                className="pg-confirm__content-identity__forms__row__content-number-dropdown"
                                                options={dataCountries}
                                                onSelect={this.selectCountry}
                                                placeholder={this.translate('page.body.kyc.identity.CoR')}
                                            />
                                        </div> */}
                                        <div className="col-md-6">
                                            <div className="input-date-document">
                                                <label className="text-sm mb-8 white-text">Date of Birth</label>
                                                <MaskInput
                                                    maskString="00/00/0000"
                                                    mask="00/00/0000"
                                                    onChange={this.handleChangeBirthDate}
                                                    value={birthDate}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <CustomInput
                                                defaultLabel="Place of Birth"
                                                label="Place of Birth"
                                                placeholder="Place of Birth"
                                                type="text"
                                                labelVisible
                                                classNameLabel="white-text text-sm"
                                                classNameGroup="mb-24"
                                                inputValue={placeBirth}
                                                handleChangeInput={this.handleChangePlaceBirth}
                                            />
                                        </div>

                                        <div className="col-12">
                                            <div className="mt-3">
                                                <button
                                                    type="button"
                                                    className="btn btn-primary px-5"
                                                    onClick={() => this.setState({ step: 'document' })}>
                                                    Next
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {this.state.step == 'document' && (
                                    <React.Fragment>
                                        <div className="information mt-5">
                                            <p className="font-bold white-text text-ms mb-3">
                                                To avoid delays when verifying account, Please make sure bellow:
                                            </p>
                                            <ul className="pl-3">
                                                <li className="grey-text-accent mb-1 font-normal text-sm">
                                                    You can use Pasport / Driving License / National Id
                                                </li>
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
                                                        label="ID Number"
                                                        placeholder="ID Number"
                                                        type="text"
                                                        labelVisible
                                                        classNameLabel="white-text text-sm"
                                                        inputValue={idNumber}
                                                        handleChangeInput={this.handleChangeIdNumber}
                                                    />
                                                </div>
                                                {/* <div className="col-lg-5 col-6">
                                                    <div className="input-date-document">
                                                        <label className="text-sm mb-8 white-text">Issued Date</label>
                                                        <MaskInput
                                                            maskString="00/00/0000"
                                                            mask="00/00/0000"
                                                            onChange={this.handleChangeIssuedDate}
                                                            value={issuedDate}
                                                        />
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                        <div className="row">
                                            {/* {this.state.documentsType ? ( */}
                                            <div className="col-lg-6">
                                                <UploadFile
                                                    isMobileDevice={isMobileDevice}
                                                    id="fileFront"
                                                    title={this.translate(
                                                        'page.body.kyc.documents.uploadFile.front.title'
                                                    )}
                                                    label={this.translate(
                                                        'page.body.kyc.documents.uploadFile.front.label'
                                                    )}
                                                    buttonText={this.translate(
                                                        'page.body.kyc.documents.uploadFile.front.button'
                                                    )}
                                                    sizesText={this.uploadFileSizeGuide()}
                                                    formatsText={this.translate(
                                                        'page.body.kyc.documents.uploadFile.front.formats'
                                                    )}
                                                    handleUploadScan={(uploadEvent) =>
                                                        this.handleUploadScan(uploadEvent, 'front')
                                                    }
                                                    exampleImagePath={DocumentFrontExample}
                                                    uploadedFile={fileFront[0] && (fileFront[0] as File).name}
                                                    fileSizeErrorMessage={frontFileSizeErrorMessage}
                                                />
                                            </div>
                                            {/* ) : null} */}
                                            {/* {this.state.documentsType && this.state.documentsType !== 'Passport' ? (
                                        <div className="col-lg-6">
                                            <UploadFile
                                                isMobileDevice={isMobileDevice}
                                                id="fileBack"
                                                title={this.translate('page.body.kyc.documents.uploadFile.back.title')}
                                                label={this.translate('page.body.kyc.documents.uploadFile.back.label')}
                                                buttonText={this.translate(
                                                    'page.body.kyc.documents.uploadFile.back.button'
                                                )}
                                                sizesText={this.uploadFileSizeGuide()}
                                                formatsText={this.translate(
                                                    'page.body.kyc.documents.uploadFile.back.formats'
                                                )}
                                                handleUploadScan={(uploadEvent) =>
                                                    this.handleUploadScan(uploadEvent, 'back')
                                                }
                                                exampleImagePath={DocumentBackExample}
                                                uploadedFile={fileBack[0] && (fileBack[0] as File).name}
                                                fileSizeErrorMessage={backFileSizeErrorMessage}
                                            />
                                        </div>
                                    ) : null} */}
                                            {/* {this.state.documentsType ? ( */}
                                            <div className="col-lg-6">
                                                <UploadFile
                                                    isMobileDevice={isMobileDevice}
                                                    id="fileSelfie"
                                                    title={this.translate(
                                                        'page.body.kyc.documents.uploadFile.selfie.title'
                                                    )}
                                                    label={this.translate(
                                                        'page.body.kyc.documents.uploadFile.selfie.label'
                                                    )}
                                                    buttonText={this.translate(
                                                        'page.body.kyc.documents.uploadFile.selfie.button'
                                                    )}
                                                    sizesText={this.uploadFileSizeGuide()}
                                                    formatsText={this.translate(
                                                        'page.body.kyc.documents.uploadFile.selfie.formats'
                                                    )}
                                                    handleUploadScan={(uploadEvent) =>
                                                        this.handleUploadScan(uploadEvent, 'selfie')
                                                    }
                                                    exampleImagePath={DocumentSelfieExample}
                                                    uploadedFile={fileSelfie[0] && (fileSelfie[0] as File).name}
                                                    fileSizeErrorMessage={selfieFileSizeErrorMessage}
                                                />
                                            </div>
                                            {/* ) : null} */}
                                        </div>
                                        <div className="d-flex align-items-center mt-4">
                                            <button
                                                className="btn btn-secondary mr-3 px-5"
                                                onClick={() => this.setState({ step: 'profile' })}>
                                                Back
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-primary px-lg"
                                                onClick={this.sendDocuments}
                                                disabled={this.handleCheckButtonDisabled()}>
                                                Submit
                                            </button>
                                        </div>
                                    </React.Fragment>
                                )}
                            </form>
                        </div>
                    </div>
                </div>

                {/* <Modal
                    content={this.renderContentModal()}
                    header={this.renderHeaderModal()}
                    footer={this.renderFooterModal()}
                    show={showModal}
                /> */}
            </React.Fragment>
        );
    }

    private uploadFileSizeGuide = () => {
        if (accountUploadSizeMinRange) {
            return this.translate(
                'page.body.kyc.address.uploadFile.sizeMinMax',
                accountUploadSizeMaxRange.toString(),
                accountUploadSizeMinRange.toString()
            );
        }

        return this.translate('page.body.kyc.address.uploadFile.sizeMax', accountUploadSizeMaxRange.toString());
    };

    private handleChangeDocumentsType = (value: string) => {
        this.setState({
            documentsType: value,
        });
    };

    private handleChangeIdNumber = (value: string) => {
        this.setState({
            idNumber: value,
        });
    };

    private handleChangeIssuedDate = (e: OnChangeEvent) => {
        this.setState({
            issuedDate: formatDate(e.target.value),
        });
    };

    private handleChangeExpiration = (e: OnChangeEvent) => {
        this.setState({
            expireDate: formatDate(e.target.value),
        });
    };

    private handleChangeAddress = (value: string) => {
        this.setState({
            address: value,
        });
    };
    private handleChangeName = (value: string) => {
        this.setState({
            name: value,
        });
    };
    private handleChangedistrict = (value: string) => {
        this.setState({
            district: value,
        });
    };
    private handleChangecity = (value: string) => {
        this.setState({
            city: value,
        });
    };
    private handleChangeprovince = (value: string) => {
        this.setState({
            province: value,
        });
    };
    private handleChangePlaceBirth = (value: string) => {
        this.setState({
            placeBirth: value,
        });
    };

    private handleChangeBirthDate = (value: string) => {
        this.setState({
            birthDate: value,
        });
    };

    private handleUploadScan = (uploadEvent, id) => {
        const allFiles: File[] = uploadEvent.target.files;
        const maxDocsCount = 1;
        const additionalFileList =
            Array.from(allFiles).length > maxDocsCount
                ? Array.from(allFiles).slice(0, maxDocsCount)
                : Array.from(allFiles);

        if (!additionalFileList.length) {
            return;
        }

        const sizeKB = (additionalFileList[0].size / 1024).toFixed(1);

        switch (id) {
            case 'front':
                if (additionalFileList[0].size > accountUploadSizeMaxRange * 1024 * 1024) {
                    this.setState({
                        frontFileSizeErrorMessage: this.translate('page.body.kyc.uploadFile.error.tooBig', sizeKB),
                    });
                } else if (additionalFileList[0].size < accountUploadSizeMinRange * 1024 * 1024) {
                    this.setState({
                        frontFileSizeErrorMessage: this.translate('page.body.kyc.uploadFile.error.tooSmall', sizeKB),
                    });
                } else {
                    this.setState({ frontFileSizeErrorMessage: '' });
                }

                this.setState({ fileFront: additionalFileList });
                break;
            // case 'back':
            //     if (additionalFileList[0].size > accountUploadSizeMaxRange * 1024 * 1024) {
            //         this.setState({
            //             backFileSizeErrorMessage: this.translate('page.body.kyc.uploadFile.error.tooBig', sizeKB),
            //         });
            //     } else if (additionalFileList[0].size < accountUploadSizeMinRange * 1024 * 1024) {
            //         this.setState({
            //             backFileSizeErrorMessage: this.translate('page.body.kyc.uploadFile.error.tooSmall', sizeKB),
            //         });
            //     } else {
            //         this.setState({ backFileSizeErrorMessage: '' });
            //     }

            //     this.setState({ fileBack: additionalFileList });
            //     break;
            case 'selfie':
                if (additionalFileList[0].size > accountUploadSizeMaxRange * 1024 * 1024) {
                    this.setState({
                        selfieFileSizeErrorMessage: this.translate('page.body.kyc.uploadFile.error.tooBig', sizeKB),
                    });
                } else if (additionalFileList[0].size < accountUploadSizeMinRange * 1024 * 1024) {
                    this.setState({
                        selfieFileSizeErrorMessage: this.translate('page.body.kyc.uploadFile.error.tooSmall', sizeKB),
                    });
                } else {
                    this.setState({ selfieFileSizeErrorMessage: '' });
                }

                this.setState({ fileSelfie: additionalFileList });
                break;
            default:
                break;
        }
    };

    private handleValidateInput = (field: string, value: string): boolean => {
        switch (field) {
            case 'issuedDate':
                return !isDateInFuture(value);
            case 'expireDate':
                return isDateInFuture(value);
            case 'idNumber':
                const cityRegex = new RegExp(`^[a-zA-Z0-9]{1,255}$`);

                return Boolean(value.match(cityRegex));
            default:
                return true;
        }
    };

    private handleCheckButtonDisabled = () => {
        const {
            documentsType,
            issuedDate,
            expireDate,
            fileBack,
            fileFront,
            fileSelfie,
            idNumber,
            frontFileSizeErrorMessage,
            backFileSizeErrorMessage,
            selfieFileSizeErrorMessage,
        } = this.state;

        const typeOfDocuments = this.getDocumentsType(documentsType);
        const filesValid =
            typeOfDocuments === 'Passport'
                ? fileFront.length &&
                  fileSelfie.length &&
                  frontFileSizeErrorMessage === '' &&
                  selfieFileSizeErrorMessage === ''
                : fileSelfie.length &&
                  fileFront.length &&
                  fileBack.length &&
                  frontFileSizeErrorMessage === '' &&
                  backFileSizeErrorMessage === '' &&
                  selfieFileSizeErrorMessage === '';

        return (
            !this.handleValidateInput('idNumber', idNumber) || !this.handleValidateInput('issuedDate', issuedDate)
            // !filesValid
        );
    };

    private sendDocuments = () => {
        const { documentsType, fileBack, fileFront, fileSelfie } = this.state;
        const identificator = randomSecureHex(32);

        if (this.handleCheckButtonDisabled()) {
            return;
        }

        this.props.sendDocuments(this.createFormData(identificator));

        // if (documentsType !== 'Passport') {
        //     this.props.sendDocuments(this.createFormData('back_side', fileBack, identificator));
        // }

        // this.props.sendDocuments(this.createFormData(identificator));
    };

    // private createFormData = (docCategory: string, upload: File[], identificator: string) => {
    private createFormData = (identificator: string) => {
        const { documentsType, issuedDate, idNumber, fileFront, fileSelfie }: DocumentsState = this.state;
        const typeOfDocuments = this.getDocumentsType(documentsType);

        const request = new FormData();

        // if (expireDate) {
        //     request.append('doc_expire', expireDate);
        // }

        // request.append('doc_issue', issuedDate);
        // request.append('doc_type', typeOfDocuments);
        // request.append('doc_number', idNumber);
        // request.append('identificator', identificator);
        // request.append('doc_category', docCategory);
        // request.append('upload[]', upload[0]);

        request.append('birthDate', '14/01/2000');
        request.append('idNumber', idNumber);
        request.append('name', this.state.name);
        request.append('address', this.state.address);
        request.append('district', this.state.district);
        request.append('city', this.state.city);
        request.append('province', this.state.province);
        request.append('country', 'ID');
        request.append('place_of_birth', this.state.placeBirth);
        request.append('selfie_image', fileSelfie[0]);
        request.append('identity_image', fileFront[0]);
        request.append('identificator', identificator);
        return request;
    };

    private getDocumentsType = (value: string) => {
        switch (value) {
            case this.data[0]:
                return 'Passport';
            case this.data[1]:
                return 'Identity card';
            case this.data[2]:
                return 'Driver license';
            default:
                return value;
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    lang: selectCurrentLanguage(state),
    success: selectSendDocumentsSuccess(state),
    isMobileDevice: selectMobileDeviceState(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    fetchAlert: (payload) => dispatch(alertPush(payload)),
    sendDocuments: (payload) => dispatch(sendDocuments(payload)),
});

export const KycDocument = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(KycDocumentComponent) as any;
