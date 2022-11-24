type RowObj = {
	name: string[];
	email: string; 
	username: string; 
  date:string,
  type:string,
  actions:string
};

const tableDataUserReports: RowObj[] = [
  {
    name: ["Vlad Mihalache", "https://i.ibb.co/zPxBHYv/241143773-8212166459343985239-7834018950652403662-n-1.jpg"],
    email: "vlad@simmmple.com",
    username: "@vladmihalache",
    date: "Oct 24, 2022",
    type: "Administrator", 
    actions: "Actions"
  }, 
  {
    name: ["Fredy Andrei", "https://i.ibb.co/5r8xc6T/218987537-368849674583041-6903848186366518125-n.jpg"],
    email: "fredy@simmmple.com",
    username: "@fredyandrei",
    date: "Nov 17, 2019",
    type: "Administrator", 
    actions: "Actions"
  }, 
  {
    name: ["Anonymous User", "https://i.ibb.co/7p0d1Cd/Frame-24.png"],
    email: "mark@yahoo.com",
    username: "@user0215",
    date: "Jan 30, 2021",
    type: "Member", 
    actions: "Actions"
  }, 
  {
    name: ["Marcus Aurelius", "https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"],
    email: "markus.a@gmail.com",
    username: "@marcus.aurelius",
    date: "Aug 02, 2021",
    type: "Member", 
    actions: "Actions"
  }, 
  {
    name: ["Lorentz Michael", "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1780&q=80"],
    email: "lorentz@gmail.com",
    username: "@lorentz.0002",
    date: "Apr 19, 2021",
    type: "Member", 
    actions: "Actions"
  }, 
  {
    name: ["Horizon UI", "https://i.ibb.co/NSJYQYD/Horizon-UI-Avatar.png"],
    email: "hello@horizon-ui.com",
    username: "@horizon.ui",
    date: "Apr 18, 2022",
    type: "Administrator", 
    actions: "Actions"
  }, 
  {
    name: ["Tim Wilson", "https://i.ibb.co/7p0d1Cd/Frame-24.png"],
    email: "wilson.tim@msn.com",
    username: "@wilson.tim21",
    date: "Sep 12, 2021",
    type: "Member", 
    actions: "Actions"
  }, 
  {
    name: ["Maddinson Jackson", "https://images.unsplash.com/photo-1506863530036-1efeddceb993?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2244&q=80"],
    email: "maddinson.j@mail.com",
    username: "@maddison.2010",
    date: "Jul 20, 2020",
    type: "Member", 
    actions: "Actions"
  }, 
  {
    name: ["Andreea Popescu", "https://images.unsplash.com/photo-1573766064535-6d5d4e62bf9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1315&q=80"],
    email: "popescu.a@gmail.com",
    username: "@andreea0217",
    date: "Sep 30, 2021",
    type: "Creator", 
    actions: "Actions"
  }
];

export default tableDataUserReports;
