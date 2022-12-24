import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Modal, ModalAddBeneficiary } from '../../components';
import { CircleCloseIcon } from '../../../assets/images/CircleCloseIcon';
import { selectCurrencies, selectBeneficiaries, Beneficiary, Currency, BlockchainCurrencies } from '../../../modules';
import './ModalBeneficiaryList.pcss';
import { TrashIcon } from 'src/assets/images/TrashIcon';

export interface ModalBeneficiaryListProps {
    showModalBeneficiaryList: boolean;
    showModalAddBeneficiary?: boolean;
    blockchainKey?: string;
    onClose: () => void;
}

export const ModalBeneficiaryList: React.FunctionComponent<ModalBeneficiaryListProps> = (props) => {
    const [showModalBeneficiaryList, setShowModalBeneficiaryList] = React.useState(props.showModalBeneficiaryList);
    const [showModalAddBeneficiary, setShowModalAddBeneficiary] = React.useState(props.showModalAddBeneficiary);
    const { currency = '' } = useParams<{ currency?: string }>();

    const currencies = useSelector(selectCurrencies);
    const beneficiaries: Beneficiary[] = useSelector(selectBeneficiaries);
    const currencyItem: Currency = currencies.find((item) => item.id === currency);
    const blockchainItem: BlockchainCurrencies = currencyItem?.networks.find(
        (item) => item.blockchain_key === props.blockchainKey
    );
    const estimatedValueFee = +currencyItem?.price * +blockchainItem?.withdraw_fee;
    console.log(beneficiaries, 'ini benefi');

    const renderHeaderBeneficiaryList = () => {
        return (
            <React.Fragment>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h6 className="text-md font-normal white-text mb-0">Select Form Addres Book</h6>
                    <span onClick={props.onClose} className="cursor-pointer">
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

                    <table>
                        <thead>
                            <th className="text-ms white-text mb-1 pr-2">My address</th>
                            <th className="text-ms white-text mb-1 pr-2">Beneficiary Name</th>
                            <th className="text-ms white-text mb-1 pr-2">Full Name</th>
                            <th></th>
                        </thead>
                        <tbody>
                            {!beneficiaries[0] ? (
                                <tr>
                                    <td rowSpan={4}>No address yet</td>
                                </tr>
                            ) : (
                                beneficiaries.map((el, i) => (
                                    <tr key={i}>
                                        <td className="text-sm grey-text-accent pr-2">
                                            {el && el.data && el.data.address}
                                        </td>
                                        <td className="text-sm grey-text-accent pr-2">{el && el.name}</td>
                                        <td className="text-sm grey-text-accent pr-2">{el && el.name}</td>
                                        <button className="btn btn-transparent w-auto cursor-pointer">
                                            <TrashIcon />
                                        </button>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={() => {
                                setShowModalBeneficiaryList(false);
                                setShowModalAddBeneficiary(true);
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
            {showModalAddBeneficiary && (
                <ModalAddBeneficiary
                    onClose={() => setShowModalAddBeneficiary(false)}
                    showModalAddBeneficiary={showModalAddBeneficiary}
                />
            )}
        </React.Fragment>
    );
};
