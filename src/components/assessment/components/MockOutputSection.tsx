
import { Label } from "@/components/ui/label";
import { ChevronDown, ChevronUp } from "lucide-react";

interface MockOutputSectionProps {
  output: string;
  outputExpanded: boolean;
  onToggleOutput: () => void;
}

const MockOutputSection = ({ output, outputExpanded, onToggleOutput }: MockOutputSectionProps) => {
  if (!output) return null;

  return (
    <div className="border rounded-lg">
      <div 
        className="flex items-center justify-between p-3 bg-gray-50 border-b cursor-pointer hover:bg-gray-100"
        onClick={onToggleOutput}
      >
        <Label className="text-sm font-medium">Output & Test Results</Label>
        {outputExpanded ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </div>
      {outputExpanded && (
        <div className="p-4">
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm whitespace-pre-line max-h-48 overflow-y-auto">
            {output}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockOutputSection;
