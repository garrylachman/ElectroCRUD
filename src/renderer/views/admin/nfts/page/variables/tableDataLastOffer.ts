type RowObj = {
	price: string | number;
	usd: string | number;
	expiration: string;
	from: string;
};

const tableDataLastOffer: RowObj[] = [
	{
		price: '2.30',
		usd: '9,821.82',
		expiration: 'In 8 days',
		from: '@venus.sys'
	},
	{
		price: '2.30',
		usd: '9,034.73',
		expiration: 'In 9 days',
		from: '@ape.vpp8'
	},
	{
		price: '1.93',
		usd: '8,327.41',
		expiration: 'In 10 days',
		from: '@leon_pwrr'
	},
	{
		price: '2.12',
		usd: '8,954.73',
		expiration: 'In 12 days',
		from: '@abraham47.y'
	}
];

export default tableDataLastOffer;
