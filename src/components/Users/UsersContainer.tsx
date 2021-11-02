import {connect} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {
    follow,
    setCurrentPage,
    setUsers,
    setUsersTotalCount, toggleIsFetching,
    unFollow,
    UsersType
} from "../../redux/users-reducer";
import {Dispatch} from "redux";
import React from "react";
import axios from "axios";
import {Users} from "./Users";
import preloader from '../../assets/images/loader.gif'
import {Preloader} from "../common/Preloader/Preloader";

type ResponseType = {
    items: UsersType[]
    totalCount: number
    error: string
}
export type PropsType = {
    users: UsersType[]
    totalUsersCount: number
    pageSize: number
    currentPage: number
    isFetching: boolean
}

export type MapDispatchToProps = {
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    setUsers: (users: UsersType[]) => void
    setCurrentPage: (pageNumber: number) => void
    setUsersTotalCount: (totalCount: number) => void
    toggleIsFetching: (isFetching:boolean) => void
}

class UsersContainer extends React.Component<PropsType & MapDispatchToProps> {
    componentDidMount() {
        this.props.toggleIsFetching(true)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then(response => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(response.data.items)
            this.props.setUsersTotalCount(response.data.totalCount)
        })
    }

    onPageChanged = (pageNumber: number) => {
        this.props.setCurrentPage(pageNumber)
        this.props.toggleIsFetching(true)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.toggleIsFetching(false)
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize} currentPage={this.props.currentPage}
                   onPageChanged={this.onPageChanged} users={this.props.users}
                   follow={this.props.follow} unFollow={this.props.unFollow}
            />
        </>
    }
}


const mapStateToProps = (state: AppStateType): PropsType => {
    return {
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        totalUsersCount: state.usersPage.totalUsersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
    }
}
// const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId))
//         },
//         unFollow: (userId) => {
//             dispatch(unFollowAC(userId))
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users))
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber))
//         },
//         setUsersTotalCount: (totalCount) => {
//             dispatch(setUsersTotalCountAC(totalCount))
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching))
//         },
//     }
// }

export default connect(mapStateToProps, {
    follow, unFollow, setUsers,
    setCurrentPage, setUsersTotalCount,
    toggleIsFetching,})(UsersContainer)