import {
  Alert,
  AlertDescription,
  Box,
  Collapse,
  Grid,
  Heading,
} from '@chakra-ui/react';
import _ from 'lodash';
import { FC, useContext } from 'react';
import { TagsAutocomplete } from 'renderer/components/fields';
import { ViewScopedContext } from 'renderer/contexts';
import { TagType } from 'renderer/defenitions/record-object';

type TableTagsCardProperties = unknown;

export const TableTagsCard: FC<TableTagsCardProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);

  return (
    <Box flexDirection="column">
      <Heading size="md" pb={4}>
        Table Tags
      </Heading>
      {viewState?.id && (
        <Grid templateColumns="repeat(1, 1fr)" gap={3}>
          <Collapse
            in={
              !viewState.metadata.tags || viewState.metadata.tags.length === 0
            }
            animateOpacity
            unmountOnExit
          >
            <Alert colorScheme="brand" variant="left-accent">
              <Box>
                <AlertDescription fontSize="sm">
                  Tags (or keywords) are generally single words which help
                  visitors discover the data; please include terms that would be
                  used by technical and non-technical users. Keywords can also
                  be used by recommendation engines to help visitors discover
                  similar datasets.
                </AlertDescription>
              </Box>
            </Alert>
          </Collapse>
          <TagsAutocomplete
            id="metadata.tags"
            type={TagType.TABLE}
            target={{ viewId: viewState.id }}
            defaultValue={viewState.metadata.tags.map((item) => item.id)}
          />
        </Grid>
      )}
    </Box>
  );
};
