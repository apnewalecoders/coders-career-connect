
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Target, Code, MessageSquare, Briefcase, BookOpen, GraduationCap, Settings } from "lucide-react";

const AdminPanel = () => {
  const navigate = useNavigate();

  const adminCards = [
    {
      title: "Create Mock Test",
      description: "Design multiple-choice question tests for technical assessments",
      icon: FileText,
      buttonText: "Create Test",
      route: "/admin/create-mock-test",
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Create Mock Assessment",
      description: "Build coding assessments with programming challenges",
      icon: Target,
      buttonText: "Create Assessment",
      route: "/admin/create-mock-assessment",
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Design Coding Problem",
      description: "Create practice coding problems for skill development",
      icon: Code,
      buttonText: "Design Problem",
      route: "/admin/create-coding-problem",
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Post Interview Experience",
      description: "Share detailed interview experiences and insights",
      icon: MessageSquare,
      buttonText: "Post Experience",
      route: "/admin/create-interview-experience",
      color: "bg-orange-50 border-orange-200"
    },
    {
      title: "Post Job",
      description: "Create and publish job opportunities for users",
      icon: Briefcase,
      buttonText: "Post Job",
      route: "/admin/post-job",
      color: "bg-teal-50 border-teal-200"
    },
    {
      title: "Create Blog Post",
      description: "Write and publish informative blog articles",
      icon: BookOpen,
      buttonText: "Create Blog",
      route: "/admin/create-blog",
      color: "bg-indigo-50 border-indigo-200"
    },
    {
      title: "Add Study Material",
      description: "Upload educational resources and study guides",
      icon: GraduationCap,
      buttonText: "Add Material",
      route: "/admin/add-study-material",
      color: "bg-pink-50 border-pink-200"
    },
    {
      title: "Manage Content",
      description: "View, edit, and manage all platform content",
      icon: Settings,
      buttonText: "Manage Content",
      route: "/admin/manage-content",
      color: "bg-gray-50 border-gray-200"
    }
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Admin Panel
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage platform content and create new resources for users
          </p>
        </div>

        {/* Admin Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {adminCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card key={index} className={`${card.color} hover:shadow-lg transition-all duration-200`}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-white rounded-full shadow-sm w-fit">
                    <IconComponent className="h-8 w-8 text-brand-red" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {card.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm">
                    {card.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <Button
                    onClick={() => navigate(card.route)}
                    className="w-full bg-brand-red hover:bg-red-600 text-white font-medium"
                  >
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AdminPanel;
