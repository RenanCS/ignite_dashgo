import axios, { AxiosError } from 'axios';
import Router from 'next/router';
import { destroyCookie, parseCookies } from 'nookies';
import { refreshTokenUser } from 'src/controllers/refreshTokenUser';
import { Library } from 'src/util/readOnly';
import { api } from '.';

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestsQueue = [];

export const apiAuthentication = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_SEGURANCA,
    headers: {
        Authorization: `Bearer ${cookies[Library.DASHGOTOKEN]}`
    }
});

apiAuthentication.interceptors.response.use(
    response => {
        return response
    },
    (error: AxiosError) => {
        const is401 = error.response.status === 401;
        const isTokenExpired = error.response.data?.code === Library.TOKENEXPIRED;

        if (is401) {
            if (isTokenExpired) {

                cookies = parseCookies();

                const { 'dashgo.refreshtoken': refreshToken } = cookies;

                const originalConfig = error.config;

                if (!isRefreshing) {
                    isRefreshing = true;

                    refreshTokenUser(refreshToken).then((newToken: string) => {
                        failedRequestsQueue.forEach(request => request.onSuccess(newToken));
                    })
                        .catch(err => {
                            failedRequestsQueue.forEach(request => request.onFailure(err));
                        })
                        .finally(() => {
                            isRefreshing = false;
                            failedRequestsQueue = [];
                        });
                }

                return new Promise((resolve, reject) => {
                    failedRequestsQueue.push({
                        onSuccess: (newToken: string) => {
                            originalConfig.headers['Authorization'] = `Bearer ${newToken}`;
                            resolve(api(originalConfig))
                        },
                        onFailure: () => {
                            reject(error);
                        }
                    })
                })


            } else {
                debugger;
                destroyCookie(undefined, Library.DASHGOTOKEN);
                destroyCookie(undefined, Library.DASHGOREFRESHTOKEN);
                Router.push('/');
            }
        }

        return Promise.reject(error);
    });