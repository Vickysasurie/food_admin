import axios from 'axios';

export default axios.create({
    baseURL: `http://13.58.92.162:3001/api`  //192.168.1.132
});