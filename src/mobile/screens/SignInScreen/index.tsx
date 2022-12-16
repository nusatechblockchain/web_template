import * as React from 'react';
import { useSelector } from 'react-redux';
import { selectSignInRequire2FA } from '../../../modules/user/auth';
import { SignInMobile, TwoFaAuthenticationMobile } from '../../containers';

const SignInMobileScreen: React.FC = () => {
    const require2FA = useSelector(selectSignInRequire2FA);

    return (
        <React.Fragment>
            <div className="mobile-container no-header dark-bg-main">
                {require2FA ? <TwoFaAuthenticationMobile /> : <SignInMobile />}
            </div>
        </React.Fragment>
    );
};

export { SignInMobileScreen };
