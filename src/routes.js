import React from 'react';
import { Route, IndexRoute, Router, browserHistory } from 'react-router';

import App from './components/app';
import PostsIndex from './components/posts_index';
import PostShow from './components/post_show';
import PageShow from './components/page_show';

export default(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={PostsIndex} />
            <Route path="/post/:id" component={PostShow} />
            <Route path="/page/:title" component={PageShow} />
        </Route>
    </Router>
);
