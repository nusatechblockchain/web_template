import * as React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import './WalletWithdrawalForm.pcss';
import Select from 'react-select';
import { CustomStylesSelect, CustomInput } from '../../components';
import { selectCurrencies, Currency } from '../../../modules';
import { CirclePlusIcon } from 'src/assets/images/CirclePlusIcon';

export const WalletWithdrawalForm: React.FC = () => {
    const intl = useIntl();
    const history = useHistory();
    const { currency = '' } = useParams<{ currency?: string }>();

    const currencies: Currency[] = useSelector(selectCurrencies);

    const optionCurrency = currencies.map((item) => {
        const customLabel = (
            <Link key={item.id} to={`/wallets/${item.id}/deposit`}>
                <div className="d-flex align-items-center">
                    <img src={item.icon_url} alt="icon" className="mr-12 small-coin-icon" />
                    <div>
                        <p className="m-0 text-sm grey-text-accent">{item.id.toUpperCase()}</p>
                        <p className="m-0 text-xs grey-text-accent">{item.name}</p>
                    </div>
                </div>
            </Link>
        );
        return {
            label: customLabel,
            value: item.id,
        };
    });

    return (
        <React.Fragment>
            <div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Select Coin</p>
                    <div className="w-70">
                        <Select
                            value={optionCurrency.filter(function (option) {
                                return option.value === currency;
                            })}
                            styles={CustomStylesSelect}
                            options={optionCurrency}
                        />
                        {/* <p className="m-0 text-sm grey-text">Min Deposit : {minDepositAmount}</p> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Select Coin</p>
                    <div className="w-70 position-relative input-add-address">
                        <CustomInput
                            type="text"
                            isDisabled={true}
                            label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                            placeholder={''}
                            defaultLabel="New password"
                            inputValue={''}
                            classNameLabel="d-none"
                            classNameInput={`cursor-pointer dark-bg-accent`}
                            autoFocus={false}
                            labelVisible={false}
                        />
                        <span className="position-absolute cursor-pointer">
                            <CirclePlusIcon />
                        </span>
                        {/* <p className="m-0 text-sm grey-text">Min Deposit : {minDepositAmount}</p> */}
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-start select-container mb-24">
                    <p className="text-ms font-extrabold white-text">Add Amount</p>
                    <div className="w-70">
                        <CustomInput
                            type="text"
                            label={intl.formatMessage({ id: 'page.body.profile.header.account.content.password.new' })}
                            placeholder={'Add Amount'}
                            defaultLabel="New password"
                            // handleChangeInput={handleChangeNewPassword}
                            inputValue={''}
                            // handleFocusInput={}
                            classNameLabel="d-none"
                            classNameInput={`dark-bg-accent`}
                            autoFocus={false}
                            labelVisible={false}
                        />
                    </div>
                </div>
                <p className="text-sm grey-text-accent ">
                    Amount available for withdrawal ≤ Account available assets - Unconfirmed digital assets.
                </p>
                <div className="d-flex justify-content-between mb-12">
                    <p className="mb-0 text-ms grey-text-accent">Fee</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">$2</p>
                </div>
                <div className="d-flex justify-content-between mb-24">
                    <p className="mb-0 text-ms grey-text-accent">Total Withdrawal Amount</p>
                    <p className="mb-0 text-ms grey-text-accent font-bold">0.55 BTC</p>
                </div>
                <button className="btn btn-primary btn-block" data-toggle="modal" data-target="#withdraw-confirm">
                    Withdraw
                </button>
            </div>
        </React.Fragment>
    );
};
