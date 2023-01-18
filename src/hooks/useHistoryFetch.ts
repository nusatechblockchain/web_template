import * as React from 'react';
import { useDispatch } from 'react-redux';
import { fetchHistory } from '../modules';

interface HistoryProps {
    type: string;
    currency?: string;
    limit?: number;
    page?: number;
}

export const useHistoryFetch = ({ type, currency, limit = 6, page = 0 }: HistoryProps) => {
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(fetchHistory({ type, limit, page }));
        if (currency) {
            dispatch(fetchHistory({ type, limit, currency, page }));
        }
    }, [dispatch, type, currency, limit, page]);
};
