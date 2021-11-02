import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {UsersType} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";


type ProfileContainerPropsType = {
}
type ResponseType = {
    items: UsersType[]
    totalCount: number
    error: string
}
class ProfileContainer extends React.Component<any>{

    componentDidMount() {
        //this.props.toggleIsFetching(true)
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/2`).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
                <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state:any) => ({
    profile: state.profilePage.profile
})

export default connect(mapStateToProps, {setUserProfile})(ProfileContainer);