import classnames from 'classnames';
import * as React from 'react';
import { useIntl } from 'react-intl';
import { Link, useLocation } from 'react-router-dom';

const FooterComponent: React.FC = () => {
    const { pathname } = useLocation();
    const intl = useIntl();

    return (
        <div className='border-top'>Footer Area</div>
    );
};

export const Footer = React.memo(FooterComponent);
