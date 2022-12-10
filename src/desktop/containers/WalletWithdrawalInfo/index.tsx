import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './WalletWithdrawalInfo.pcss';

export const WalletWithdrawalInfo: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    const { currency = '' } = useParams<{ currency?: string }>();

    return (
        <React.Fragment>
            <div className="cr-wallet-withdraw-info dark-bg-main p-3 radius-md">
                <h6 className="mb-8 font-bold text-md white-text">Note :</h6>
                <p className="mb-1 white-text text-xs">
                    1. The transaction fees will be deducted from the balance with priority or from the withdrawn amount
                    in case of insufficient balance .
                </p>
                <p className="mb-1 white-text text-xs">
                    2. Amount available for withdrawal ≤ Account available assets - Unconfirmed digital assets.
                </p>
                <p className="mb-1 white-text text-xs">
                    3. Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with
                    tokens from such sales
                </p>
            </div>
        </React.Fragment>
    );
};
