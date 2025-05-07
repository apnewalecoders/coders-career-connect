
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { ArrowRight, FileText, Code, MessageSquare, Mail, Star } from "lucide-react";

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

  // Animate counters when component mounts
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 20; // Update every 20ms
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
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Level Up Your Career with{" "}
              <span className="text-brand-red">Apne Wale Coders</span>
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Empowering Careers, One Step at a Time
            </p>
            <p className="text-lg mb-8 text-gray-200">
              Expert guidance, mock interviews, and placement support to help you
              succeed in your tech career journey.
            </p>
            <Link to="/services">
              <Button
                size="lg"
                className="bg-brand-red hover:bg-red-600 text-white px-8 py-6 text-lg"
              >
                Book a Slot
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive career development services tailored to
              help tech professionals at every stage of their career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Resume Building */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mb-6">
                <FileText className="text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Resume Building</h3>
              <p className="text-gray-600 mb-4">
                Professional resume crafting services to highlight your skills and
                experience effectively and pass ATS screening.
              </p>
              <Link to="/services" className="text-brand-red font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Web Design & Development */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mb-6">
                <Code className="text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Web Design & Development
              </h3>
              <p className="text-gray-600 mb-4">
                Expert guidance on web technologies and hands-on project
                assistance to build a compelling portfolio.
              </p>
              <Link to="/services" className="text-brand-red font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Mock Interviews */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mb-6">
                <MessageSquare className="text-brand-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Mock Interviews</h3>
              <p className="text-gray-600 mb-4">
                Realistic interview simulations with detailed feedback to prepare
                you for technical and behavioral questions.
              </p>
              <Link to="/services" className="text-brand-red font-medium inline-flex items-center">
                Learn more <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/services">
              <Button variant="outline" className="px-8">
                View All Services <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Strength in Numbers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Strength in Numbers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our impact in helping tech professionals achieve their career goals.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-brand-red font-bold text-4xl mb-2 animate-count-up">
                {formatNumber(counters.subscribers)}+
              </div>
              <p className="text-gray-700">Subscribers</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-brand-red font-bold text-4xl mb-2 animate-count-up">
                {formatNumber(counters.views)}+
              </div>
              <p className="text-gray-700">Content Views</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-brand-red font-bold text-4xl mb-2 animate-count-up">
                {formatNumber(counters.interviews)}+
              </div>
              <p className="text-gray-700">Mock Interviews</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="text-brand-red font-bold text-4xl mb-2 animate-count-up">
                {formatNumber(counters.learners)}+
              </div>
              <p className="text-gray-700">Learners Helped</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Jobs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Exclusive job opportunities for tech professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Job Card 1 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                Frontend Developer
              </h3>
              <p className="text-brand-red mb-1">Google</p>
              <p className="text-gray-600 mb-4">Bangalore, India</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  React
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  3+ Years
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Full-time
                </span>
              </div>
              <Link to="/jobs" className="text-brand-red font-medium inline-flex items-center">
                View Details <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Job Card 2 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                Data Scientist
              </h3>
              <p className="text-brand-red mb-1">Microsoft</p>
              <p className="text-gray-600 mb-4">Hyderabad, India</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Python
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  4+ Years
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Full-time
                </span>
              </div>
              <Link to="/jobs" className="text-brand-red font-medium inline-flex items-center">
                View Details <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>

            {/* Job Card 3 */}
            <div className="bg-white rounded-lg p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <h3 className="text-xl font-semibold mb-2">
                Backend Engineer
              </h3>
              <p className="text-brand-red mb-1">Amazon</p>
              <p className="text-gray-600 mb-4">Remote</p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Node.js
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  5+ Years
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                  Full-time
                </span>
              </div>
              <Link to="/jobs" className="text-brand-red font-medium inline-flex items-center">
                View Details <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/jobs">
              <Button variant="outline" className="px-8">
                View All Jobs <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Blogs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Recent Blogs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Insights, tips, and guides to help you navigate your tech career.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Blog 1 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  alt="How to Ace Technical Interviews"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  How to Ace Technical Interviews
                </h3>
                <p className="text-gray-600 mb-4">
                  Master the art of technical interviews with our comprehensive guide
                  covering algorithms, system design, and soft skills.
                </p>
                <Link to="/blogs" className="text-brand-red font-medium inline-flex items-center">
                  Read more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Blog 2 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
                  alt="Frontend Trends in 2025"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Frontend Trends in 2025
                </h3>
                <p className="text-gray-600 mb-4">
                  Stay ahead of the curve with our analysis of emerging frontend
                  technologies and practices that will shape web development.
                </p>
                <Link to="/blogs" className="text-brand-red font-medium inline-flex items-center">
                  Read more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>

            {/* Blog 3 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gray-300 relative">
                <img
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475"
                  alt="Building Your Portfolio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  Building Your Portfolio
                </h3>
                <p className="text-gray-600 mb-4">
                  Learn how to create a standout tech portfolio that showcases your
                  skills and helps you land your dream job.
                </p>
                <Link to="/blogs" className="text-brand-red font-medium inline-flex items-center">
                  Read more <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link to="/blogs">
              <Button variant="outline" className="px-8">
                View All Blogs <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe Box */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-50 rounded-xl p-8 lg:p-12 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-lg">
                <div className="rounded-full bg-red-100 w-12 h-12 flex items-center justify-center mb-6">
                  <Mail className="text-brand-red" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
                <p className="text-gray-600">
                  Subscribe to our newsletter for career tips, job opportunities, and
                  exclusive resources to accelerate your tech career growth.
                </p>
              </div>

              <div className="w-full lg:w-auto">
                <form className="flex flex-col sm:flex-row gap-4 w-full">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent"
                    required
                  />
                  <Button type="submit" className="bg-brand-red hover:bg-red-600 text-white px-6">
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Reviews */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Student Reviews</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from our students who have successfully transitioned into their
              dream tech careers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Review 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
              </div>
              <p className="text-gray-600 mb-4">
                "The mock interview sessions were incredibly helpful. The feedback
                was detailed and constructive, which helped me improve significantly.
                I landed my dream job at Google!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-semibold">Priya Sharma</p>
                  <p className="text-sm text-gray-500">Frontend Developer</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
              </div>
              <p className="text-gray-600 mb-4">
                "The resume building service transformed my CV completely. I started
                getting calls from recruiters within weeks of updating my profile.
                Thank you Apne Wale Coders!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-semibold">Rajesh Kumar</p>
                  <p className="text-sm text-gray-500">Data Scientist</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
                <Star className="text-yellow-400 w-5 h-5" />
              </div>
              <p className="text-gray-600 mb-4">
                "The guidance I received for my portfolio project was invaluable. The
                mentors are experienced professionals who provide practical insights
                and industry best practices."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-gray-300 mr-3"></div>
                <div>
                  <p className="font-semibold">Ananya Patel</p>
                  <p className="text-sm text-gray-500">Full Stack Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
