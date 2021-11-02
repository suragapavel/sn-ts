import React from 'react';
import s from './ProfileInfo.module.css'
import {Preloader} from "../../common/Preloader/Preloader";

type ProfileInfoType = {
    profile: any
}
const ProfileInfo = (props:ProfileInfoType) => {
    if (!props.profile){
        return <Preloader/>
    }
    return (
        <div>
            <div>
                <img className={s.imageProfile} src={'https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.jpg'}/>
            </div>
            <div className={s.descriptionBlock}>
                <img src={props.profile.photos.large}/>
                ava+ description
            </div>
        </div>
    )
}

export default ProfileInfo;