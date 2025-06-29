
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock, Users, Building } from "lucide-react";

// Mock data - same as in InterviewPreparation page
const interviewExperiences = [
  {
    id: 1,
    title: "Software Developer Interview at TCS",
    company: "TCS",
    role: "Software Developer",
    experience: "Fresher",
    date: "March 2024",
    summary: "Comprehensive interview process covering technical fundamentals, coding challenges, and HR discussions. Great insights for freshers preparing for their first tech job.",
    rounds: 4,
    difficulty: "Medium",
    keyHighlights: ["Technical aptitude test", "Coding round", "Technical interview", "HR discussion"],
    fullContent: {
      introduction: "I recently appeared for the TCS software developer interview and wanted to share my experience to help other freshers prepare better for their technical interviews.",
      rounds: [
        {
          title: "Round 1: Online Assessment",
          content: "The first round was an online test consisting of quantitative aptitude, logical reasoning, and basic programming questions. The test duration was 90 minutes with 40 questions total.",
          tips: ["Practice basic programming concepts", "Focus on time management", "Review quantitative aptitude formulas"]
        },
        {
          title: "Round 2: Coding Round",
          content: "This round involved solving 2 coding problems within 45 minutes. The problems were of easy to medium difficulty focusing on arrays and string manipulation.",
          tips: ["Practice coding on paper", "Understand time complexity", "Write clean, readable code"]
        },
        {
          title: "Round 3: Technical Interview",
          content: "The technical interview lasted for about 45 minutes. They asked questions about my projects, OOPs concepts, database basics, and some general computer science fundamentals.",
          tips: ["Be thorough with your resume projects", "Brush up on core CS concepts", "Prepare examples for each technology mentioned"]
        },
        {
          title: "Round 4: HR Interview",
          content: "The final round was with HR focusing on behavioral questions, salary expectations, and company culture fit. They also discussed the training program and career growth opportunities.",
          tips: ["Research about the company", "Prepare for common HR questions", "Be honest about expectations"]
        }
      ],
      overallTips: [
        "Start preparing at least 2-3 months before the interview",
        "Practice coding daily on platforms like HackerRank or LeetCode",
        "Mock interviews with friends or seniors help build confidence",
        "Stay calm and composed during the interview process"
      ]
    }
  },
  {
    id: 2,
    title: "SDE Interview Experience at Amazon",
    company: "Amazon",
    role: "SDE",
    experience: "1-2 Years",
    date: "February 2024",
    summary: "In-depth Amazon SDE interview covering system design, algorithmic thinking, and behavioral leadership principles. Focus on scalability and problem-solving approach.",
    rounds: 5,
    difficulty: "Hard",
    keyHighlights: ["Online assessment", "System design", "Behavioral questions", "Leadership principles"],
    fullContent: {
      introduction: "Amazon's interview process is known for its rigor and focus on leadership principles. Here's my detailed experience for the SDE role.",
      rounds: [
        {
          title: "Round 1: Online Assessment",
          content: "Two coding questions and one system design question. The coding problems were medium difficulty focusing on dynamic programming and graph algorithms.",
          tips: ["Master Amazon's most frequent problems", "Practice system design basics", "Time management is crucial"]
        },
        {
          title: "Round 2: Technical Phone Screen",
          content: "45-minute call with detailed discussion on algorithms, data structures, and a coding problem solving session using shared editor.",
          tips: ["Think out loud while coding", "Ask clarifying questions", "Optimize your solution step by step"]
        },
        {
          title: "Round 3: Onsite - Algorithm Design",
          content: "Deep dive into algorithmic problem solving with focus on optimization and edge cases. Discussed time and space complexity in detail.",
          tips: ["Practice whiteboard coding", "Consider all edge cases", "Explain your thought process clearly"]
        },
        {
          title: "Round 4: System Design",
          content: "Design a distributed system similar to Amazon's architecture. Focus was on scalability, reliability, and trade-offs between different approaches.",
          tips: ["Study distributed systems concepts", "Know CAP theorem well", "Practice drawing system diagrams"]
        },
        {
          title: "Round 5: Behavioral (Leadership Principles)",
          content: "Detailed discussion around Amazon's leadership principles with specific examples from past experience using STAR method.",
          tips: ["Prepare STAR format stories", "Study all 14 leadership principles", "Be specific with examples"]
        }
      ],
      overallTips: [
        "Amazon interviews are intense - prepare thoroughly",
        "Focus heavily on leadership principles",
        "System design preparation is crucial for senior roles",
        "Practice coding problems daily for at least 3 months"
      ]
    }
  },
  // Add other experiences with similar structure...
];

