import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './ModalAddBeneficiary.pcss';
import { CircleCloseIcon } from 'src/assets/images/CircleCloseIcon';
import { Modal, CustomInput } from '..';
import { Tabs, Tab } from 'react-bootstrap';

export interface ModalAddBeneficiaryProps {
    showModalAddBeneficiary: boolean;
}

export const ModalAddBeneficiary: React.FunctionComponent<ModalAddBeneficiaryProps> = (props) => {
    const intl = useIntl();
    const history = useHistory();
    const [showModalAddBeneficiary, setShowModalAddBeneficiary] = React.useState(props.showModalAddBeneficiary);
    const { currency = '' } = useParams<{ currency?: string }>();

    const renderHeaderModalAddBeneficiary = () => {
        return (
            <React.Fragment>
                <div
                    className="com-modal-add-beneficiary-header
                 d-flex justify-content-between align-items-center w-100">
                    <h6 className="text-xl font-bold white-text mb-0">Withdraw Crypto</h6>
                    <span
                        onClick={() => setShowModalAddBeneficiary(!showModalAddBeneficiary)}
                        className="cursor-pointer">
                        <CircleCloseIcon />
                    </span>
                </div>
            </React.Fragment>
        );
    };

    const renderContentModalAddBeneficiary = () => {
        return (
            <React.Fragment>
                <div className="com-modal-add-beneficiary-content mb-24">
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
                    </div>
                    <Tabs defaultActiveKey="standart" id="uncontrolled-tab-example" className="mb-3">
                        <Tab eventKey="standart" title="Standart Address" className="br-1">
                            <form action="">
                                <div>
                                    <CustomInput
                                        type="text"
                                        label={'Blockchain Address'}
                                        placeholder={'Input Address'}
                                        defaultLabel={'Blockchain Address'}
                                        // handleChangeInput={handleChangeNewPassword}
                                        inputValue={''}
                                        // handleFocusInput={}
                                        classNameLabel="text-ms white-text mb-8"
                                        classNameInput={``}
                                        autoFocus={false}
                                        labelVisible
                                    />
                                    <p className="mb-16 text-xs grey-text ">
                                        Do not send Tether USD unless you are certain the destination supports TRC-20
                                        transactions. If it does not, you could permanently lose access to your coins.
                                    </p>
                                </div>
                                <div>
                                    <CustomInput
                                        type="text"
                                        label={'Beneficiary Name'}
                                        placeholder={'Input Name'}
                                        defaultLabel={'Beneficiary Name'}
                                        // handleChangeInput={handleChangeNewPassword}
                                        inputValue={''}
                                        // handleFocusInput={}
                                        classNameLabel="text-ms white-text mb-8"
                                        classNameInput={``}
                                        autoFocus={false}
                                        labelVisible
                                    />
                                </div>
                                <div>
                                    <CustomInput
                                        type="textarea"
                                        label={'Description (Optional)'}
                                        placeholder={'Input Description'}
                                        defaultLabel={'Description (Optional)'}
                                        // handleChangeInput={handleChangeNewPassword}
                                        inputValue={''}
                                        // handleFocusInput={}
                                        classNameLabel="text-ms white-text mb-8"
                                        classNameInput={``}
                                        autoFocus={false}
                                        labelVisible
                                    />
                                </div>

                                <button type="button" className="btn btn-primary btn-block">
                                    Save Address
                                </button>
                            </form>
                        </Tab>
                        <Tab eventKey="private" title="Private Address">
                            <form action="">
                                <div>
                                    <CustomInput
                                        type="text"
                                        label={'Blockchain Address'}
                                        placeholder={'Input Address'}
                                        defaultLabel={'Blockchain Address'}
                                        // handleChangeInput={handleChangeNewPassword}
                                        inputValue={''}
                                        // handleFocusInput={}
                                        classNameLabel="text-ms white-text mb-8"
                                        classNameInput={``}
                                        autoFocus={false}
                                        labelVisible
                                    />
                                    <p className="mb-16 text-xs grey-text ">
                                        Do not send Tether USD unless you are certain the destination supports TRC-20
                                        transactions. If it does not, you could permanently lose access to your coins.
                                    </p>
                                </div>
                                <div>
                                    <CustomInput
                                        type="text"
                                        label={'Beneficiary Name'}
                                        placeholder={'Input Name'}
                                        defaultLabel={'Beneficiary Name'}
                                        // handleChangeInput={handleChangeNewPassword}
                                        inputValue={''}
                                        // handleFocusInput={}
                                        classNameLabel="text-ms white-text mb-8"
                                        classNameInput={``}
                                        autoFocus={false}
                                        labelVisible
                                    />
                                </div>
                                <div>
                                    <CustomInput
                                        type="textarea"
                                        label={'Description (Optional)'}
                                        placeholder={'Input Description'}
                                        defaultLabel={'Description (Optional)'}
                                        // handleChangeInput={handleChangeNewPassword}
                                        inputValue={''}
                                        // handleFocusInput={}
                                        classNameLabel="text-ms white-text mb-8"
                                        classNameInput={``}
                                        autoFocus={false}
                                        labelVisible
                                    />
                                </div>

                                <button type="button" className="btn btn-primary btn-block">
                                    Save Address
                                </button>
                            </form>
                        </Tab>
                    </Tabs>
                </div>
            </React.Fragment>
        );
    };

    return (
        <React.Fragment>
            {showModalAddBeneficiary && (
                <Modal
                    show={showModalAddBeneficiary}
                    header={renderHeaderModalAddBeneficiary()}
                    content={renderContentModalAddBeneficiary()}
                />
            )}
        </React.Fragment>
    );
};
