import React from 'react'
import { base } from '@airtable/blocks';
import { Box, CollaboratorToken, Heading, Tooltip } from "@airtable/blocks/ui";

function CollaboratorList() {
    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">Collaborators</Heading>
            {base.activeCollaborators.map(activeCollaborator => (
                <Tooltip
                    key={activeCollaborator.id}
                    content={activeCollaborator.email}
                    placementX={Tooltip.placements.LEFT}
                    placementY={Tooltip.placements.CENTER}
                >
                    <CollaboratorToken
                        collaborator={activeCollaborator}
                        marginRight={1}
                    />
                </Tooltip>
            ))}
        </Box>
    );
}

export default CollaboratorList
