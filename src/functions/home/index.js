import React, { useEffect } from 'react';
import { useRouteMatch } from 'react-router-dom';

function Home () { 
    let match = useRouteMatch() 
    console.log(match)
    useEffect(() => {
    })
    return (
        <div>this is home</div>
    )
}

export default Home;