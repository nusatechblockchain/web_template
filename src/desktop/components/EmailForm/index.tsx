import React, { FormEvent } from 'react';
import { Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CustomInput } from '../CustomInput';
import { EMAIL_REGEX } from '../../../helpers';
import { GeetestCaptchaResponse } from '../../../modules';
import { selectMobileDeviceState } from '../../../modules/public/globalSettings';

export interface EmailFormProps {
    title?: string;
    buttonLabel?: string;
    errorMessage?: string;
    isLoading?: boolean;
    OnSubmit: () => void;
    className?: string;
    emailLabel?: string;
    email: string;
    message: string;
    emailError: string;
    emailFocused: boolean;
    placeholder?: string;
    validateForm: () => void;
    handleInputEmail: (value: string) => void;
    handleFieldFocus: () => void;
    handleReturnBack: () => void;
    captchaType?: 'recaptcha' | 'geetest' | 'none';
    renderCaptcha?: JSX.Element | null;
    reCaptchaSuccess?: boolean;
    geetestCaptchaSuccess?: boolean;
    captcha_response?: string | GeetestCaptchaResponse;
}

export const EmailForm: React.FC<EmailFormProps> = (props) => {
    const isMobileDevice = useSelector(selectMobileDeviceState);

    const {
        title,
        buttonLabel,
        isLoading,
        emailLabel,
        email,
        emailError,
        emailFocused,
        captchaType,
        geetestCaptchaSuccess,
        reCaptchaSuccess,
    } = props;

    const handleSubmitForm = () => {
        props.OnSubmit();
    };

    const isValidForm = () => {
        const isEmailValid = email.match(EMAIL_REGEX);

        return email && isEmailValid;
    };

    const isButtonDisabled = (): boolean => {
        if (isLoading || !email.match(EMAIL_REGEX)) {
            return true;
        }

        if (captchaType === 'recaptcha' && !reCaptchaSuccess) {
            return true;
        }

        if (captchaType === 'geetest' && !geetestCaptchaSuccess) {
            return true;
        }

        return false;
    };

    const handleClick = (e: FormEvent<HTMLInputElement>) => {
        if (e) {
            e.preventDefault();
        }
        if (!isValidForm()) {
            props.validateForm();
        } else {
            handleSubmitForm();
        }
    };

    return (
        <React.Fragment>
            <h3 className="h4 mb-24 title-2 white-text font-semibold">{title || 'Forgot password'}</h3>
            <div className="field">
                <CustomInput
                    type="email"
                    label={emailLabel || 'Email'}
                    placeholder={emailLabel || 'Email'}
                    defaultLabel="Email"
                    handleChangeInput={props.handleInputEmail}
                    inputValue={email}
                    handleFocusInput={props.handleFieldFocus}
                    classNameLabel="form-label white-text text-sm mb-8"
                    classNameInput={`${emailFocused && !email.match(EMAIL_REGEX) && 'error'}`}
                    autoFocus={!isMobileDevice}
                    labelVisible
                />
                {emailError && <div className="invalid-feedback">{emailError}</div>}
            </div>
            {emailFocused && !email.match(EMAIL_REGEX) && (
                <p className="text-xs danger-text m-0 mb-24">Enter a valid email address</p>
            )}
            <div className="mb-24">{props.renderCaptcha}</div>

            <Button
                block={true}
                type="button"
                disabled={isButtonDisabled()}
                onClick={(e) => handleClick(e as any)}
                size="lg"
                className="button registration__button"
                variant="primary">
                {isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Submit'}
            </Button>
        </React.Fragment>
    );
};
