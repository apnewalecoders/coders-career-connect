
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, FileText, Code, MessageSquare, Mail, Star, BookOpen, Brain, Target, Users, TrendingUp, Award } from "lucide-react";

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
      {/* Hero Section with Animated Code Background */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden">
        {/* Animated Code Background */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 text-green-400 font-mono text-sm animate-pulse">
            <div>function solveProblem() {'{'}  </div>
            <div className="ml-4">let result = [];</div>
            <div className="ml-4">for (let i = 0; i &lt; n; i++) {'{'}</div>
            <div className="ml-8">result.push(i);</div>
            <div className="ml-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
          <div className="absolute top-40 right-20 text-blue-400 font-mono text-sm animate-pulse delay-1000">
            <div>const interview = () =&gt; {'{'}  </div>
            <div className="ml-4">prepare();</div>
            <div className="ml-4">practice();</div>
            <div className="ml-4">succeed();</div>
            <div>{'}'}</div>
          </div>
          <div className="absolute bottom-40 left-1/4 text-purple-400 font-mono text-sm animate-pulse delay-2000">
            <div>class DSA {'{'}  </div>
            <div className="ml-4">constructor() {'{'}</div>
            <div className="ml-8">this.skills = 'advanced';</div>
            <div className="ml-4">{'}'}</div>
            <div>{'}'}</div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {typedText}
                <span className="animate-pulse">|</span>
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto">
                Empowering your tech career with comprehensive coding practice, mock interviews, and expert guidance
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/mock-test">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  🔍 Explore Tests
                </Button>
              </Link>
              <Link to="/practice-problems">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
                >
                  🧠 Start Practicing
                </Button>
              </Link>
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

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to excel in your coding interviews and technical assessments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mock Tests */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="rounded-full bg-gradient-to-r from-blue-100 to-blue-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Target className="text-blue-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mock Tests</h3>
              <p className="text-gray-600 mb-6">
                Comprehensive practice tests that simulate real coding interviews with detailed analytics
              </p>
              <Link to="/mock-test" className="text-blue-600 font-semibold inline-flex items-center group-hover:text-blue-700">
                Start Testing <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Mock Assessments */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="rounded-full bg-gradient-to-r from-green-100 to-green-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="text-green-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Mock Assessments</h3>
              <p className="text-gray-600 mb-6">
                Skill-based assessments to evaluate your technical competency and readiness
              </p>
              <Link to="/mock-assessment" className="text-green-600 font-semibold inline-flex items-center group-hover:text-green-700">
                Take Assessment <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Practice Problems */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="rounded-full bg-gradient-to-r from-purple-100 to-purple-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Code className="text-purple-600 w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Practice Problems</h3>
              <p className="text-gray-600 mb-6">
                Curated coding challenges from easy to advanced levels with detailed solutions
              </p>
              <Link to="/practice-problems" className="text-purple-600 font-semibold inline-flex items-center group-hover:text-purple-700">
                Start Coding <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Interview Prep */}
            <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
              <div className="rounded-full bg-gradient-to-r from-red-100 to-red-200 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <MessageSquare className="text-brand-red w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900">Interview Prep</h3>
              <p className="text-gray-600 mb-6">
                Mock interviews with real-time feedback and behavioral question practice
              </p>
              <Link to="/interview-preparation" className="text-brand-red font-semibold inline-flex items-center group-hover:text-red-600">
                Prepare Now <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Study Material Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Study Material
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive resources to accelerate your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Study Card 1 */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <BookOpen className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Top 50 DSA Questions</h3>
                <p className="text-gray-300 mb-4">
                  Master the most frequently asked data structure and algorithm questions in technical interviews.
                </p>
                <Link to="/study-material">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white group-hover:scale-105 transition-transform">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Study Card 2 */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-green-600 to-green-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <Brain className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">System Design Guide</h3>
                <p className="text-gray-300 mb-4">
                  Learn scalable system architecture patterns and design principles for senior roles.
                </p>
                <Link to="/study-material">
                  <Button className="bg-green-600 hover:bg-green-700 text-white group-hover:scale-105 transition-transform">
                    Read More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Study Card 3 */}
            <div className="group bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-purple-600 to-purple-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                <div className="absolute bottom-4 left-4">
                  <TrendingUp className="text-white w-8 h-8" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Behavioral Interview Tips</h3>
                <p className="text-gray-300 mb-4">
                  Master the STAR method and ace behavioral questions with confidence and clarity.
                </p>
                <Link to="/study-material">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white group-hover:scale-105 transition-transform">
                    Read More
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
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.subscribers)}+
                </div>
                <p className="text-red-100 text-lg">Happy Learners</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.views)}+
                </div>
                <p className="text-red-100 text-lg">Problems Solved</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
                <div className="text-5xl font-bold mb-2">
                  {formatNumber(counters.interviews)}+
                </div>
                <p className="text-red-100 text-lg">Mock Interviews</p>
              </div>
            </div>
            
            <div className="text-center group">
              <div className="bg-white bg-opacity-20 rounded-2xl p-8 backdrop-blur-sm group-hover:bg-opacity-30 transition-all duration-300">
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
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
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
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
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
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 w-5 h-5 fill-current" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 text-lg">
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
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who have successfully landed their dream jobs with our comprehensive preparation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-brand-red to-red-600 hover:from-red-600 hover:to-red-700 text-white px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Start Your Journey
                </Button>
              </Link>
              <Link to="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-lg transform hover:scale-105 transition-all duration-300"
                >
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
