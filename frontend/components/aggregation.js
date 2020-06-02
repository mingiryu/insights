import React from 'react'
import { Box, Text } from '@airtable/blocks/ui';

function Aggregation({ field, aggregator, records }) {
    // `aggregateToString()` returns a human-readable string for the
    // aggregate value. If you just want a number, you can call
    // `aggregate()`

    return (
        <Box padding={1} >
            <Text size="small" textColor="light">
                {aggregator.displayName}
            </Text>
            <Text fontWeight="strong">{aggregator.aggregateToString(records, field)}</Text>
        </Box>
    );
}
export default Aggregation
