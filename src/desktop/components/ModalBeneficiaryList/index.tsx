import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Modal, ModalAddBeneficiary } from '../../components';
import { Link } from 'react-router-dom';
import { CircleCloseIcon } from '../../../assets/images/CircleCloseIcon';
import './ModalBeneficiaryList.pcss';
import { TrashIcon } from 'src/assets/images/TrashIcon';

export interface ModalBeneficiaryListProps {
    showModalBeneficiaryList: boolean;
    showModalAddBeneficiary: boolean;
}

export const ModalBeneficiaryList: React.FunctionComponent<ModalBeneficiaryListProps> = (props) => {
    const intl = useIntl();
    const history = useHistory();
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(props.showModalBeneficiaryList);
    const [showModalAddBeneficiary, setShowModalAddBeneficiary] = React.useState(props.showModalAddBeneficiary);
    const { currency = '' } = useParams<{ currency?: string }>();

    const renderHeaderBeneficiaryList = () => {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h6 className="text-md font-normal white-text mb-0">Select Form Addres Book</h6>
                    <span
                        onClick={() => setShowModalBeneficiaryList(!showModalBeneficiaryList)}
                        className="cursor-pointer">
                        <CircleCloseIcon />
                    </span>
                </div>
            </React.Fragment>
        );
    };

    const renderContentBeneficiaryList = () => {
        return (
            <React.Fragment>
                <div className="body mb-24">
                    <div className="py-3 px-3 mb-3 dark-bg-main radius-md d-flex justify-content-between">
                        <div className="mr-2">
                            <p className="mb-2 text-sm white-text">Available</p>
                            <p className="mb-2 text-sm white-text">Balance</p>
                        </div>
                        <div className="ml-2">
                            <p className="mb-2 text-sm grey-text text-right">10075.56213968 USDT</p>
                            <p className="mb-2 text-sm grey-text-accent text-right">$10,095.35</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between">
                        <div className="beneficery-address pr-2">
                            <p className="text-ms white-text mb-1">My Address</p>
                            <p className="text-sm grey-text-accent">0x3bb112e9ae6235ccfd67697ee6ad47c428ff75e0</p>
                        </div>
                        <div className="beneficery-name pr-2">
                            <p className="text-ms white-text mb-1">Beneficiary Name</p>
                            <p className="text-sm grey-text-accent">Addesskuuu</p>
                        </div>
                        <div className="beneficery-name pr-2">
                            <p className="text-ms white-text mb-1">Full name</p>
                            <p className="text-sm grey-text-accent">Ini Addresku</p>
                        </div>
                        <button className="btn btn-transparent w-auto cursor-pointer">
                            <TrashIcon />
                        </button>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={() => {
                                setShowModalBeneficiaryList(!showModalBeneficiaryList);
                                setShowModalAddBeneficiary(!showModalAddBeneficiary);
                            }}
                            type="button"
                            className="btn btn-transparent gradient-text font-bold">
                            Add New Address
                        </button>
                    </div>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {showModalBeneficiaryList && (
                <div className="modal-beneficiary-list">
                    <Modal
                        show={showModalBeneficiaryList}
                        header={renderHeaderBeneficiaryList()}
                        content={renderContentBeneficiaryList()}
                    />
                </div>
            )}
            {showModalAddBeneficiary && <ModalAddBeneficiary showModalAddBeneficiary={showModalAddBeneficiary} />}
        </React.Fragment>
    );
};
