import * as React from 'react';
import { Button } from 'react-bootstrap';

export interface ExpiredSessionModalProps {
    title: string;
    buttonLabel: string;
    handleSubmitExpSessionModal: () => void;
    handleChangeExpSessionModalState: () => void;
}

export class ExpiredSessionModal extends React.Component<ExpiredSessionModalProps> {
    public render() {
        const { title, buttonLabel } = this.props;

        return (
            <div className='card'>
                <div onClick={this.props.handleChangeExpSessionModalState}>Close</div>
                <Button
                    block={true}
                    type="button"
                    onClick={this.props.handleSubmitExpSessionModal}
                    size="lg"
                    variant="primary"
                >
                    {buttonLabel}
                </Button>
            </div>
        );
    }
}
