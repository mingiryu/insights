import React from 'react';
import CollaboratorList from './components/collaboratorList';
import ActivityStream from './components/activityStream';
import HistoryLog from './components/historyLog';
import Wordcloud from './components/wordcloud';
import AggregationList from './components/aggregationList';

import { initializeBlock, useViewport } from '@airtable/blocks/ui';
import { globalConfig } from '@airtable/blocks';
import { Box, Heading, Text } from "@airtable/blocks/ui";

const PermissionIssue = ({ reason }) => {
    return (
        <React.Fragment>
            <Box padding={2}>
                <Heading variant="caps" size="small">Permission Issue</Heading>
                <Text>{reason}</Text>
            </Box>
        </React.Fragment>
    );
}

const FullScreenLayout = () => {
    return (
        <React.Fragment>
            <Box display="flex">
                <Box flex="50%">
                    <CollaboratorList />
                    <ActivityStream />
                    <Wordcloud />
                    <AggregationList />
                </Box>
                <Box flex="50%">
                    <HistoryLog />
                </Box>
            </Box>
        </React.Fragment>
    )
}

const StandardLayout = () => {
    return (
        <React.Fragment>
            <Box display="flex" flexDirection="column">
                <Box>
                    <CollaboratorList />
                    <ActivityStream />
                    <Wordcloud />
                    <AggregationList />
                </Box>
                <Box>
                    <HistoryLog />
                </Box>
            </Box>
        </React.Fragment>
    )
}

function App() {
    const viewport = useViewport();
    const setUnknownKeyCheckResult = globalConfig.checkPermissionsForSet();
    if (!setUnknownKeyCheckResult.hasPermission) {
        return (<PermissionIssue reason={setUnknownKeyCheckResult.reasonDisplayString} />);
    }

    if (viewport.isFullscreen) {
        return (
            <FullScreenLayout />
        )
    }

    return (
        <StandardLayout />
    );
}

initializeBlock(() => <App />);
