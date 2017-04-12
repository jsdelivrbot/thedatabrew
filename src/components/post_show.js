import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchAsset } from '../actions/index';
import marked from 'marked';


class PostShow extends Component {
    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    rawMarkup() {
        let rawMarkup = marked(this.props.post.fields.post, {sanitize: true});
        return { __html: rawMarkup };
    }

    prepareGist() {
        return { __html: this.props.post.fields.code};
    }


    render() {
        if(!this.props.post) {
            return <div>Loading</div>;
        }

        if(!this.props.asset || this.props.asset.sys.id != this.props.post.fields.image.sys.id) {
            this.props.fetchAsset(this.props.post.fields.image.sys.id);
            return <div>Loading</div>;
        }
        const style = {
            backgroundImage: `url(${this.props.asset.fields.file.url})`
        };
        return (
            <div>
                <h2 className="singlePostHeading">{this.props.post.fields.title}</h2>
                <div style={style} className="postImage"></div>
                <div className="postText">
                    <span dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>
                <div className="">
                    <div dangerouslySetInnerHTML={this.prepareGist()} ></div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        post: state.posts.post,
        asset: state.posts.asset
    };
}

export default connect(mapStateToProps, { fetchPost, fetchAsset })(PostShow);
