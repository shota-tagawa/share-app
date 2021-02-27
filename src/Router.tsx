import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { Front, Home, SignIn, SignUp, AddPost, Post, ProfileEdit, Profile } from './templates';
import Auth from './Auth';
import history from './history';



const Router = () => {

  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/" component={Front} />
        <Auth>
          <Route path="/profile/:id" component={Profile} />
          <Route exact path="/profileedit" component={ProfileEdit} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/addpost" component={AddPost} />
          <Route path="/post/:id" component={Post} />
        </Auth>
      </Switch>
    </ConnectedRouter>
  )
}

export default Router;