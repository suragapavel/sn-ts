type SetUserDataActionType = ReturnType<typeof setAuthUserData>

export type ActionUsersType = SetUserDataActionType

let initialState = {
    userId: 0,
    email: 'null',
    login: '',
    isAuth: false,
}

export type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionUsersType): InitialStateType => {
    switch (action.type) {
        case 'SET-USER-DATA':
            return {
                ...state,
                ...action.data,
                isAuth: true,
            }
        default:
            return state
    }
}

export const setAuthUserData = (userId: number, email: string, login: string) => ({type: 'SET-USER-DATA', data: {userId, email, login}} as const)

