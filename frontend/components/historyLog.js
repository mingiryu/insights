import React from 'react'
import { base, cursor } from '@airtable/blocks';
import { Box, Heading, RecordCardList, useRecords, useWatchable } from "@airtable/blocks/ui";

function HistoryLog() {
    useWatchable(cursor, ['activeTableId']);
    const table = base.getTableById(cursor.activeTableId);
    const queryResult = table.selectRecords();
    const records = useRecords(queryResult);

    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">History</Heading>
            <Box height={200}>
                <RecordCardList records={records.slice(0, 5)} />
            </Box>
        </Box>
    )
}

export default HistoryLog
