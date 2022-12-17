import * as React from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { CustomInput, PasswordStrengthMeter } from '../../../desktop/components';
import { passwordMinEntropy } from '../../../api/config';
import { ArrowLeft } from '../../assets/Arrow';
import { Close } from '../../assets/Closeicon';
import { DropdownSmall } from '../../assets/Dropdown';
import { ModalMobile } from '../../components';
import { entropyPasswordFetch, selectCurrentPasswordEntropy } from '../../../modules';
import {
    passwordErrorFirstSolution,
    passwordErrorSecondSolution,
    passwordErrorThirdSolution,
    PASSWORD_REGEX,
    USERNAME_REGEX,
    EMAIL_REGEX,
} from '../../../helpers';
import { SignInProps } from 'src/mobile/containers';

const SignUpMobileScreen: React.FC<SignInProps> = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const intl = useIntl();

    const currentPasswordEntropy = useSelector(selectCurrentPasswordEntropy);

    const [usernameValue, setUsernamevalue] = React.useState('');
    const [emailValue, setEmailvalue] = React.useState('');
    const [passwordValue, setPasswordvalue] = React.useState('');
    const [referralValue, setReferralvalue] = React.useState('');
    const [showReferral, setShowReferral] = React.useState(false);
    const [tos, setTos] = React.useState(false);
    const [passwordNewFocus, setPasswordNewFocus] = React.useState(false);
    const [passwordErrorFirstSolved, setPasswordErrorFirstSolved] = React.useState(false);
    const [passwordErrorSecondSolved, setPasswordErrorSecondSolved] = React.useState(false);
    const [passwordErrorThirdSolved, setPasswordErrorThirdSolved] = React.useState(false);
    const [passwordPopUp, setPasswordPopUp] = React.useState(false);

    const handleFocusNewPassword = () => {
        setPasswordPopUp(!passwordPopUp);
        setPasswordNewFocus(!passwordNewFocus);
    };

    const handleChangeNewPassword = (value: string) => {
        if (passwordErrorFirstSolution(value) && !passwordErrorFirstSolved) {
            setPasswordErrorFirstSolved(true);
        } else if (!passwordErrorFirstSolution(value) && passwordErrorFirstSolved) {
            setPasswordErrorFirstSolved(false);
        }

        if (passwordErrorSecondSolution(value) && !passwordErrorSecondSolved) {
            setPasswordErrorSecondSolved(true);
        } else if (!passwordErrorSecondSolution(value) && passwordErrorSecondSolved) {
            setPasswordErrorSecondSolved(false);
        }

        if (passwordErrorThirdSolution(value) && !passwordErrorThirdSolved) {
            setPasswordErrorThirdSolved(true);
        } else if (!passwordErrorThirdSolution(value) && passwordErrorThirdSolved) {
            setPasswordErrorThirdSolved(false);
        }

        setPasswordvalue(value);
        setTimeout(() => {
            dispatch(entropyPasswordFetch({ password: value }));
        }, 100);
    };

    const translate = (key: string) => intl.formatMessage({ id: key });

    const isValidForm = () => {
        if (
            !passwordErrorFirstSolved ||
            !passwordErrorSecondSolved ||
            !passwordErrorThirdSolved ||
            !emailValue.match(EMAIL_REGEX) ||
            !passwordValue ||
            !usernameValue.match(USERNAME_REGEX)
        ) {
            return true;
        }
    };

    const handleSignUp = () => {
        history.push('/email-verification');
    };

    const renderTosHeader = () => (
        <div className="d-flex flex-row justify-content-between align-items-center">
            <h5 className="text-md font-bold white-text">Term of Service</h5>
            <Close className={'cursor-pointer'} onClick={() => setTos(false)} />
        </div>
    );

    const renderTosContent = () => (
        <React.Fragment>
            <div className="tos-wrapper">
                <p className="grey-text">SYARAT – SYARAT DAN KETENTUAN UMUM </p>
                <p className="grey-text text-xs">
                    Syarat – Syarat dan Ketentuan Umum (selanjutnya disebut sebagai “SKU”) INDODAX adalah ketentuan yang
                    berisikan syarat dan ketentuan mengenai penggunaan produk, jasa, teknologi, fitur layanan yang
                    diberikan oleh INDODAX termasuk, namun tidak terbatas pada penggunaan Website, Dompet Bitcoin
                    Indonesia dan INDODAX Trading Platform (Trading App) (untuk selanjutnya disebut sebagai “Platform
                    INDODAX”) sepanjang tidak diatur secara khusus sebagaimana tercantum pada bagian registrasi Akun
                    INDODAX yang dibuat pada hari dan tanggal yang tercantum dalam bagian registrasi Akun
                    https://indodax.com, merupakan satu kesatuan tidak terpisahkan dan persetujuan atas SKU ini. Dengan
                    mendaftar menjadi Member/Verified Member, Anda menyatakan telah MEMBACA, MEMAHAMI, MENYETUJUI dan
                    MEMATUHI Persyaratan dan Ketentuan di bawah. Anda disarankan membaca semua persyaratan dan ketentuan
                    secara seksama sebelum menggunakan layanan platform INDODAX atau segala layanan yang diberikan, dan
                    bersama dengan ini Anda setuju dan mengikatkan diri terhadap seluruh kegiatan dalam SKU ini dengan
                    persyaratan dan ketentuan sebagai berikut : DEFINISI sepanjang konteks kalimatnya tidak menentukan
                    lain, istilah atau definisi dalam SKU memiliki arti sebagai berikut :
                </p>
                <p className="grey-text text-xs">
                    Website mengacu pada situs online dengan alamat https://indodax.com. Website ini dikelola oleh
                    INDODAX, dengan tidak terbatas pada para pemilik, investor, karyawan dan pihak-pihak yang terkait
                    dengan INDODAX. Tergantung pada konteks, “Website” dapat juga mengacu pada jasa, produk, situs,
                    konten atau layanan lain yang disediakan oleh INDODAX. Aset Kripto adalah komoditas digital yang
                    menggunakan prinsip teknologi desentralisasi berbasiskan jaringan peer-to-peer (antar muka)atau
                    disebut dengan Jaringan Blockchain yang diperdagangkan di dalam platform Blockchain adalah sebuah
                    buku besar terdistribusi (distributed ledger) terbuka yang dapat mencatat transaksi antara dua pihak
                    secara efisien dan dengan cara yang dapat diverifikasi secara permanen. Registrasi adalah proses
                    pendaftaran menjadi Member dalam platform INDODAX yang merupakan proses verifikasi awal untuk
                    memperoleh keterangan, pernyataan dalam penggunaan layanan platform Member adalah orang
                    (perseorangan), badan usaha, maupun badan hukum yang telah melakukan registrasi pada platform
                    INDODAX, sehingga memperoleh otorisasi dari platform INDODAX untuk melakukan{' '}
                </p>
                <p className="grey-text text-xs">
                    Syarat – Syarat dan Ketentuan Umum (selanjutnya disebut sebagai “SKU”) INDODAX adalah ketentuan yang
                    berisikan syarat dan ketentuan mengenai penggunaan produk, jasa, teknologi, fitur layanan yang
                    diberikan oleh INDODAX termasuk, namun tidak terbatas pada penggunaan Website, Dompet Bitcoin
                    Indonesia dan INDODAX Trading Platform (Trading App) (untuk selanjutnya disebut sebagai “Platform
                    INDODAX”) sepanjang tidak diatur secara khusus sebagaimana tercantum pada bagian registrasi Akun
                    INDODAX yang dibuat pada hari dan tanggal yang tercantum dalam bagian registrasi Akun
                    https://indodax.com, merupakan satu kesatuan tidak terpisahkan dan persetujuan atas SKU ini. Dengan
                    mendaftar menjadi Member/Verified Member, Anda menyatakan telah MEMBACA, MEMAHAMI, MENYETUJUI dan
                    MEMATUHI Persyaratan dan Ketentuan di bawah. Anda disarankan membaca semua persyaratan dan ketentuan
                    secara seksama sebelum menggunakan layanan platform INDODAX atau segala layanan yang diberikan, dan
                    bersama dengan ini Anda setuju dan mengikatkan diri terhadap seluruh kegiatan dalam SKU ini dengan
                    persyaratan dan ketentuan sebagai berikut : DEFINISI sepanjang konteks kalimatnya tidak menentukan
                    lain, istilah atau definisi dalam SKU memiliki arti sebagai berikut :
                </p>
                <p className="grey-text text-xs">
                    Website mengacu pada situs online dengan alamat https://indodax.com. Website ini dikelola oleh
                    INDODAX, dengan tidak terbatas pada para pemilik, investor, karyawan dan pihak-pihak yang terkait
                    dengan INDODAX. Tergantung pada konteks, “Website” dapat juga mengacu pada jasa, produk, situs,
                    konten atau layanan lain yang disediakan oleh INDODAX. Aset Kripto adalah komoditas digital yang
                    menggunakan prinsip teknologi desentralisasi berbasiskan jaringan peer-to-peer (antar muka)atau
                    disebut dengan Jaringan Blockchain yang diperdagangkan di dalam platform Blockchain adalah sebuah
                    buku besar terdistribusi (distributed ledger) terbuka yang dapat mencatat transaksi antara dua pihak
                    secara efisien dan dengan cara yang dapat diverifikasi secara permanen. Registrasi adalah proses
                    pendaftaran menjadi Member dalam platform INDODAX yang merupakan proses verifikasi awal untuk
                    memperoleh keterangan, pernyataan dalam penggunaan layanan platform Member adalah orang
                    (perseorangan), badan usaha, maupun badan hukum yang telah melakukan registrasi pada platform
                    INDODAX, sehingga memperoleh otorisasi dari platform INDODAX untuk melakukan{' '}
                </p>
                <p className="grey-text text-xs">
                    SYARAT DAN KETENTUAN UMUM DAN RISIKO PERDAGANGAN MEMBER/VERIFIED MEMBER INDODAX.COM INI TELAH
                    DISESUAIKAN DENGAN KETENTUAN PERATURAN PERUNDANG-UNDANGAN YANG BERLAKU.
                </p>
                <div className=" d-flex flex-row justify-content-between align-items-center w-100">
                    <button type="button" className="btn btn-primary btn-mobile w-50 mx-2" onClick={handleSignUp}>
                        Accept
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary btn-outline btn-mobile w-50 mx-2"
                        data-dismiss="modal"
                        onClick={() => setTos(false)}>
                        Close
                    </button>
                </div>
            </div>
        </React.Fragment>
    );

    return (
        <React.Fragment>
            <div className="mobile-container no-header dark-bg-main">
                <Link to={''}>
                    <ArrowLeft className={'back'} />
                </Link>
                <h2 className="mt-4 font-extrabold text-md grey-text-accent mb-3">Create Personal Account</h2>
                <form
                    className="form-sign-up tab-pane fade show active"
                    id="nav-username"
                    role="tabpanel"
                    aria-labelledby="nav-username-tab">
                    <CustomInput
                        defaultLabel="Username"
                        inputValue={usernameValue}
                        label="Username"
                        placeholder="Your Username"
                        type="text"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setUsernamevalue(e)}
                        labelVisible
                    />
                    <CustomInput
                        defaultLabel="email"
                        inputValue={emailValue}
                        label="Email"
                        placeholder="Your email address"
                        type="email"
                        classNameLabel="white-text text-sm"
                        classNameInput="text-ms input-mobile"
                        handleChangeInput={(e) => setEmailvalue(e)}
                        labelVisible
                    />
                    <CustomInput
                        defaultLabel="Password "
                        inputValue={passwordValue}
                        label="Password"
                        placeholder="Password"
                        type="password"
                        labelVisible
                        classNameLabel="white-text text-sm"
                        classNameInput={`input-mobile ${
                            passwordNewFocus &&
                            (!passwordErrorFirstSolved || !passwordErrorSecondSolved || !passwordErrorThirdSolved) &&
                            'error'
                        }`}
                        autoFocus={false}
                        handleFocusInput={handleFocusNewPassword}
                        handleChangeInput={handleChangeNewPassword}
                    />

                    {passwordNewFocus &&
                        (!passwordErrorFirstSolved || !passwordErrorSecondSolved || !passwordErrorThirdSolved) && (
                            <p className="danger-text m-0 mb-24 text-xs">Password Strength must be GOOD</p>
                        )}
                    <div>
                        <PasswordStrengthMeter
                            minPasswordEntropy={passwordMinEntropy()}
                            currentPasswordEntropy={currentPasswordEntropy}
                            passwordExist={passwordValue !== ''}
                            passwordErrorFirstSolved={passwordErrorFirstSolved}
                            passwordErrorSecondSolved={passwordErrorSecondSolved}
                            passwordErrorThirdSolved={passwordErrorThirdSolved}
                            passwordPopUp={passwordPopUp}
                            translate={translate}
                        />
                    </div>

                    <div className="group mb-3">
                        <label
                            className="text-sm white-text font-normal"
                            onClick={() => setShowReferral(!showReferral)}>
                            Referral ID (Optional) <DropdownSmall className={showReferral ? 'rotate-180' : ''} />
                        </label>
                        {showReferral ? (
                            <CustomInput
                                defaultLabel="Referral ID"
                                inputValue={referralValue}
                                label="Referral ID"
                                placeholder="Referral ID"
                                type="text"
                                classNameLabel="white-text text-sm d-none"
                                classNameInput="text-ms input-mobile"
                                handleChangeInput={(e) => setReferralvalue(e)}
                                labelVisible={false}
                            />
                        ) : (
                            ''
                        )}
                    </div>

                    <button
                        type="button"
                        className="btn btn-primary btn-block btn-mobile"
                        disabled={isValidForm()}
                        onClick={() => setTos(true)}>
                        Create Account
                    </button>
                    <p className="create-account text-xs text-center font-semibold grey-text-accent mt-3">
                        Already have an Account?
                        <Link to={'/signin'} className="contrast-text">
                            Login
                        </Link>
                    </p>
                </form>
            </div>

            <ModalMobile content={renderTosContent()} header={renderTosHeader()} show={tos} />
        </React.Fragment>
    );
};

export { SignUpMobileScreen };
