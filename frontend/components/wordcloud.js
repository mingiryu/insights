import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { base, cursor } from '@airtable/blocks';
import { Box, FieldPicker, Heading, useRecords, useWatchable } from "@airtable/blocks/ui";

const getWords = (records, field) => {
    if (!field) return [];
    let cellValues = [];
    records.forEach(record => {
        const cellValueString = record.getCellValueAsString(field.id);
        cellValueString.split(' ').forEach(value => cellValues.push(value));
    })
    const data = [...new Set(cellValues)].map(a => {
        const count = cellValues.filter(b => a.toLowerCase() === b.toLowerCase()).length
        return { value: a.toLowerCase(), count: count }
    });
    return data;
}

function Wordcloud() {
    useWatchable(cursor, ['activeTableId']);
    const table = base.getTableById(cursor.activeTableId);
    const [field, setField] = React.useState(table.primaryField);
    const records = useRecords(table);
    const fieldExists = table.getFieldByIdIfExists(field.id);
    const data = fieldExists ? getWords(records, field) : getWords(records, table.primaryField);
    return (
        <Box padding={2}>
            <Box display="flex" justifyContent="space-between">
                <Heading variant="caps" size="small" display="inline-flex">Wordcloud</Heading>
                <FieldPicker
                    field={fieldExists ? field : table.primaryField}
                    table={table}
                    onChange={newField => setField(newField)}
                    size="small"
                    width="110px"
                />
            </Box>
            <TagCloud
                minSize={10}
                maxSize={18}
                tags={data}
            />
        </Box>
    )
}

export default Wordcloud
