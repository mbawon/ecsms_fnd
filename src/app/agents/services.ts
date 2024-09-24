import api from '@/common/configs/axios';
import { useMutation } from '@tanstack/react-query';

const URLs = {
    reply: "messaging/api/v1/reply/",
    closeSession: "close session"
}

export const reply = async (replyData: any): Promise<any> => {
    const response = await api.post(URLs.reply, replyData);
    return response.data;
};

export const closeSession = async (sessionData: any): Promise<any> => {
    const response = await api.post(URLs.closeSession, sessionData);
    return response.data;
};

export const useReply = () => {
    const mutation = useMutation({
        mutationFn: reply,
        onSuccess: (response) => {
            return response;
        },
    });

    return mutation;
};

export const useCloseSession = () => {
    const mutation = useMutation({
        mutationFn: closeSession,
        onSuccess: (response) => {
            return response;
        },
    });

    return mutation;
};