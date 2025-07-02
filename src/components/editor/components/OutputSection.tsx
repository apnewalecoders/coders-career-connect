
import { CheckCircle, XCircle } from "lucide-react";
import { TestResult } from "../types";

interface OutputSectionProps {
  output: string;
  testResults: TestResult[];
  isDarkMode?: boolean;
  layout?: "default" | "compact";
}

const OutputSection = ({ output, testResults, isDarkMode = false, layout = "default" }: OutputSectionProps) => {
  if (!output && testResults.length === 0) return null;

  const isCompact = layout === "compact";
  const containerClass = isCompact 
    ? "border-t border-[#3e3e42] bg-[#252526] p-3 max-h-64 overflow-y-auto"
    : "border-t bg-gray-50 p-4 max-h-64 overflow-y-auto";

  const outputClass = isCompact
    ? "bg-[#1e1e1e] text-green-400 p-3 rounded-md text-xs font-mono whitespace-pre-wrap border border-[#3e3e42]"
    : `${isDarkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-100 text-gray-800'} p-3 rounded-md text-sm font-mono whitespace-pre-wrap`;

  const titleClass = isCompact ? "font-semibold text-gray-300 mb-2 text-sm" : "font-semibold text-gray-900 mb-2";
  const textSize = isCompact ? "text-xs" : "text-xs";

  return (
    <div className={containerClass}>
      {output && (
        <div className="mb-4">
          <h4 className={titleClass}>Output:</h4>
          <pre className={outputClass}>{output}</pre>
        </div>
      )}

      {testResults.length > 0 && (
        <div>
          <h4 className={titleClass}>Test Results:</h4>
          <div className="space-y-2">
            {testResults.map((result, index) => {
              const cardClass = isCompact
                ? `p-2 rounded-lg border ${result.passed 
                    ? 'bg-green-900/20 border-green-600/30' 
                    : 'bg-red-900/20 border-red-600/30'
                  }`
                : `p-3 rounded-lg border ${result.passed 
                    ? 'bg-green-50 border-green-200' 
                    : 'bg-red-50 border-red-200'
                  }`;

              return (
                <div key={index} className={cardClass}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <CheckCircle className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} text-green-400`} />
                      ) : (
                        <XCircle className={`${isCompact ? 'h-3 w-3' : 'h-4 w-4'} text-red-400`} />
                      )}
                      <span className={`font-medium ${isCompact ? 'text-white' : ''} ${textSize}`}>
                        Test {result.testCase}: {result.passed ? "Passed" : "Failed"}
                      </span>
                    </div>
                    <div className={`${textSize} ${isCompact ? 'text-gray-400' : 'text-gray-500'}`}>
                      {result.executionTime?.toFixed(2)}ms{!isCompact && ` | ${result.memoryUsed}KB`}
                    </div>
                  </div>
                  {!result.passed && (
                    <div className={`${textSize} ${isCompact ? 'text-gray-300' : 'text-gray-600'} space-y-1`}>
                      {!isCompact && <div><strong>Input:</strong> {result.input}</div>}
                      <div><strong>Expected:</strong> {result.expectedOutput}</div>
                      <div><strong>Got:</strong> {result.actualOutput}</div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputSection;
