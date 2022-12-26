import React, { FC, ReactElement, useState, useEffect } from 'react';
import { ProfileAuthDetails } from '../../containers';
import { useDocumentTitle } from 'src/hooks';
import { Link, useHistory } from 'react-router-dom';
import { Notification } from '../../../assets/images/Notification';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import {
    ApiProfileIcon,
    EmailProfileIcon,
    GoogleProfileIcon,
    KycProfileIcon,
    PhoneProfileIcon,
    SecurityProfileIcon,
    CheckIcon,
    SearchIcon,
    DocsIcon,
    SearchCoinIcon,
    SearchDepositIcon,
    SearchOrderIcon,
    SearchTradeIcon,
    SearchWithdrawIcon,
} from '../../../assets/images/ProfileIcon';
import { BtcIcon } from '../../../assets/images/CoinIcon';
import { ProfileDeviceTable } from '../../containers';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectUserInfo,
    toggle2faFetch,
    selectVerifyPhoneSuccess,
    sendCode,
    resendCode,
    verifyPhone,
} from '../../../modules';
import { selectApiKeys } from 'src/modules/user/apiKeys/selectors';
import { Modal, CustomInput } from '../../components';
import { ModalCloseIcon } from '../../../assets/images/CloseIcon';
import moment from 'moment';
import bgProfile from '../../../../public/img/background-landing.png';

