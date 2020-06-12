import React from 'react'
import { cursor, globalConfig, session } from '@airtable/blocks';
import { Box, Heading, RecordCardList, useBase, useRecords, useWatchable } from "@airtable/blocks/ui";

const MAX_GLOBAL_HISTORY = 30;
const MAX_USER_ACTIVITY = 100;

let sessionChanges = [];

function HistoryLog() {
    useWatchable(cursor, ['activeTableId']);
    const base = useBase();
    let table = base.getTableByIdIfExists(cursor.activeTableId);
    if (!table) {
        table = base.tables[0]
    }
    const records = useRecords(table);
    
    let recordIds = globalConfig.get("globalHistory");
    if (!recordIds) {
        recordIds = [];
    }

    const newChanges = records.map(record => record._changeCount);
    const deltaChanges = sessionChanges.length ? sessionChanges.map((change, i) => newChanges[i] - change) : newChanges;
    const changesSum = deltaChanges.reduce((a, b) => a + b, 0);

    if (changesSum || !sessionChanges.length) {
        const currentUserId = session.currentUser.id;
        const currentUserActivity = globalConfig.get(`${currentUserId}_activity`);
        const newDate = new Date().toISOString().slice(0, 10);
        
        if (currentUserActivity) {
            const recentActivity = currentUserActivity.pop();
            const [recentDate, recentCount] = recentActivity;
            if (recentDate === newDate) {
                const newCount = recentCount + changesSum;
                currentUserActivity.push([recentDate, newCount]);
            } else {
                currentUserActivity.push(recentActivity);
                currentUserActivity.push([newDate, changesSum]);
                if (currentUserActivity.length > MAX_USER_ACTIVITY) {
                    currentUserActivity.shift();
                }
            }
            globalConfig.setAsync(`${currentUserId}_activity`, currentUserActivity);
        } else {
            globalConfig.setAsync(`${currentUserId}_activity`, [[newDate, changesSum]]);
        }

        const changedRecords = records.filter((record, i) => deltaChanges[i] > 0);
        const changedRecordIds = changedRecords.map(record => record.id);
        let newRecordIds = [...new Set([...changedRecordIds, ...recordIds])];
        if (newRecordIds.length > MAX_GLOBAL_HISTORY) {
            newRecordIds = newRecordIds.slice(0, MAX_GLOBAL_HISTORY);
        }
        globalConfig.setAsync("globalHistory", newRecordIds);

        sessionChanges = newChanges;
    }
    const newRecords = recordIds.map(recordId => records.find(record => record.id === recordId));
    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">History</Heading>
            <Box height={600}>
                <RecordCardList records={newRecords.filter(newRecord => newRecord)} />
            </Box>
        </Box>
    )
}

export default HistoryLog
