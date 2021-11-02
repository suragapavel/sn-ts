import React from 'react';
import Profile from "./Profile";
import axios from "axios";
import {UsersType} from "../../redux/users-reducer";
import {connect} from "react-redux";
import {setUserProfile} from "../../redux/profile-reducer";
import {RouteComponentProps, withRouter} from "react-router";
import {RootStateType} from "../../redux/store";

type PathParamsType = {
    userId: string
}
type MapStatePropsType = {
    profile: any
}
type MapDispatchPropsType = {
    setUserProfile: (profile: any) => void
}

type OwnPropsType = MapStatePropsType & MapDispatchPropsType
type CommonPropsType = RouteComponentProps<PathParamsType> & OwnPropsType

class ProfileContainer extends React.Component<CommonPropsType> {

    componentDidMount() {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = '2'
        }
        axios.get<ResponseType>(`https://social-network.samuraijs.com/api/1.0/profile/` + userId).then(response => {
            this.props.setUserProfile(response.data)
        })
    }

    render() {
        return (
            <Profile {...this.props} profile={this.props.profile}/>
        )
    }
}

let mapStateToProps = (state: RootStateType):MapStatePropsType => ({
    profile: state.profilePage.profile
})

let WithURLDataContainerComponent = withRouter(ProfileContainer)

export default connect(mapStateToProps, {setUserProfile})(WithURLDataContainerComponent);