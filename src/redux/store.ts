import {ActionPostType, profileReducer} from "./profile-reducer";
import {ActionMessageType, dialogsReducer} from "./dialogs-reducer";
import {sidebarReducer} from "./sidebar-reducer";

type PostsType = {
    id: number
    message: string
    likesCount: number
}

type DialogsType = {
    id: number
    name: string
}

type MessagesType = {
    id: number
    message: string
}

type ProfilePageType = {
    posts: Array<PostsType>
    newPostText: string
}

export type DialogsPageType = {
    dialogs: Array<DialogsType>
    messages: Array<MessagesType>
    newMessageBody: string
}

export type SideBarType = {}

export type RootStateType = {
    profilePage: ProfilePageType
    dialogsPage: DialogsPageType
    sidebar: SideBarType
}

export type StoreType = {
    _state: RootStateType
    updateNewPostText: (newText: string) => void
    addPost: () => void
    _onChange: () => void
    subscribe: (observer: () => void) => void
    getState: () => RootStateType
    dispatch: (action: ActionsType) => void
}
export type ActionsType = ActionPostType | ActionMessageType
export const store: StoreType = {
    _state: {
        profilePage: {
            posts: [
                {id: 1, message: 'Hi, how are you?', likesCount: 12},
                {id: 2, message: 'It\'s my first post', likesCount: 11},
                {id: 3, message: 'It\'s my first post', likesCount: 11},
                {id: 4, message: 'It\'s my first post', likesCount: 11},
            ],
            newPostText: 'it',
        },
        dialogsPage: {
            dialogs: [
                {id: 1, name: 'Dimych'},
                {id: 2, name: 'Andrew'},
                {id: 3, name: 'Sveta'},
                {id: 4, name: 'Sasha'},
                {id: 5, name: 'Victor'},
                {id: 6, name: 'Valera'},
            ],
            messages: [
                {id: 1, message: 'Hi'},
                {id: 2, message: 'How is your it-kamasutra?'},
                {id: 3, message: 'Yo'},
                {id: 4, message: 'Yo'},
                {id: 5, message: 'Yo'},
            ],
            newMessageBody: ''
        },
        sidebar: {}
    },
    updateNewPostText(newText: string) {
        this._state.profilePage.newPostText = newText
        this._onChange()
    },
    addPost() {
        const newPost: PostsType = {
            id: new Date().getTime(),
            message: this._state.profilePage.newPostText,
            likesCount: 0,
        }
        this._state.profilePage.posts.push(newPost)
        this._state.profilePage.newPostText = ''
        this._onChange()
    },
    _onChange() {
        console.log('state changed')
    },
    subscribe(observer: () => void) {
        this._onChange = observer
    },
    getState() {
        return this._state
    },
    dispatch(action) {

        this._state.profilePage = profileReducer(this._state.profilePage, action)
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action)
        this._state.sidebar = sidebarReducer(this._state.sidebar, action)
        this._onChange()

    }
}


