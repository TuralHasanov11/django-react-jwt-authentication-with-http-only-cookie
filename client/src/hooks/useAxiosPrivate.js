import { axiosPrivateInstance } from "../axios";
import { useEffect } from 'react'
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";

export default function useAxiosPrivate() {

    const { accessToken, setAccessToken, csrftoken, user } = useAuth()
    const refresh = useRefreshToken()

    useEffect(() => {
        const requestIntercept = axiosPrivateInstance.interceptors.request.use(
            (config) => {
                if (!config.headers["Authorization"]) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                    config.headers['X-CSRFToken'] = csrftoken
                }
                return config
            },
            (error) => Promise.reject(error)
        )

        const responseIntercept = axiosPrivateInstance.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403 || error?.response?.status === 401) && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
                    setAccessToken(newAccessToken)
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken
                    return axiosPrivateInstance(prevRequest)
                }
                return Promise.reject(error);
            }
        )

        return () => {
            axiosPrivateInstance.interceptors.request.eject(requestIntercept)
            axiosPrivateInstance.interceptors.response.eject(responseIntercept)
        }
    }, [accessToken, user])

    return axiosPrivateInstance
}