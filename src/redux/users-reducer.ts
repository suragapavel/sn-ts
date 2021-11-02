
type FollowActionType = ReturnType<typeof follow>
type UnFollowActionType = ReturnType<typeof unFollow>
type SetUsersActionType = ReturnType<typeof setUsers>
type SetCurrentPageActionType = ReturnType<typeof setCurrentPage>
type setUsersTotalCountActionType = ReturnType<typeof setUsersTotalCount>
type toggleIsFetchingActionType = ReturnType<typeof toggleIsFetching>
export type ActionUsersType = FollowActionType | UnFollowActionType
                            | SetUsersActionType | SetCurrentPageActionType | setUsersTotalCountActionType
                            | toggleIsFetchingActionType
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
    isFetching: false,
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
        case 'TOGGLE-IS-FETCHING': {
            return {...state, isFetching: action.isFetching}

        }
        default:
            return state
    }
}

export const follow = (userId: number) => ({type: 'FOLLOW', userId} as const)
export const unFollow = (userId: number) => ({type: 'UNFOLLOW', userId} as const)
export const setUsers = (users: UsersType[]) => ({type: 'SET-USERS', users} as const)
export const setCurrentPage = (currentPage: number) => ({type: 'SET-CURRENT-PAGE', currentPage} as const)
export const setUsersTotalCount = (totalUsersCount: number) => ({type: 'SET-TOTAL-USERS-COUNT', count: totalUsersCount} as const)
export const toggleIsFetching = (isFetching: boolean) => ({type: 'TOGGLE-IS-FETCHING', isFetching} as const)

