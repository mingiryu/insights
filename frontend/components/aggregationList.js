import React from 'react'
import { base, cursor } from '@airtable/blocks';
import {Box, FieldPicker, Heading, useRecords, useWatchable} from '@airtable/blocks/ui';
import Aggregation from './aggregation';

function AggregationList() {
    useWatchable(cursor, ['activeTableId']);
    const table = base.getTableById(cursor.activeTableId);
    const [field, setField] = React.useState(table.primaryField);
    const fieldExists = table.getFieldByIdIfExists(field.id);
    const records = useRecords(table, {fields: [fieldExists ? field : table.primaryField]});

    const availableAggregators = fieldExists ? field.availableAggregators : table.primaryField.availableAggregators;
    return (
        <Box padding={2}>
            <Box display="flex" justifyContent="space-between">
                <Heading variant="caps" size="small" display="inline-flex">Aggregation</Heading>
                <FieldPicker
                    field={fieldExists ? field : table.primaryField}
                    table={table}
                    onChange={newField => setField(newField)}
                    size="small"
                    width="130px"
                />
            </Box>
            <Box display="flex">
            {availableAggregators
                // Every field has a 'None' aggregator which outputs a
                // blank. It's not very interesting to look at, so we
                // filter it out.
                .filter(aggregator => aggregator.key !== 'none')
                .map((aggregator, key) => (
                    <Aggregation
                        key={key}
                        field={fieldExists ? field : table.primaryField}
                        aggregator={aggregator}
                        records={records}
                    />
                ))}
            </Box>
        </Box>
    )
}

export default AggregationList
