import axios from 'axios';

export function setJWT(token: string) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

axios.defaults.headers.common['Authorization'] =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFfdXNlci1Tai1EOThlIiwiaWF0IjoxNjkwNzc0NzQ4fQ.22kVa57y1TpUa8OhAqwxmioMMXZDmU3qn6_gOtjCKFQ';

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};

export default http;
