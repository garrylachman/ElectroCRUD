type RowObj = {
	item: string[];
	quantity: number;
	rate: number;
	amount: number;
};

const tableDataReceipt: RowObj[] = [
	{
		item: [ 'Venus Dashboard Builder PRO', 'SKU: 94320718' ],
		quantity: 1,
		rate: 9.0,
		amount: 9.0
	},
	{
		item: [ 'Horizon UI - Dashboard PRO', 'SKU: 04175423' ],
		quantity: 3,
		rate: 99.0,
		amount: 297.0
	},
	{
		item: [ 'Parts for Service', 'SKU: 39401827' ],
		quantity: 1,
		rate: 89.0,
		amount: 89.0
	}
];

export default tableDataReceipt;
