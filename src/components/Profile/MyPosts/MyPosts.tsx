import React, {ChangeEvent, RefObject} from 'react';
import s from './MyPosts.module.css'
import Post from "./Post/Post";
import {ActionsType} from '../../../redux/store'
import {PostsPropsType} from "./MyPostsContainer";
import {PostsType} from "../../../redux/profile-reducer";

type MyPostsPropsType = PostsPropsType &  {
    updateNewPostText: (text:string)=> void
    addPost: () => void
    posts: PostsType[]
    newPostText: string
}

export const MyPosts: React.FC<PostsPropsType> = (props) => {

    let postsElements = props.posts.map((p: PostsType) => <Post message={p.message} likesCount={p.likesCount}/>)
    let newPostElement = React.createRef<any>()
    const onAddPost = () => {
        props.addPost()
    }
    const onPostChange = () => {
        let text = newPostElement.current.value
        props.onPostChange(text)
    }
    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea onChange={onPostChange} ref={newPostElement} value={props.newPostText}/>
                </div>
                <div>
                    <button onClick={onAddPost}>Add post</button>
                </div>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
}

export default MyPosts;