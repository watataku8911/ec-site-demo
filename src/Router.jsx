import React from 'react';
import {Route, Switch} from 'react-router';
import {SignIn, Home, SignUp, Reset, ProductEdit} from './templates/index';
import Auth from './templates/Auth';


const Router = () => {
    return (
        <Switch>
            <Route exact path="//reset" component={Reset} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            
            <Auth>
                <Route exact path="(/)?" component={Home} />
                <Route exact path="/productedit" component={ProductEdit} />
            </Auth>
        </Switch>
    
    )
}
export default Router;