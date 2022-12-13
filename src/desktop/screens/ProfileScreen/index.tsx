import React, { FC, ReactElement, useState } from 'react';
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
import { selectUserInfo, selectSignInRequire2FA } from '../../../modules';
import { Modal, CustomInput } from '../../components';
import { ModalCloseIcon } from '../../../assets/images/CloseIcon';

export const ProfileScreen: FC = (): ReactElement => {
    useDocumentTitle('Profile');
    const user = useSelector(selectUserInfo);

    const require2FA = useSelector(selectSignInRequire2FA);
    const history = useHistory();
    const dispatch = useDispatch();

    const [showModal2Fa, setShowModal2FA] = useState(false);
    const [showModal2FaGoogle, setShowModal2FAGoogle] = useState(false);
    const [showModalChangePhone, setShowModalChangePhone] = useState(false);
    const [twoFaPhoneValue, settwoFaPhoneValue] = useState('');
    const [twoFaGoogleValue, settwoFaGoogleValue] = useState('');
    const [newPhoneValue, setNewPhoneValue] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const handleFetchTwoFaPhone = () => {
        if (twoFaPhoneValue === '123456') {
            setShowModal2FA(false);
            setShowModalChangePhone(true);
        } else {
            alert('Two Fa Code Tidak sesuai (Just Contoh)');
        }
    };

    const handleFetchTwoFaGoogle = () => {
        require2FA ? setShowModal2FAGoogle(!showModal2FaGoogle) : history.push('/two-fa-activation');
    };

    // render two fa phone modal
    const modalTwoFaPhoneContent = () => {
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
                            inputValue={twoFaPhoneValue}
                            label="2FA Code"
                            placeholder="______"
                            type="text"
                            labelVisible
                            classNameInput="text-center spacing-10"
                            classNameLabel="white-text text-sm"
                            handleChangeInput={(e) => settwoFaPhoneValue(e)}
                        />
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary btn-block"
                        data-dismiss="modal"
                        onClick={handleFetchTwoFaPhone}>
                        Next
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const modalTwoFaPhoneHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">2FA Verification</h6>
                <ModalCloseIcon className="cursor-pointer" onClick={() => setShowModal2FA(false)} />
            </React.Fragment>
        );
    };

    // Render phone modal
    const modalPhoneContent = () => {
        return (
            <React.Fragment>
                <p className="text-sm grey-text mb-24">Set your new Phone number and verifed</p>
                <div className="form">
                    <div className="form-group mb-24">
                        <CustomInput
                            defaultLabel="New Phone Number"
                            inputValue={newPhoneValue}
                            label="New Phone Number"
                            placeholder="+6281902912921"
                            type="text"
                            labelVisible
                            classNameLabel="white-text text-sm"
                            handleChangeInput={(e) => setNewPhoneValue(e)}
                        />
                    </div>
                    <div className="form-group mb-24">
                        <label className="white-text text-sm ">Verification Code</label>
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
                            <button className="btn btn-primary ml-2 text-nowrap">Send Code</button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary btn-block"
                        data-toggle="modal"
                        data-target="#change-phone"
                        data-dismiss="modal">
                        Change
                    </button>
                </div>
            </React.Fragment>
        );
    };

    const modalPhoneHeader = () => {
        return (
            <React.Fragment>
                <h6 className="text-xl font-bold white-text mb-0">Change Phone Number</h6>
                <ModalCloseIcon className="cursor-pointer ml-4" onClick={() => setShowModalChangePhone(false)} />
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
                        onClick={handleFetchTwoFaGoogle}>
                        Next
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

    return (
        <React.Fragment>
            <div className="profile-screen">
                <div className="content-wrapper dark-bg-accent pb-5">
                    <ProfileAuthDetails />

                    <div className="profile-menu px-24">
                        <div className="row">
                            <div className="col-6 col-lg-8">
                                <div className="notification-warning alert show text-ms white-text font-normal position-relative mb-24">
                                    <Notification className="mr-2" />
                                    Complete your identity verify to start trading with digicoins
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
                                                    <span className="d-block text-xs danger-text font-normal ">
                                                        Disabled
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="menu-item py-24 mb-4">
                                        <button
                                            className="btn-transparent"
                                            onClick={() => setShowModal2FA(!showModal2Fa)}>
                                            <div className="d-flex align-items-center position-relative">
                                                <div className="icon-bg">
                                                    <PhoneProfileIcon />
                                                </div>
                                                <div className="ml-3 mr-3">
                                                    <p className="mb-1 text-ms font-normal white-text">Phone</p>
                                                    <span className="d-block text-left text-xs danger-text font-normal ">
                                                        Disabled
                                                    </span>
                                                </div>
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
                                                        Enabled
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
                                                        className="d-block text-left text-xs contrast-text font-normal ">
                                                        Enabled
                                                    </span>
                                                </div>
                                                <div className="check">
                                                    <CheckIcon />
                                                </div>
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
                                                        0 API enabled
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
            <Modal content={modalTwoFaPhoneContent()} header={modalTwoFaPhoneHeader()} show={showModal2Fa} />
            <Modal content={modalTwoFaGoogleContent()} header={modalTwoFaGoogleHeader()} show={showModal2FaGoogle} />
            <Modal content={modalPhoneContent()} header={modalPhoneHeader()} show={showModalChangePhone} />
        </React.Fragment>
    );
};
