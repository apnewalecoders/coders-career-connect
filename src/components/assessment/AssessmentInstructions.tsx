
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Clock, FileText, AlertCircle, CheckCircle } from "lucide-react";

interface AssessmentInstructionsProps {
  assessment: {
    id: number;
    title: string;
    duration: string;
    problems: number;
  };
  onStartAssessment: () => void;
}

const AssessmentInstructions = ({ assessment, onStartAssessment }: AssessmentInstructionsProps) => {
  const [showInstructions, setShowInstructions] = useState(false);

  const instructions = [
    "You will have 60 minutes to complete 2 coding problems",
    "Each problem has multiple test cases that must pass",
    "You can switch between problems at any time",
    "Your code is auto-saved every 30 seconds",
    "The test will automatically submit when time expires",
    "Make sure you have a stable internet connection",
    "Use of external resources is not allowed during the test"
  ];

  const handleStartAssessment = () => {
    setShowInstructions(false);
    onStartAssessment();
  };

  return (
    <Dialog open={showInstructions} onOpenChange={setShowInstructions}>
      <DialogTrigger asChild>
        <Button className="bg-brand-red hover:bg-red-500 text-white">
          Start Assessment
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-brand-red" />
            Assessment Instructions
          </DialogTitle>
          <DialogDescription>
            Please read the following instructions carefully before starting the assessment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Assessment Details */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">{assessment.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Duration: {assessment.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Problems: {assessment.problems}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Important Instructions
            </h3>
            <div className="space-y-2">
              {instructions.map((instruction, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{instruction}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleStartAssessment}
              className="flex-1 bg-brand-red hover:bg-red-500 text-white"
            >
              Start Assessment
            </Button>
            <Button 
              variant="outline" 
              onClick={() => setShowInstructions(false)}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AssessmentInstructions;
