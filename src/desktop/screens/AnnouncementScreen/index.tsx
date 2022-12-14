import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useDocumentTitle } from 'src/hooks';
import { Link } from 'react-router-dom';

export const AnnouncementScreen: FC = (): ReactElement => {
    useDocumentTitle('Announcement');

    return (
        <React.Fragment>
            <h1>Announcement</h1>
        </React.Fragment>
    );
};
