import React from 'react'
import { base, globalConfig } from '@airtable/blocks';
import { Box, CollaboratorToken, Heading, Tooltip } from "@airtable/blocks/ui";

const TooltipContent = ({ email, date }) => {
    return (
        <div>
            <div>{email}</div>
            <hr></hr>
            <div>Last active: {date}</div>
        </div>
    )
}
function CollaboratorList() {
    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">Collaborators</Heading>
            {base.activeCollaborators.map(activeCollaborator => {
                const activity = globalConfig.get(`${activeCollaborator.id}_activity`);
                const [date, count] = activity[activity.length-1];
                return (
                    <Tooltip
                        key={activeCollaborator.id}
                        content={<TooltipContent date={date} email={activeCollaborator.email} />}
                        placementX={Tooltip.placements.LEFT}
                        placementY={Tooltip.placements.CENTER}
                    >
                        <CollaboratorToken
                            collaborator={activeCollaborator}
                            marginRight={1}
                        />
                    </Tooltip>
                )
            })}
        </Box>
    );
}

export default CollaboratorList
