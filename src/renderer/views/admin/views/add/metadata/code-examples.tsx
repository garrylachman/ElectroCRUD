/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
import { Box, Grid, useBoolean } from '@chakra-ui/react';
import { LayoutGroup } from 'framer-motion';
import { FC, useContext } from 'react';
import { useSelector } from 'react-redux';
import { RippleButton } from '@electrocrud/buttons';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { ViewScopedContext } from 'renderer/contexts';
import { CodeExampleRO } from 'renderer/defenitions/record-object';
import { CodeExamplesSelectors } from 'renderer/store/selectors';
import { RootState } from 'renderer/store/store';

import { CodeExampleItem } from './components/code-example-item';

// eslint-disable-next-line @typescript-eslint/ban-types
type CodeExamplesProperties = {};

export const CodeExamples: FC<CodeExamplesProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);
  const codeExamplesSelector = useSelector((state: RootState) =>
    CodeExamplesSelectors.createCodeExamplesForViewSelector(state)
  );

  // @ts-ignore
  const codeState: CodeExampleRO[] = codeExamplesSelector(
    viewState?.id as string
  );

  const [showAdd, { on, off }] = useBoolean();

  return (
    <Box px={5} pb={6}>
      <SectionHeader
        title="Code Examples"
        subTitle="This is the place to save code examples, queries & snippets."
        RightComponent={() => (
          <>
            <RippleButton size="md" onClick={on} bgColorScheme="primary">
              Add New
            </RippleButton>
          </>
        )}
      />
      <Grid templateColumns="repeat(1, 1fr)" gap={3}>
        <LayoutGroup>
          {showAdd && (
            <CodeExampleItem
              index={-1}
              key={`ce-new-${codeState.length}`}
              initialValue={{ viewId: viewState?.id }}
              onSave={off}
            />
          )}
          {codeState.map((item, index) => (
            <CodeExampleItem
              index={++index}
              key={`ce-${item?.id || 'new'}`}
              initialValue={{ ...item, viewId: viewState?.id }}
            />
          ))}
        </LayoutGroup>
      </Grid>
    </Box>
  );
};
