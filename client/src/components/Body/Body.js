import { Routes, Route } from "react-router";
import LeftHead from "./LeftHead";
import { Dashboard, Ledger, Receive, Sell, Stock } from "./pages";
const Body = () => {
  return (
    <div className="grid grid-cols-12 mx-2  mt-[2vh] gap-[2vh] mr-[2vh] ">
      <LeftHead />
      <div className=" md:col-span-10   shadow-md col-span-8">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/receive/farmers"
            element={<Receive active={false} types={"farmers"} />}
          />
          <Route
            path="/receive/fresh-house"
            element={<Receive active={true} types={"fresh-house"} />}
          />
          <Route path="/sell/farmers" element={<Sell types="farmers" />} />
          <Route
            path="/sell/fresh-house"
            element={<Sell types="fresh-house" />}
          />
          <Route
            path="/ledger/farmers"
            element={<Ledger types="farmers" active={false} />}
          />
          <Route
            path="/ledger/fresh-house"
            element={<Ledger types="fresh-house" active={true} />}
          />
          <Route path="/stock" element={<Stock />} />
        </Routes>
      </div>
    </div>
  );
};

export default Body;
