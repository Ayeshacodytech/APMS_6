import FeatureCard from "../components/featureCard";
import { JobLists } from "../components/joblists";
import { SideNavBar } from "../components/SideNavbar";
import {
  GraduationCap,
  Briefcase,
  PenTool,
  Users,
  Brain,
  Terminal,

} from 'lucide-react';

function Home() {
  return (
    <div className="bg-gradient-to-l min-h-screen">
    <SideNavBar />
      <div className="ml-0 min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 md:pb-0">
        {/* Hero Section */}
        <header className="bg-indigo-500 text-white">
            <div className="container mx-auto px-6 pb-12">
            <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex items-center justify-center">
              <svg
                width="20vw"
                height="20vw"
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 md:w-40 h-20 md:h-40"
              >
                <text
                  x="20"
                  y="100"
                  fontFamily="grechen"
                  fontSize="40"
                  fontWeight="bold"
                  fill="white"
                  className="md:text-[80px]"
                >
                  F
                </text>
                <text
                  x="50"
                  y="100"
                  fontFamily="grechen"
                  fontSize="30"
                  fontWeight="bold"
                  fill="white"
                  className="md:text-[60px]"
                >
                  F
                </text>
              </svg>
            </div>
            <h1 className="font-grechen text-4xl md:text-6xl text-white text-center md:text-left">
              Futureforge
            </h1>
          </div>


              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                  <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 ">
                    Your Gateway to Excellence
                  </h1>
                  <p className="text-xl text-indigo-100 mb-8">
                    Prepare for GATE, master aptitude, build your career, and join a community of learners.
                  </p>

                </div>
                <div className="md:w-1/2">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
                    alt="Students learning"
                    className="rounded-lg shadow-xl"
                  />
                </div>
              </div>
            </div>
          </header>

          {/* Features Grid */}
          <section className="py-20 px-6">
            <div className="container mx-auto">


              <h2 className="text-3xl font-bold text-center mb-12">Everything You Need to Succeed</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  icon={<Brain className="w-8 h-8" />}
                  title="Aptitude Training"
                  description="Comprehensive aptitude preparation with practice tests and detailed solutions"
                />
                <FeatureCard
                  icon={<GraduationCap className="w-8 h-8" />}
                  title="GATE Preparation"
                  description="Structured GATE study material, mock tests, and previous year papers"
                />
                <FeatureCard
                  icon={<Terminal className="w-8 h-8" />}
                  title="Coding Platform"
                  description="Practice coding problems, participate in contests, and improve your skills"
                />
                <FeatureCard
                  icon={<Briefcase className="w-8 h-8" />}
                  title="Job Portal"
                  description="Apply job opportunities sent by placement department"
                />
                <FeatureCard
                  icon={<Users className="w-8 h-8" />}
                  title="Community"
                  description="Share your knowledge, ask query and grow as a community"
                />
              </div>
            </div>
          </section>



          {/* Footer */}
          <footer className="bg-gray-900 text-white py-12 px-6">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-xl mb-4">Futureforge</h3>
                <p className="text-gray-400">Empowering students career through innovative placement and skill-building.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition-colors">Coding</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">GATE</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Job Board</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Aptitude</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Contact Us</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>support@futureforge.com</li>
                  <li>+91 9999999999</li>
                </ul>
              </div>
            </div>
          </footer>
      </div>
    </div>
  );
}
export default Home;
