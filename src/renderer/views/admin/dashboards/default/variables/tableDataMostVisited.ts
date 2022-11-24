type RowObj = {
  name: string;
  visitors: number;
  unique: number;
  clients: number;
  bounce: [number, string];
};

const tableDataComplex: RowObj[] = [
  {
    name: 'Marketplace',
    visitors: 4847,
    unique: 3455,
    clients: 439,
    bounce: [2.45, '+'],
  },
  {
    name: 'Horizon UI Dashboard',
    visitors: 4034,
    unique: 2943,
    clients: 427,
    bounce: [9.45, '-'],
  },
  {
    name: 'Venus Design System',
    visitors: 3502,
    unique: 2478,
    clients: 403,
    bounce: [7.87, '+'],
  },
  {
    name: 'Chakra UI Design',
    visitors: 3323,
    unique: 2336,
    clients: 397,
    bounce: [1.44, '-'],
  },
  {
    name: 'Simmmple Company',
    visitors: 3244,
    unique: 2302,
    clients: 287,
    bounce: [0.21, '-'],
  },
];

export default tableDataComplex;
