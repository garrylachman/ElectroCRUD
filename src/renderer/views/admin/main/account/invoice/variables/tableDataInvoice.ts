type RowObj = {
	item: string;
	quantity: number;
	rate: number;
	amount: number;
};

const tableDataInvoice: RowObj[] = [
	{
		item: 'Premium Support',
		quantity: 1,
		rate: 9.0,
		amount: 9.0
	},
	{
		item: 'Horizon UI - Dashboard PRO',
		quantity: 3,
		rate: 99.0,
		amount: 297.0
	},
	{
		item: 'Parts for Service',
		quantity: 1,
		rate: 89.0,
		amount: 89.0
	}
];

export default tableDataInvoice;
