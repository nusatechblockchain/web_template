import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../../../modules/user/profile';
import './RecentDeposit.pcss';
import { useParams, useHistory } from 'react-router-dom';

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
