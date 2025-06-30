
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Filter, Target, Building, Hash } from "lucide-react";
import FilterDropdown from "@/components/filters/FilterDropdown";

interface PracticeProblemsFiltersProps {
  onFiltersChange: (filters: {
    difficulty: string;
    topic: string;
    company: string;
  }) => void;
}

const difficulties = [
  { value: "All", label: "All Levels" },
  { value: "Easy", label: "Easy" },
  { value: "Medium", label: "Medium" },
  { value: "Hard", label: "Hard" }
];

const topics = [
  { value: "All", label: "All Topics" },
  { value: "Array", label: "Arrays" },
  { value: "String", label: "Strings" },
  { value: "LinkedList", label: "Linked Lists" },
  { value: "Stack", label: "Stack & Queue" },
  { value: "Tree", label: "Trees" },
  { value: "Graph", label: "Graphs" },
  { value: "DP", label: "Dynamic Programming" },
  { value: "Greedy", label: "Greedy Algorithms" },
  { value: "Sorting", label: "Sorting & Searching" }
];

const companies = [
  { value: "All", label: "All Companies" },
  { value: "Amazon", label: "Amazon" },
  { value: "Microsoft", label: "Microsoft" },
  { value: "Google", label: "Google" },
  { value: "Facebook", label: "Meta" },
  { value: "Adobe", label: "Adobe" },
  { value: "Netflix", label: "Netflix" },
  { value: "Apple", label: "Apple" }
];

const PracticeProblemsFilters = ({ onFiltersChange }: PracticeProblemsFiltersProps) => {
  const [difficulty, setDifficulty] = useState("All");
  const [topic, setTopic] = useState("All");
  const [company, setCompany] = useState("All");

  const handleFilterChange = (type: string, value: string) => {
    let newFilters = { difficulty, topic, company };
    
    switch (type) {
      case 'difficulty':
        setDifficulty(value);
        newFilters.difficulty = value;
        break;
      case 'topic':
        setTopic(value);
        newFilters.topic = value;
        break;
      case 'company':
        setCompany(value);
        newFilters.company = value;
        break;
    }
    
    onFiltersChange(newFilters);
  };

  const resetFilters = () => {
    setDifficulty("All");
    setTopic("All");
    setCompany("All");
    onFiltersChange({ difficulty: "All", topic: "All", company: "All" });
  };

  const hasActiveFilters = difficulty !== "All" || topic !== "All" || company !== "All";

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6">
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
          title="Difficulty"
          icon={<Target className="h-4 w-4" />}
          options={difficulties}
          selectedValue={difficulty}
          onSelect={(value) => handleFilterChange('difficulty', value)}
          placeholder="Select Difficulty"
        />

        <FilterDropdown
          title="Topic"
          icon={<Hash className="h-4 w-4" />}
          options={topics}
          selectedValue={topic}
          onSelect={(value) => handleFilterChange('topic', value)}
          placeholder="Select Topic"
        />

        <FilterDropdown
          title="Company"
          icon={<Building className="h-4 w-4" />}
          options={companies}
          selectedValue={company}
          onSelect={(value) => handleFilterChange('company', value)}
          placeholder="Select Company"
        />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-600 mr-2">Active filters:</span>
          {difficulty !== "All" && (
            <Badge variant="outline" className="bg-red-50 border-red-200 text-red-800">
              {difficulties.find(d => d.value === difficulty)?.label}
            </Badge>
          )}
          {topic !== "All" && (
            <Badge variant="outline" className="bg-blue-50 border-blue-200 text-blue-800">
              {topics.find(t => t.value === topic)?.label}
            </Badge>
          )}
          {company !== "All" && (
            <Badge variant="outline" className="bg-green-50 border-green-200 text-green-800">
              {companies.find(c => c.value === company)?.label}
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default PracticeProblemsFilters;
