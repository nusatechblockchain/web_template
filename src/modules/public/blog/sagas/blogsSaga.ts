import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { blogsData, blogsError, BlogsFetch } from '../actions';
import axios from 'axios';

async function fetchNews(tag) {
    const apiKey = '3c91665a1b107878484d3b3316';
    const sURL = `https://news.digiassetindo.com/ghost/api/v3/content/posts/?key=${apiKey}&limit=5&filter=tag%3Aedukasi`;
    // const config = { headers: { Authorization: 'auth_key YWtzZV9ibG9nX251c2E=' } };
    const result = await axios.get(sURL);
    return result.data.data;
}

export function* blogsSaga(action: BlogsFetch) {
    try {
        const payload = action.payload;
        const response = yield call(fetchNews, payload);
        yield put(blogsData(response));
    } catch (error) {
        yield put(
            sendError({
                error,
                processingType: 'alert',
                extraOptions: {
                    actionError: blogsError,
                },
            })
        );
    }
}
