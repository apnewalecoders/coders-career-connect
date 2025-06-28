
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Code, Filter } from "lucide-react";

const categories = [
  "All Problems",
  "Array",
  "String",
  "Tree",
  "Graph",
  "Dynamic Programming",
  "Linked List",
  "Stack & Queue",
  "Sorting",
  "Binary Search",
  "Hash Table",
  "Math"
];

const difficulties = ["All", "Easy", "Medium", "Hard"];

const problems = [
  {
    id: 1,
    title: "Two Sum",
    category: "Array",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    description: "Given an array of integers, return indices of two numbers that add up to target."
  },
  {
    id: 2,
    title: "Longest Substring Without Repeating Characters",
    category: "String",
    difficulty: "Medium",
    tags: ["String", "Sliding Window", "Hash Table"],
    description: "Find the length of the longest substring without repeating characters."
  },
  {
    id: 3,
    title: "Binary Tree Inorder Traversal",
    category: "Tree",
    difficulty: "Easy",
    tags: ["Tree", "DFS", "Stack"],
    description: "Given the root of a binary tree, return the inorder traversal of its nodes' values."
  },
  {
    id: 4,
    title: "Course Schedule",
    category: "Graph",
    difficulty: "Medium",
    tags: ["Graph", "DFS", "BFS", "Topological Sort"],
    description: "Determine if you can finish all courses given the prerequisites."
  },
  {
    id: 5,
    title: "Climbing Stairs",
    category: "Dynamic Programming",
    difficulty: "Easy",
    tags: ["Dynamic Programming", "Math"],
    description: "Find the number of distinct ways to climb n stairs."
  },
  {
    id: 6,
    title: "Merge Two Sorted Lists",
    category: "Linked List",
    difficulty: "Easy",
    tags: ["Linked List", "Recursion"],
    description: "Merge two sorted linked lists and return as a new sorted list."
  },
  {
    id: 7,
    title: "Valid Parentheses",
    category: "Stack & Queue",
    difficulty: "Easy",
    tags: ["String", "Stack"],
    description: "Determine if the input string of brackets is valid."
  },
  {
    id: 8,
    title: "Merge Sort",
    category: "Sorting",
    difficulty: "Medium",
    tags: ["Array", "Divide and Conquer", "Sorting"],
    description: "Implement merge sort algorithm to sort an array."
  }
];

const PracticeProblems = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All Problems");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProblems = problems.filter(problem => {
    const matchesCategory = selectedCategory === "All Problems" || problem.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || problem.difficulty === selectedDifficulty;
    const matchesSearch = problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         problem.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 hover:bg-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 hover:bg-red-200";
      default: return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleSolveProblem = (problemId: number) => {
    navigate(`/practice-problems/${problemId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Practice Problems</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Sharpen your coding skills with our curated collection of programming problems.
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
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Difficulty</h4>
                <div className="space-y-2">
                  {difficulties.map((difficulty) => (
                    <button
                      key={difficulty}
                      onClick={() => setSelectedDifficulty(difficulty)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedDifficulty === difficulty
                          ? "bg-brand-red text-white"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {difficulty}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Problems */}
          <div className="lg:w-3/4">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search problems by title or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Problems List */}
            <div className="space-y-4">
              {filteredProblems.length === 0 ? (
                <div className="text-center py-12">
                  <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No problems found matching your criteria.</p>
                </div>
              ) : (
                filteredProblems.map((problem) => (
                  <Card key={problem.id} className="hover:shadow-md transition-shadow duration-200">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold text-gray-900 mb-2">
                            {problem.title}
                          </CardTitle>
                          <p className="text-gray-600 text-sm mb-3">{problem.description}</p>
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge className={`text-xs ${getDifficultyColor(problem.difficulty)}`}>
                              {problem.difficulty}
                            </Badge>
                            {problem.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          onClick={() => handleSolveProblem(problem.id)}
                          className="bg-brand-red hover:bg-red-500 text-white ml-4"
                        >
                          Solve
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

export default PracticeProblems;
