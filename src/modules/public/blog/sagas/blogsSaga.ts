import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { blogsData, blogsError, BlogsFetch } from '../actions';
import axios from 'axios';

async function fetchNews(tag) {
    const apiKey = '3c91665a1b107878484d3b3316';
    const sURL = `https://news.digiassetindo.com/ghost/api/v3/content/posts/?key=${apiKey}&limit=25&filter=tag%3A${tag}`;
    const result = await axios.get(sURL);

    return result.data.posts;
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
