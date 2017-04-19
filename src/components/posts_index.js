import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPosts, fetchAssets } from '../actions/index';
import PostPreview from './posts_preview.js';

class PostsIndex extends Component {
    componentWillMount() {
        this.props.fetchPosts();
        this.props.fetchAssets();
    }

    findImageLink(id) {
        let image = this.props.assets.find(asset => {
            if(asset.sys.id == id) {
                return asset;
            }
        });
        return image.fields.file.url;
    }

    render() {
        let majorPosts = 0;
        let otherMajorPosts = 0;
        // if no posts returned yet from API show loading div
        if(this.props.all == undefined || this.props.assets == undefined) {
            return(
                <div>Loading</div>
            );
        }
        console.log(this.props.all);
        // once posts returned from API show posts
        return (
            <div className="previewPosts">
                <div className="majorPostsColumn">
                    {this.props.all.map(post => {
                        // if big post && the amount of big posts is smaller than the whole number of posts / 3
                        if(post.fields.majorPost && majorPosts < Math.ceil(this.props.all.length/3)) {
                            // the post's background image needs to be returned from the assets
                            const style = {
                                backgroundImage: `url(${this.findImageLink(post.fields.image.sys.id)})`
                            };
                            majorPosts++;
                            return (
                                <PostPreview post={post} style={style} type={"majorPostPreview"} key={post.sys.id} />
                            );
                        }
                    })}
                </div>

                <div className="smallPostsColumn">
                    {this.props.all.map(post => {
                        // if big post
                        if(post.fields.majorPost && otherMajorPosts < Math.ceil(this.props.all.length/3)) {
                            otherMajorPosts++;
                            return;
                            // otherwise normal/small post
                        } else {
                            const style = {
                                backgroundImage: `url(${this.findImageLink(post.fields.image.sys.id)})`
                            };
                            return (
                                <PostPreview post={post} style={style} type={"smallPostPreview"} key={post.sys.id} />
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    if(state.posts.all.items) {
        // sort the posts according to date
        return {
            all: state.posts.all.items.sort((a, b) => { return new Date(b.fields.date) - new Date(a.fields.date);}),
            assets: state.posts.assets.items
        };
    } else {
        return {
            all: state.posts.all.items,
            assets: state.posts.assets.items
        };
    }
}

export default connect(mapStateToProps, { fetchPosts, fetchAssets })(PostsIndex);
