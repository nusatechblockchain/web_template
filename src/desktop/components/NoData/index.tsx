import * as React from 'react';
import { EmptyData } from '../../../assets/images/NoData';

export interface noData {
    text: string;
}

export class NoData extends React.Component<noData> {
    constructor(props: noData) {
        super(props);
    }

    public render() {
        return (
            <div className="d-flex justify-content-center flex-column align-items-center mt-4">
                <EmptyData />
                <p className="grey-text-accent font-normal mt-2 text-sm">{this.props.text}</p>
            </div>
        );
    }
}
