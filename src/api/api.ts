import axios from "axios";
import {UsersType} from "../redux/users-reducer";

type ResponseType = {
    items: UsersType[]
    totalCount: number
    error: string
    resultCode: number
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "0b5075e4-e8c6-43c4-adf9-76f0be0fd25f"
    },
})

export const usersAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<ResponseType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => response.data)
    },

    unfollow(id: number) {
        return instance.delete<ResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${id}`)
            .then(response => response.data)
    },
    follow(id: number) {
        return instance.post<ResponseType>(`https://social-network.samuraijs.com/api/1.0/follow/${id}`, {})
            .then(response => response.data)
    }
}