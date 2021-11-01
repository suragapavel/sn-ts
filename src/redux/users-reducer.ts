
type FollowActionType = ReturnType<typeof followAC>
type UnFollowActionType = ReturnType<typeof unFollowAC>
type SetUsersActionType = ReturnType<typeof setUsersAC>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPageAC>
type setUsersTotalCountActionType = ReturnType<typeof setUsersTotalCountAC>
export type ActionUsersType = FollowActionType | UnFollowActionType
                            | SetUsersActionType | SetCurrentPageActionType | setUsersTotalCountActionType
type LocationType = {
    city: string
    country: string
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type UsersType = {
    id: number
    name: string
    photos: PhotosType
    photoUrl: string
    followed: boolean
    fullName: string
    status: string
    message: string
    location: LocationType
}
let initialState = {
    users: [] as UsersType[],
    pageSize: 5,
    totalUsersCount: 0,
    currentPage: 1,
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
            return {...state, users: action.users}
        }
        case 'SET-CURRENT-PAGE': {
            return {...state, currentPage: action.currentPage}
        }
        case 'SET-TOTAL-USERS-COUNT': {
            return {...state, totalUsersCount: action.count}
        }
        default:
            return state
    }
}

export const followAC = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unFollowAC = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsersAC = (users: UsersType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPageAC = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setUsersTotalCountAC = (totalUsersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', count: totalUsersCount} as const)

