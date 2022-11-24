import {
  Grid,
  Badge,
  Button,
  Flex,
  Icon,
  GridItem,
  VStack,
  Heading,
  EditablePreview,
  Box,
  useColorModeValue,
  IconButton,
  Input,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  SlideFade,
  Editable,
  Tooltip,
  Text,
  EditableInput,
  Alert,
  AlertDescription,
  AlertTitle,
  Collapse,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { FC, useEffect } from 'react';
import { ViewRO } from 'renderer/defenitions/record-object';
import { useFormContext } from 'react-hook-form';
import * as Joi from 'joi';
import { joiResolver } from '@hookform/resolvers/joi';
import Card from 'renderer/components/card/Card';
import { InlineEditField, InputField } from 'renderer/components/fields';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { Categories } from 'renderer/defenitions/record-object/categories.def';
import _ from 'lodash';

type TableDocCardProps = {};

export const TableDocCard: FC<TableDocCardProps> = () => {
  const formContext = useFormContext();
  const { description, title, category, contact } = formContext.watch('tableDocs');

  return (
    <Box flexDirection="column">
      <Heading size="md" pb={4}>
        Table Documentation
      </Heading>
      <Grid templateColumns="repeat(1, 1fr)" gap={3}>
        <Collapse
          in={title === '' || title === undefined}
          animateOpacity
          unmountOnExit
        >
          <Text pb={4}>
            Without dataset metadata, a catalog could not exist. <br />
            Basic metadata elements provide the most important pieces of
            information to help visitors find data and determine if it is what
            they need. <br />
            Many of these items will appear directly in catalog navigation pages
            or search results.
          </Text>
          <Alert status="info" variant="left-accent">
            <Box>
              <AlertTitle>Title (or Name)</AlertTitle>
              <AlertDescription fontSize="sm">
                Human-readable name for the data. It should be in plain English
                and include sufficient detail to facilitate search and
                discovery. Acronyms should be avoided.
              </AlertDescription>
            </Box>
          </Alert>
        </Collapse>
        <InlineEditField
          id="tableDocs.title"
          fontSize="2xl"
          placeholder="Title (or Name)"
        />
        <Divider my={4} />
        <Collapse
          in={description === '' || description === undefined}
          animateOpacity
          unmountOnExit
        >
          <Alert status="info" variant="left-accent">
            <Box>
              <AlertTitle>Description</AlertTitle>
              <AlertDescription fontSize="sm">
                Human-readable description (e.g., an abstract) with sufficient
                detail to enable a user to quickly understand whether the asset
                is of interest.
              </AlertDescription>
            </Box>
          </Alert>
        </Collapse>
        <Heading size="sm">
          Description
        </Heading>
        <InlineEditField
          id="tableDocs.description"
          type="textarea"
          placeholder="Description"
        />
        <Divider my={4} />
        <Collapse
          in={category === undefined || category === ''}
          animateOpacity
          unmountOnExit
        >
          <Alert status="info" variant="left-accent">
            <Box>
              <AlertTitle>Category</AlertTitle>
              <AlertDescription fontSize="sm">
                Main thematic category of the dataset, usually chosen from a
                predefined list. Refer to the Categories section of this guide
                for more information.
              </AlertDescription>
            </Box>
          </Alert>
        </Collapse>
        <Heading size="sm">
          Category
        </Heading>
        <InlineEditField
          id="tableDocs.category"
          type="dropdown"
          placeholder="Category"
          selectOptions={Object.values(Categories).map((cat) => ({
            label: _.capitalize(cat),
            value: cat,
          }))}
        />
        <Divider my={4} />
        <Collapse
          in={!contact || contact.name === undefined}
          animateOpacity
          unmountOnExit
        >
          <Alert status="info" variant="left-accent">
            <Box>
              <AlertTitle>Contact Information</AlertTitle>
              <AlertDescription fontSize="sm">
              The name and email address of the publisher of a dataset.
              </AlertDescription>
            </Box>
          </Alert>
        </Collapse>
        <Heading size="sm">
          Contact Information
        </Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={3} my={2}>
          <VStack alignItems="normal">
            <Text size="md" as='u'>Name</Text>
            <InlineEditField
              id="tableDocs.contact.name"
              fontSize="sm"
              placeholder="Garry Lachman"
            />
          </VStack>
          <VStack alignItems="normal">
            <Text size="md" as='u'>Phone</Text>
            <InlineEditField
              id="tableDocs.contact.phone"
              fontSize="sm"
              placeholder="(+1) 123-456-789"
            />
          </VStack>
          <VStack alignItems="normal">
            <Text size="md" as='u'>E-Mail</Text>
            <InlineEditField
              id="tableDocs.contact.email"
              fontSize="sm"
              placeholder="example@example.com"
            />
          </VStack>
          <GridItem colSpan={3}>
            <VStack alignItems="normal">
              <Text size="md" as='u'>Additional details</Text>
              <InlineEditField
                id="tableDocs.contact.details"
                fontSize="sm"
                placeholder="Please send email before calling"
              />
            </VStack>
          </GridItem>
        </Grid>
      </Grid>
    </Box>
  );
};
