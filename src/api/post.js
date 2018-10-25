import axios from 'axios';
import { commonParams } from './config';

export function post (url, data) {
  let finalUrl = '/api/' + url;
  let finalData = Object.assign(commonParams, data);
  return axios.post(finalUrl, { params: finalData }, {
    'headers': { 'Content-Type': 'application/x-www-form-urlencodeed' }
  }).then((res) => {
    return Promise.resolve(res.data);
  });
}
