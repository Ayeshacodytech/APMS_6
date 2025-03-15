import JobHeader from "../components/jobHeader";
import { JobLists } from "../components/joblists";
import { SideNavBar } from "../components/SideNavbar";
export function Jobs() {
    return (
        <>
            <div className="bg-gradient-to-l min-h-screen">
                <SideNavBar></SideNavBar>
                <JobHeader></JobHeader>
                <JobLists></JobLists>
            </div>
        </>
    );
}