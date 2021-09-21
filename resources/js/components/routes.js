import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import  Template  from './Template'
import { ViewBook } from './viewbook'
export function Routes(){
return(
    <Router>
    <Route path="/" component={Template} exact={true} />
    <Route path="/view-book/:id" component={ViewBook} exact={true} />
    </Router>
)
}

if (document.getElementById('root')) {
    ReactDOM.render(<Routes />, document.getElementById('root'));
}
