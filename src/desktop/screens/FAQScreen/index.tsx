import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle } from 'src/hooks';
import { Link } from 'react-router-dom';

export const FAQScreen: FC = (): ReactElement => {
    useDocumentTitle('FAQ');

    return (
        <React.Fragment>
            <h1>FAQ</h1>
        </React.Fragment>
    );
};
