import { CommonError } from 'src/modules/types';
import { RootState } from '../../';

const selectOrdersState = (state: RootState): RootState['user']['orders'] => state.user.orders;

export const selectOrderExecuteLoading = (state: RootState): boolean => selectOrdersState(state).executeLoading;

export const selectCurrentPrice = (state: RootState): number | undefined => selectOrdersState(state).currentPrice;

export const selectAmount = (state: RootState): string => selectOrdersState(state).amount;

export const selectOrderType = (state: RootState): string => selectOrdersState(state).orderType;

export const selectOrderError = (state: RootState): CommonError | undefined => state.user.orders.executeError;
