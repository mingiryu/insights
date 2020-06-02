import React from 'react'
import { base } from '@airtable/blocks';
import { Box, CollaboratorToken, Heading } from "@airtable/blocks/ui";

function CollaboratorList() {
    return (
        <Box padding={2}>
            <Heading variant="caps" size="small">Collaborators</Heading>
            {base.activeCollaborators.map(activeCollaborator => (
                <CollaboratorToken
                    key={activeCollaborator.id}
                    collaborator={activeCollaborator}
                    marginRight={1}
                />
            ))}
        </Box>
    );
}

export default CollaboratorList
