import { Redirect } from 'react-router-dom';
import axiosClient from '../../http/axiosClient';
import http from '../../http/index';

const urlBase = 'api/v1'

class LoginService {
    async signUp(data) {
        const endpoint = `${urlBase}/auth`
        return axiosClient.post(endpoint, data)
    }

    async signIn(data) {
        const endpoint = `${urlBase}/signIn`
        return axiosClient.post(endpoint, data)
    }

    async sendEmailWantReset(data) {
        const endpoint = `${urlBase}/users/password/new`;
        return axiosClient.post(endpoint, data)
    }

    async refreshToken() {
        const refreshToken = localStorage.getItem('refresh-token');
        const endpoint = `${urlBase}/refresh-token`;
        if (refreshToken) {
            try {
                const res = await axiosClient.post(endpoint, refreshToken);
                if (res) {
                    localStorage.setItem('access-token', res.accessToken)
                }
            } catch (error) {
                console.log(error)
            }

        }
    }

    async updateUser(data) {
        const endpoint = `${urlBase}/users/update-user`;
        return axiosClient.post(endpoint, data)
    }

    async changePassword(data) {
        const endpoint = `${urlBase}/users/change-password`;
        return axiosClient.post(endpoint, data);
    }

    async changeAvatar(data) {
        const endpoint = `${urlBase}/users/change-avatar`;
        return axiosClient.post(endpoint, data);
    }

    async logOut(data) {
        const endpoint = `${urlBase}/sign-out`;
        return axiosClient.post(endpoint, data);
    }
}

const loginService = new LoginService();
export default loginService;