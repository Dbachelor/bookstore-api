const PROTOCOL = location.protocol;
const HOST = location.host;
// console.log(PROTOCOL,HOST);
export const API_PATH = `${PROTOCOL}//${HOST}/api`;
export const URL_PATH = `${PROTOCOL}//${HOST}`;
export const header = {
     "Content-Type":"application/json",
     "Accept":"application/json"
}
