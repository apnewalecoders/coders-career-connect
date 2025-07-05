
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Send, RotateCcw, Sun, Moon } from "lucide-react";

interface MockCodeEditorPanelProps {
  language: string;
  darkMode: boolean;
  code: string;
  customInput: string;
  output: string;
  isRunning: boolean;
  isCurrentSubmitted: boolean;
  onLanguageChange: (language: string) => void;
  onDarkModeToggle: () => void;
  onCodeChange: (value: string) => void;
  onCustomInputChange: (value: string) => void;
  onReset: () => void;
  onRun: () => void;
  onSubmit: () => void;
}

const MockCodeEditorPanel = ({
  language,
  darkMode,
  code,
  customInput,
  output,
  isRunning,
  isCurrentSubmitted,
  onLanguageChange,
  onDarkModeToggle,
  onCodeChange,
  onCustomInputChange,
  onReset,
  onRun,
  onSubmit
}: MockCodeEditorPanelProps) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Editor Header */}
      <div className="border-b border-gray-200 p-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Code Editor</h3>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Label htmlFor="language">Language:</Label>
              <Select value={language} onValueChange={onLanguageChange} disabled={isCurrentSubmitted}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="java">Java</SelectItem>
                  <SelectItem value="cpp">C++</SelectItem>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onDarkModeToggle}
              disabled={isCurrentSubmitted}
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onReset}
              disabled={isCurrentSubmitted}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>

      {/* Code Editor - Takes remaining space except for controls */}
      <div className="flex-1 min-h-0 flex flex-col">
        <textarea
          value={code}
          onChange={(e) => onCodeChange(e.target.value)}
          className={`flex-1 p-4 font-mono text-sm border-0 resize-none focus:outline-none ${
            darkMode 
              ? 'bg-gray-900 text-gray-100' 
              : 'bg-white text-gray-900'
          }`}
          placeholder="Write your solution here..."
          disabled={isCurrentSubmitted}
        />
        
        {/* Output Section - Above controls, scrollable */}
        {output && (
          <div className="border-t border-gray-200 flex-shrink-0 max-h-48 overflow-y-auto">
            <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
              <h4 className="font-medium text-gray-900">Output & Test Results</h4>
            </div>
            <div className="p-4">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono bg-gray-100 p-3 rounded-lg">
                {output}
              </pre>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Controls at Bottom */}
      <div className="border-t border-gray-200 p-4 flex-shrink-0 bg-white space-y-4">
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
            disabled={isCurrentSubmitted}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onRun}
            disabled={isRunning || isCurrentSubmitted}
            variant="outline"
            className="flex-1"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isCurrentSubmitted}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            <Send className="h-4 w-4 mr-2" />
            {isCurrentSubmitted ? "Submitted" : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MockCodeEditorPanel;
