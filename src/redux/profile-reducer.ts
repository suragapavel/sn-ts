import {ActionsType} from "./store";

type AddPostActionType = ReturnType<typeof addPostAC>
type UpdateNewTextActionType = ReturnType<typeof updateNewPostAC>
export type ActionPostType = AddPostActionType | UpdateNewTextActionType
export type PostsType = {
    id: number
    message: string
    likesCount: number
}
export type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}
let initialState = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'It\'s my first post', likesCount: 11},
        {id: 4, message: 'It\'s my first post', likesCount: 11},
    ] as PostsType[],
    newPostText: 'it',
}

export type InitialStateType = typeof initialState


export const profileReducer = (state: InitialStateType = initialState, action: ActionsType):InitialStateType => {
    switch (action.type) {
        case 'ADD-POST': {
            const newPost: PostsType = {
                id: new Date().getTime(),
                message: state.newPostText,
                likesCount: 0,
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            }
        }
        case 'UPDATE-NEW-TEXT': {
            return {
                ...state,
                newPostText: action.newText
            }
        }
        default:
            return state
    }
}

export const addPostAC = () => {
    return {
        type: 'ADD-POST'
    } as const
}
export const updateNewPostAC = (newText: string) => {
    return {
        type: 'UPDATE-NEW-TEXT',
        newText: newText
    } as const
}