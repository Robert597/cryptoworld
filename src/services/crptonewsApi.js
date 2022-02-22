import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

const cryptoApiNewsHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": "de083142b9mshcc371426a94e1c5p15a326jsnf32378236d15"
}
const baseUrl = 'https://bing-news-search1.p.rapidapi.com';
const createRequest = (url) => ({url, headers: cryptoApiNewsHeaders});
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`)
        })
    })
});
export const {
    useGetCryptoNewsQuery, 
} = cryptoNewsApi;