import React from "react";
import userPhoto from "../../assets/images/user.png";
import styles from './users.module.css'
import {UsersType} from "../../redux/users-reducer";


type UsersPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
}


export let Users = (props: UsersPropsType) => {
    let pagesCount = Math.ceil(props.totalUsersCount / props.pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    return (
        <div>
            <div>
                {pages.map(p => {
                    return <span onClick={(e) => props.onPageChanged(p)}
                                 className={props.currentPage === p ? styles.selectedPage : ''}>{p}</span>
                })}
            </div>
            {
                props.users.map((u) => <div key={u.id}>
<span>
    <div>
        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
    </div>
    <div>
        {u.followed
            ? <button onClick={() => {
                props.unFollow(u.id)
            }}>Unfollow</button>
            : <button onClick={() => {
                props.follow(u.id)
            }}>Follow</button>
        }
    </div>
    <span>
        <span><div>{u.name}</div>
            <div>{u.status}</div>
        </span>
        <span><div>{'u.location.city'}</div>
            <div>{'u.location.country'}</div></span>
    </span>
</span>
                </div>)
            }
        </div>)
}