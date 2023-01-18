import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAbilities, selectLoadingAbilities, selectUserFetching, selectUserLoggedIn } from '../modules';
import { rangerConnectFetch } from '../modules/public/ranger';
import { selectRanger, selectShouldRangerConnect } from '../modules/public/ranger/selectors';

export const useRangerConnectFetch = () => {
    const dispatch = useDispatch();
    const userLoggedIn = useSelector(selectUserLoggedIn);
    const userLoading = useSelector(selectUserFetching);
    const shouldFetch = useSelector(selectShouldRangerConnect);
    const abilities = useSelector(selectAbilities);
    const abilitiesLoading = useSelector(selectLoadingAbilities);
    const { connected, withAuth } = useSelector(selectRanger);

    React.useEffect(() => {
        if (!connected && shouldFetch && ((!userLoggedIn && !userLoading) || userLoggedIn)) {
            dispatch(rangerConnectFetch({ withAuth: userLoggedIn }));
        } else if (connected && !withAuth && userLoggedIn) {
            dispatch(rangerConnectFetch({ withAuth: userLoggedIn }));
        }
    }, [dispatch, shouldFetch, connected, withAuth, userLoggedIn, abilities]);
};
