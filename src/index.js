import React, { Fragment } from 'react';
import ReactDom from 'react-dom';
import List from './containers/list';
import Nav from './components/nav/nav';

import 'bootswatch/dist/lux/bootstrap.min.css';

const App = ()=>{
    return (
        <Fragment>
            <Nav />
        <main className="bg-dark">
        <div className="container">
            <List />
        </div>
    </main>
    </Fragment>);
}


ReactDom.render( <App />, document.getElementById('root'));