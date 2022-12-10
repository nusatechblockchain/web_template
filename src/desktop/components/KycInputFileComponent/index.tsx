import * as React from 'react';
import { UploadFileIcon } from '../../../assets/images/KycIcon';

export interface KycInputFileProps {
    label: string;
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
    id: string;
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

type Props = KycInputFileProps;

class KycInputFileComponent extends React.Component<Props, State> {
    public render() {
        const {
            label,
            placeholder,
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

        const string = inputValue.toString();
        const fileName = string.split('fakepath').pop();

        return (
            <React.Fragment>
                <div className="input-file">
                    <label htmlFor="front-pasport" className="white-text text-sm mb-3">
                        {label}
                    </label>
                    <input
                        type={'file'}
                        value={inputValue}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        onChange={(e) => this.handleChangeValue(e)}
                        readOnly={readOnly}
                        id={id}
                        onClick={handleClick}
                        disabled={isDisabled}
                        onKeyPress={onKeyPress}
                        autoComplete={autoComplete}
                        name={name}
                        className="form-control d-none"
                    />
                    <label htmlFor={id} className="docs cursor-pointer">
                        <div className="d-flex justify-content-center align-items-center flex-column">
                            <UploadFileIcon className="mb-3" />
                            <p className="contrast-text text-sm mb-1" id="file-name-front">
                                {fileName}
                            </p>
                            <p className="grey-text-accent font-normal text-center text-sm">
                                Maximum file size is 20MBJPG, BMP, PNG formats
                            </p>
                        </div>
                    </label>
                </div>
            </React.Fragment>
        );
    }

    private handleChangeValue = (e: OnChangeEvent) => {
        this.props.handleChangeInput && this.props.handleChangeInput(e.target.value);
    };
}

export { KycInputFileComponent };
