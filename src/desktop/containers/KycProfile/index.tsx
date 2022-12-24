import cr from 'classnames';
import moment from 'moment';
import * as React from 'react';
import { Button } from 'react-bootstrap';
import { injectIntl } from 'react-intl';
import MaskInput from 'react-maskinput';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { RouterProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from '../../../';
import { languages } from '../../../api/config';
import { CustomInput } from '../../components';
import { formatDate, isDateInFuture } from '../../../helpers';
import {
    editIdentity,
    Label,
    labelFetch,
    RootState,
    selectCurrentLanguage,
    selectEditIdentitySuccess,
    selectLabelData,
    selectSendIdentitySuccess,
    selectUserInfo,
    sendIdentity,
    User,
} from '../../../modules';
import { IdentityData } from '../../../modules/user/kyc/identity/types';

import * as countries from 'i18n-iso-countries';

interface ReduxProps {
    editSuccess?: string;
    sendSuccess?: string;
    lang: string;
    labels: Label[];
    user: User;
}

interface DispatchProps {
    editIdentity: typeof editIdentity;
    sendIdentity: typeof sendIdentity;
    labelFetch: typeof labelFetch;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface IdentityState {
    city: string;
    countryOfBirth: string;
    dateOfBirth: string;
    firstName: string;
    lastName: string;
    postcode: string;
    fullName: string;
    residentialAddress: string;
    cityFocused: boolean;
    dateOfBirthFocused: boolean;
    firstNameFocused: boolean;
    lastNameFocused: boolean;
    postcodeFocused: boolean;
    residentialAddressFocused: boolean;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps;

class IdentityComponent extends React.Component<Props, IdentityState> {
    public state = {
        city: '',
        countryOfBirth: '',
        dateOfBirth: '',
        firstName: '',
        lastName: '',
        fullName: '',
        postcode: '',
        residentialAddress: '',
        cityFocused: false,
        dateOfBirthFocused: false,
        firstNameFocused: false,
        lastNameFocused: false,
        postcodeFocused: false,
        residentialAddressFocused: false,
    };

    public translate = (e: string) => {
        return this.props.intl.formatMessage({ id: e });
    };

    public componentDidUpdate(prev: Props) {
        const { history, editSuccess, sendSuccess } = this.props;

        if ((!prev.editSuccess && editSuccess) || (!prev.sendSuccess && sendSuccess)) {
            this.props.labelFetch();
            history.push('/profile');
        }
    }

    public render() {
        const { editSuccess, sendSuccess, lang } = this.props;
        const {
            city,
            dateOfBirth,
            firstName,
            lastName,
            fullName,
            postcode,
            residentialAddress,
            cityFocused,
            dateOfBirthFocused,
            firstNameFocused,
            lastNameFocused,
            postcodeFocused,
            residentialAddressFocused,
        } = this.state;

        const firstNameGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': firstNameFocused,
            'pg-confirm__content-identity__forms__row__content--wrong':
                firstName && !this.handleValidateInput('firstName', firstName),
        });

        const lastNameGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': lastNameFocused,
            'pg-confirm__content-identity__forms__row__content--wrong':
                lastName && !this.handleValidateInput('lastName', lastName),
        });

        const dateOfBirthGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': dateOfBirthFocused,
            'pg-confirm__content-identity__forms__row__content--wrong':
                dateOfBirth && !this.handleValidateInput('dateOfBirth', dateOfBirth),
        });

        const residentialAddressGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': residentialAddressFocused,
            'pg-confirm__content-identity__forms__row__content--wrong':
                residentialAddress && !this.handleValidateInput('residentialAddress', residentialAddress),
        });

        const cityGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': cityFocused,
            'pg-confirm__content-identity__forms__row__content--wrong': city && !this.handleValidateInput('city', city),
        });

        const postcodeGroupClass = cr('pg-confirm__content-identity__forms__row__content', {
            'pg-confirm__content-identity__forms__row__content--focused': postcodeFocused,
            'pg-confirm__content-identity__forms__row__content--wrong':
                postcode && !this.handleValidateInput('postcode', postcode),
        });

        /* tslint:disable */
        languages.map((l: string) => countries.registerLocale(require(`i18n-iso-countries/langs/${l}.json`)));

        /* tslint:enable */

        const dataCountries = Object.values(countries.getNames(lang)).map((item) => {
            return { label: item, value: item };
        });

        return (
            <React.Fragment>
                <div className="header dark-bg-main py-4 px-24 mb-24">
                    <h2 className="mb-0 text-xl white-text font-bold pt-2">Profile ID Verification</h2>
                </div>
                <div className="phone-form px-24">
                    <h3 className=" text-md white-text font-bold mb-24">Get Verifed your Profile ID</h3>
                    <div className="row">
                        <div className="col-md-8">
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
                                        inputValue={fullName}
                                        handleChangeInput={this.handleChangeFullName}
                                    />

                                    <div className="input-date-document">
                                        <label className="text-sm mb-8 white-text">Date of Birth</label>
                                        <MaskInput
                                            maskString="00/00/0000"
                                            mask="00/00/0000"
                                            onChange={(value) => this.handleChangeDate(value)}
                                            value={dateOfBirth}
                                        />
                                    </div>
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
                                        inputValue={residentialAddress}
                                        handleChangeInput={(e) => this.handleChange(e, 'residentialAddress')}
                                    />

                                    <CustomInput
                                        defaultLabel="Postal Code"
                                        label="Postal Code"
                                        placeholder="Postal Code"
                                        type="text"
                                        labelVisible
                                        classNameLabel="white-text text-sm"
                                        classNameGroup="mb-24"
                                        inputValue={postcode}
                                        handleChangeInput={(e) => this.handleChange(e, 'postcode')}
                                    />
                                </div>
                                <div className="px-24">
                                    <button type="button" className="btn btn-primary px-5 rounded-xl">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private scrollToElement = (displayedElem: number) => {
        const element: HTMLElement = document.getElementsByClassName('pg-confirm__content-identity__forms__row')[
            displayedElem
        ] as HTMLElement;
        element && element.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    };

    private handleChange = (value: string, key: string) => {
        // @ts-ignore
        this.setState({
            [key]: value,
        });
    };

    private handleConfirmEnterPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && !this.handleCheckButtonDisabled()) {
            event.preventDefault();
            this.sendData(event);
        }
    };

    private handleChangeFullName = (e: string) => {
        this.setState({
            fullName: e,
        });
    };

    private handleChangeDate = (e) => {
        this.setState({
            dateOfBirth: formatDate(e),
        });
    };

    private selectCountry = (option) => {
        this.setState({
            countryOfBirth: countries.getAlpha2Code(option.value, this.props.lang),
        });
    };

    private handleValidateInput = (field: string, value: string): boolean => {
        switch (field) {
            case 'firstName':
                const firstNameRegex = new RegExp(`^[a-zA-Z—-\\s]{1,255}$`);

                return Boolean(value.match(firstNameRegex));
            case 'lastName':
                const lastNameRegex = new RegExp(`^[a-zA-Z—-\\s]{1,255}$`);

                return Boolean(value.match(lastNameRegex));
            case 'residentialAddress':
                const residentialAddressRegex = new RegExp(`^[a-zA-Z0-9-,.;/\\\\\\s]{1,255}$`);

                return Boolean(value.match(residentialAddressRegex));
            case 'city':
                const cityRegex = new RegExp(`^[a-zA-Z]{1,255}$`);

                return Boolean(value.match(cityRegex));
            case 'postcode':
                const postcodeRegex = new RegExp(`^[a-zA-Z0-9]{1,12}$`);

                return Boolean(value.match(postcodeRegex));
            case 'dateOfBirth':
                if (value.length === 10) {
                    return moment(value, 'DD/MM/YYYY').unix() < Date.now() / 1000;
                }

                return false;
            default:
                return true;
        }
    };

    private handleCheckButtonDisabled = () => {
        const { city, dateOfBirth, firstName, lastName, postcode, residentialAddress, countryOfBirth } = this.state;

        const firstNameValid = this.handleValidateInput('firstName', firstName);
        const lastNameValid = this.handleValidateInput('lastName', lastName);
        const residentialAddressValid = this.handleValidateInput('residentialAddress', residentialAddress);
        const cityValid = this.handleValidateInput('city', city);
        const postcodeValid = this.handleValidateInput('postcode', postcode);
        const dateOfBirthValid = this.handleValidateInput('dateOfBirth', dateOfBirth);

        return (
            !firstNameValid ||
            !lastNameValid ||
            !residentialAddressValid ||
            !countryOfBirth ||
            !cityValid ||
            !postcodeValid ||
            !dateOfBirthValid
        );
    };

    private sendData = (event) => {
        event.preventDefault();
        const { labels, user } = this.props;
        const dob = !isDateInFuture(this.state.dateOfBirth) ? this.state.dateOfBirth : '';
        const profileInfo: IdentityData = {
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            dob,
            address: this.state.residentialAddress,
            postcode: this.state.postcode,
            city: this.state.city,
            country: this.state.countryOfBirth,
            confirm: true,
        };
        const isIdentity =
            labels.length && labels.find((w) => w.key === 'profile' && w.value === 'verified' && w.scope === 'private');
        const verifiedProfiles = user.profiles.length ? user.profiles.filter((i) => i.state === 'verified') : [];
        const lastVerifiedProfile = verifiedProfiles.length && verifiedProfiles[verifiedProfiles.length - 1];

        if (!isIdentity && lastVerifiedProfile && lastVerifiedProfile.address) {
            this.props.editIdentity(profileInfo);
        } else {
            this.props.sendIdentity(profileInfo);
        }
    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    editSuccess: selectEditIdentitySuccess(state),
    sendSuccess: selectSendIdentitySuccess(state),
    lang: selectCurrentLanguage(state),
    labels: selectLabelData(state),
    user: selectUserInfo(state),
});

const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> = (dispatch) => ({
    editIdentity: (payload) => dispatch(editIdentity(payload)),
    sendIdentity: (payload) => dispatch(sendIdentity(payload)),
    labelFetch: () => dispatch(labelFetch()),
});

export const KycProfile = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(IdentityComponent) as any; // tslint:disable-line
