// A specific part of our state of our global store
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY;

export const articleApi = createApi({
    reducerPath: 'articleApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://article-extractor-and-summarizer.p.rapidapi.com/',
        prepareHeaders: (headers) => {
            headers.set('x-rapidapi-key', rapidApiKey);
            headers.set('x-rapidapi-host', 'article-extractor-and-summarizer.p.rapidapi.com');

            return headers;
        }
    }),
    endpoints: (builder) => ({
        getSummary: builder.query({
            // good to use encodeURIComponenet to encode the URL whenever you are passing user-generated content. - removes special characters.
            query: (params) => `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
        })
    })
});

// useLazy so we can input URL then press submit; fire the hook on demand
export const { useLazyGetSummaryQuery } = articleApi;