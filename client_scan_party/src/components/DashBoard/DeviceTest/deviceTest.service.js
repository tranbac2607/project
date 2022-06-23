import { Redirect } from 'react-router-dom';
import axiosClient from '../../../http/axiosClient';

const urlBase = 'api/v1'

class DeviceTestService {
    async scanTicket (data) {
        const endpoint = `${urlBase}/tickets/scan`
        return axiosClient.post(endpoint, data)
    }
}

const deviceTestService = new DeviceTestService();
export default deviceTestService