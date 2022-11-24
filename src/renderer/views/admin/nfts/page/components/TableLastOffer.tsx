/* eslint-disable */

import { Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue, Link, Icon,} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components  
import * as React from 'react';
// Assets 

import { FaEthereum } from "react-icons/fa";

type RowObj = {
  price:string|number,
  usd:string|number,
  expiration:string,
  from:string, 
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function LastOfferTable(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("navy.700", "white");
  const textColorLink = useColorModeValue("blue.500", "white");
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('price', {
			id: 'price',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					PRICE
				</Text>
			),
			cell: (info: any) => (
        <Flex align='center'>
          <Icon
            color={textColor}
            as={FaEthereum}
            w='16px'
            h='16px'
            me='4px'
          />
          <Text
            color={textColor}
            fontSize='md'
            fontWeight='700'>
            {info.getValue()} ETH
          </Text>
        </Flex>
			)
		}), 
		columnHelper.accessor('usd', {
			id: 'usd',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					USD PRICE
				</Text>
			),
			cell: (info) => (
        <Text
          color={textColor}
          fontSize='md'
          fontWeight='700'>
          {info.getValue()}
        </Text>
			)
		}),
		columnHelper.accessor('expiration', {
			id: 'expiration',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					EXPIRATION
				</Text>
			),
			cell: (info) => (
        <Text
          color={textColor}
          fontSize='md'
          fontWeight='700'>
          {info.getValue()}
        </Text>
			)
		}),
		columnHelper.accessor('from', {
			id: 'from',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					FROM
				</Text>
			),
			cell: (info) => (
        <Link w='max-content'>
          <Text
            color={textColorLink}
            fontSize='sm'
            fontWeight='500'
            w='max-content'>
            {info.getValue()}
          </Text>
        </Link>
			)
		})
	];
	const [ data, setData ] = React.useState(() => [ ...defaultData ]);
	const table = useReactTable({
		data,
		columns,
		state: {
			sorting
		},
		onSortingChange: setSorting,
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		debugTable: true
	});
	return (
      <Flex
        direction='column'
        w='100%'
        overflowX={{ sm: "scroll", lg: "hidden" }}>
        <Flex
          align='center'
          justify='space-between'
          w='100%'
          px='22px'
          pb='8px'
          boxShadow='0px 40px 58px -20px rgba(112, 144, 176, 0.12)'>
          <Text color={textColor} fontSize='xl' fontWeight='700'>
            Latest Offers
          </Text>
          <Button variant='action'>See all</Button>
        </Flex>
			<Box>
				<Table variant='simple' color='gray.500'  mt="12px">
					<Thead>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<Th
											key={header.id}
											colSpan={header.colSpan}
											pe='10px'
											borderColor={borderColor}
											cursor='pointer'
											onClick={header.column.getToggleSortingHandler()}>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}{{
													asc: '',
													desc: '',
												}[header.column.getIsSorted() as string] ?? null}
											</Flex>
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody>
						{table.getRowModel().rows.slice(0, 11).map((row) => {
							return (
								<Tr key={row.id}>
									{row.getVisibleCells().map((cell) => {
										return (
											<Td
												key={cell.id}
												fontSize={{ sm: '14px' }}
												minW={{ sm: '150px', md: '200px', lg: 'auto' }}
												borderColor='transparent'>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</Td>
										);
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</Box>
		</Flex>
	);
}
 