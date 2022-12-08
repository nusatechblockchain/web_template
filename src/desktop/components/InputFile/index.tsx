import * as React from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import './InputFile.pcss';

export interface InputFileProps {
    label?: string;
    defaultLabel?: string;
    handleChangeInput?: (value: string) => void;
    inputValue?: string | number;
    handleFocusInput?: () => void;
    placeholder?: string;
    classNameLabel?: string;
    classNameInput?: string;
    autoFocus?: boolean;
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    readOnly?: boolean;
    id?: string;
    handleClick?: (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => void;
    isDisabled?: boolean;
    labelVisible?: boolean;
    autoComplete?: string;
    name?: string;
}

interface OnChangeEvent {
    target: {
        value: string;
    };
}

interface State {
    inputType: string;
    showPassword: boolean;
}

type Props = InputFileProps;

class InputFile extends React.Component<Props, State> {
    public render() {
        const {
            label,
            labelVisible,
            placeholder,
            defaultLabel,
            inputValue,
            classNameLabel,
            autoFocus,
            readOnly,
            id,
            handleClick,
            isDisabled,
            onKeyPress,
            autoComplete,
            name,
        } = this.props;

        return (
            <React.Fragment>
                <div className="custom-input-file input-group mb-12">
                    <div className="input-cover" />
                    <input
                        type={'file'}
                        value={inputValue}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        onFocus={this.props.handleFocusInput}
                        onBlur={this.props.handleFocusInput}
                        onChange={(e) => this.handleChangeValue(e)}
                        readOnly={readOnly}
                        id={id}
                        onClick={handleClick}
                        disabled={isDisabled}
                        onKeyPress={onKeyPress}
                        autoComplete={autoComplete}
                        name={name}
                        className="__input form-control rounded-input-append"
                        style={{
                            borderRadius: '0px',
                            borderTopLeftRadius: '6px',
                            borderTopRightRadius: '6px',
                        }}
                    />
                    <div className="__input-button input-group-append">
                        <label
                            htmlFor="custom-file"
                            className="btn-input w-150 mb-0 d-flex align-items-center justify-content-center white-text border-0 cursor-pointer">
                            Upload File
                        </label>
                    </div>
                </div>
            </React.Fragment>
        );
    }

    private handleChangeValue = (e: OnChangeEvent) => {
        this.props.handleChangeInput && this.props.handleChangeInput(e.target.value);
    };
}

export { InputFile };
