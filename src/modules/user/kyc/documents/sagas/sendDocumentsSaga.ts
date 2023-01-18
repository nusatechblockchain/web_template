import { call, put } from 'redux-saga/effects';
import { alertPush, sendError } from '../../../../';
import { API, RequestOptions } from '../../../../../api';
import { getCsrfToken } from '../../../../../helpers';
import { sendDocumentsData, sendDocumentsError, SendDocumentsFetch } from '../actions';
import { useHistory } from 'react-router-dom';

const sessionsConfig = (csrfToken?: string): RequestOptions => {
    return {
        apiVersion: 'account',
        headers: { 'X-CSRF-Token': csrfToken },
    };
};

export function* sendDocumentsSaga(action: SendDocumentsFetch) {
    try {
        const response = yield call(API.post(sessionsConfig(getCsrfToken())), '/resource/documents', action.payload);
        const defaultMessage = 'success.documents.accepted';
        const { message = defaultMessage } = response;
        yield put(sendDocumentsData({ message }));
        yield put(alertPush({ message: [defaultMessage], type: 'success' }));
    } catch (error) {
        if (error.code == 500 || error.code == 504) {
            yield put(alertPush({ message: ['Document Successfuly Uploaded'], type: 'success' }));
            const history = useHistory();
            yield history.push('/profile');
        } else {
            yield put(
                sendError({
                    error,
                    processingType: 'alert',
                    extraOptions: {
                        actionError: sendDocumentsError,
                    },
                })
            );
        }
    }
}
