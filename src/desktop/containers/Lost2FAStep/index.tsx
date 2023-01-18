import React from 'react';
import { Link } from 'react-router-dom';
import './Lost2FAStep.pcss';

export const Lost2FAStep: React.FC = (): React.ReactElement => {
    return (
        <React.Fragment>
            <div className="tabs-item" id="tabs-three">
                <div className="__three  show">
                    <div className="d-flex justify-content-center mb-24">
                        <img src="/public/img/lost-two-fa.png" alt="lost two fa icon" />
                    </div>
                    <h3 className="white-text text-center mb-24">Please Contact Support Admin</h3>
                    <p className=" grey-text-accent text-center">
                        please contact the heaven exchange admin to find out the procedure for getting your google two
                        factor authentication code back
                    </p>
                    <div className="d-flex justify-content-center">
                        <Link to={'/faq'} className="btn btn-primary btn-sm">
                            Contact Support
                        </Link>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