const InterviewExperienceDetail = () => {
  const { experienceId } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<any>(null);
  const [relatedExperiences, setRelatedExperiences] = useState<any[]>([]);

  useEffect(() => {
    const id = parseInt(experienceId || "0");
    const currentExperience = interviewExperiences.find(exp => exp.id === id);
    
    if (currentExperience) {
      setExperience(currentExperience);
      
      // Find related experiences (same company or role, but not the current one)
      const related = interviewExperiences.filter(exp => 
        exp.id !== id && 
        (exp.company === currentExperience.company || exp.role === currentExperience.role)
      ).slice(0, 3);
      
      setRelatedExperiences(related);
    }
  }, [experienceId]);

  const handleBackClick = () => {
    navigate("/interview-preparation");
  };

  const handleRelatedClick = (relatedId: number) => {
    navigate(`/interview-preparation/${relatedId}`);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "bg-green-100 text-green-800 border-green-200";
      case "Medium": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case "Fresher": return "bg-blue-100 text-blue-800 border-blue-200";
      case "1-2 Years": return "bg-purple-100 text-purple-800 border-purple-200";
      case "3-5 Years": return "bg-orange-100 text-orange-800 border-orange-200";
      case "5+ Years": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (!experience) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Interview Experience Not Found</h1>
            <Button onClick={handleBackClick} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Interview Preparation
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          onClick={handleBackClick} 
          variant="ghost" 
          className="mb-6 text-brand-red hover:bg-red-50"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Interview Preparation
        </Button>

        {/* Top Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {experience.title}
          </h1>
          
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge className="bg-brand-red hover:bg-red-600 text-white text-sm font-medium px-4 py-2">
              <Building className="h-4 w-4 mr-2" />
              {experience.company}
            </Badge>
            <Badge variant="outline" className="text-sm font-medium px-4 py-2 border-gray-300">
              {experience.role}
            </Badge>
            <Badge className={`text-sm font-medium px-4 py-2 border ${getExperienceColor(experience.experience)}`}>
              <Users className="h-4 w-4 mr-2" />
              {experience.experience}
            </Badge>
            <Badge className={`text-sm font-medium px-4 py-2 border ${getDifficultyColor(experience.difficulty)}`}>
              {experience.difficulty}
            </Badge>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {experience.date}
            </span>
            <span>{experience.rounds} Interview Rounds</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Main Content */}
          <div className="lg:col-span-2">
            <Card className="mb-6">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {experience.fullContent?.introduction || experience.summary}
                </p>

                {experience.fullContent?.rounds && (
                  <div className="space-y-6">
                    {experience.fullContent.rounds.map((round: any, index: number) => (
                      <div key={index} className="border-l-4 border-brand-red pl-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                          {round.title}
                        </h3>
                        <p className="text-gray-700 leading-relaxed mb-4">
                          {round.content}
                        </p>
                        {round.tips && (
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Key Tips:</h4>
                            <ul className="list-disc list-inside space-y-1 text-gray-600">
                              {round.tips.map((tip: string, tipIndex: number) => (
                                <li key={tipIndex}>{tip}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {experience.fullContent?.overallTips && (
                  <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Tips</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {experience.fullContent.overallTips.map((tip: string, index: number) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Section - Related Experiences */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-lg">Related Experiences</CardTitle>
                <CardDescription>Similar interviews you might find helpful</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedExperiences.length > 0 ? (
                  relatedExperiences.map((related) => (
                    <div
                      key={related.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-brand-red hover:shadow-md transition-all duration-200 cursor-pointer"
                      onClick={() => handleRelatedClick(related.id)}
                    >
                      <h4 className="font-medium text-gray-900 mb-2 line-clamp-2">
                        {related.title}
                      </h4>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {related.company}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {related.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {related.summary}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No related experiences found.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InterviewExperienceDetail;
