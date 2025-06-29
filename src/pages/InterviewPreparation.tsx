
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Search, Building, User, Briefcase, Filter, ChevronDown } from "lucide-react";

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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Fresher": return "bg-blue-100 text-blue-800 border-blue-200";
      case "1-2 Years": return "bg-purple-100 text-purple-800 border-purple-200";
      case "3-5 Years": return "bg-orange-100 text-orange-800 border-orange-200";
      case "5+ Years": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <Filter className="h-5 w-5 text-brand-red" />
                  Filters
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-brand-red hover:bg-red-50"
                >
                  Clear
                </Button>
              </div>
              
              {/* Companies */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4 text-gray-600" />
                  Company
                </h4>
                <div className="space-y-2">
                  {companies.map((company) => (
                    <button
                      key={company}
                      onClick={() => setSelectedCompany(company)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedCompany === company
                          ? "bg-brand-red text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                  <Briefcase className="h-4 w-4 text-gray-600" />
                  Role
                </h4>
                <div className="space-y-2">
                  {roles.map((role) => (
                    <button
                      key={role}
                      onClick={() => setSelectedRole(role)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedRole === role
                          ? "bg-brand-red text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
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
                  <User className="h-4 w-4 text-gray-600" />
                  Experience
                </h4>
                <div className="space-y-2">
                  {experienceLevels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedExperience(level)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        selectedExperience === level
                          ? "bg-brand-red text-white shadow-md"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
              <div className="flex lg:hidden gap-3 overflow-x-auto pb-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit">
                      <Building className="h-4 w-4" />
                      {selectedCompany === "All Companies" ? "Company" : selectedCompany}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {companies.map((company) => (
                      <DropdownMenuItem
                        key={company}
                        onClick={() => setSelectedCompany(company)}
                        className={selectedCompany === company ? "bg-brand-red text-white" : ""}
                      >
                        {company}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit">
                      <Briefcase className="h-4 w-4" />
                      {selectedRole === "All Roles" ? "Role" : selectedRole}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {roles.map((role) => (
                      <DropdownMenuItem
                        key={role}
                        onClick={() => setSelectedRole(role)}
                        className={selectedRole === role ? "bg-brand-red text-white" : ""}
                      >
                        {role}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit">
                      <User className="h-4 w-4" />
                      {selectedExperience === "All Levels" ? "Experience" : selectedExperience}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48">
                    {experienceLevels.map((level) => (
                      <DropdownMenuItem
                        key={level}
                        onClick={() => setSelectedExperience(level)}
                        className={selectedExperience === level ? "bg-brand-red text-white" : ""}
                      >
                        {level}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-brand-red hover:bg-red-50 whitespace-nowrap"
                >
                  Clear All
                </Button>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-500">
                {filteredExperiences.length} interview experience{filteredExperiences.length !== 1 ? 's' : ''} found
              </div>
            </div>

            {/* Interview Experiences Grid */}
            <div className="grid gap-6">
              {filteredExperiences.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <User className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium text-gray-900 mb-2">No experiences found</h3>
                    <p className="text-gray-500 mb-6">
                      Try adjusting your filters or search terms to find relevant interview experiences.
                    </p>
                    <Button onClick={resetFilters} variant="outline">
                      Clear Filters
                    </Button>
                  </div>
                </div>
              ) : (
                filteredExperiences.map((experience) => (
                  <Card key={experience.id} className="hover:shadow-lg transition-all duration-300 border-gray-100 hover:border-gray-200">
                    <CardHeader className="pb-4">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-xl font-semibold text-gray-900 mb-3 leading-tight">
                            {experience.title}
                          </CardTitle>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge className="bg-brand-red hover:bg-red-600 text-white text-xs font-medium px-3 py-1">
                              {experience.company}
                            </Badge>
                            <Badge variant="outline" className="text-xs font-medium px-3 py-1 border-gray-300">
                              {experience.role}
                            </Badge>
                            <Badge className={`text-xs font-medium px-3 py-1 border ${getExperienceColor(experience.experience)}`}>
                              {experience.experience}
                            </Badge>
                            <Badge className={`text-xs font-medium px-3 py-1 border ${getDifficultyColor(experience.difficulty)}`}>
                              {experience.difficulty}
                            </Badge>
                          </div>
                          
                          <CardDescription className="text-gray-600 leading-relaxed mb-4">
                            {experience.summary}
                          </CardDescription>

                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                              {experience.rounds} Rounds
                            </span>
                            <span className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              {experience.date}
                            </span>
                          </div>
                        </div>
                        
                        <Button
                          onClick={() => handleReadExperience(experience.id)}
                          className="bg-brand-red hover:bg-red-600 text-white shadow-md hover:shadow-lg transition-all duration-200 min-w-fit"
                        >
                          Read Experience
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
