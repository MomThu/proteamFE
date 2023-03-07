import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { settingListenerMiddleware } from './middleware/setting'

export function makeStore() {
    return configureStore({
        reducer: {},
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: {
                    // Ignore these action types
                    ignoredActions: [],
                    // Ignore these field paths in all actions
                    ignoredActionPaths: [],
                    // Ignore these paths in the state
                    ignoredPaths: [],
                },
            }).concat([settingListenerMiddleware.middleware]),
        devTools: process.env.NODE_ENV !== 'production',
    })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
>

export default store
