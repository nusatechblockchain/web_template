/* tslint:disable jsx-no-multiline-js */
import * as React from 'react';
import { KycInputFileComponent } from '../../components/';

export const KycDrivingLicense = (props) => {
    const [inputFrontValue, setInputFrontValue] = React.useState('');
    const [inputBackValue, setInputBackValue] = React.useState('');
    const [inputSelfieValue, setInputSelfieValue] = React.useState('');

    return (
        <React.Fragment>
            <div className="row">
                <div className="col-6">
                    <KycInputFileComponent
                        id="driving-front"
                        label="Upload Your Front of Driving License"
                        inputValue={inputFrontValue}
                        handleChangeInput={(e) => setInputFrontValue(e)}
                    />
                </div>
                <div className="col-6">
                    <KycInputFileComponent
                        id="driving-back"
                        label="Upload Your Back of Driving License"
                        inputValue={inputBackValue}
                        handleChangeInput={(e) => setInputBackValue(e)}
                    />
                </div>
                <div className="col-6">
                    <KycInputFileComponent
                        id="driving-selfie"
                        label="Upload Your Selfie With Driving License"
                        inputValue={inputSelfieValue}
                        handleChangeInput={(e) => setInputSelfieValue(e)}
                    />
                </div>
            </div>
        </React.Fragment>
    );
};
