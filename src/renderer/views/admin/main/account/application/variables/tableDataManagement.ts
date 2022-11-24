type RowObj = {
	name: string[];
	date: string;
	permissions: string;
	status: string;
	edit?: any;
	price: string | number;
};

const tableDataManagement: RowObj[] = [
	{
		name: [
			'Andrew Sinn',
			'andrewsinn@gmail.com',
			'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
		],
		date: 'Jul 20, 2022',
		permissions: 'All Permissions',
		status: 'APPROVED',
		price: '$2.990'
	},
	{
		name: [
			'Christine Nick',
			'christine@gmail.com',
			'https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80'
		],
		date: 'Apr 26, 2022',
		permissions: 'New desk',
		status: 'REJECTED',
		price: '$1.499'
	},
	{
		name: [
			'Lora Anda',
			'lora.anda@gmail.com',
			'https://images.unsplash.com/photo-1628890923662-2cb23c2e0cfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
		],
		date: 'Sep 20, 2022',
		permissions: 'All Permissions',
		status: 'APPROVED',
		price: '$2.799'
	},
	{
		name: [
			'Lawrence Hoya',
			'hoyalawrence@gmail.com',
			'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
		],
		date: 'Aug 02, 2022',
		permissions: 'No Permissions',
		status: 'REJECTED',
		price: '$1.209'
	},
	{
		name: [
			'Kristine Watson',
			'kristine@gmail.com',
			'https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80'
		],
		date: 'Jul 17, 2022',
		permissions: 'All Permissions',
		status: 'APPROVED',
		price: '$3.799'
	},
	{
		name: [
			'Martin Joe',
			'martin.joe.10@yahoo.com',
			'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
		],
		date: 'Jun 08, 2022',
		permissions: 'All Permissions',
		status: 'APPROVED',
		price: '$2.299'
	},
	{
		name: [
			'Michael William',
			'william.mike@gmail.com',
			'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80'
		],
		date: 'Sep 03, 2022',
		permissions: 'All Permissions',
		status: 'APPROVED',
		price: '$1.899'
	},
	{
		name: [
			'Petrov Popesco',
			'popesco.petrov@mail.com',
			'https://images.unsplash.com/photo-1528892952291-009c663ce843?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1244&q=80'
		],
		date: 'Oct 30, 2022',
		permissions: 'No Permissions',
		status: 'REJECTED',
		price: '$2.699'
	},
	{
		name: [
			'Julian Wan',
			'julian.wan@mail.com',
			'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80'
		],
		date: 'Aug 04, 2022',
		permissions: 'No Permissions',
		status: 'APPROVED',
		price: '$4.309'
	},
	{
		name: [
			'Mike Wilson',
			'mikewilson.mail@yahoo.com',
			'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80'
		],
		date: 'Apr 21, 2022',
		permissions: 'All Permissions',
		status: 'APPROVED',
		price: '$3.099'
	}
];

export default tableDataManagement;
