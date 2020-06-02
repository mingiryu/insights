import React from 'react'
import { base, cursor } from '@airtable/blocks';
import { Box, Heading, RecordCardList, useGlobalConfig, useRecords, useWatchable } from "@airtable/blocks/ui";

function HistoryLog() {
    useWatchable(cursor, ['activeTableId']);
    const globalConfig = useGlobalConfig();
    const recordIds = new Set(globalConfig.get("globalHistory"));
    const table = base.getTableById(cursor.activeTableId);
    const records = useRecords(table);

    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">History</Heading>
            <Box height={200}>
                <RecordCardList records={records.filter(record => recordIds.has(record.id))} />
            </Box>
        </Box>
    )
}

export default HistoryLog
