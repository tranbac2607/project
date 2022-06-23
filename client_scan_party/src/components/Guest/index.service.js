import { Redirect } from 'react-router-dom';
import axiosClient from '../../http/axiosClient';
import http from '../../http/index';

const urlBase = 'api/v1'

class GuestService {
    async signUp(data) {
        const endpoint = `${urlBase}/auth`
        return axiosClient.post(endpoint, data)
    }

    async Rating(eventId, data) {
        const endpoint = `${urlBase}/guests/${eventId}/rating`;
        return axiosClient.post(endpoint, data)
    }

    async getAllUser() {
        const endpoint = `${urlBase}/admin/users`;
        return axiosClient.get(endpoint);
    }

    async getUserDetails() {
        const endpoint = `${urlBase}/me`;
        return axiosClient.get(endpoint);
    }
}

const guestService = new GuestService();
export default guestService;