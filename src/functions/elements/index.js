import React, { useEffect } from 'react';
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
import ElementList from './components/elementList';
import { ATag, Article, Video, Button, Test, Input, Textarea, Form, Iframe, Nav, ObjectElement, ImageElement } from './components';

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
                <Route path="/elements/textarea"><Textarea /></Route>
                <Route path="/elements/form"><Form /></Route>
                <Route path="/elements/iframe"><Iframe /></Route>
                <Route path="/elements/nav"><Nav /></Route>
                <Route path="/elements/object"><ObjectElement /></Route>
                <Route path="/elements/image"><ImageElement /></Route>
  </div>;
}

export default Elements;