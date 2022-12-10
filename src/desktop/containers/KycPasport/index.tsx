import * as React from 'react';
import { KycInputFileComponent } from '../../components/';

export const KycPasport = (props) => {
    const [inputValue, setInputValue] = React.useState('');
    const [inputSelfieValue, setInputSelfieValue] = React.useState('');

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-6">
                    <KycInputFileComponent
                        id="front-pasport"
                        label="Upload Your Front of Passport"
                        inputValue={inputValue}
                        handleChangeInput={(e) => setInputValue(e)}
                    />
                </div>
                <div className="col-6">
                    <KycInputFileComponent
                        id="pasport-selfie"
                        label="Upload Your Selfie With ID card"
                        inputValue={inputSelfieValue}
                        handleChangeInput={(e) => setInputSelfieValue(e)}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
