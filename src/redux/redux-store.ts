import {combineReducers, createStore} from "redux";
import {profileReducer} from "./profile-reducer";
import {sidebarReducer} from "./sidebar-reducer";
import {dialogsReducer} from "./dialogs-reducer";
import {StoreType} from "./store";
import {usersReducer} from "./users-reducer";

export const rootReducers = combineReducers({
    profilePage:profileReducer,
    dialogsPage:dialogsReducer,
    sidebar:sidebarReducer,
    usersPage: usersReducer
})

export type AppStateType = ReturnType<typeof rootReducers>

export let store: any = createStore(rootReducers)

