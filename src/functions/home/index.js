import React, { useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';

function Home () { 
    let history = useHistory()
    const toElement = () => {
        history.push('/elements')
    }
    return (
        <div>
            <button onClick={toElement}>元素</button>
        </div>
    )
}

export default Home;