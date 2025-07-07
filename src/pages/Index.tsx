
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to home page immediately
    navigate("/home", { replace: true });
  }, [navigate]);

  // Show nothing while redirecting
  return null;
};

export default Index;
