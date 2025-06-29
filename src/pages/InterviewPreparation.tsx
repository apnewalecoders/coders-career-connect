
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import FilterSidebar from "@/components/interview/FilterSidebar";
import MobileFilters from "@/components/interview/MobileFilters";
import InterviewList from "@/components/interview/InterviewList";

const companies = ["All Companies", "TCS", "Amazon", "Google", "Microsoft", "Wipro", "Infosys", "Accenture", "IBM"];
const roles = ["All Roles", "SDE", "Analyst", "Consultant", "Developer", "QA Engineer", "Data Scientist"];
const experienceLevels = ["All Levels", "Fresher", "1-2 Years", "3-5 Years", "5+ Years"];

const interviewExperiences = [
  {
    id: 1,
    title: "Software Developer Interview at TCS",
    company: "TCS",
    role: "Software Developer",
    experience: "Fresher",
    date: "March 2024",
    summary: "Comprehensive interview process covering technical fundamentals, coding challenges, and HR discussions. Great insights for freshers preparing for their first tech job.",
    rounds: 4,
    difficulty: "Medium",
    keyHighlights: ["Technical aptitude test", "Coding round", "Technical interview", "HR discussion"]
  },
  {
    id: 2,
    title: "SDE Interview Experience at Amazon",
    company: "Amazon",
    role: "SDE",
    experience: "1-2 Years",
    date: "February 2024",
    summary: "In-depth Amazon SDE interview covering system design, algorithmic thinking, and behavioral leadership principles. Focus on scalability and problem-solving approach.",
    rounds: 5,
    difficulty: "Hard",
    keyHighlights: ["Online assessment", "System design", "Behavioral questions", "Leadership principles"]
  },
  {
    id: 3,
    title: "SDE Interview Process at Google",
    company: "Google",
    role: "SDE",
    experience: "3-5 Years",
    date: "January 2024",
    summary: "Detailed Google technical interview experience focusing on complex algorithmic problems, system architecture, and Googleyness cultural fit assessment.",
    rounds: 6,
    difficulty: "Hard",
    keyHighlights: ["Phone screening", "Onsite coding", "System design", "Googleyness interview"]
  },
  {
    id: 4,
    title: "Data Scientist Role at Microsoft",
    company: "Microsoft",
    role: "Data Scientist",
    experience: "1-2 Years",
    date: "March 2024",
    summary: "Microsoft data science interview covering statistical analysis, machine learning concepts, and practical case studies with real-world applications.",
    rounds: 4,
    difficulty: "Medium",
    keyHighlights: ["Statistics quiz", "ML case study", "Technical presentation", "Culture fit"]
  },
  {
    id: 5,
    title: "Analyst Position at Wipro",
    company: "Wipro",
    role: "Analyst",
    experience: "Fresher",
    date: "February 2024",
    summary: "Wipro analyst interview focusing on analytical thinking, communication skills, and technical aptitude. Perfect preparation guide for fresh graduates.",
    rounds: 3,
    difficulty: "Easy",
    keyHighlights: ["Aptitude test", "Group discussion", "Technical interview"]
  },
  {
    id: 6,
    title: "Consultant Interview at Infosys",
    company: "Infosys",
    role: "Consultant",
    experience: "3-5 Years",
    date: "January 2024",
    summary: "Infosys consultant role interview covering business analysis, client communication scenarios, and technical competency evaluation.",
    rounds: 4,
    difficulty: "Medium",
    keyHighlights: ["Business case study", "Client scenario", "Technical skills", "Leadership assessment"]
  }
];

const InterviewPreparation = () => {
  const navigate = useNavigate();
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedExperience, setSelectedExperience] = useState("All Levels");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExperiences = interviewExperiences.filter(experience => {
    const matchesCompany = selectedCompany === "All Companies" || experience.company === selectedCompany;
    const matchesRole = selectedRole === "All Roles" || experience.role === selectedRole;
    const matchesExperience = selectedExperience === "All Levels" || experience.experience === selectedExperience;
    const matchesSearch = experience.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCompany && matchesRole && matchesExperience && matchesSearch;
  });

  const handleReadExperience = (experienceId: number) => {
    navigate(`/interview-preparation/${experienceId}`);
  };

  const resetFilters = () => {
    setSelectedCompany("All Companies");
    setSelectedRole("All Roles");
    setSelectedExperience("All Levels");
    setSearchTerm("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn from real interview experiences shared by candidates who have successfully cleared interviews at top companies. Get insights, tips, and strategies to ace your next interview.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Desktop Filters - Left Sidebar */}
          <FilterSidebar
            companies={companies}
            roles={roles}
            experienceLevels={experienceLevels}
            selectedCompany={selectedCompany}
            selectedRole={selectedRole}
            selectedExperience={selectedExperience}
            onCompanyChange={setSelectedCompany}
            onRoleChange={setSelectedRole}
            onExperienceChange={setSelectedExperience}
            onResetFilters={resetFilters}
          />

          {/* Main Content */}
          <div className="flex-1 lg:w-3/4">
            {/* Mobile Filters & Search */}
            <div className="mb-6 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search interviews by company, role, or keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12 border-gray-200 focus:border-brand-red focus:ring-brand-red"
                />
              </div>

              {/* Mobile Filter Dropdowns */}
              <MobileFilters
                companies={companies}
                roles={roles}
                experienceLevels={experienceLevels}
                selectedCompany={selectedCompany}
                selectedRole={selectedRole}
                selectedExperience={selectedExperience}
                onCompanyChange={setSelectedCompany}
                onRoleChange={setSelectedRole}
                onExperienceChange={setSelectedExperience}
                onResetFilters={resetFilters}
              />
            </div>

            <InterviewList
              experiences={filteredExperiences}
              onReadExperience={handleReadExperience}
              onResetFilters={resetFilters}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPreparation;
