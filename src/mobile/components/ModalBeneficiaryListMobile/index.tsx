import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';

import {
    selectCurrencies,
    selectBeneficiaries,
    Beneficiary,
    Currency,
    BlockchainCurrencies,
    selectWallets,
    Wallet,
    beneficiariesDelete,
    selectBeneficiariesDeleteSuccess,
} from '../../../modules';
import { CircleCloseIcon } from 'src/assets/images/CircleCloseIcon';
import { TrashIcon } from 'src/assets/images/TrashIcon';
import './ModalBeneficiaryListMobile.pcss';
import { ModalMobile } from '../Modal';

export interface ModalBeneficiaryListMobileProps {
    showModalBeneficiaryList: boolean;
    showModalAddBeneficiary?: boolean;
    blockchainKey?: string;
    onCloseList: () => void;
    onCloseAdd: () => void;
    handleAddAddress: () => void;
    beneficiaryId?: string;
    handleChangeBeneficiaryId?: (id: number, address: string, blockchainKey: string) => void;
}

export const ModalBeneficiaryListMobile: React.FC<ModalBeneficiaryListMobileProps> = (props) => {
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(props.showModalBeneficiaryList);
    const dispatch = useDispatch();
    const { currency = '' } = useParams<{ currency?: string }>();

    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);
    const beneficiariesList = beneficiaries.filter((item) => item.currency === currency);

    const handleDeleteAddress = React.useCallback(
        (item: Beneficiary) => () => {
            dispatch(beneficiariesDelete({ id: item.id }));
        },
        []
    );

    const renderHeaderBeneficiaryListMobile = () => {
        return (
            <React.Fragment>
                <div className="">
                    <span onClick={() => props.onCloseList()} className="cursor-pointer white-text ">
                        close
                    </span>
                    <h5 className="font-normal white-text mt-4">Select Form Address Book</h5>
                </div>
            </React.Fragment>
        );
    };

    const renderContentBeneficiaryListMobile = () => {
        return (
            <>
                <div className="mb-2">
                    {!beneficiariesList[0] ? (
                        <span className="white-text text-center">No Address yet</span>
                    ) : (
                        beneficiariesList.map((item, i) => (
                            <div
                                onClick={() =>
                                    props.handleChangeBeneficiaryId(item.id, item.data.address, item.blockchain_key)
                                }
                                className="my-4 p-2 content-list-mobile"
                                key={i}>
                                <div className="d-flex justify-content-between mb-3">
                                    <h6 className="white-text">{item && item.name}</h6>
                                    <div onClick={handleDeleteAddress(item)} className="text-danger cursor-pointer">
                                        <TrashIcon />
                                    </div>
                                </div>
                                <div className="d-flex ">
                                    <span className="white-text text-sm font-light">Address : </span>
                                    <span className="white-text text-xs ml-2">
                                        {item && item.data && item.data.address}
                                    </span>
                                </div>
                                <div className="d-flex">
                                    <span className="white-text text-sm font-light">
                                        Status <span className="ml-2">:</span>
                                    </span>
                                    <span
                                        className={`ml-2 ${
                                            item && item.state === 'pending'
                                                ? 'warning-text'
                                                : item && item.state === 'active'
                                                ? 'contrast-text'
                                                : 'danger-text'
                                        }`}>
                                        {item && item.state === 'pending'
                                            ? 'Pending'
                                            : item && item.state === 'active'
                                            ? 'Active'
                                            : 'Unactive'}
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </>
        );
    };

    return (
        <>
            {showModalBeneficiaryList && (
                <div className="modal-benericary-list-mobile">
                    <ModalMobile
                        show={showModalBeneficiaryList}
                        header={renderHeaderBeneficiaryListMobile()}
                        content={renderContentBeneficiaryListMobile()}
                    />
                </div>
            )}
        </>
    );
};
