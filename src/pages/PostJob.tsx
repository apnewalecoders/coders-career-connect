
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const PostJob = () => {
  const { isLoggedIn, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      toast({
        title: "Access Denied",
        description: "Please log in to post a job",
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
        <h1 className="text-3xl font-bold mb-8">Post a Job</h1>
        <p>Coming soon...</p>
      </div>
    </Layout>
  );
};

export default PostJob;
