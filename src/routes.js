import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Landing from './components/Destiny/landing/Landing'
import News from './components/Destiny/news/News';
import Events from './components/Destiny/events/Events';
import Media from './components/Destiny/media/Media';

export default (
  <Switch>
    <Route exact path='/' component={Landing}/>
    <Route path='/news' component={News}/>
    <Route path='/events' component={Events}/>
    <Route path='/media' component={Media} />
  </Switch>
)