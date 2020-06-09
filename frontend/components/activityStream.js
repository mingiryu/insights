import React from 'react'
import { base, globalConfig } from '@airtable/blocks';
import { Box, Heading, SelectButtons } from "@airtable/blocks/ui";
import { ResponsiveStream } from '@nivo/stream'

const dateRangeOptions = [
    { value: 7, label: "7 days" },
    { value: 30, label: "30 days" },
    { value: 90, label: "90 days" },
];

const tooltipMemo = {};

const getTooltipLabel = (d) => {
    const name = tooltipMemo[d.id];
    if (name) {
        return name;
    } else {
        const collab = base.activeCollaborators.find(collaborator => collaborator.id === d.id);
        if (collab) {
            tooltipMemo[d.id] = collab.name;
            return collab.name;
        } else {
            return d.id
        }
    }

}

const Stream = ({ data, keys }) => (
    <ResponsiveStream
        data={data}
        keys={keys}
        margin={{ top: 5, right: 0, bottom: 0, left: 0 }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        curve="basis"
        offsetType="diverging"
        colors={{ scheme: 'accent' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
        tooltipLabel={getTooltipLabel}
    />
)

/**
 * Fill in the missing dates and prune by date range.
 * @param {array[string, int]} activity // List of tuples of date and count.
 * @param {int} dateRange // Number of days.
 * @returns {array[int]} // List of counts in the length of dateRange.
 */
const pruneActivityByDate = (activity, dateRange) => {
    if (!activity) {
        return new Array(dateRange).fill(0);
    }

    const startDate = new Date();
    const endDate = new Date();
    startDate.setDate(startDate.getDate() - dateRange + 1);
    endDate.setDate(endDate.getDate() + 1);

    let newActivity = [];
    let idx = 0;

    while (startDate < endDate) {
        let [date, count] = activity[idx];

        if (idx > activity.length - 1) {
            newActivity.push(0);
        } else {
            if (date === startDate.toISOString().slice(0, 10)) {
                newActivity.push(count);
                idx++;
                startDate.setDate(startDate.getDate() + 1)
            } else if (new Date(date) < startDate) {
                idx++;
            } else {
                newActivity.push(0);
                startDate.setDate(startDate.getDate() + 1)
            }
        }
    }

    return newActivity;
}

const zipPrunedActivities = (activities, dateRange) => {
    let data = []

    for (let i = 0; i < dateRange; i++) {
        const entry = {}
        activities.forEach(([collaboratorId, activity]) => {
            const count = activity[i];
            entry[collaboratorId] = count;
        })
        data.push(entry);
    }

    return data;
}

function ActivityStream() {
    const [dateRange, setDateRange] = React.useState(dateRangeOptions[0].value);
    const collaboratorIds = base.activeCollaborators.map(collaborator => collaborator.id);
    const activeCollaboratorsActivity = collaboratorIds.map(collaboratorId => {
        const collaboratorActivity = globalConfig.get(`${collaboratorId}_activity`);
        const prunedActivity = pruneActivityByDate(collaboratorActivity, dateRange);
        return [collaboratorId, prunedActivity];
    })

    const data = zipPrunedActivities(activeCollaboratorsActivity, dateRange);
    return (
        <Box padding={2}>
            <Box display="flex" justifyContent="space-between">
                <Heading variant="caps" size="small" display="inline-flex">Activity</Heading>
                <SelectButtons
                    value={dateRange}
                    onChange={newDateRange => setDateRange(newDateRange)}
                    options={dateRangeOptions}
                    size="small"
                    width="200px"
                />
            </Box>
            <Box height={130}>
                <Stream data={data} keys={collaboratorIds} />
            </Box>
        </Box>
    )
}

export default ActivityStream
