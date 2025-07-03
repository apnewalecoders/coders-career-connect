
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  ArrowRight, FileText, Code, MessageSquare, Mail, Star, BookOpen, Brain, 
  Target, Users, TrendingUp, Award, Briefcase, Rss, GraduationCap, 
  CheckCircle, Play, Zap, Globe, Shield, Clock, Trophy, ChevronRight
} from "lucide-react";

const Home = () => {
  const isMobile = useIsMobile();
  
  // State for animated counters
  const [counters, setCounters] = useState({
    subscribers: 0,
    views: 0,
    interviews: 0,
    learners: 0,
  });

  // Target values for counters
  const targetCounters = {
    subscribers: 5000,
    views: 500000,
    interviews: 1200,
    learners: 1100,
  };

  // State for typing animation
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const textToType = "Master DSA, Mock Tests, and Interview Prep";

  // Typing animation effect
  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + textToType[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, textToType]);

  // Animate counters when component mounts
  useEffect(() => {
    const duration = 2000;
    const interval = 20;
    const steps = duration / interval;

    const incrementValues = {
      subscribers: targetCounters.subscribers / steps,
      views: targetCounters.views / steps,
      interviews: targetCounters.interviews / steps,
      learners: targetCounters.learners / steps,
    };

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounters((prevCounters) => ({
        subscribers: Math.min(
          Math.round(incrementValues.subscribers * currentStep),
          targetCounters.subscribers
        ),
        views: Math.min(
          Math.round(incrementValues.views * currentStep),
          targetCounters.views
        ),
        interviews: Math.min(
          Math.round(incrementValues.interviews * currentStep),
          targetCounters.interviews
        ),
        learners: Math.min(
          Math.round(incrementValues.learners * currentStep),
          targetCounters.learners
        ),
      }));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Format large numbers with commas
  const formatNumber = (num: number) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Layout>
      {/* Hero Section with Enhanced Design */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Floating Code Snippets */}
          <div className="absolute top-20 left-10 text-green-400 font-mono text-sm animate-float opacity-20">
            <div>function solveProblem() {'{'}  </div>
            <div className="ml-4">let result = [];</div>
            <div className="ml-4">for (let i = 0; i &lt; n; i++) {'{'}</div>
            <div className="ml-8">result.push(i);</div>
            <div className="ml-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
          <div className="absolute top-40 right-20 text-blue-400 font-mono text-sm animate-float opacity-20 delay-1000">
            <div>const interview = () =&gt; {'{'}  </div>
            <div className="ml-4">prepare();</div>
            <div className="ml-4">practice();</div>
            <div className="ml-4">succeed();</div>
            <div>{'}'}</div>
          </div>
          <div className="absolute bottom-40 left-1/4 text-purple-400 font-mono text-sm animate-float opacity-20 delay-2000">
            <div>class DSA {'{'}  </div>
            <div className="ml-4">constructor() {'{'}</div>
            <div className="ml-8">this.skills = 'advanced';</div>
            <div className="ml-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-1/4 right-1/3 w-32 h-32 border border-white/10 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg rotate-45 animate-spin slow"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <div className="text-center lg:text-left animate-slide-in-left">
                <div className="mb-8">
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                    {typedText}
                    <span className="animate-pulse text-white">|</span>
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
                    Your complete tech career transformation platform - from coding practice to job placement
                  </p>
                  
                  {/* Feature Highlights */}
                  <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
                    <div className="flex items-center text-green-400">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      <span>Expert-Curated Content</span>
                    </div>
                    <div className="flex items-center text-blue-400">
                      <Shield className="w-5 h-5 mr-2" />
                      <span>Industry-Standard Tests</span>
                    </div>
                    <div className="flex items-center text-purple-400">
                      <Trophy className="w-5 h-5 mr-2" />
                      <span>Real Interview Experience</span>
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <Zap className="w-5 h-5 mr-2" />
                      <span>Instant Feedback</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link to="/mock-test">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                    >
                      <Target className="w-5 h-5 mr-2" />
                      Explore Tests
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/practice-problems">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 group"
                    >
                      <Brain className="w-5 h-5 mr-2" />
                      Start Practicing
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right Column - Interactive Demo */}
              <div className="relative animate-slide-in-right">
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="ml-4 text-gray-400 text-sm">Practice Environment</div>
                  </div>
                  <div className="font-mono text-sm text-green-400 space-y-2">
                    <div className="typing-animation">// Welcome to Apne Wale Coders</div>
                    <div className="text-blue-400">function masterDSA() {'{'}</div>
                    <div className="ml-4 text-purple-400">const skills = ['Arrays', 'Trees', 'Graphs'];</div>
                    <div className="ml-4 text-yellow-400">return practice(skills);</div>
                    <div className="text-blue-400">{'}'}</div>
                    <div className="text-gray-500">// Your coding journey starts here ✨</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Platform Overview Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Complete Learning Ecosystem
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              From beginner to expert - we provide everything you need for your tech career journey
            </p>
            <div className="flex justify-center">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-1 w-24 rounded-full"></div>
            </div>
          </div>

          {/* Main Platform Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Mock Tests */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-blue-200">
              <div className="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mock Tests</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Industry-standard mock tests that simulate real interview environments with comprehensive performance analytics and detailed feedback.
              </p>
              <Link to="/mock-test" className="text-blue-600 font-semibold inline-flex items-center group-hover:text-blue-700 transition-colors">
                Explore Tests <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mock Assessments */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-green-200">
              <div className="rounded-full bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mock Assessments</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive skill assessments to evaluate your technical competency across multiple domains and identify areas for improvement.
              </p>
              <Link to="/mock-assessment" className="text-green-600 font-semibold inline-flex items-center group-hover:text-green-700 transition-colors">
                Take Assessment <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Practice Problems */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-purple-200">
              <div className="rounded-full bg-gradient-to-r from-purple-100 to-purple-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Practice Problems</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Curated coding challenges from beginner to advanced levels with step-by-step solutions and multiple programming languages.
              </p>
              <Link to="/practice-problems" className="text-purple-600 font-semibold inline-flex items-center group-hover:text-purple-700 transition-colors">
                Start Coding <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Interview Prep */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border border-gray-100 hover:border-red-200">
              <div className="rounded-full bg-gradient-to-r from-red-100 to-red-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="text-brand-red w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Interview Prep</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Comprehensive interview preparation including behavioral questions, system design, and real interview experiences from top companies.
              </p>
              <Link to="/interview-preparation" className="text-brand-red font-semibold inline-flex items-center group-hover:text-red-600 transition-colors">
                Prepare Now <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Complete Platform Pages Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Platform Features
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore all our platform features designed to accelerate your tech career
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Services Page */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Briefcase className="text-white w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-white text-lg font-semibold">Professional Services</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Our Services</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Comprehensive career services including resume building, web development, interview coaching, and personalized career guidance.
                </p>
                <ul className="text-gray-400 text-sm mb-6 space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Resume Building & Review</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Web Design & Development</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Career Counseling</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Portfolio Development</li>
                </ul>
                <Link to="/services">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white group-hover:scale-105 transition-transform w-full">
                    Explore Services
                  </Button>
                </Link>
              </div>
            </div>

            {/* Study Material Page */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <GraduationCap className="text-white w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-white text-lg font-semibold">Learning Resources</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Study Material</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Curated study materials, cheat sheets, and comprehensive guides covering all major computer science topics and interview preparation.
                </p>
                <ul className="text-gray-400 text-sm mb-6 space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> DSA Cheat Sheets</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> System Design Guides</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Interview Q&A</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Programming Tutorials</li>
                </ul>
                <Link to="/study-material">
                  <Button className="bg-green-600 hover:bg-green-700 text-white group-hover:scale-105 transition-transform w-full">
                    Access Materials
                  </Button>
                </Link>
              </div>
            </div>

            {/* Blogs Page */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Rss className="text-white w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-white text-lg font-semibold">Tech Insights</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Tech Blogs</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Stay updated with the latest tech trends, coding tutorials, career advice, and industry insights from experienced professionals.
                </p>
                <ul className="text-gray-400 text-sm mb-6 space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Latest Tech Trends</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Coding Best Practices</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Career Growth Tips</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Industry Updates</li>
                </ul>
                <Link to="/blogs">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white group-hover:scale-105 transition-transform w-full">
                    Read Blogs
                  </Button>
                </Link>
              </div>
            </div>

            {/* Jobs Page */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-orange-600 to-red-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Briefcase className="text-white w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-white text-lg font-semibold">Career Opportunities</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Job Portal</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Discover exciting job opportunities from top tech companies, startups, and remote positions tailored to your skill level and preferences.
                </p>
                <ul className="text-gray-400 text-sm mb-6 space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Remote Opportunities</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Top Tech Companies</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Startup Positions</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Internship Programs</li>
                </ul>
                <Link to="/jobs">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white group-hover:scale-105 transition-transform w-full">
                    Find Jobs
                  </Button>
                </Link>
              </div>
            </div>

            {/* About Us */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-teal-600 to-cyan-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="text-white w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-white text-lg font-semibold">Our Story</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">About Us</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Learn about our mission to democratize tech education and help developers worldwide achieve their career goals through quality content.
                </p>
                <ul className="text-gray-400 text-sm mb-6 space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Our Mission & Vision</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Team & Expertise</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Success Stories</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Community Impact</li>
                </ul>
                <Link to="/about-us">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white group-hover:scale-105 transition-transform w-full">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-indigo-600 to-purple-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="text-white w-16 h-16 mx-auto mb-4" />
                    <h4 className="text-white text-lg font-semibold">Progress Tracking</h4>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Personal Dashboard</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Track your learning progress, view performance analytics, manage your profile, and monitor your journey to success.
                </p>
                <ul className="text-gray-400 text-sm mb-6 space-y-2">
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Progress Analytics</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Performance Metrics</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Goal Tracking</li>
                  <li className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-green-400" /> Achievement Badges</li>
                </ul>
                <Link to="/dashboard">
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white group-hover:scale-105 transition-transform w-full">
                    View Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-brand-red to-red-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl text-red-100 max-w-2xl mx-auto">
              Helping thousands of developers achieve their career goals
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.subscribers)}+
                </div>
                <p className="text-red-100 text-lg">Happy Learners</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.views)}+
                </div>
                <p className="text-red-100 text-lg">Problems Solved</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.interviews)}+
                </div>
                <p className="text-red-100 text-lg">Mock Interviews</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300 transform group-hover:scale-105">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.learners)}+
                </div>
                <p className="text-red-100 text-lg">Success Stories</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-gray-900">What Our Students Say</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from developers who transformed their careers with us
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "The mock interviews were incredibly realistic. I felt fully prepared for my Google interview and landed the job!"
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold mr-4">
                  P
                </div>
                <div>
                  <p className="font-bold text-gray-900">Priya Sharma</p>
                  <p className="text-gray-600">Software Engineer @ Google</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "The DSA practice problems are top-notch. Perfect difficulty progression from beginner to advanced."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white font-bold mr-4">
                  R
                </div>
                <div>
                  <p className="font-bold text-gray-900">Rajesh Kumar</p>
                  <p className="text-gray-600">Data Scientist @ Microsoft</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                "Amazing platform! The system design resources helped me crack my senior engineer interview."
              </p>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 flex items-center justify-center text-white font-bold mr-4">
                  A
                </div>
                <div>
                  <p className="font-bold text-gray-900">Ananya Patel</p>
                  <p className="text-gray-600">Senior Engineer @ Amazon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Career?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of developers who have successfully landed their dream jobs with our comprehensive preparation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Start Your Journey
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 group"
                >
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
