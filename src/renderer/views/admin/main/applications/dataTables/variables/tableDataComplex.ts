type RowObj = {
	name: string;
	status: string;
	date: string;
	progress: number;
};

const tableDataComplex: RowObj[] = [
	{
		name: 'Horizon UI PRO',
		progress: 75.5,
		status: 'Approved',
		date: '12 Jan 2021'
	},
	{
		name: 'Horizon UI Free',
		progress: 25.5,
		status: 'Disable',
		date: '21 Feb 2021'
	},
	{
		name: 'Weekly Update',
		progress: 90,
		status: 'Error',
		date: '13 Mar 2021'
	},
	{
		name: 'Marketplace',
		progress: 50.5,
		status: 'Approved',
		date: '24 Oct 2022'
	}
];
export default tableDataComplex;
