import React, { useEffect } from 'react';
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
import ElementList from './components/elementList';
import { ATag, Article, Video, Button, Test, Input } from './components';

function Elements() {
  let match = useRouteMatch();
  let history = useHistory();
  useEffect(() => {});
  return <div>
                <Route path="/elements/" exact><ElementList /></Route>
                <Route path="/elements/a"><ATag /></Route>
                <Route path="/elements/video"><Video /></Route>
                <Route path="/elements/article"><Article /></Route>
                <Route path="/elements/button"><Button /></Route>
                <Route path="/elements/test"><Test /></Route>
                <Route path="/elements/input"><Input /></Route>
  </div>;
}

export default Elements;