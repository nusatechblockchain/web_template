import * as React from 'react';
import { useDispatch } from 'react-redux';
import { blogsFetch } from '../modules';

export const useBlogsFetch = (tag) => {
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(blogsFetch(tag));
    }, [dispatch]);
};
