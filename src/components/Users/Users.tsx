import React from "react";
import {UsersType} from "../../redux/users-reducer";
import styles from './users.module.css'
import {MapDispatchToProps} from "./UsersContainer";

type UsersPropsType = MapDispatchToProps & {
    users: UsersType[]
}
export const Users = (props: UsersPropsType) => {
    if(props.users.length===0) {
        props.setUsers([{
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
            }] as UsersType[])
    }
    return <div>
        {
            props.users.map(u => <div key={u.id}>
<span>
    <div>
        <img src={u.photoUrl} className={styles.userPhoto}/>
    </div>
    <div>
        {u.followed
            ? <button onClick={()=>{props.unFollow(u.id)}}>Unfollow</button>
            : <button onClick={()=>{props.follow(u.id)}}>Follow</button>
        }
    </div>
    <span>
        <span><div>{u.fullName}</div>
            <div>{u.status}</div>
        </span>
        <span><div>{u.location.city}</div>
            <div>{u.location.country}</div></span>
    </span>
</span>
            </div>)
        }
    </div>
}