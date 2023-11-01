import axios from 'axios';

const domain = 'http://localhost:5000'; // Replace this with your localhost URL

const http = (
  url,
  {
    method = 'GET',
    data = undefined,
  },
) => {
  return axios({
    url: `${domain}${url}`,
    method,
    data,
    headers: {
      'Content-Type': 'application/json', // Assuming you are sending JSON data
      // You can add additional headers if necessary
    },
  });
};

const get = (url, opts = {}) => http(url, { ...opts });
const post = (url, opts = {}) => http(url, { method: 'POST', ...opts });
const put = (url, opts = {}) => http(url, { method: 'PUT', ...opts });
const deleteData = (url, opts = {}) => http(url, { method: 'DELETE', ...opts });

const methods = {
  get,
  post,
  put,
  delete: deleteData,
};

export default methods;
