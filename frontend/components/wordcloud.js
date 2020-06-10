import React from 'react'
import { TagCloud } from 'react-tagcloud'
import { cursor } from '@airtable/blocks';
import { Box, FieldPicker, Heading, useBase, useRecords, useWatchable } from "@airtable/blocks/ui";

const getWords = (records, field) => {
    if (!field) return [];
    let cellValues = [];
    records.forEach(record => {
        const cellValueString = record.getCellValueAsString(field.id);
        if (cellValueString) {
            cellValueString.split(' ').forEach(value => cellValues.push(value.trim().replace(',','').replace('.','')));
        }
    })
    const data = [...new Set(cellValues)].map(a => {
        const count = cellValues.filter(b => a.toLowerCase() === b.toLowerCase()).length
        return { value: a.toLowerCase(), count: count }
    });
    return data;
}

function Wordcloud() {
    useWatchable(cursor, ['activeTableId']);
    const base = useBase();
    let table = base.getTableByIdIfExists(cursor.activeTableId);
    if (!table) {
        table = base.tables[0]
    }
    const [field, setField] = React.useState(table.primaryField);
    const fieldExists = table.getFieldByIdIfExists(field.id);
    const records = useRecords(table, {fields: fieldExists ? [field] : [table.primaryField]});
    const data =  getWords(records, fieldExists ? field : table.primaryField);
    return (
        <Box padding={2}>
            <Box display="flex" justifyContent="space-between">
                <Heading variant="caps" size="small" display="inline-flex">Wordcloud</Heading>
                <FieldPicker
                    field={fieldExists ? field : table.primaryField}
                    table={table}
                    onChange={newField => setField(newField)}
                    size="small"
                    width="130px"
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
