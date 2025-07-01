
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

interface CodingQuestion {
  id: number;
  title: string;
  statement: string;
  constraints: string;
  sampleInput: string;
  sampleOutput: string;
  tags: string[];
}

const CreateMockAssessment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [assessmentTitle, setAssessmentTitle] = useState("");
  const [type, setType] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [questions, setQuestions] = useState<CodingQuestion[]>([
    {
      id: 1,
      title: "",
      statement: "",
      constraints: "",
      sampleInput: "",
      sampleOutput: "",
      tags: []
    }
  ]);

  const companies = ["TCS", "Wipro", "Accenture", "Google", "Amazon", "Microsoft", "IBM", "Infosys"];
  const availableTags = ["Array", "String", "Tree", "Graph", "Dynamic Programming", "Greedy", "Sorting", "Binary Search"];

  const addQuestion = () => {
    if (questions.length < 2) {
      const newId = Math.max(...questions.map(q => q.id)) + 1;
      setQuestions([...questions, {
        id: newId,
        title: "",
        statement: "",
        constraints: "",
        sampleInput: "",
        sampleOutput: "",
        tags: []
      }]);
    }
  };

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== id));
    }
  };

  const updateQuestion = (id: number, field: string, value: any) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, [field]: value } : q
    ));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!assessmentTitle || !type || !timeLimit) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    if (type === "Company-wise" && !companyName) {
      toast({
        title: "Error",
        description: "Please select a company for company-wise assessment",
        variant: "destructive"
      });
      return;
    }

    if (questions.some(q => !q.title || !q.statement)) {
      toast({
        title: "Error",
        description: "Please complete all coding questions",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally save to backend
    console.log("Mock Assessment Data:", {
      assessmentTitle,
      type,
      companyName,
      timeLimit: parseInt(timeLimit),
      questions
    });

    toast({
      title: "Success",
      description: "Mock assessment created successfully!",
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
            <h1 className="text-3xl font-bold text-gray-900">Create Mock Assessment</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Assessment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="assessmentTitle">Assessment Title *</Label>
                  <Input
                    id="assessmentTitle"
                    value={assessmentTitle}
                    onChange={(e) => setAssessmentTitle(e.target.value)}
                    placeholder="Enter assessment title"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Type *</Label>
                    <Select value={type} onValueChange={setType} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Random">Random</SelectItem>
                        <SelectItem value="Company-wise">Company-wise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {type === "Company-wise" && (
                    <div>
                      <Label>Company *</Label>
                      <Select value={companyName} onValueChange={setCompanyName} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          {companies.map(company => (
                            <SelectItem key={company} value={company}>{company}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="timeLimit">Time Limit (minutes) *</Label>
                    <Input
                      id="timeLimit"
                      type="number"
                      value={timeLimit}
                      onChange={(e) => setTimeLimit(e.target.value)}
                      placeholder="60"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Coding Questions */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Coding Questions ({questions.length}/2)</CardTitle>
                <Button
                  type="button"
                  onClick={addQuestion}
                  disabled={questions.length >= 2}
                  className="bg-brand-red hover:bg-red-600"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </CardHeader>
              <CardContent className="space-y-6">
                {questions.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Coding Question {index + 1}</h3>
                      {questions.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeQuestion(question.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label>Question Title *</Label>
                      <Input
                        value={question.title}
                        onChange={(e) => updateQuestion(question.id, 'title', e.target.value)}
                        placeholder="Enter question title"
                        required
                      />
                    </div>

                    <div>
                      <Label>Problem Statement *</Label>
                      <Textarea
                        value={question.statement}
                        onChange={(e) => updateQuestion(question.id, 'statement', e.target.value)}
                        placeholder="Enter the full problem statement"
                        rows={4}
                        required
                      />
                    </div>

                    <div>
                      <Label>Constraints</Label>
                      <Textarea
                        value={question.constraints}
                        onChange={(e) => updateQuestion(question.id, 'constraints', e.target.value)}
                        placeholder="Enter constraints (e.g., 1 ≤ n ≤ 10^5)"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label>Sample Input</Label>
                        <Textarea
                          value={question.sampleInput}
                          onChange={(e) => updateQuestion(question.id, 'sampleInput', e.target.value)}
                          placeholder="Enter sample input"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label>Sample Output</Label>
                        <Textarea
                          value={question.sampleOutput}
                          onChange={(e) => updateQuestion(question.id, 'sampleOutput', e.target.value)}
                          placeholder="Enter expected output"
                          rows={3}
                        />
                      </div>
                    </div>

                    <div>
                      <Label>Tags</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {availableTags.map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => {
                              const currentTags = question.tags;
                              const newTags = currentTags.includes(tag)
                                ? currentTags.filter(t => t !== tag)
                                : [...currentTags, tag];
                              updateQuestion(question.id, 'tags', newTags);
                            }}
                            className={`px-3 py-1 text-sm rounded-full border ${
                              question.tags.includes(tag)
                                ? 'bg-brand-red text-white border-brand-red'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
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
                Create Mock Assessment
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateMockAssessment;
