
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestCase {
  id: number;
  input: string;
  output: string;
}

const CreateCodingProblem = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [problemTitle, setProblemTitle] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [topicTags, setTopicTags] = useState<string[]>([]);
  const [companyTag, setCompanyTag] = useState("");
  const [inputFormat, setInputFormat] = useState("");
  const [outputFormat, setOutputFormat] = useState("");
  const [constraints, setConstraints] = useState("");
  const [testCases, setTestCases] = useState<TestCase[]>([
    { id: 1, input: "", output: "" }
  ]);

  const difficulties = ["Easy", "Medium", "Hard"];
  const topics = ["Array", "String", "Tree", "Graph", "Dynamic Programming", "Greedy", "Sorting", "Binary Search", "Linked List", "Stack", "Queue"];
  const companies = ["Google", "Amazon", "Microsoft", "Apple", "Meta", "Netflix", "TCS", "Wipro", "Infosys"];

  const addTestCase = () => {
    const newId = Math.max(...testCases.map(tc => tc.id)) + 1;
    setTestCases([...testCases, { id: newId, input: "", output: "" }]);
  };

  const removeTestCase = (id: number) => {
    if (testCases.length > 1) {
      setTestCases(testCases.filter(tc => tc.id !== id));
    }
  };

  const updateTestCase = (id: number, field: string, value: string) => {
    setTestCases(testCases.map(tc => 
      tc.id === id ? { ...tc, [field]: value } : tc
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!problemTitle || !problemStatement || !difficulty) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (testCases.some(tc => !tc.input || !tc.output)) {
      toast({
        title: "Error",
        description: "Please complete all test cases",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally save to backend
    console.log("Coding Problem Data:", {
      problemTitle,
      problemStatement,
      difficulty,
      topicTags,
      companyTag,
      inputFormat,
      outputFormat,
      constraints,
      testCases
    });

    toast({
      title: "Success",
      description: "Coding problem created successfully!",
    });

    navigate("/admin");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Design Coding Problem</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Problem Information */}
            <Card>
              <CardHeader>
                <CardTitle>Problem Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="problemTitle">Problem Title *</Label>
                  <Input
                    id="problemTitle"
                    value={problemTitle}
                    onChange={(e) => setProblemTitle(e.target.value)}
                    placeholder="Enter problem title"
                    required
                  />
                </div>

                <div>
                  <Label>Problem Statement *</Label>
                  <Textarea
                    value={problemStatement}
                    onChange={(e) => setProblemStatement(e.target.value)}
                    placeholder="Enter the detailed problem statement"
                    rows={6}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Difficulty *</Label>
                    <Select value={difficulty} onValueChange={setDifficulty} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficulties.map(diff => (
                          <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Company Tag</Label>
                    <Select value={companyTag} onValueChange={setCompanyTag}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company (optional)" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map(company => (
                          <SelectItem key={company} value={company}>{company}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Topic Tags</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {topics.map(topic => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => {
                          const newTags = topicTags.includes(topic)
                            ? topicTags.filter(t => t !== topic)
                            : [...topicTags, topic];
                          setTopicTags(newTags);
                        }}
                        className={`px-3 py-1 text-sm rounded-full border ${
                          topicTags.includes(topic)
                            ? 'bg-brand-red text-white border-brand-red'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                        }`}
                      >
                        {topic}
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Format and Constraints */}
            <Card>
              <CardHeader>
                <CardTitle>Format & Constraints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Input Format</Label>
                    <Textarea
                      value={inputFormat}
                      onChange={(e) => setInputFormat(e.target.value)}
                      placeholder="Describe the input format"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label>Output Format</Label>
                    <Textarea
                      value={outputFormat}
                      onChange={(e) => setOutputFormat(e.target.value)}
                      placeholder="Describe the output format"
                      rows={3}
                    />
                  </div>
                </div>

                <div>
                  <Label>Constraints</Label>
                  <Textarea
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="Enter constraints (e.g., 1 ≤ n ≤ 10^5, 1 ≤ arr[i] ≤ 10^9)"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Cases */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Sample Test Cases</CardTitle>
                <Button
                  type="button"
                  onClick={addTestCase}
                  className="bg-brand-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Test Case
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {testCases.map((testCase, index) => (
                  <div key={testCase.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Test Case {index + 1}</h3>
                      {testCases.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTestCase(testCase.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Input *</Label>
                        <Textarea
                          value={testCase.input}
                          onChange={(e) => updateTestCase(testCase.id, 'input', e.target.value)}
                          placeholder="Enter test input"
                          rows={3}
                          required
                        />
                      </div>
                      <div>
                        <Label>Expected Output *</Label>
                        <Textarea
                          value={testCase.output}
                          onChange={(e) => updateTestCase(testCase.id, 'output', e.target.value)}
                          placeholder="Enter expected output"
                          rows={3}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-brand-red hover:bg-red-600 px-8"
              >
                Create Coding Problem
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCodingProblem;
