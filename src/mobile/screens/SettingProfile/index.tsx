import * as React from 'react';
import { Link } from 'react-router-dom';

import { ArrowLeft } from 'src/mobile/assets/Arrow';

const SettingProfileMobileScreen: React.FC = () => {
    return (
        <>
            {/* ======= Setting Profile Section ================ */}
            <section className="mobile-container no-header dark-bg-main">
                <div className="container-fluid">
                    <h1>Setting</h1>
                </div>
            </section>
            {/* ======= End Setting Profile Section ================ */}
        </>
    );
};

export { SettingProfileMobileScreen };
