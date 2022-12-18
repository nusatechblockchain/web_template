import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from '../../assets/Arrow';
import { Form } from 'react-bootstrap';
import { useHistory } from 'react-router';

const TwoFaActivationMobileScreen: React.FC = () => {
    const [state, setState] = React.useState(true);
    const history = useHistory();

    const handleTwoFa = () => {
        setState(!state);
    };

    const handleActivateTwoFa = () => {
        history.push('/two-fa');
    };

    return (
        <React.Fragment>
            <div className="mobile-container two-fa-mobile no-header pt-5 home-screen dark-bg-main">
                <div className="head-container position-relative mb-36">
                    <Link to={''} className="cursor-pointer position-absolute">
                        <ArrowLeft className={'back'} />
                    </Link>
                    <h1 className="text-center text-md grey-text-accent font-bold">Two-factor Authentication</h1>
                </div>
                <div className="two-container">
                    <a href="../2FAVerification/index.html">
                        <div className="card-fa d-flex justify-content-between align-items-center">
                            <div className="d-flex flex-column card-fa-content">
                                <h4 className="grey-text-accent text-ms font-bold mb-1">
                                    Two-Factor Authentication (2FA)
                                </h4>
                                <h5 className="text-xxs grey-text">
                                    To protect yout account, it is recommend to turn on at least one 2FA.
                                </h5>
                            </div>
                            <Form>
                                <Form.Check
                                    type="switch"
                                    id={`two-fa`}
                                    label=""
                                    onClick={handleActivateTwoFa}
                                    onChange={handleTwoFa}
                                    checked={state}
                                />
                            </Form>
                        </div>
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
};

export { TwoFaActivationMobileScreen };
