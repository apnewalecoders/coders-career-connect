
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Filter, Building, Briefcase, Code, ChevronDown } from "lucide-react";

interface AssessmentFiltersProps {
  onFilterChange: (filters: {
    company: string;
    role: string;
    topic: string;
  }) => void;
}

const AssessmentFilters = ({ onFilterChange }: AssessmentFiltersProps) => {
  const [selectedCompany, setSelectedCompany] = useState("All Companies");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");

  const companies = ["All Companies", "Google", "TCS", "Amazon", "Microsoft", "Wipro", "Accenture"];
  const roles = ["All Roles", "SDE", "Analyst", "Backend Developer", "Frontend Developer", "Full Stack"];
  const topics = ["All Topics", "Arrays", "Strings", "Dynamic Programming", "Trees", "Graphs", "Algorithms"];

  const handleFilterChange = (type: string, value: string) => {
    let newCompany = selectedCompany;
    let newRole = selectedRole;
    let newTopic = selectedTopic;

    if (type === "company") {
      setSelectedCompany(value);
      newCompany = value;
    } else if (type === "role") {
      setSelectedRole(value);
      newRole = value;
    } else if (type === "topic") {
      setSelectedTopic(value);
      newTopic = value;
    }

    onFilterChange({
      company: newCompany,
      role: newRole,
      topic: newTopic
    });
  };

  const resetFilters = () => {
    setSelectedCompany("All Companies");
    setSelectedRole("All Roles");
    setSelectedTopic("All Topics");
    onFilterChange({
      company: "All Companies",
      role: "All Roles",
      topic: "All Topics"
    });
  };

  return (
    <>
      {/* Desktop Filters */}
      <Card className="hidden lg:block mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Building className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedCompany}
                onChange={(e) => handleFilterChange("company", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                {companies.map(company => (
                  <option key={company} value={company}>{company}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedRole}
                onChange={(e) => handleFilterChange("role", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <Code className="h-4 w-4 text-gray-500" />
              <select 
                value={selectedTopic}
                onChange={(e) => handleFilterChange("topic", e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-brand-red"
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-brand-red hover:bg-red-50"
            >
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Mobile Filters */}
      <div className="lg:hidden mb-6 flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-white">
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Company</label>
                <select 
                  value={selectedCompany}
                  onChange={(e) => handleFilterChange("company", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Role</label>
                <select 
                  value={selectedRole}
                  onChange={(e) => handleFilterChange("role", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Topic</label>
                <select 
                  value={selectedTopic}
                  onChange={(e) => handleFilterChange("topic", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                >
                  {topics.map(topic => (
                    <option key={topic} value={topic}>{topic}</option>
                  ))}
                </select>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={resetFilters}
                className="w-full text-brand-red hover:bg-red-50"
              >
                Clear All Filters
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default AssessmentFilters;
