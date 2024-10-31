import { JobLists } from "../components/joblists";
import { SideNavBar } from "../components/SideNavbar";

function Home() {
  return (
    <div className="grid grid-cols-6 bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
      <div className="col-span-1">
        <SideNavBar></SideNavBar>
      </div>
      <div className="col-span-5">
        <JobLists></JobLists>
      </div>
    </div>
  );
}
export default Home;
