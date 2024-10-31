import React from "react";
import { SideNavBar } from "../components/SideNavbar";

function JobDetails({ job }) {
  return (
    <div className="bg-gradient-to-l from-[#a935fd] to-[#35fdf5] object-fill min-h-screen">
      <SideNavBar></SideNavBar>
      <div className="pl-52 py-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">ABC Company</h2>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Role:</span>
              <span>Trainee</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Package:</span>
              <span>500000</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">
                Job Description:
              </span>
              <span className="px-4">
                Novacis Digital Private Limited (www.novacisdigital.com), an
                innovative, new age technology company with focus on Digital and
                Analytics driven products and solutions, seeks software talent
                who can learn and rapidly scale in a demanding environment.
                Novacis Digital’s leadership with over 100+ years of experience
                in setting up world class Global Centres of Excellence and
                Innovation Labs for US corporations will direct, guide and
                mentor the teams for achieving technical excellence. If you have
                the passion to work on futuristic technologies with an interest
                to innovate, Novacis Digital is just for you. Essential
                Requirements: ● Bachelor's degree preferable in Engineering/MCA
                ● Exposure in application development concepts Other
                Requirements: ● Strong attention to detail and a positive
                attitude. ● Self-motivated individual with excellent written and
                verbal communication skills. ● Excellent problem-solving skills.
                ● Willingness to work independently or in a team-oriented
                environment both efficiently and courteously. Technology/Skills:
                ● Knowledge on HTML, CSS, JavaScript and jQuery. ● Knowledge on
                UI/UX concepts such as User Research, Wire framing, Prototyping
                & Visual Design etc.. ● AngularJS is advantageous. ● Knowledge
                on Prototyping tool (Figma) & Graphic Design tool (Adobe
                Photoshop)
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">
                Field of Interest:
              </span>
              <span>IT</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Eligibility:</span>
              <span>Mech, CSE, ECE</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Department:</span>
              <span>Sss</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Apply Link:</span>
              <a
                href={"www.google.com"}
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Here
              </a>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Deadline:</span>
              <span>10/10/2022</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Company Visit:</span>
              <span>12/10/2022</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600 font-medium">Status:</span>
              <span>Current</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
