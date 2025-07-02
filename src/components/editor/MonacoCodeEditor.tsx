
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code } from "lucide-react";
import { TestCase, defaultCode } from "./types";
import { useCodeExecution } from "./hooks/useCodeExecution";
import EditorHeader from "./components/EditorHeader";
import CompactEditorHeader from "./components/CompactEditorHeader";
import EditorControls from "./components/EditorControls";
import OutputSection from "./components/OutputSection";

interface EditorProps {
  problemTitle: string;
  problemStatement: string;
  difficulty: string;
  testCases?: TestCase[];
  onSubmissionSuccess?: () => void;
  isFullScreen?: boolean;
  showTimer?: boolean;
  timeLeft?: number;
  layout?: "default" | "compact" | "mobile";
}

const MonacoCodeEditor = ({ 
  problemTitle, 
  problemStatement, 
  difficulty, 
  testCases = [], 
  onSubmissionSuccess,
  isFullScreen = false,
  showTimer = false,
  timeLeft = 0,
  layout = "default"
}: EditorProps) => {
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(defaultCode.python);
  const [customInput, setCustomInput] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [isEditorFullScreen, setIsEditorFullScreen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const editorRef = useRef(null);

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
    const savedCode = localStorage.getItem(`code_${problemTitle}_${selectedLanguage}`);
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(defaultCode[selectedLanguage as keyof typeof defaultCode]);
    }
  }, [selectedLanguage, problemTitle]);

  // Save code to localStorage
  const saveCode = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`code_${problemTitle}_${selectedLanguage}`, newCode);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "hard": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const onRun = () => handleRun(code, selectedLanguage, customInput);
  const onSubmit = () => {
    handleSubmit(code, selectedLanguage, testCases, problemTitle, () => {
      setIsSolved(true);
      onSubmissionSuccess?.();
    });
  };

  const toggleEditorFullScreen = () => {
    setIsEditorFullScreen(!isEditorFullScreen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Compact layout for the right sidebar
  if (layout === "compact") {
    return (
      <div className="h-full flex flex-col bg-[#1e1e1e]">
        <CompactEditorHeader 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {/* Code Editor */}
        <div className="flex-1 min-h-[300px]">
          <Editor
            height="100%"
            language={selectedLanguage === 'cpp' ? 'cpp' : selectedLanguage}
            theme="vs-dark"
            value={code}
            onChange={(value) => saveCode(value || "")}
            options={{
              fontSize: 13,
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
              formatOnType: true
            }}
            onMount={(editor) => {
              editorRef.current = editor;
            }}
          />
        </div>

        <EditorControls
          customInput={customInput}
          onCustomInputChange={setCustomInput}
          onRun={onRun}
          onSubmit={onSubmit}
          isRunning={isRunning}
          isSubmitting={isSubmitting}
          isSolved={isSolved}
          layout="compact"
        />

        <OutputSection
          output={output}
          testResults={testResults}
          layout="compact"
        />
      </div>
    );
  }

  // Default layout (existing full layout)
  return (
    <div className={`flex flex-col h-full ${isFullScreen ? 'fixed inset-0 bg-white z-50' : ''}`}>
      <EditorHeader
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        problemTitle={problemTitle}
        difficulty={difficulty}
        isSolved={isSolved}
        showTimer={showTimer}
        timeLeft={timeLeft}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        isFullScreen={isEditorFullScreen}
        onToggleFullScreen={toggleEditorFullScreen}
        getDifficultyColor={getDifficultyColor}
        formatTime={formatTime}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Problem Statement Panel */}
        <div className={`${isEditorFullScreen ? 'hidden' : 'w-full lg:w-1/2'} border-r bg-white overflow-y-auto`}>
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Problem Statement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose max-w-none">
                  <pre className="whitespace-pre-wrap text-gray-800 font-sans leading-relaxed">
                    {problemStatement}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Code Editor Panel */}
        <div className={`${isEditorFullScreen ? 'w-full' : 'w-full lg:w-1/2'} flex flex-col`}>
          <EditorControls
            customInput={customInput}
            onCustomInputChange={setCustomInput}
            onRun={onRun}
            onSubmit={onSubmit}
            isRunning={isRunning}
            isSubmitting={isSubmitting}
            isSolved={isSolved}
          />

          {/* Monaco Editor */}
          <div className="flex-1 min-h-[400px]">
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
                formatOnType: true
              }}
              onMount={(editor) => {
                editorRef.current = editor;
              }}
            />
          </div>

          <OutputSection
            output={output}
            testResults={testResults}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default MonacoCodeEditor;
