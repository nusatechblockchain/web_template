import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrencies } from 'src/modules';
import { Link } from 'react-router-dom';
import { BtcIcon } from 'src/assets/images/CoinIcon';
import { CustomInput } from 'src/desktop/components';
import './MarketDetailCalculator.pcss';

export const MarketDetailCalculator: FC = (): ReactElement => {
    const currencies = useSelector(selectCurrencies);

    return (
        <React.Fragment>
            <form className="cr-market-detail-calculator dark-bg-main w-100">
                <h1 className="text-lg white-text mb-18">BTC Calculator</h1>
                <div className="calculator-wrapper dark-bg-accent w-100 mb-24 d-flex align-items-center">
                    <div>
                        <CustomInput
                            type="text"
                            label={'Buy'}
                            placeholder={'0.0000000'}
                            defaultLabel={'Buy'}
                            // handleChangeInput={}
                            inputValue={''}
                            // handleFocusInput={}
                            classNameLabel="text-sm grey-text-accent mb-8"
                            classNameInput={`dark-bg-accent calculator-wrapper__input p-0 m-0`}
                            classNameGroup={`m-0`}
                            autoFocus={false}
                            labelVisible
                        />
                    </div>
                    <span>
                        <BtcIcon className="calculator-wrapper__icon" />
                    </span>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-24 grey-text-accent text-ms font-bold">
                    <p className="m-0">Price</p>
                    <p className="m-0">USD $ 0</p>
                </div>
                <button className="btn-primary w-100">Trade Now</button>
            </form>
        </React.Fragment>
    );
};
