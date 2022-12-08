import cx from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useReduxSelector } from '../../../hooks';
import { selectMobileDeviceState } from '../../../modules';
import './Lost2FATimeline.pcss';
import bgImage from '../../../assets/png/background.png';
import { ArrowLeftGradient } from 'src/assets/images/ArrowLeftIcon';
import { InputFile } from '../../components';

interface TimelineElement {
    stepOne;
    stepTwo;
    stepThree;
}

type Props = TimelineElement;

export const Lost2FATimeline: React.FC<Props> = (props: Props): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { formatMessage } = useIntl();
    const { stepOne, stepTwo, stepThree } = props;

    return (
        <React.Fragment>
            <div className="__tabs mb-24">
                <div className="d-flex justify-content-between">
                    <div className="__items">
                        <div className="d-flex align-items-center">
                            <div className={`__number ${stepOne && 'active'}`} id="tabs-icon-one">
                                <p className="mb-0">1</p>
                            </div>
                            <p className="white-text text-xs mb-0">Security Verification</p>
                        </div>
                    </div>
                    <div className="__items">
                        <div className="d-flex align-items-center">
                            <div className={`__number ${stepTwo && 'active'}`} id="tabs-icon-two">
                                <p className="mb-0">2</p>
                            </div>
                            <p className="white-text text-xs mb-0">identity Verification</p>
                        </div>
                    </div>
                    <div className="__items">
                        <div className="d-flex align-items-center">
                            <div className={`__number ${stepThree && 'active'}`} id="tabs-icon-three">
                                <p className="mb-0">3</p>
                            </div>
                            <p className="white-text text-xs mb-0">Done</p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};
