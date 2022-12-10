import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './ModalInternalTransfer.pcss';

export const ModalInternalTransfer: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    const { currency = '' } = useParams<{ currency?: string }>();

    return <React.Fragment></React.Fragment>;
};
