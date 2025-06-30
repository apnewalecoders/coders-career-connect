
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Users, Building, Target } from "lucide-react";
import PracticeProblemsFilters from "@/components/practiceProblems/PracticeProblemsFilters";

const practiceProblems = [
  {
    id: 1,
    title: "Two Sum Problem",
    description: "Find two numbers in an array that add up to a target sum",
    difficulty: "Easy",
    topic: "Array",
    company: "Amazon",
    solvedBy: 15420,
    tags: ["Array", "Hash Table", "Two Pointers"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)"
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    description: "Find the length of the longest substring without repeating characters",
    difficulty: "Medium",
    topic: "String",
    company: "Microsoft",
    solvedBy: 8930,
    tags: ["String", "Sliding Window", "Hash Table"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(k)"
  },
  {
    id: 3,
    title: "Reverse Linked List",
    description: "Reverse a singly linked list iteratively and recursively",
    difficulty: "Easy",
    topic: "LinkedList", 
    company: "Google",
    solvedBy: 12650,
    tags: ["Linked List", "Recursion", "Iteration"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  },
  {
    id: 4,
    title: "Valid Parentheses",
    description: "Determine if the input string has valid parentheses",
    difficulty: "Easy",
    topic: "Stack",
    company: "Facebook",
    solvedBy: 18290,
    tags: ["Stack", "String", "Parsing"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)"
  },
  {
    id: 5,
    title: "Binary Tree Maximum Path Sum",
    description: "Find the maximum path sum in a binary tree",
    difficulty: "Hard",
    topic: "Tree",
    company: "Adobe",
    solvedBy: 4720,
    tags: ["Binary Tree", "DFS", "Recursion"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(h)"
  },
  {
    id: 6,
    title: "Course Schedule",
    description: "Determine if you can finish all courses given prerequisites",
    difficulty: "Medium",
    topic: "Graph",
    company: "Netflix",
    solvedBy: 6830,
    tags: ["Graph", "Topological Sort", "DFS"],
    timeComplexity: "O(V+E)",
    spaceComplexity: "O(V+E)"
  },
  {
    id: 7,
    title: "Climbing Stairs",
    description: "Find number of distinct ways to climb n stairs",
    difficulty: "Easy",
    topic: "DP",
    company: "Apple",
    solvedBy: 14560,
    tags: ["Dynamic Programming", "Math", "Fibonacci"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(1)"
  },
  {
    id: 8,
    title: "Activity Selection Problem",
    description: "Select maximum number of activities that don't overlap",
    difficulty: "Medium",
    topic: "Greedy",
    company: "Amazon",
    solvedBy: 5940,
    tags: ["Greedy", "Sorting", "Intervals"],
    timeComplexity: "O(n log n)",
    spaceComplexity: "O(1)"
  }
];

const PracticeProblems = () => {
  const navigate = useNavigate();
  const [filteredProblems, setFilteredProblems] = useState(practiceProblems);

  const handleFiltersChange = (filters: { difficulty: string; topic: string; company: string }) => {
    const filtered = practiceProblems.filter(problem => {
      const matchesDifficulty = filters.difficulty === "All" || problem.difficulty === filters.difficulty;
      const matchesTopic = filters.topic === "All" || problem.topic === filters.topic;
      const matchesCompany = filters.company === "All" || problem.company === filters.company;
      
      return matchesDifficulty && matchesTopic && matchesCompany;
    });
    
    setFilteredProblems(filtered);
  };

  const handleSolveProblem = (problemId: number) => {
    navigate(`/practice-problems/${problemId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Practice Problems</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sharpen your coding skills with our curated collection of practice problems. From easy warm-ups to challenging algorithmic puzzles.
          </p>
        </div>

        {/* Filters */}
        <PracticeProblemsFilters onFiltersChange={handleFiltersChange} />

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredProblems.length}</span> problem{filteredProblems.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Problems List */}
        {filteredProblems.length > 0 ? (
          <div className="space-y-4">
            {filteredProblems.map((problem) => (
              <Card key={problem.id} className="hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-brand-red">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left Section - Problem Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            {problem.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {problem.description}
                          </p>
                          
                          {/* Problem Meta */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-3">
                            <div className="flex items-center gap-1">
                              <Users className="h-4 w-4" />
                              <span>{problem.solvedBy.toLocaleString()} solved</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building className="h-4 w-4" />
                              <span>{problem.company}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            <Badge className={`text-xs font-medium px-2 py-1 border ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </Badge>
                            {problem.tags.slice(0, 3).map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs px-2 py-1 border-gray-300">
                                {tag}
                              </Badge>
                            ))}
                            {problem.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs px-2 py-1 border-gray-300">
                                +{problem.tags.length - 3} more
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Section - Action Button */}
                    <div className="lg:w-auto">
                      <Button 
                        onClick={() => handleSolveProblem(problem.id)}
                        className="w-full lg:w-auto bg-brand-red hover:bg-red-600 text-white font-medium px-6"
                      >
                        <Code className="h-4 w-4 mr-2" />
                        Solve Problem
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Code className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No problems found</h3>
            <p className="text-gray-600">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PracticeProblems;
