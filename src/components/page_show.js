import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/index';
import marked from 'marked';


class PageShow extends Component {
    componentWillMount() {
        this.props.fetchPage(this.props.params.title);
    }

    rawMarkup() {
        let rawMarkup = marked(this.props.page.items[0].fields.content, {sanitize: true});
        return { __html: rawMarkup };
    }

    render() {
        if (!this.props.page) {
            return(
                <div>Loading</div>
            );
        }
        return (
            <div>
                <h2 className="singlePostHeading">{this.props.page.items[0].fields.title}</h2>
                <div className="postText">
                    <span dangerouslySetInnerHTML={this.rawMarkup()} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        page: state.posts.page
    };
}

export default connect(mapStateToProps, { fetchPage })(PageShow);
