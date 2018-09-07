import axios from 'axios';
import jsonp from 'common/js/jsonp';
import { commonParams, options } from './config';

export function get (url, data) {
  let finalUrl = '/api/' + url;
  let finalData = Object.assign(commonParams, data);
  return axios.get(finalUrl, { params: finalData }).then((res) => {
    return Promise.resolve(res.data);
  });
}

export function jsonpGet (url, data) {
  const finalData = Object.assign(commonParams, data);
  return jsonp(url, finalData, options);
}
