
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Code } from "lucide-react";

const ProblemNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Problem not found</p>
        <Button 
          onClick={() => navigate("/practice-problems")}
          className="mt-4"
          variant="outline"
        >
          Back to Problems
        </Button>
      </div>
    </div>
  );
};

export default ProblemNotFound;
