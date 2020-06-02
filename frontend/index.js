import { initializeBlock } from '@airtable/blocks/ui';
import React from 'react';
import CollaboratorList from './components/collaboratorList';
import ActivityStream from './components/activityStream';
import HistoryLog from './components/historyLog';
import Wordcloud from './components/wordcloud';

function App() {
    return (
        <React.Fragment>
            <CollaboratorList />
            <ActivityStream />
            <HistoryLog />
            <Wordcloud />
        </React.Fragment>
    );
}

initializeBlock(() => <App />);
