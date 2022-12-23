import React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import './Lost2FATimeline.pcss';

interface TimelineElement {
    stepOneActive: boolean;
    stepTwoActive: boolean;
    stepThreeActive: boolean;
}

type Props = TimelineElement;

export const Lost2FATimeline: React.FC<Props> = (props: Props): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { formatMessage } = useIntl();
    const { stepOneActive, stepTwoActive, stepThreeActive } = props;

    return (
        <React.Fragment>
            <div className="__tabs mb-24">
                <div className="d-flex justify-content-between">
                    <div className="__items">
                        <div className="d-flex align-items-center">
                            <div className={`__number ${stepOneActive && 'active'}`} id="tabs-icon-one">
                                <p className="mb-0">1</p>
                            </div>
                            <p className={`text-xs mb-0 ${stepOneActive ? 'gradient-text' : 'white-text'}`}>
                                Security Verification
                            </p>
                        </div>
                    </div>
                    <div className="__items">
                        <div className="d-flex align-items-center">
                            <div className={`__number ${stepTwoActive && 'active'}`} id="tabs-icon-two">
                                <p className="mb-0">2</p>
                            </div>
                            <p className={`text-xs mb-0 ${stepTwoActive ? 'gradient-text' : 'white-text'}`}>
                                identity Verification
                            </p>
                        </div>
                    </div>
                    <div className="__items">
                        <div className="d-flex align-items-center">
                            <div className={`__number ${stepThreeActive && 'active'}`} id="tabs-icon-three">
                                <p className="mb-0">3</p>
                            </div>
                            <p className={`text-xs mb-0 ${stepThreeActive ? 'gradient-text' : 'white-text'}`}>Done</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
