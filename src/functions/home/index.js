import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

function Home () { 
    let history = useHistory()
    const toElement = (path) => {
        history.push(path)
    }
    return (
        <div>
            <button onClick={toElement.bind(this, '/elements')}>元素</button>
            <button onClick={toElement.bind(this, '/api')}>api</button>
        </div>
    )
}

export default Home;