import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost, fetchAsset } from '../actions/index';
import marked from 'marked';
import Highlight from 'react-highlight';
import ReactDisqusThread from 'react-disqus-thread';


class PostShow extends Component {
    constructor(props) {
        super(props);

        this.state = {showCode: false};
        this.setShowCodeState = this.setShowCodeState.bind(this);
    }

    componentWillMount() {
        this.props.fetchPost(this.props.params.id);
    }

    rawMarkup() {
        let rawMarkup = marked(this.props.post.fields.post, {sanitize: true});
        return { __html: rawMarkup };
    }

    showCode() {
        if(this.state.showCode) {
            return (
                <div className="postText">
                    <h3>The code used in this post</h3>
                    <Highlight className={this.props.post.fields.codeLanguage}>
                        {this.props.post.fields.code}
                    </Highlight>
                </div>
            );
        }
    }

    showCodeButton() {
        if(this.props.post.fields.code && !this.state.showCode) {
            return (
                <div  className="postText">
                    <button className="showCodeButton" onClick={this.setShowCodeState}>Show Code used in this post</button>
                </div>
            );
        }
        if(this.props.post.fields.code && this.state.showCode) {
            return (
                <div className="postText">
                    <button className="showCodeButton" onClick={this.setShowCodeState}>Hide Code used in this post</button>
                </div>
            );
        }
    }

    setShowCodeState() {
        this.setState(prevState => ({
            showCode: !prevState.showCode
        }));
    }

    handleNewComment() {
        comment => console.log(comment);
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
                {this.showCodeButton()}
                {this.showCode()}
                <div className="postText">
                    <ReactDisqusThread
                        shortname="databrew-1"
                        identifier={this.props.post.sys.id}
                        title={this.props.post.fields.title}
                        url={`http://thedatabrew.surge.sh/post/${this.props.post.sys.id}`}
                        category_id=""
                        onNewComment={this.handleNewComment} />
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
