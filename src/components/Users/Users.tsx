import React from "react";
import {UsersType} from "../../redux/users-reducer";
import styles from './users.module.css'
import axios from "axios";
import userPhoto from '../../assets/images/user.png'
import {MapDispatchToProps} from "./UsersContainer";


type PropsType = MapDispatchToProps & {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
}

type ResponseType = {
    items: UsersType[]
    totalCount: number
    error: string
}

class Users extends React.Component<PropsType> { //type?
    componentDidMount() {
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.setUsers(response.data.items)
            this.props.setUsersTotalCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize)
        let pages = []
        for (let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
        return <div>
            <div>
                {pages.map(p => {
                    return <span onClick={(e) => this.onPageChanged(p)}
                                 className={this.props.currentPage === p ? styles.selectedPage : ''}>{p}</span>
                })}
            </div>
            {
                this.props.users.map((u) => <div key={u.id}>
<span>
    <div>
        <img src={u.photos.small !== null ? u.photos.small : userPhoto} className={styles.userPhoto}/>
    </div>
    <div>
        {u.followed
            ? <button onClick={() => {
                this.props.unFollow(u.id)
            }}>Unfollow</button>
            : <button onClick={() => {
                this.props.follow(u.id)
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
        </div>
    }
}


export default Users
