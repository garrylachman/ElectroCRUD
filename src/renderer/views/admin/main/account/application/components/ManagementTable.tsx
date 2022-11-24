/* eslint-disable */

import { Avatar, Badge, Box, Button, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue,  Icon,} from '@chakra-ui/react';
import {
	createColumnHelper,
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	SortingState,
	useReactTable
} from '@tanstack/react-table';
// Custom components
import Card from 'renderer/components/card/Card';
import Menu from 'renderer/components/menu/MainMenu';
import * as React from 'react';
// Assets
import { MdEdit } from 'react-icons/md';

type RowObj = {
  name:string[],
  date:string,
  permissions:string,
  status:string,
  edit?:any
  price:string|number,
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function LastOfferTable(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
  const textColor = useColorModeValue("navy.700", "white");
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('name', {
			id: 'name',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					NAME
				</Text>
			),
			cell: (info: any) => (
				<Flex align='center'>
					<Avatar
						src={info.getValue()[2]}
						w='36px'
						h='36px'
						me='8px'
						borderRadius='14px'
					/>
					<Flex direction='column'>
						<Text color={textColor} fontSize='sm' fontWeight='700'>
							{info.getValue()[0]}
						</Text>
						<Text color='secondaryGray.500' fontSize='sm' fontWeight='600'>
							{info.getValue()[1]}
						</Text>
					</Flex>
				</Flex>
			)
		}),
		columnHelper.accessor('date', {
			id: 'date',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					DATE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='600'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('permissions', {
			id: 'permissions',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					PERMISSIONS
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='600'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('status', {
			id: 'status',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					STATUS
				</Text>
			),
			cell: (info) => (
				<Badge
					colorScheme={info.getValue() === 'REJECTED' ? 'red' : 'green'}
					color={info.getValue() === 'REJECTED' ? 'red.500' : 'green.500'}
					fontSize='sm'
					fontWeight='600'>
					{info.getValue().toLowerCase()}
				</Badge>
			)
		}),
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
			cell: (info) => (
				<Text color={textColor} fontSize='sm' fontWeight='600'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('edit', {
			id: 'edit',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
				</Text>
			),
			cell: (info) => (
				<Flex cursor='pointer' h='max-content' w='max-content'>
					<Icon color='secondaryGray.500' as={MdEdit} w='20px' h='20px' />
				</Flex>
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
		<Card>
			<Flex direction='column' w='100%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
				<Flex align={{ lg: 'center' }} justify={{ base: 'space-between' }} w='100%' px='20px' mb='20px'>
					<Text color={textColor} fontSize='xl' fontWeight='600' lineHeight='100%'>
						Team Management
					</Text>
					<Menu />
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
		</Card>
	);
}
