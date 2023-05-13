import Nav from "./Nav";
const LeftHead = () => {
  return (
    <ul className=" p-5 shadow-md md:col-span-2 col-span-4 rounded-md h-[85vh] bg-white grid">
      <Nav value={"Dashboard"} url={"/"} exact={"exact"} />
      <Nav value={"Receive"} url={"/receive/farmers"} />
      <Nav value={"Sell"} url={"/sell/farmers"} />
      <Nav value={"Stock"} url={"/stock"} />
      <Nav value={"Ledger"} url={"/ledger/farmers"} />
      <Nav value={"Expenses"} url={"/expenses"} />
    </ul>
  );
};

export default LeftHead;
