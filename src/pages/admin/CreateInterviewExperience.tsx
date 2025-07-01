
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateInterviewExperience = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [interviewTitle, setInterviewTitle] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [experienceContent, setExperienceContent] = useState("");
  const [numberOfRounds, setNumberOfRounds] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [keyHighlights, setKeyHighlights] = useState("");

  const companies = ["TCS", "Amazon", "Google", "Microsoft", "Wipro", "Infosys", "Accenture", "IBM", "Meta", "Apple"];
  const roles = ["SDE", "Analyst", "Consultant", "Developer", "QA Engineer", "Data Scientist", "Product Manager"];
  const experienceLevels = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
  const difficulties = ["Easy", "Medium", "Hard"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!interviewTitle || !company || !role || !experienceLevel || !experienceContent) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Here you would normally save to backend
    const highlightsArray = keyHighlights.split('\n').filter(h => h.trim());
    
    console.log("Interview Experience Data:", {
      interviewTitle,
      company,
      role,
      experienceLevel,
      interviewDate,
      experienceContent,
      numberOfRounds: numberOfRounds ? parseInt(numberOfRounds) : undefined,
      difficulty,
      keyHighlights: highlightsArray
    });

    toast({
      title: "Success",
      description: "Interview experience posted successfully!",
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
            <h1 className="text-3xl font-bold text-gray-900">Post Interview Experience</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Interview Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="interviewTitle">Interview Title *</Label>
                  <Input
                    id="interviewTitle"
                    value={interviewTitle}
                    onChange={(e) => setInterviewTitle(e.target.value)}
                    placeholder="e.g., Software Developer Interview at TCS"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Company *</Label>
                    <Select value={company} onValueChange={setCompany} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select company" />
                      </SelectTrigger>
                      <SelectContent>
                        {companies.map(comp => (
                          <SelectItem key={comp} value={comp}>{comp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Role *</Label>
                    <Select value={role} onValueChange={setRole} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map(r => (
                          <SelectItem key={r} value={r}>{r}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>Experience Level *</Label>
                    <Select value={experienceLevel} onValueChange={setExperienceLevel} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceLevels.map(level => (
                          <SelectItem key={level} value={level}>{level}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="interviewDate">Interview Date</Label>
                    <Input
                      id="interviewDate"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      placeholder="e.g., March 2024"
                    />
                  </div>

                  <div>
                    <Label>Difficulty</Label>
                    <Select value={difficulty} onValueChange={setDifficulty}>
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
                </div>

                <div>
                  <Label htmlFor="numberOfRounds">Number of Rounds</Label>
                  <Input
                    id="numberOfRounds"
                    type="number"
                    value={numberOfRounds}
                    onChange={(e) => setNumberOfRounds(e.target.value)}
                    placeholder="e.g., 4"
                    min="1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Experience Content */}
            <Card>
              <CardHeader>
                <CardTitle>Experience Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Full Experience Content *</Label>
                  <Textarea
                    value={experienceContent}
                    onChange={(e) => setExperienceContent(e.target.value)}
                    placeholder="Share your detailed interview experience including preparation tips, questions asked, interview process, etc."
                    rows={10}
                    required
                    className="min-h-[200px]"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Write a comprehensive experience covering all interview rounds, questions asked, and tips for future candidates.
                  </p>
                </div>

                <div>
                  <Label>Key Highlights</Label>
                  <Textarea
                    value={keyHighlights}
                    onChange={(e) => setKeyHighlights(e.target.value)}
                    placeholder="Enter key highlights, one per line:
Technical aptitude test
Coding round
Technical interview
HR discussion"
                    rows={6}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Enter each highlight on a separate line. These will be displayed as bullet points.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-brand-red hover:bg-red-600 px-8"
              >
                Post Interview Experience
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInterviewExperience;
