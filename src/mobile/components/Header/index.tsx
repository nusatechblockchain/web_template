import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '../../../modules';
import { LogoIcon } from '../../assets/Logo';
import { ScanIcon } from '../../assets/ScanIcon';
import { SearchIcon } from '../../assets/SearchIcon';
import { UserIcon } from '../../assets/UserIcon';

const noHeaderRoutes = ['/setup'];

const HeaderComponent: React.FC = () => {
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const intl = useIntl();
    const shouldRenderHeader = !noHeaderRoutes.some((r) => location.pathname.includes(r));

    if (!shouldRenderHeader) {
        return <React.Fragment />;
    }

    return (
        <nav className="navbar-mobile fixed-top px-24 py-3 dark-bg-main">
            <a className="navbar-brand">
                <LogoIcon className={''} />
            </a>
            <div className="menu">
                <ScanIcon className={'mr-2'} />
                <SearchIcon className={'mr-2'} />
                <UserIcon className={'cursor-pointer'} />
            </div>
        </nav>
    );
};

export const Header = React.memo(HeaderComponent);
