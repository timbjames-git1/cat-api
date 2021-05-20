import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { reducer as toastrReducer } from 'react-redux-toastr';

export const store = configureStore({
    reducer: {      
        toastr: toastrReducer
    }
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<unknown, AppState, null, Action<any>>;
export default store;
