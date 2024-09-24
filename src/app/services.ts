import api from '@/common/configs/axios';
import { useQuery, useMutation } from '@tanstack/react-query';


const URLs = {
    login: "auth/api/v1/login",
    logout: "auth/api/v1/logout?username="
}

export const login = async (newData: any): Promise<any> => {
    const response = await api.post(URLs.login, newData);
    return response.data;
};

export const logout = async (newData: any): Promise<any> => {
    const response = await api.post(URLs.logout, newData);
    return response.data;
};

export const useLogin = () => {
    const mutation = useMutation({
        mutationFn: login,
        onSuccess: (response) => {
            return response;
        },
    });

    return mutation;
};

export const useLogout = () => {
    const mutation = useMutation({
        mutationFn: logout,
        onSuccess: (response) => {
            return response;
        },
    });

    return mutation;
};





export const fetchData = async (): Promise<any> => {
    const response = await api.get('/data');
    return response.data;
};


export const useFetchCountries = () => {

    const { status, isError, error, data } = useQuery({
        queryKey: ['countries'],
        queryFn: () => fetchData(),
    })

    return {
        data,
        status,
        isError,
        error,
    };
};
