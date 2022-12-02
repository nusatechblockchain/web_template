import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '../../../modules';

const noHeaderRoutes = ['/setup'];

const HeaderComponent: React.FC = () => {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const intl = useIntl();
    const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

    if (!shouldRenderHeader) {
        return <React.Fragment />;
    }

    return (
        <div className="Header border-bottom">
            Header Area           
        </div>
    );
};

export const Header = React.memo(HeaderComponent);
