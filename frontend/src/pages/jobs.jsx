import JobHeader from "../components/jobHeader";
import { JobLists } from "../components/joblists";
import { SideNavBar } from "../components/SideNavbar";
export function Jobs() {
  return (
    <div className="grid grid-cols-6  object-fill min-h-screen">
      <div className="col-span-1">
        <SideNavBar></SideNavBar>
      </div>
      <div className="col-span-5">
        <JobHeader></JobHeader>
        <JobLists></JobLists>
      </div>
    </div>
  );
}
