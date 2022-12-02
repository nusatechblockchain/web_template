import * as React from 'react';
import { Button } from 'react-bootstrap';
import { CodeVerification } from '../../components';

export interface TwoFactorAuthProps {
    isMobile?: boolean;
    isLoading?: boolean;
    onSubmit: () => void;
    title: string;
    buttonLabel: string;
    message: string;
    otpCode: string;
    handleOtpCodeChange: (otp: string) => void;
    handleClose2fa: () => void;
}

export const TwoFactorAuthComponent: React.FC<TwoFactorAuthProps> = ({
    isMobile,
    isLoading,
    title,
    message,
    otpCode,
    buttonLabel,
    onSubmit,
    handleOtpCodeChange,
    handleClose2fa,
}) => {
    const handleEnterPress = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === 'Enter' && otpCode.length >= 6) {
                event.preventDefault();
                onSubmit();
            }
        },
        [onSubmit, otpCode]
    );

    return (
        <form>
            <div>{message}</div>
            <CodeVerification
                code={otpCode}
                onChange={handleOtpCodeChange}
                onSubmit={handleEnterPress}
                codeLength={6}
                type="text"
                placeholder="X"
                inputMode="decimal"
                showPaste2FA={true}
                isMobile={isMobile}
            />
            <Button
                disabled={isLoading || otpCode.length < 6}
                onClick={onSubmit}
                size="lg"
                variant="primary">
                {isLoading ? 'Loading...' : buttonLabel ? buttonLabel : 'Sign in'}
            </Button>
        </form>
    );
};

export const TwoFactorAuth = React.memo(TwoFactorAuthComponent);
