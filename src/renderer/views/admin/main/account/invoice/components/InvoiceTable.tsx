/* eslint-disable */

import { Box, Flex, Table, Tbody, Td, Text, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
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

type RowObj = {
	item: string;
	quantity: number;
	rate: number;
	amount: number;
};

const columnHelper = createColumnHelper<RowObj>();

// const columns = columnsDataCheck;
export default function InvoiceTable(props: { tableData: any }) {
	const { tableData } = props;
	const [ sorting, setSorting ] = React.useState<SortingState>([]);
	const textColor = useColorModeValue('navy.700', 'white');
	const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
	let defaultData = tableData;
	const columns = [
		columnHelper.accessor('item', {
			id: 'item',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					ITEM
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='md' fontWeight='700'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('quantity', {
			id: 'quantity',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					QUANTITY
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='md' fontWeight='500'>
					{info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('rate', {
			id: 'rate',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					RATE
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='md' fontWeight='500'>
					${info.getValue()}
				</Text>
			)
		}),
		columnHelper.accessor('amount', {
			id: 'amount',
			header: () => (
				<Text
					justifyContent='space-between'
					align='center'
					fontSize={{ sm: '10px', lg: '12px' }}
					color='gray.400'>
					AMOUNT
				</Text>
			),
			cell: (info) => (
				<Text color={textColor} fontSize='md' fontWeight='500'>
					${info.getValue()}
				</Text>
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
		<Flex direction='column' w='100%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
			<Box>
				<Table variant='simple' color='gray.500' mt='12px'>
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
											cursor='pointer'>
											<Flex
												justifyContent='space-between'
												align='center'
												fontSize={{ sm: '10px', lg: '12px' }}
												color='gray.400'>
												{flexRender(header.column.columnDef.header, header.getContext())}
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
												borderColor={borderColor}
												mt='20px !important'
												py='36px !important'>
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
