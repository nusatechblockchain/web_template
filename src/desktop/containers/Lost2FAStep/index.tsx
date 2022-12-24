import React from 'react';
import './Lost2FAStep.pcss';
import lostImg from '../../../../public/img/lost-two-fa.svg';

export const Lost2FAStep: React.FC = (): React.ReactElement => {
    return (
        <React.Fragment>
            <div className="tabs-item" id="tabs-three">
                <div className="__three  show">
                    <div className="d-flex justify-content-center mb-24">
                        <img src={lostImg} alt="lost two fa icon" />
                    </div>
                    <h3 className="white-text text-center mb-24">Please Contact Support Admin</h3>
                    <p className=" grey-text-accent text-center">
                        Please contact the heaven exchange admin contact and report that you have lost the two fa code
                        then you will be assisted to get it back
                    </p>
                </div>
            </div>
        </React.Fragment>
    );
};
