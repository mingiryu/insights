import { initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import CollaboratorList from './components/collaboratorList';
import ActivityStream from './components/activityStream';
import HistoryLog from './components/historyLog';
import Wordcloud from './components/wordcloud';
import AggregationList from './components/aggregationList';

function App() {
    return (
        <React.Fragment>
            <CollaboratorList />
            <ActivityStream />
            <Wordcloud />
            <AggregationList />
            <HistoryLog />
        </React.Fragment>
    );
}

initializeBlock(() => <App />);
