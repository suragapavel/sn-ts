import React, {ChangeEvent} from 'react';
import {addPostAC, PostsType, updateNewPostAC} from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {AppStateType} from "../../../redux/redux-store";
import {Dispatch} from "redux";

type MapStatePropsType = {
    posts: PostsType[]
    newPostText: string
}

type MapDispatchPropsType = {
    addPost: () => void
    onPostChange: (text:string) => void
}
export type PostsPropsType = MapStatePropsType & MapDispatchPropsType
let mapStateToProps = (state: AppStateType):MapStatePropsType => {
    return {
        posts: state.profilePage.posts,
        newPostText: state.profilePage.newPostText
    }
}
let mapDispatchToProps = (dispatch: Dispatch):MapDispatchPropsType => {
    return {
        addPost: () => {
            dispatch(addPostAC())
        },
        onPostChange: (text: string) => {
            dispatch(updateNewPostAC(text))
        },
    }
}

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)
