import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import coming from '../../../public/img/coming.png';

export interface ModalProps {
    show: boolean;
    onClose: () => void;
}

export const ModalComingSoon: React.FC<ModalProps> = (props): React.ReactElement => {
    return (
        <React.Fragment>
            <Modal centered show={props.show} className="modal-coming-soon">
                <Modal.Header className="p-0 mb-24">
                    <Modal.Title className="p-0">
                        <img src={coming} alt="comingsoon" />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-0 mb-24">
                    <div className="text-center">
                        <h1 className="mb-6 white-text text-lg">Coming Soon</h1>
                        <h4 className="text-ms grey-text-accent">
                            Stay tuned for updates to the Heaven exchange feature
                        </h4>
                    </div>
                </Modal.Body>
                <Modal.Footer className="p-0">
                    <Button
                        variant="primary"
                        className="btn-primary btn-close white-text text-ms"
                        onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
};
