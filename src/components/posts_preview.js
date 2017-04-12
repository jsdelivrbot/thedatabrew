import React from 'react';
import { Link } from 'react-router';

const PostPreview = (props) => {
    const { post } = props;
    return (
        <Link to={"/post/" + post.sys.id} className="link" >
            <div  style={props.style} className={props.type}>
                <div className="postPreviewOverlay">
                    <h3 className="postPreviewHeadline">{post.fields.title}</h3>
                </div>
            </div>
        </Link>
    );
};

export default PostPreview;
