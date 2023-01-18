const USE_SSL = true;
const BASE_URL = 'www.heavenexchange.io';
// const BASE_URL = 'app.nagaexchange.co.id';

export const API_URL = USE_SSL ? 'https://' + BASE_URL : 'http://' + BASE_URL;
export const SOCKET_URL = USE_SSL ? 'wss://' + BASE_URL : 'ws://' + BASE_URL;