export const ProfileScreen: FC = (): ReactElement => {
    useDocumentTitle('Profile');
    const user = useSelector(selectUserInfo);
    const apiKeys = useSelector(selectApiKeys);

    const verifyPhoneSuccess = useSelector(selectVerifyPhoneSuccess);
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModal2FaGoogle, setShowModal2FAGoogle] = useState(false);
    const [showModalChangePhone, setShowModalChangePhone] = useState(false);
    const [twoFaGoogleValue, settwoFaGoogleValue] = useState('');
    const [newPhoneValue, setNewPhoneValue] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [isChangeNumber, setIsChangeNumber] = useState(false);
    const [resendCodeActive, setResendCodeActive] = useState(false);

    const [seconds, setSeconds] = useState(30000);
    const [timerActive, setTimerActive] = useState(false);

    useEffect(() => {
        let timer = null;
        if (timerActive) {
            timer = setInterval(() => {
                setSeconds((seconds) => seconds - 1000);

                if (seconds === 0) {
                    setTimerActive(false);
                    setSeconds(30000);
                }
            }, 1000);
        }
        return () => {
            clearInterval(timer);
        };
    });

    const phone = user.phones.slice(-1);

    const handleFetchTwoFaPhone = async () => {
        user.otp ? setShowModalChangePhone(!showModalChangePhone) : history.push('/two-fa-activation');
    };

    const handleSendCodePhone = () => {
        if (user.phones[0] && !isChangeNumber) {
            dispatch(resendCode({ phone_number: `+${phone[0].number}` }));
            setTimerActive(true);
            setResendCodeActive(true);
        } else {
            dispatch(sendCode({ phone_number: newPhoneValue }));
            setTimerActive(true);
            setResendCodeActive(true);
        }
    };

    const handleChangePhone = () => {
        if (user.phones[0] && !isChangeNumber) {
            dispatch(verifyPhone({ phone_number: `+${phone[0].number}`, verification_code: verificationCode }));
        } else {
            dispatch(verifyPhone({ phone_number: newPhoneValue, verification_code: verificationCode }));
        }
    };

    const handleFetchTwoFaGoogle = () => {
        user.otp ? setShowModal2FAGoogle(!showModal2FaGoogle) : history.push('/two-fa-activation');
    };

    const handleDisableTwoFactor = async () => {
        await dispatch(toggle2faFetch({ code: twoFaGoogleValue, enable: false }));
        setShowModal2FAGoogle(!showModal2FaGoogle);
    };

    const disabledButton = () => {
        if (phone[0] && !isChangeNumber) {
            return false;
        }

        if (newPhoneValue === '') {
            return true;
        }

        if (timerActive) {
            return true;
        }
    };

    // Render phone modal
    const modalPhoneContent = () => {
        return (
            <React.Fragment>
                <p className="text-sm grey-text mb-8">
                    {!user.phones[0] ? (
                        'Set Your Phone Number And Verified'
                    ) : user.phones[0].validated_at === null && !isChangeNumber ? (
                        'You already add phone number, please verify by click send code button to get OTP number'
                    ) : user.phones[0] && isChangeNumber ? (
                        <p className="danger-text">
                            You only have {5 - user.phones.length} chances to change your phone number
                        </p>
                    ) : (
                        'Set Your New Phone Number And Verified'
                    )}
                </p>
                {user.phones[0] && !isChangeNumber && (
                    <p className="text-sm grey-text mb-24">{phone[0] && phone[0].number && `+ ${phone[0].number}`}</p>
                )}

                <div className="form">
                    {(isChangeNumber || !user.phones[0]) && (
                        <div className="form-group mb-24">
                            <CustomInput
                                defaultLabel={`${!user.phones[0] ? '' : 'New'} Phone Number`}
                                inputValue={newPhoneValue}
                                label={`${!user.phones[0] ? '' : 'New'} Phone Number`}
                                placeholder="+6281902912921"
                                type="text"
                                labelVisible
                                classNameLabel="white-text text-sm"
                                handleChangeInput={(e) => setNewPhoneValue(e)}
                            />
                        </div>
                    )}

                    <div className="form-group mb-24">
                        <label className="white-text text-sm">Verification Code</label>
                        <div className="d-flex align-items-center">
                            <CustomInput
                                defaultLabel=""
                                inputValue={verificationCode}
                                label=""
                                placeholder="_____"
                                type="text"
                                labelVisible={false}
                                classNameLabel="d-none"
                                classNameInput="spacing-10"
                                classNameGroup="mb-0 w-100"
                                handleChangeInput={(e) => setVerificationCode(e)}
                            />
                            <button
                                disabled={disabledButton()}
                                onClick={handleSendCodePhone}
                                className="btn btn-primary ml-2 text-nowrap">
                                {(!isChangeNumber && phone[0]) || resendCodeActive ? 'Resend Code' : 'Send Code'}
                            </button>
                        </div>

                        <p className={`text-right text-xs cursor-pointer ${timerActive ? 'white-text' : 'grey-text'}`}>
                            {moment(seconds).format('mm:ss')}
                        </p>

                        {(!isChangeNumber || !user.phones[0]) && (
                            <p
                                onClick={() => {
                                    setIsChangeNumber(true);
                                    setTimerActive(false);
                                }}
                                className="text-right white-text text-xs cursor-pointer">
                                Change Phone
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={newPhoneValue === '' && verificationCode === '' ? true : false}
                        onClick={handleChangePhone}
                        className="btn btn-primary btn-block"
                        data-toggle="modal"
                        data-target="#change-phone"
                        data-dismiss="modal">
                        {!user.phones[0]
                            ? 'Add'
                            : user.phones[0].validated_at === null && !isChangeNumber
                            ? 'Veify'
                            : 'Change'}
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const modalPhoneHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">
                    {!user.phones[0]
                        ? 'Add Phone Number'
                        : user.phones[0].validated_at === null && !isChangeNumber
                        ? 'Veirify Phone Number'
                        : user.phones[0] && isChangeNumber
                        ? 'Change Phone Number'
                        : ''}
                </h6>
                <ModalCloseIcon
                    className="cursor-pointer ml-4"
                    onClick={() => {
                        setShowModalChangePhone(false);
                        setIsChangeNumber(false);
                    }}
                />
            </React.Fragment>
        );
    };

    // modal google two fa
    const modalTwoFaGoogleContent = () => {
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
                            inputValue={twoFaGoogleValue}
                            label="2FA Code"
                            placeholder="______"
                            type="text"
                            labelVisible
                            classNameInput="text-center spacing-10"
                            classNameLabel="white-text text-sm"
                            handleChangeInput={(e) => settwoFaGoogleValue(e)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        data-dismiss="modal"
                        onClick={handleDisableTwoFactor}>
                        Disable
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const modalTwoFaGoogleHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">2FA Verification</h6>
                <ModalCloseIcon className="cursor-pointer" onClick={() => setShowModal2FAGoogle(false)} />
            </React.Fragment>
        );
    };

    const renderKycStatus = () => {
        const kycData = user.profiles.length;
        if (kycData > 0) {
            const kycStatus = user.profiles[0].state;
            switch (kycStatus) {
                case '':
                    return <span className="d-block p-1 danger-text text-xs font-normal ">Disable</span>;
                    break;
                case 'submitted':
                    return <span className="d-block p-1 grey-text text-xs font-normal ">Profile Pending</span>;
                    break;
                case 'verified':
                    return <span className="d-block p-1 contrast-text text-xs font-normal ">Profile Verivied</span>;
                    break;
            }
        } else {
            return <span className="d-block p-1 danger-text text-xs font-normal ">Unverivied</span>;
        }
    };

    return (
        <React.Fragment>
            <div className="profile-screen">
                <div className="content-wrapper dark-bg-accent pb-5" style={{ backgroundImage: `url(${bgProfile})` }}>
                    <ProfileAuthDetails />

                    <div className="profile-menu px-24">
                        <div className="row">
                            <div className="col-6 col-lg-8">
                                <div className="notification-warning alert show text-ms white-text font-normal position-relative mb-24">
                                    <Notification className="mr-2" />
                                    Complete your identity verify to start trading with heaven exchange
                                    <div className="close-icon">
                                        <CloseIcon fill="#F2F0FF" className="ml-2" />
                                    </div>
                                </div>
                                <div className="main-menu">
                                    <div className="menu-item py-24 mb-4">
                                        <Link to={'/change-email'}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <EmailProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text">Email</p>
                                                    <span className="d-block text-xs grey-text-accent font-normal ">
                                                        {user.email}
                                                    </span>
                                                    <span className="text-xs grey-text font-normal">Change</span>
                                                </div>
                                                <div className="check">
                                                    <CheckIcon />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="menu-item py-24 mb-4">
                                        <Link to={'/profile/kyc'}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <KycProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text">
                                                        KYC Verification
                                                    </p>

                                                    {renderKycStatus()}
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="menu-item py-24 mb-4">
                                        <button className="btn-transparent" onClick={handleFetchTwoFaPhone}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <PhoneProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text text-left">
                                                        Phone
                                                    </p>
                                                    <span className="d-block text-xs grey-text-accent font-normal ">
                                                        {phone[0] && phone[0].number && `+ ${phone[0].number}`}
                                                    </span>
                                                    <span
                                                        className={`d-block text-left text-xs  font-normal ${
                                                            !user.phones[0] ||
                                                            (user.phones &&
                                                                user.phones[0] &&
                                                                user.phones[0].validated_at === null)
                                                                ? 'danger-text'
                                                                : 'contrast-text'
                                                        }`}>
                                                        {!user.phones[0] ||
                                                        (user.phones &&
                                                            user.phones[0] &&
                                                            user.phones[0].validated_at === null)
                                                            ? 'Unverified'
                                                            : 'Verified'}
                                                    </span>
                                                </div>
                                                {user.phones && user.phones[0] && user.phones[0].validated_at !== null && (
                                                    <div className="check">
                                                        <CheckIcon />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                    <div className="menu-item py-24 mb-4">
                                        <Link to={'/profile/security'}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <SecurityProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text">Security</p>
                                                    <span className="d-block text-left text-xs contrast-text font-normal ">
                                                        Disabled
                                                    </span>
                                                </div>
                                                <div className="check">
                                                    <CheckIcon />
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="menu-item py-24 mb-4">
                                        <button className="btn-transparent" onClick={handleFetchTwoFaGoogle}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <GoogleProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text">Google Auth</p>
                                                    <span
                                                        id="two-fa-text"
                                                        className={`d-block text-left text-xs font-normal ${
                                                            user.otp ? 'contrast-text' : 'danger-text'
                                                        }`}>
                                                        {user.otp ? 'Enabled' : 'Disabled'}
                                                    </span>
                                                </div>
                                                {user.otp && (
                                                    <div className="check">
                                                        <CheckIcon />
                                                    </div>
                                                )}
                                            </div>
                                        </button>
                                    </div>
                                    <div className="menu-item py-24 mb-4">
                                        <Link to={'/profile/api-key'}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <ApiProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text">API</p>
                                                    <span className="d-block text-xs grey-text font-normal ">
                                                        {apiKeys && apiKeys.length} API enabled
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-6 col-lg-4">
                                <div className="explore position-relative">
                                    <h6 className="text-ms white-text font-semibold mb-3">Explore</h6>
                                    <div className="form mb-24">
                                        <div className="form-group mb-0 position-relative">
                                            <input
                                                type="text"
                                                className="form-control input-search"
                                                id="search"
                                                placeholder="Coin, Announcement, Funcion"
                                            />
                                            <div className="search-icon">
                                                <SearchIcon />
                                            </div>
                                        </div>
                                    </div>
                                    <div id="search-menu" className="search-wrap hidden">
                                        <div className="d-flex justify-content-center flex-wrap">
                                            <div className="menu">
                                                <div className="mr-1">
                                                    <SearchCoinIcon />
                                                </div>
                                                <span className="white-text font-normal text-sm">Coins</span>
                                            </div>
                                            <div className="menu">
                                                <div className="mr-1">
                                                    <SearchOrderIcon />
                                                </div>
                                                <span className="white-text font-normal text-sm">Orders</span>
                                            </div>
                                            <div className="menu">
                                                <div className="mr-1">
                                                    <SearchDepositIcon />
                                                </div>
                                                <span className="white-text font-normal text-sm">Deposit</span>
                                            </div>
                                            <div className="menu">
                                                <div className="mr-1">
                                                    <SearchWithdrawIcon />
                                                </div>
                                                <span className="white-text font-normal text-sm">Withdraw</span>
                                            </div>
                                            <div className="menu">
                                                <div className="mr-1">
                                                    <SearchTradeIcon />
                                                </div>
                                                <span className="white-text font-normal text-sm">Trade</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div id="search-market" className="search-wrap hidden">
                                        <nav>
                                            <div className="nav nav-tabs mb-3" id="nav-tab" role="tablist">
                                                <a
                                                    className="nav-item nav-link active"
                                                    id="nav-all-tab"
                                                    data-toggle="tab"
                                                    href="#nav-all"
                                                    role="tab"
                                                    aria-controls="nav-home"
                                                    aria-selected="true">
                                                    All
                                                </a>
                                                <a
                                                    className="nav-item nav-link"
                                                    id="nav-spot-tab"
                                                    data-toggle="tab"
                                                    href="#nav-spot"
                                                    role="tab"
                                                    aria-controls="nav-profile"
                                                    aria-selected="false">
                                                    Spot
                                                </a>
                                                <a
                                                    className="nav-item nav-link"
                                                    id="nav-futures-tab"
                                                    data-toggle="tab"
                                                    href="#nav-futures"
                                                    role="tab"
                                                    aria-controls="nav-contact"
                                                    aria-selected="false">
                                                    Futures
                                                </a>
                                                <a
                                                    className="nav-item nav-link"
                                                    id="nav-announcement-tab"
                                                    data-toggle="tab"
                                                    href="#nav-announcement"
                                                    role="tab"
                                                    aria-controls="nav-contact"
                                                    aria-selected="false">
                                                    Announcement
                                                </a>
                                            </div>
                                        </nav>
                                        <div className="tab-content" id="nav-tabContent">
                                            <div
                                                className="tab-pane fade show active"
                                                id="nav-all"
                                                role="tabpanel"
                                                aria-labelledby="nav-home-tab">
                                                <div className="market-type">
                                                    <p className="text-sm font-normal grey-text-accent mb-12">Spot</p>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                                <div className="market-type">
                                                    <p className="text-sm font-normal grey-text-accent mb-12">Future</p>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="nav-spot"
                                                role="tabpanel"
                                                aria-labelledby="nav-profile-tab">
                                                <div className="market-type">
                                                    <p className="text-sm font-normal grey-text-accent mb-12">Spot</p>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="nav-futures"
                                                role="tabpanel"
                                                aria-labelledby="nav-contact-tab">
                                                <div className="market-type">
                                                    <p className="text-sm font-normal grey-text-accent mb-12">
                                                        Futures
                                                    </p>
                                                    <a href="">
                                                        <div className="d-flex justify-content-between align-items-start my-2">
                                                            <div className="d-flex align-items-center">
                                                                <BtcIcon className="mr-3" />
                                                                <p className="mb-0 font-bold white-text text-sm">
                                                                    BTC/USDT
                                                                </p>
                                                            </div>
                                                            <div className="">
                                                                <p className="mb-0 font-bold grey-text text-sm text-right mb-2">
                                                                    $ 265.254.636
                                                                </p>
                                                                <p className="mb-0 font-bold danger-text text-sm text-right">
                                                                    -0.99%
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            <div
                                                className="tab-pane fade"
                                                id="nav-announcement"
                                                role="tabpanel"
                                                aria-labelledby="nav-contact-tab">
                                                <div className="market-type">
                                                    <p className="text-sm font-normal grey-text-accent mb-12">
                                                        Announcement
                                                    </p>
                                                    <a href="">
                                                        <div className="d-flex">
                                                            <p className="text-sm white-text font-normal mb-0">
                                                                The above address is specific to you, and can be used
                                                                repeatedly (this is a Bitcoin address).
                                                            </p>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="document">
                                    <a href="">
                                        <div className="doc-item">
                                            <div className="mr-2">
                                                <DocsIcon />
                                            </div>
                                            <p className="text-sm grey-text font-normal mb-0">
                                                The above address is specific to you, and can be used repeatedly (this
                                                is a Bitcoin address).
                                            </p>
                                        </div>
                                    </a>
                                    <a href="">
                                        <div className="doc-item">
                                            <div className="mr-2">
                                                <DocsIcon />
                                            </div>
                                            <p className="text-sm grey-text font-normal mb-0">
                                                The above address is specific to you, and can be used repeatedly (this
                                                is a Bitcoin address).
                                            </p>
                                        </div>
                                    </a>
                                    <a href="">
                                        <div className="doc-item">
                                            <div className="mr-2">
                                                <DocsIcon />
                                            </div>
                                            <p className="text-sm grey-text font-normal mb-0">
                                                The above address is specific to you, and can be used repeatedly (this
                                                is a Bitcoin address).
                                            </p>
                                        </div>
                                    </a>
                                    <a href="">
                                        <div className="doc-item">
                                            <div className="mr-2">
                                                <DocsIcon />
                                            </div>
                                            <p className="text-sm grey-text font-normal mb-0">
                                                The above address is specific to you, and can be used repeatedly (this
                                                is a Bitcoin address).
                                            </p>
                                        </div>
                                    </a>
                                    <a href="">
                                        <div className="doc-item">
                                            <div className="mr-2">
                                                <DocsIcon />
                                            </div>
                                            <p className="text-sm grey-text font-normal mb-0">
                                                The above address is specific to you, and can be used repeatedly (this
                                                is a Bitcoin address).
                                            </p>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ProfileDeviceTable />
                </div>
            </div>

            {/* modal */}
            <Modal content={modalTwoFaGoogleContent()} header={modalTwoFaGoogleHeader()} show={showModal2FaGoogle} />
            <Modal content={modalPhoneContent()} header={modalPhoneHeader()} show={showModalChangePhone} />
        </React.Fragment>
    );
};
