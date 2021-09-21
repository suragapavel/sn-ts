import {ActionsType} from "./store";


type FollowActionType = ReturnType<typeof followAC>
type UnFollowActionType = ReturnType<typeof unFollowAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
export type ActionUsersType = FollowActionType | UnFollowActionType | SetUsersActionType
type LocationType = {
    city: string
    country: string
}
export type UsersType = {
    id: number
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    message: string
    location: LocationType
}
let initialState = {
    users: [
        {
            id: 1,
            photoUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d01e9ee1-a1fc-49a0-b135-cfafd8254382-profile_image-300x300.png',
            followed: true,
            fullName: 'Dan',
            status: 'boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 2,
            photoUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d01e9ee1-a1fc-49a0-b135-cfafd8254382-profile_image-300x300.png',
            followed: true,
            fullName: 'Sasha',
            status: 'boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 3,
            photoUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d01e9ee1-a1fc-49a0-b135-cfafd8254382-profile_image-300x300.png',
            followed: true,
            fullName: 'Bob',
            status: 'boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
        {
            id: 4,
            photoUrl: 'https://static-cdn.jtvnw.net/jtv_user_pictures/d01e9ee1-a1fc-49a0-b135-cfafd8254382-profile_image-300x300.png',
            followed: false,
            fullName: 'Alex',
            status: 'boss',
            location: {city: 'Minsk', country: 'Belarus'}
        },
    ] as UsersType[],
}

export type InitialStateType = typeof initialState

export const usersReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case 'SET-USERS': {
            return {...state, users: [...state.users, ...action.users]}
        }
        default:
            return state
    }
}

export const followAC = (userId:number) => ({type: 'FOLLOW', userId} as const)
export const unFollowAC = (userId:number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsersAC = (users:UsersType[]) => ({type: 'SET-USERS', users} as const)
