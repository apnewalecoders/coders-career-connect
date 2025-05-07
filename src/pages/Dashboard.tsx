
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Dashboard = () => {
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please log in to access the dashboard",
        variant: "destructive",
      });
    }
  }, [isLoggedIn, toast]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <p className="mb-4">Welcome, {user?.name}!</p>
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
          <p className="text-gray-600">You don't have any bookings yet.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
