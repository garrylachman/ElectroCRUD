import { Grid, GridItem } from '@chakra-ui/react';
import { Loader } from '@saas-ui/react';
import { Suspense, useEffect, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import { ECSpinner } from 'renderer/components/icons';
import { Sidebar } from 'renderer/components/sidebar';

import { ConsoleLog } from 'renderer/containers/console-log';
import { Navbar } from '../../containers/navbar/navbar';

export default function Dashboard() {
  const [title, setTitle] = useState<string>();
  const matches = useMatches();
  useEffect(() => {
    const t = matches
      .filter((match) => Boolean((match.handle as any)?.title))
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      .map((match) => (match.handle as any)?.title)
      .pop();
    setTitle(t);
  }, [matches]);

  return (
    <Grid
      templateAreas={`"nav header"
                    "nav main"`}
      gridTemplateRows="auto 1fr 30px"
      gridTemplateColumns="285px minmax(0, 1fr)"
      gap="0"
      color="blackAlpha.700"
      fontWeight="bold"
      height="100vh"
      overflow="hidden"
    >
      <GridItem p={2} px={6} area="header" bgColor="white" boxShadow="md">
        <Navbar brandText={title || ''} />
      </GridItem>
      <GridItem area="nav" h="100vh" borderRadius={0}>
        <Sidebar />
      </GridItem>
      <GridItem
        p={6}
        area="main"
        height="auto"
        overflow="hidden"
        bgColor="blackAlpha.100"
        display="flex"
      >
        <Suspense
          fallback={
            <Loader variant="overlay" isLoading spinner={<ECSpinner />}>
              Loading...
            </Loader>
          }
        >
          <>
            <Outlet />
            <ConsoleLog />
          </>
        </Suspense>
      </GridItem>
    </Grid>
  );
}
