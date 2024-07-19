import { configureStore } from "@reduxjs/toolkit";
import { articleApi } from "./article";

// a store is a global state that saves the entire state of our app
export const store = configureStore({
    // help us grab specifically what we need from the store
    reducer: {
        // we just want to grab something from this API
        [articleApi.reducerPath]: articleApi.reducer,
    },                        
    // do something with our state before we get it
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(articleApi.middleware)
})