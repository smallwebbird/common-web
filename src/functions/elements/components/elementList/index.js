import React from 'react';
import routes from '../../routes';
import { useHistory } from 'react-router-dom';

function ElementList () {
    let history = useHistory();
    function clickItem (path) {
        history.push(`/elements${path}`);
    }
    return (
        <div>
            {
                routes.map((item, index) => {
                    return <div key={index} onClick={() => {clickItem(item.path)}}>{item.name}</div>
                })
            }
        </div>
    )
}

export default ElementList;