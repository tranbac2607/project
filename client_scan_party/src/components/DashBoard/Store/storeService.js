import { Redirect } from 'react-router-dom';
import axiosClient from '../../../http/axiosClient';

const urlBase = 'api/v1';

class StoreService {
    async getFileExcel(params, userId) {
        const endpoint = `${urlBase}/files/excel/${userId}`
        return axiosClient.get(endpoint, { params })
    }

    async getFileImage(params, userId) {
        const endpoint = `${urlBase}/files/image/${userId}`
        return axiosClient.get(endpoint,{ params })
    }
}

const storeService = new StoreService();
export default storeService;