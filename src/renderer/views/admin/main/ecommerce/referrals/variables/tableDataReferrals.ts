type RowObj = {
	name: string[];
	value: string | number;
	profit: string | number;
	orders: string | number;
};

const tableDataReferrals: RowObj[] = [
	{
    name: ["Vlad Mihalache", "https://i.ibb.co/zPxBHYv/241143773-8212166459343985239-7834018950652403662-n-1.jpg"],
    value: "$189,044", 
    profit: "$90,732", 
    orders: "18,203"

  }, 
  {
    name: ["Fredy Andrei", "https://i.ibb.co/5r8xc6T/218987537-368849674583041-6903848186366518125-n.jpg"],
    value: "$143,885", 
    profit: "$79,943", 
    orders: "12,942"
  }, 
  {
    name: ["Anonymous User", "https://i.ibb.co/7p0d1Cd/Frame-24.png"],
    value: "$127,331", 
    profit: "$72,365", 
    orders: "10,430"
  }, 
  {
    name: ["Marcus Aurelius", "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"],
    value: "$105,843", 
    profit: "$53,928", 
    orders: "9,738"
  }, 
  {
    name: ["Lorentz Michael", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"],
    value: "$98,732", 
    profit: "$47,573", 
    orders: "7,427"
  }, 
  {
    name: ["Horizon UI", "https://i.ibb.co/NSJYQYD/Horizon-UI-Avatar.png"],
     value: "$76,175", 
    profit: "$36,927", 
    orders: "3,238"
  }, 
  {
    name: ["Tim Wilson", "https://i.ibb.co/7p0d1Cd/Frame-24.png"],
    value: "price", 
    profit: "$36,927", 
    orders: "6,927"
  }, 
  {
    name: ["Maddinson Jackson", "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"],
    value: "price", 
    profit: "$90,732", 
    orders: "$36,927"
  }, 
  {
    name: ["Andreea Popescu", "https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80"],
    value: "$36,927", 
    profit: "$90,732", 
    orders: "18,203"
  }
];

export default tableDataReferrals;
