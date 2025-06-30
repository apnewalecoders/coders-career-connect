
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Target, Building, BookOpen, Code } from "lucide-react";
import FilterDropdown from "@/components/filters/FilterDropdown";
import MobileFilterSheet from "@/components/filters/MobileFilterSheet";

interface AssessmentFiltersProps {
  onFiltersChange: (filters: {
    type: string;
    company: string;
    topic: string;
    difficulty: string;
  }) => void;
}

const assessmentTypes = [
  { value: "All", label: "All Types" },
  { value: "Random", label: "Random" },
  { value: "Company-wise", label: "Company-wise" }
];

const companies = [
  { value: "All", label: "All Companies" },
  { value: "TCS", label: "TCS" },
  { value: "Wipro", label: "Wipro" },
  { value: "Accenture", label: "Accenture" },
  { value: "Google", label: "Google" },
  { value: "Amazon", label: "Amazon" },
  { value: "Microsoft", label: "Microsoft" }
];

const topics = [
  { value: "All", label: "All Topics" },
  { value: "Arrays", label: "Arrays" },
  { value: "Strings", label: "Strings" },
  { value: "Trees", label: "Trees" },
  { value: "Graphs", label: "Graphs" },
  { value: "Dynamic Programming", label: "Dynamic Programming" },
  { value: "System Design", label: "System Design" }
];

const difficulties = [
  { value: "All", label: "All Levels" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" }
];

const AssessmentFilters = ({ onFiltersChange }: AssessmentFiltersProps) => {
  const [type, setType] = useState("All");
  const [company, setCompany] = useState("All");
  const [topic, setTopic] = useState("All");
  const [difficulty, setDifficulty] = useState("All");

  const handleFilterChange = (filterType: string, value: string) => {
    let newFilters = { type, company, topic, difficulty };
    
    switch (filterType) {
      case 'type':
        setType(value);
        newFilters.type = value;
        break;
      case 'company':
        setCompany(value);
        newFilters.company = value;
        break;
      case 'topic':
        setTopic(value);
        newFilters.topic = value;
        break;
      case 'difficulty':
        setDifficulty(value);
        newFilters.difficulty = value;
        break;
    }
    
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    setType("All");
    setCompany("All");
    setTopic("All");
    setDifficulty("All");
    onFiltersChange({ type: "All", company: "All", topic: "All", difficulty: "All" });
  };

  const hasActiveFilters = type !== "All" || company !== "All" || topic !== "All" || difficulty !== "All";

  const activeFilters = [
    ...(type !== "All" ? [{ label: assessmentTypes.find(t => t.value === type)?.label || type, color: "bg-blue-50 border-blue-200 text-blue-800" }] : []),
    ...(company !== "All" ? [{ label: companies.find(c => c.value === company)?.label || company, color: "bg-purple-50 border-purple-200 text-purple-800" }] : []),
    ...(topic !== "All" ? [{ label: topics.find(t => t.value === topic)?.label || topic, color: "bg-green-50 border-green-200 text-green-800" }] : []),
    ...(difficulty !== "All" ? [{ label: difficulties.find(d => d.value === difficulty)?.label || difficulty, color: "bg-red-50 border-red-200 text-red-800" }] : [])
  ];

  const filterSections = [
    {
      title: "Assessment Type",
      icon: <Target className="h-4 w-4" />,
      options: assessmentTypes,
      selectedValue: type,
      onSelect: (value: string) => handleFilterChange('type', value)
    },
    {
      title: "Company",
      icon: <Building className="h-4 w-4" />,
      options: companies,
      selectedValue: company,
      onSelect: (value: string) => handleFilterChange('company', value)
    },
    {
      title: "Topic",
      icon: <BookOpen className="h-4 w-4" />,
      options: topics,
      selectedValue: topic,
      onSelect: (value: string) => handleFilterChange('topic', value)
    },
    {
      title: "Difficulty",
      icon: <Code className="h-4 w-4" />,
      options: difficulties,
      selectedValue: difficulty,
      onSelect: (value: string) => handleFilterChange('difficulty', value)
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5 text-brand-red" />
            Filters
          </h3>
          {hasActiveFilters && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={resetFilters}
              className="text-brand-red hover:bg-red-50"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <FilterDropdown
            title="Type"
            icon={<Target className="h-4 w-4" />}
            options={assessmentTypes}
            selectedValue={type}
            onSelect={(value) => handleFilterChange('type', value)}
            placeholder="Select Type"
          />

          <FilterDropdown
            title="Company"
            icon={<Building className="h-4 w-4" />}
            options={companies}
            selectedValue={company}
            onSelect={(value) => handleFilterChange('company', value)}
            placeholder="Select Company"
          />

          <FilterDropdown
            title="Topic"
            icon={<BookOpen className="h-4 w-4" />}
            options={topics}
            selectedValue={topic}
            onSelect={(value) => handleFilterChange('topic', value)}
            placeholder="Select Topic"
          />

          <FilterDropdown
            title="Difficulty"
            icon={<Code className="h-4 w-4" />}
            options={difficulties}
            selectedValue={difficulty}
            onSelect={(value) => handleFilterChange('difficulty', value)}
            placeholder="Select Difficulty"
          />
        </div>

        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
            <span className="text-sm text-gray-600 mr-2">Active filters:</span>
            {activeFilters.map((filter, index) => (
              <Badge key={index} variant="outline" className={filter.color}>
                {filter.label}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filters */}
      <MobileFilterSheet
        sections={filterSections}
        onResetFilters={resetFilters}
        hasActiveFilters={hasActiveFilters}
        activeFilters={activeFilters}
      />
    </div>
  );
};

export default AssessmentFilters;
