import axios from 'axios'
import {message} from 'antd'

export default function ajax(url, data={}, type='GET') {

    return new Promise((resolve, reject) => {
        axios.defaults.headers.post ['Access-Control-Allow-Origin'] ='*';
        axios.defaults.headers.post ['Access-Control-Allow-Credentials'] =true;

        axios.interceptors.response.use(function (response) {
            // Do something with response data
            console.log("response 123");
            console.log(response);
            return response;
        }, function (error) {
            // Do something with response error
            return Promise.reject(error);
        });
        const TOKEN_KEY = 'JSESSIONID';
        axios.defaults.withCredentials=true;
        let promise
        if(type==='GET') {
            promise = axios.get(url, {
                params: data,
            })
        } else {
            promise = axios.post(url, data)
        }
        promise.then(response => {
            resolve(response.data)
            console.log("response: ")
            console.log(response)
        }).catch(error => {
            message.error('请求出错了: ' + error.message)
        })
    })

}


