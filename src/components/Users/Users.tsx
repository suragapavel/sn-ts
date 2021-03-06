import React from "react";
import userPhoto from "../../assets/images/user.png";
import styles from './users.module.css'
import {toggleIsFollowingProgress, UsersType} from "../../redux/users-reducer";
import {NavLink} from "react-router-dom";
import {usersAPI} from "../../api/api";


type UsersPropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    onPageChanged: (pageNumber: number) => void
    toggleIsFollowingProgress: (followingInProgress: boolean, userId: number) => void
    followingInProgress: []
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
        <NavLink to={'/profile/' + u.id}>
            <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
        </NavLink>
    </div>
    <div>
        {u.followed
            ? <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                props.toggleIsFollowingProgress(true, u.id)
                usersAPI.unfollow(u.id)
                    .then(data => {
                        if (data.resultCode === 0) {
                            props.unFollow(u.id)
                        }
                        props.toggleIsFollowingProgress(false, u.id)

                    })
            }}>Unfollow</button>
            : <button disabled={props.followingInProgress.some(id => id === u.id)} onClick={() => {
                props.toggleIsFollowingProgress(true, u.id)
                usersAPI.follow(u.id)
                    .then(data => {
                        if (data.resultCode === 0) {
                            props.follow(u.id)
                        }
                        props.toggleIsFollowingProgress(false, u.id)
                    })
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