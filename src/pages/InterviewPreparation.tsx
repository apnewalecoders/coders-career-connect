
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Building, User, Briefcase, Filter } from "lucide-react";

const companies = ["All Companies", "TCS", "Amazon", "Google", "Microsoft", "Wipro", "Infosys", "Accenture", "IBM"];
const roles = ["All Roles", "SDE", "Analyst", "Consultant", "Developer", "QA Engineer", "Data Scientist"];
const experienceLevels = ["All Levels", "Fresher", "1-2 Years", "3-5 Years", "5+ Years"];

const interviewExperiences = [
  {
    id: 1,
    candidateName: "Rahul Sharma",
    company: "TCS",
    role: "Software Developer",
    experience: "Fresher",
    date: "March 2024",
    summary: "Detailed experience about TCS interview process including technical rounds, HR discussion, and tips for freshers.",
    rounds: 4,
    difficulty: "Medium"
  },
  {
    id: 2,
    candidateName: "Priya Singh",
    company: "Amazon",
    role: "SDE",
    experience: "1-2 Years",
    date: "February 2024",
    summary: "Amazon SDE interview covering system design, coding problems, and behavioral questions with preparation strategies.",
    rounds: 5,
    difficulty: "Hard"
  },
  {
    id: 3,
    candidateName: "Amit Kumar",
    company: "Google",
    role: "SDE",
    experience: "3-5 Years",
    date: "January 2024",
    summary: "Google technical interview experience focusing on algorithmic problems, system design, and Googleyness assessment.",
    rounds: 6,
    difficulty: "Hard"
  },
  {
    id: 4,
    candidateName: "Sneha Patel",
    company: "Microsoft",
    role: "Data Scientist",
    experience: "1-2 Years",
    date: "March 2024",
    summary: "Microsoft data science role interview covering statistics, machine learning, and practical case studies.",
    rounds: 4,
    difficulty: "Medium"
  },
  {
    id: 5,
    candidateName: "Vikash Gupta",
    company: "Wipro",
    role: "Analyst",
    experience: "Fresher",
    date: "February 2024",
    summary: "Wipro analyst position interview experience with focus on aptitude, technical knowledge, and communication skills.",
    rounds: 3,
    difficulty: "Easy"
  },
  {
    id: 6,
    candidateName: "Anita Desai",
    company: "Infosys",
    role: "Consultant",
    experience: "3-5 Years",
    date: "January 2024",
    summary: "Infosys consultant role interview covering business analysis, client interaction scenarios, and technical competency.",
    rounds: 4,
    difficulty: "Medium"
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
    const matchesSearch = experience.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         experience.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCompany && matchesRole && matchesExperience && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Fresher": return "bg-blue-100 text-blue-800";
      case "1-2 Years": return "bg-purple-100 text-purple-800";
      case "3-5 Years": return "bg-orange-100 text-orange-800";
      case "5+ Years": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleReadExperience = (experienceId: number) => {
    navigate(`/interview-preparation/${experienceId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Interview Preparation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Learn from real interview experiences shared by candidates who have successfully cleared interviews at top companies.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter className="h-5 w-5 text-brand-red" />
                Filters
              </h3>
              
              {/* Companies */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Company
                </h4>
                <div className="space-y-2">
                  {companies.map((company) => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCompany === company
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {company}
                    </button>
                  ))}
                </div>
              </div>

              {/* Roles */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  Role
                </h4>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedRole === role
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Level */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Experience
                </h4>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedExperience(level)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedExperience === level
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Interview Experiences */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by candidate name, company, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Interview Experiences List */}
            <div className="space-y-4">
              {filteredExperiences.length === 0 ? (
                <div className="text-center py-12">
                  <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No interview experiences found matching your criteria.</p>
                </div>
              ) : (
                filteredExperiences.map((experience) => (
                  <Card key={experience.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-lg font-semibold text-gray-900">
                              {experience.candidateName}
                            </CardTitle>
                            <Badge className="bg-brand-red text-white text-xs">
                              {experience.company}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-3 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {experience.role}
                            </Badge>
                            <Badge className={`text-xs ${getExperienceColor(experience.experience)}`}>
                              {experience.experience}
                            </Badge>
                            <Badge className={`text-xs ${getDifficultyColor(experience.difficulty)}`}>
                              {experience.difficulty}
                            </Badge>
                            <span className="text-xs text-gray-500">{experience.rounds} Rounds</span>
                            <span className="text-xs text-gray-500">{experience.date}</span>
                          </div>
                          
                          <CardDescription className="text-gray-600 leading-relaxed">
                            {experience.summary}
                          </CardDescription>
                        </div>
                        
                        <Button
                          onClick={() => handleReadExperience(experience.id)}
                          className="bg-brand-red hover:bg-red-500 text-white ml-4"
                        >
                          Read
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewPreparation;
