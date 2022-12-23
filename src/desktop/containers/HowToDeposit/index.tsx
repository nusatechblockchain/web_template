import * as React from 'react';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import { useWalletsFetch } from '../../../hooks';
import './HowToDeposit.pcss';

const HowToDeposit: React.FC = () => {
    useWalletsFetch();

    return (
        <React.Fragment>
            <div className="dark-bg-accent d-inline-block">
                <h1 className="mb-24 text-lg white-text">How to Deposit</h1>
                <div className="timeline-container">
                    <div className="timeline pr-3">
                        <div className="timeline-item">
                            <div className="rounded pl-0">
                                <div className="bg-blue">1</div>
                            </div>
                            <h6 className="text-sm white-text font-normal">Copy Address</h6>
                            <p className="text-xs grey-text-accent font-normal">
                                Choose the crypto and its network on this page, and copy the deposit address
                            </p>
                        </div>
                        <div className="timeline-item">
                            <div className="rounded">
                                <div className="bg-blue">2</div>
                            </div>
                            <h6 className="text-sm white-text font-normal">Initiate a Withdrawal</h6>
                            <p className="text-xs grey-text-accent font-normal">
                                Initiate a withdrawal on the withdrawal platform.
                            </p>
                        </div>
                        <div className="timeline-item">
                            <div className="rounded">
                                <div className="bg-blue">3</div>
                            </div>
                            <h6 className="text-sm white-text font-normal">Network Confirmation</h6>
                            <p className="text-xs grey-text-accent font-normal">
                                Wait for the blockchain network to confirm your transfer.
                            </p>
                        </div>
                        <div className="timeline-item">
                            <div className="rounded pl-0">
                                <div className="bg-blue">4</div>
                            </div>
                            <h6 className="text-sm white-text font-normal">Deposit Success</h6>
                            <p className="text-xs grey-text-accent font-normal">
                                After the network confirmation,we will credit the crypto for you.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export { HowToDeposit };
