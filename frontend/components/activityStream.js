import React from 'react'
import { Box, Heading } from "@airtable/blocks/ui";
import { ResponsiveStream } from '@nivo/stream'

const data = [
    {
        "Raoul": 131,
        "Josiane": 103,
        "Marcel": 191,
        "René": 200,
        "Paul": 98,
        "Jacques": 89
    },
    {
        "Raoul": 116,
        "Josiane": 117,
        "Marcel": 107,
        "René": 175,
        "Paul": 174,
        "Jacques": 115
    },
    {
        "Raoul": 88,
        "Josiane": 133,
        "Marcel": 40,
        "René": 172,
        "Paul": 187,
        "Jacques": 137
    },
    {
        "Raoul": 97,
        "Josiane": 44,
        "Marcel": 105,
        "René": 85,
        "Paul": 19,
        "Jacques": 196
    },
    {
        "Raoul": 171,
        "Josiane": 49,
        "Marcel": 55,
        "René": 47,
        "Paul": 58,
        "Jacques": 25
    },
    {
        "Raoul": 29,
        "Josiane": 45,
        "Marcel": 102,
        "René": 136,
        "Paul": 147,
        "Jacques": 20
    },
    {
        "Raoul": 170,
        "Josiane": 19,
        "Marcel": 177,
        "René": 31,
        "Paul": 34,
        "Jacques": 123
    },
    {
        "Raoul": 146,
        "Josiane": 113,
        "Marcel": 167,
        "René": 129,
        "Paul": 69,
        "Jacques": 154
    },
    {
        "Raoul": 38,
        "Josiane": 192,
        "Marcel": 191,
        "René": 96,
        "Paul": 168,
        "Jacques": 94
    }
]

const MyResponsiveStream = ({ data /* see data tab */ }) => (
    <ResponsiveStream
        data={data}
        keys={['Raoul', 'Josiane', 'Marcel', 'René', 'Paul', 'Jacques']}
        margin={{ top: 5, right: 5, bottom: 5, left: 35 }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36
        }}
        axisLeft={{ orient: 'left', tickSize: 5, tickPadding: 5, tickRotation: 0, legend: '', legendOffset: 0 }}
        curve="basis"
        offsetType="diverging"
        colors={{ scheme: 'accent' }}
        fillOpacity={0.85}
        borderColor={{ theme: 'background' }}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
    />
)

function ActivityStream() {
    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">Activity</Heading>
            <Box height={150}>
                <MyResponsiveStream data={data} />
            </Box>
        </Box>
    )
}

export default ActivityStream
