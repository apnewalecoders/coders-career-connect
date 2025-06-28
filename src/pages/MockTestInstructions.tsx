
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, AlertTriangle, CheckCircle, FileText } from "lucide-react";

const MockTestInstructions = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  const instructions = [
    "This test contains 20 multiple-choice questions",
    "You have 20 minutes to complete the test",
    "Each question has 4 options, select the most appropriate answer",
    "You can navigate between questions using Next/Previous buttons",
    "Questions are automatically saved when you select an answer",
    "You can review and change your answers before submitting",
    "The timer will start as soon as you begin the test",
    "The test will auto-submit when time expires",
    "Make sure you have a stable internet connection",
    "Do not refresh the browser during the test"
  ];

  const handleStartTest = () => {
    navigate(`/mock-test/${testId}/test`);
  };

  const handleCancel = () => {
    navigate(`/mock-test/${testId}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Instructions</h1>
          <p className="text-lg text-gray-600">Please read the following instructions carefully before starting the test</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <FileText className="h-12 w-12 text-blue-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">20 Questions</h3>
              <p className="text-gray-600 text-sm">Multiple choice questions</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">20 Minutes</h3>
              <p className="text-gray-600 text-sm">Total time duration</p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="p-6">
              <CheckCircle className="h-12 w-12 text-purple-500 mx-auto mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">Auto Save</h3>
              <p className="text-gray-600 text-sm">Answers saved automatically</p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Important Instructions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 bg-brand-red text-white rounded-full text-sm flex items-center justify-center font-medium">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{instruction}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center gap-4">
          <Button 
            onClick={handleStartTest}
            size="lg"
            className="bg-brand-red hover:bg-red-500 text-white px-12"
          >
            Start Test
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            onClick={handleCancel}
            className="px-12"
          >
            Cancel
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default MockTestInstructions;
