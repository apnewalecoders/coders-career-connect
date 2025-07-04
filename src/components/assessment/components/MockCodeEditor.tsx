
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Play, Send } from "lucide-react";

interface MockCodeEditorProps {
  code: string;
  language: string;
  customInput: string;
  isRunning: boolean;
  isSubmitted: boolean;
  onCodeChange: (value: string) => void;
  onLanguageChange: (language: string) => void;
  onCustomInputChange: (value: string) => void;
  onRun: () => void;
  onSubmit: () => void;
}

const MockCodeEditor = ({
  code,
  language,
  customInput,
  isRunning,
  isSubmitted,
  onCodeChange,
  onLanguageChange,
  onCustomInputChange,
  onRun,
  onSubmit
}: MockCodeEditorProps) => {
  return (
    <Card className="h-fit">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Code Editor</CardTitle>
          <div className="flex items-center gap-2">
            <Label htmlFor="language">Language:</Label>
            <select
              id="language"
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="px-3 py-1 border rounded-md text-sm"
              disabled={isSubmitted}
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Code Editor Area */}
        <div>
          <textarea
            value={code}
            onChange={(e) => onCodeChange(e.target.value)}
            className="w-full h-64 p-4 font-mono text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your solution here..."
            disabled={isSubmitted}
          />
        </div>

        {/* Custom Input */}
        <div>
          <Label htmlFor="custom-input" className="text-sm font-medium mb-2 block">
            Custom Input (Optional)
          </Label>
          <Input
            id="custom-input"
            value={customInput}
            onChange={(e) => onCustomInputChange(e.target.value)}
            placeholder="Enter custom test input..."
            className="font-mono text-sm"
            disabled={isSubmitted}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onRun}
            disabled={isRunning || isSubmitted}
            variant="outline"
            className="flex-1"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitted}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitted ? "Submitted" : "Submit"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MockCodeEditor;
