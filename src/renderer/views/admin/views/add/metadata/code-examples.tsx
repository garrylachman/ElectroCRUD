import { FC, useContext } from 'react';
import { CodeExampleRO } from 'renderer/defenitions/record-object';
import { Box, Grid, useBoolean } from '@chakra-ui/react';
import { ViewScopedContext } from 'renderer/contexts';
import { CodeExamplesSelectors } from 'renderer/store/selectors';
import { useSelector } from 'react-redux';
import { SectionHeader } from 'renderer/components/sections/section-header';
import { RippleButton } from 'renderer/components/buttons/ripple-button';
import { CodeExampleItemComponent } from './components/code-example-item';

type CodeExamplesProperties = {};

export const CodeExamples: FC<CodeExamplesProperties> = () => {
  const { viewState } = useContext(ViewScopedContext);
  const codeExamplesSelector = useSelector((state) =>
    CodeExamplesSelectors.createCodeExamplesForViewSelector(state)
  );

  const codeState: CodeExampleRO[] = codeExamplesSelector(viewState.id);

  const [showAdd, { on, off }] = useBoolean();

  return (
    <Box px={5} pb={0} pt={3}>
      <SectionHeader
        title="Code Examples"
        subTitle="This is the place to save code examples, queries & snippets."
        RightComponent={() => (
          <>
            <RippleButton size="md" onClick={on}>
              Add New
            </RippleButton>
          </>
        )}
      />
      <Grid templateColumns="repeat(1, 1fr)" gap={3}>
        {showAdd && (
          <CodeExampleItemComponent
            index={-1}
            key={`ce-new-${codeState.length}`}
            initialValue={{ viewId: viewState.id }}
            onSave={off}
          />
        )}
        {codeState.map((item, index) => (
          <CodeExampleItemComponent
            index={++index}
            key={`ce-${item?.id || 'new'}`}
            initialValue={{ ...item, viewId: viewState.id }}
          />
        ))}
      </Grid>
    </Box>
  );
};
