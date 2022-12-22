import * as React from 'react';
import { KycInputFileComponent } from '../../components/';

export const KycNationalCard = (props) => {
    const [inputFrontValue, setInputFrontValue] = React.useState('');
    const [inputBackValue, setInputBackValue] = React.useState('');
    const [inputSelfieValue, setInputSelfieValue] = React.useState('');

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-6">
                    <KycInputFileComponent
                        id="national-front"
                        label="Upload Your Front of National Card"
                        inputValue={inputFrontValue}
                        handleChangeInput={(e) => setInputFrontValue(e)}
                    />
                </div>
                <div className="col-6">
                    <KycInputFileComponent
                        id="national-back"
                        label="Upload Your Back of National card"
                        inputValue={inputBackValue}
                        handleChangeInput={(e) => setInputBackValue(e)}
                    />
                </div>
                <div className="col-6">
                    <KycInputFileComponent
                        id="national-selfie"
                        label="Upload Your Selfie With National card"
                        inputValue={inputSelfieValue}
                        handleChangeInput={(e) => setInputSelfieValue(e)}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
