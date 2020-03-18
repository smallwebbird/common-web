import React, { useEffect } from 'react';
import { useRouteMatch, Route, useHistory } from 'react-router-dom';
import ElementList from './components/elementList';
import routes from './routes';

function Elements () {  
    let match = useRouteMatch()
    let history = useHistory();
    useEffect(() => {

    })
    return (
            <div>
                <Route path="/elements/" exact><ElementList /></Route>
                {
                    routes.map((item, index) => (
                        <Route path={`/elements${item.path}`} key={index}>{item.component()}</Route>
                    ))
                }
            </div>
    )
}

export default Elements;