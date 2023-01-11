import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';

import { Navbar } from '../../components/navbar/navbar';
import { Sidebar } from '../../components/sidebar/Sidebar';

export default function Dashboard() {
  const [title, setTitle] = useState<string>();
  const matches = useMatches();
  useEffect(() => {
    const t = matches
      .filter((match) => Boolean((match.handle as any)?.title))
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
        px={9}
        area="main"
        height="auto"
        overflow="hidden"
        bgColor="blackAlpha.100"
        display="flex"
      >
        <Outlet />
      </GridItem>
    </Grid>
  );
}
