
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Play, 
  Send, 
  RotateCcw, 
  Sun, 
  Moon,
  ChevronUp,
  ChevronDown,
  Settings
} from "lucide-react";
import Editor from "@monaco-editor/react";
import { languages, defaultCode } from "@/components/editor/types";
import { useCodeExecution } from "@/components/editor/hooks/useCodeExecution";
import OutputSection from "@/components/editor/components/OutputSection";

interface Problem {
  id: number;
  title: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string;
  difficulty: string;
  companies?: string[];
  topics?: string[];
  testCases?: Array<{
    input: string;
    expectedOutput: string;
  }>;
}

interface MockCodeEditorProps {
  problem: Problem;
  isSolved: boolean;
  onSubmissionSuccess: () => void;
}

const MockCodeEditor = ({ problem, isSolved, onSubmissionSuccess }: MockCodeEditorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [customInput, setCustomInput] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOutputVisible, setIsOutputVisible] = useState(false);

  const {
    isRunning,
    isSubmitting,
    output,
    testResults,
    handleRun,
    handleSubmit
  } = useCodeExecution();

  // Load saved code from localStorage
  useEffect(() => {
    const savedCode = localStorage.getItem(`mock_code_${problem.id}_${selectedLanguage}`);
    const savedTheme = localStorage.getItem('editor_theme');
    
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
    }
    
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
    }
  }, [selectedLanguage, problem.id]);

  // Save code to localStorage
  const saveCode = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`mock_code_${problem.id}_${selectedLanguage}`, newCode);
  };

  const resetCode = () => {
    const freshCode = defaultCode[selectedLanguage as keyof typeof defaultCode];
    setCode(freshCode);
    localStorage.removeItem(`mock_code_${problem.id}_${selectedLanguage}`);
  };

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('editor_theme', newTheme ? 'dark' : 'light');
  };

  const onRun = () => {
    handleRun(code, selectedLanguage, customInput);
    setIsOutputVisible(true);
  };

  const onSubmit = () => {
    handleSubmit(code, selectedLanguage, problem.testCases || [], problem.title, onSubmissionSuccess);
    setIsOutputVisible(true);
  };

  const hasOutput = output || testResults.length > 0;

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Editor Header */}
      <div className="p-3 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-36 h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {isSolved && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                Solved ✓
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={resetCode}
              className="h-8 px-2 text-xs"
              disabled={isSolved}
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Reset
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="h-8 px-2"
            >
              {isDarkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 px-2"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      {/* Code Editor */}
      <div className={`flex-1 ${hasOutput && isOutputVisible ? 'min-h-0' : ''}`}>
        <Editor
          height="100%"
          language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
          theme={isDarkMode ? 'vs-dark' : 'light'}
          value={code}
          onChange={(value) => saveCode(value || "")}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            renderLineHighlight: 'line',
            lineNumbers: 'on',
            folding: true,
            bracketMatching: 'always',
            autoIndent: 'full',
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 16, bottom: 16 }
          }}
        />
      </div>

      {/* Output Section */}
      {hasOutput && (
        <div className={`border-t border-gray-200 ${isOutputVisible ? 'block' : 'hidden'}`}>
          <div className="p-3 bg-gray-50 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-900 text-sm">Console</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOutputVisible(!isOutputVisible)}
                className="h-6 px-2"
              >
                {isOutputVisible ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronUp className="h-3 w-3" />
                )}
              </Button>
            </div>
          </div>
          <div className="max-h-64">
            <OutputSection
              output={output}
              testResults={testResults}
              isDarkMode={isDarkMode}
              layout="default"
            />
          </div>
        </div>
      )}

      {/* Custom Input Section */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="space-y-3">
          <label className="block text-sm font-medium text-gray-700">
            Custom Input
          </label>
          <Textarea
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Enter your test input here..."
            className="h-20 font-mono text-sm resize-none"
            disabled={isSolved}
          />
        </div>
      </div>

      {/* Action Buttons - Sticky at bottom */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex gap-3 justify-end">
          <Button
            onClick={onRun}
            disabled={isRunning || isSolved}
            variant="outline"
            size="sm"
            className="flex-1 sm:flex-none"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run Code"}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || isSolved}
            size="sm"
            className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MockCodeEditor;
