import React from 'react';
import { CustomInput, Modal } from '../../components';
import { ModalCloseIcon } from '../../../assets/images/CloseIcon';

export interface ModalTwoFaProps {
    show: boolean;
    onSubmit: () => void;
    closeModal: () => void;
    onChangeValue: (value: string) => void;
    twoFaValue: string;
}

const ModalTwoFaComponent: React.FC<ModalTwoFaProps> = ({ show, onSubmit, closeModal, onChangeValue, twoFaValue }) => {
    // render two fa  modal
    const modalTwoFaContent = () => {
        return (
            <React.Fragment>
                <p className="text-sm grey-text mb-24">
                    To ensure security, withdrawals, P2P transactions, and red envelopes will be temporarily unavailable
                    for 24 hours after changing the security settings.
                </p>
                <div className="form">
                    <div className="form-group mb-24">
                        <CustomInput
                            defaultLabel="two-fa"
                            inputValue={twoFaValue}
                            label="2FA Code"
                            placeholder="______"
                            type="text"
                            labelVisible
                            classNameInput="text-center spacing-10"
                            classNameLabel="white-text text-sm"
                            handleChangeInput={onChangeValue}
                        />
                    </div>
                    <button type="button" className="btn btn-primary btn-block" data-dismiss="modal" onClick={onSubmit}>
                        Next
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const modalTwoFaHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">2FA Verification</h6>
                <ModalCloseIcon className="cursor-pointer" onClick={closeModal} />
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            <Modal content={modalTwoFaContent()} header={modalTwoFaHeader()} show={show} />
        </React.Fragment>
    );
};

export const ModalTwoFa = React.memo(ModalTwoFaComponent);
