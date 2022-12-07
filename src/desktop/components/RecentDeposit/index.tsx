import React, { useState, useEffect, useMemo } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyInfo } from '../';
import { DepositCrypto } from '../DepositCrypto';
import { selectUserInfo } from '../../../modules/user/profile';
import { Currency, selectCurrencies, walletsAddressFetch } from '../../../modules';
import './RecentDeposit.pcss';
import { Link, useParams, useHistory } from 'react-router-dom';

const RecentDeposit = (props) => {
    const { wallet } = props;
    const intl = useIntl();
    const { currency = '' } = useParams<{ currency?: string }>();
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector(selectUserInfo);

    const renderDeposit = () => {
        return <React.Fragment></React.Fragment>;
    };
};

export { RecentDeposit };
