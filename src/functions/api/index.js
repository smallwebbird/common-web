import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import { FileSys, ApiList, Battery, HistoryApi, CookieApi, IndexDb} from './components';

export default function Api () {
    return (
        <div>
            <Route path="/api" exact>
                <ApiList />
            </Route>
            <Route path="/api/filesystem">
                <FileSys />
            </Route>
            <Route path="/api/battery">
                <Battery />
            </Route>
            <Route path="/api/history">
                <HistoryApi />
            </Route>
            <Route path="/api/indexDb">
                <IndexDb />
            </Route>
            <Route path="/api/cookie">
                <CookieApi />
            </Route>
        </div>
    )
}