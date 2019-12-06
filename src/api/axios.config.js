import axios from 'axios';

export default axios.create({
  baseURL: '/',
  // headers: { 'X-Custom-Header': 'foobar' }
});

