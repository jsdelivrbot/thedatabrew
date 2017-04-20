import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPage } from '../actions/index';
import marked from 'marked';


class PageShow extends Component {
    constructor(props) {
        super(props);
        this.state = { page: null };
    }

    componentWillMount() {
        this.props.fetchPage(this.props.params.title);
        this.setState({ page: this.props.params.title });
    }

    // if react router updates, new content needs to be loaded from API, however every time new content will call this function in a loop, therefore setting state is needed to stop a continous loop
    componentWillReceiveProps(nextProps) {
        if(this.state.page == nextProps.params.title) return;
        
        this.props.fetchPage(this.props.params.title);

        if(nextProps.params.title == this.props.params.title) {
            this.setState({ page: this.props.params.title});
        }
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
