import React from 'react';
import s from './Post.module.css'

const Post = (props) => {

    return (
        <div className={s.posts}>
            <div className={s.item}>
                <img
                    src={'https://avatars.mds.yandex.net/get-kino-vod-films-gallery/28788/47e2fd514411e18b76af786d7417062d/600x380'}/>
                {props.message}
                <div>
                    <span>like</span>
                </div>
            </div>
        </div>
    )
}

export default Post;