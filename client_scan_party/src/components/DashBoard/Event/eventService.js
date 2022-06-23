import axiosClient from "../../../http/axiosClient";

const urlBase = "api/v1";

class EventService {
    async uploadFileExcel(data) {
        const endpoint = `${urlBase}/files/excel`;
        return axiosClient.post(endpoint, data);
    }

    async createEvent(data) {
        const endpoint = `${urlBase}/events/full-event`;
        return axiosClient.post(endpoint, data);
    }

    async getListEvent(params) {
        const endpoint = `${urlBase}/events`;
        return axiosClient.get(endpoint, { params });
    }

    async getListTemplate() {
        const endpoint = `${urlBase}/ticket-template`;
        return axiosClient.get(endpoint);
    }

    async getDetailEvent(eventId) {
        const endpoint = `${urlBase}/events/${eventId}`;
        return axiosClient.get(endpoint);
    }

    async getListTicket(params, eventId) {
        const endpoint = `${urlBase}/tickets/${eventId}`;
        return axiosClient.get(endpoint, { params });
    }

    async getGuestByTicket(ticketId) {
        const endpoint = `${urlBase}/guests/${ticketId}`;
        return axiosClient.get(endpoint);
    }

    async delEvent(eventId) {
        const endpoint = `${urlBase}/events/${eventId}`;
        return axiosClient.delete(endpoint);
    }

    async userRegisterForm(eventId, data) {
        const endpoint = `${urlBase}/events/${eventId}/registerForm`;
        return axiosClient.post(endpoint, data);
    }

    async getCountTicket(eventId) {
        const endpoint = `${urlBase}/tickets/${eventId}/countTicket`;
        return axiosClient.get(endpoint);
    }

    async getLuckyPerson(eventId) {
        const endpoint = `${urlBase}/guests/${eventId}/luckyPerson`;
        return axiosClient.get(endpoint);
    }
}

const eventService = new EventService();
export default eventService;
