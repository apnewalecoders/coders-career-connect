
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ManageContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data for demonstration
  const mockTests = [
    { id: 1, title: "JavaScript Fundamentals", category: "Programming", difficulty: "Easy", questions: 20, created: "2024-01-15" },
    { id: 2, title: "React Advanced Concepts", category: "Frontend", difficulty: "Hard", questions: 15, created: "2024-01-10" }
  ];

  const mockAssessments = [
    { id: 1, title: "Google SDE Assessment", company: "Google", questions: 2, timeLimit: 60, created: "2024-01-12" },
    { id: 2, title: "Microsoft Intern Challenge", company: "Microsoft", questions: 3, timeLimit: 90, created: "2024-01-08" }
  ];

  const codingProblems = [
    { id: 1, title: "Two Sum", difficulty: "Easy", topic: "Arrays", company: "LeetCode", created: "2024-01-14" },
    { id: 2, title: "Binary Tree Traversal", difficulty: "Medium", topic: "Trees", company: "Amazon", created: "2024-01-11" }
  ];

  const interviewExperiences = [
    { id: 1, title: "Google SDE Interview Experience", company: "Google", role: "SDE", experience: "2-3 years", created: "2024-01-13" },
    { id: 2, title: "Microsoft PM Interview", company: "Microsoft", role: "PM", experience: "1-2 years", created: "2024-01-09" }
  ];

  const blogPosts = [
    { id: 1, title: "Getting Started with React", category: "Tutorial", status: "Published", author: "Admin", created: "2024-01-16" },
    { id: 2, title: "System Design Basics", category: "Technology", status: "Draft", author: "Admin", created: "2024-01-14" }
  ];

  const studyMaterials = [
    { id: 1, title: "DSA Complete Guide", subject: "DSA", type: "PDF", difficulty: "Intermediate", created: "2024-01-15" },
    { id: 2, title: "Web Development Roadmap", subject: "Web Dev", type: "Video", difficulty: "Beginner", created: "2024-01-12" }
  ];

  const jobPosts = [
    { id: 1, title: "Senior Software Engineer", company: "Google", location: "San Francisco", type: "Full-time", created: "2024-01-17" },
    { id: 2, title: "Frontend Developer", company: "Meta", location: "Remote", type: "Contract", created: "2024-01-15" }
  ];

  const handleDelete = (type: string, id: number, title: string) => {
    toast({
      title: "Content Deleted",
      description: `${type} "${title}" has been deleted successfully.`,
    });
  };

  const renderTable = (data: any[], type: string, columns: string[]) => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder={`Search ${type}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th key={column} className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                  {column}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.title}</td>
                {columns.slice(1).map((column) => (
                  <td key={column} className="px-4 py-3 text-sm text-gray-600">
                    {column === 'Status' && item.status ? (
                      <Badge variant={item.status === 'Published' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    ) : column === 'Difficulty' && item.difficulty ? (
                      <Badge variant={
                        item.difficulty === 'Easy' ? 'secondary' :
                        item.difficulty === 'Medium' ? 'default' : 'destructive'
                      }>
                        {item.difficulty}
                      </Badge>
                    ) : (
                      item[column.toLowerCase().replace(' ', '')] || 
                      item[column.toLowerCase()] || 
                      item[Object.keys(item).find(key => key.toLowerCase().includes(column.toLowerCase().split(' ')[0])) || ''] ||
                      '-'
                    )}
                  </td>
                ))}
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleDelete(type, item.id, item.title)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => navigate("/admin")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Admin Panel
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Manage Content</h1>
          </div>

          <Tabs defaultValue="mock-tests" className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              <TabsTrigger value="mock-tests">Mock Tests</TabsTrigger>
              <TabsTrigger value="assessments">Assessments</TabsTrigger>
              <TabsTrigger value="problems">Problems</TabsTrigger>
              <TabsTrigger value="interviews">Interviews</TabsTrigger>
              <TabsTrigger value="blogs">Blogs</TabsTrigger>
              <TabsTrigger value="study">Study Material</TabsTrigger>
              <TabsTrigger value="jobs">Jobs</TabsTrigger>
            </TabsList>

            <TabsContent value="mock-tests">
              <Card>
                <CardHeader>
                  <CardTitle>Mock Tests ({mockTests.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(mockTests, "Mock Test", ["Title", "Category", "Difficulty", "Questions", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assessments">
              <Card>
                <CardHeader>
                  <CardTitle>Mock Assessments ({mockAssessments.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(mockAssessments, "Assessment", ["Title", "Company", "Questions", "Time Limit", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problems">
              <Card>
                <CardHeader>
                  <CardTitle>Coding Problems ({codingProblems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(codingProblems, "Problem", ["Title", "Difficulty", "Topic", "Company", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="interviews">
              <Card>
                <CardHeader>
                  <CardTitle>Interview Experiences ({interviewExperiences.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(interviewExperiences, "Interview", ["Title", "Company", "Role", "Experience", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="blogs">
              <Card>
                <CardHeader>
                  <CardTitle>Blog Posts ({blogPosts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(blogPosts, "Blog", ["Title", "Category", "Status", "Author", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="study">
              <Card>
                <CardHeader>
                  <CardTitle>Study Materials ({studyMaterials.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(studyMaterials, "Study Material", ["Title", "Subject", "Type", "Difficulty", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="jobs">
              <Card>
                <CardHeader>
                  <CardTitle>Job Posts ({jobPosts.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderTable(jobPosts, "Job", ["Title", "Company", "Location", "Type", "Created"])}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ManageContent;
