
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Play, Send } from "lucide-react";

interface EditorControlsProps {
  customInput: string;
  onCustomInputChange: (value: string) => void;
  onRun: () => void;
  onSubmit: () => void;
  isRunning: boolean;
  isSubmitting: boolean;
  isSolved: boolean;
  layout?: "default" | "compact" | "leetcode";
}

const EditorControls = ({
  customInput,
  onCustomInputChange,
  onRun,
  onSubmit,
  isRunning,
  isSubmitting,
  isSolved,
  layout = "default"
}: EditorControlsProps) => {
  if (layout === "leetcode") {
    return (
      <div className="p-4 border-t border-gray-200 bg-white space-y-4">
        {/* Custom Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Custom Input
          </label>
          <Textarea
            value={customInput}
            onChange={(e) => onCustomInputChange(e.target.value)}
            placeholder="Enter your test input here..."
            className="h-20 font-mono text-sm resize-none"
            disabled={isSolved}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            onClick={onRun}
            disabled={isRunning || isSolved}
            variant="outline"
            size="sm"
            className="flex-1"
          >
            <Play className="h-4 w-4 mr-2" />
            {isRunning ? "Running..." : "Run"}
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSubmitting || isSolved}
            size="sm"
            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </div>
    );
  }

  if (layout === "compact") {
    return (
      <>
        {/* Action Buttons */}
        <div className="p-3 border-t border-[#3e3e42] bg-[#252526]">
          <div className="flex gap-2">
            <Button
              onClick={onRun}
              disabled={isRunning || isSolved}
              variant="outline"
              size="sm"
              className="flex-1 bg-[#0e639c] hover:bg-[#1177bb] border-[#0e639c] text-white"
            >
              <Play className="h-4 w-4 mr-2" />
              {isRunning ? "Running..." : "Run"}
            </Button>
            <Button
              onClick={onSubmit}
              disabled={isSubmitting || isSolved}
              size="sm"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>

        {/* Custom Input */}
        <div className="p-3 border-t border-[#3e3e42] bg-[#252526]">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Custom Input
          </label>
          <Textarea
            value={customInput}
            onChange={(e) => onCustomInputChange(e.target.value)}
            placeholder="Enter your test input here..."
            className="h-20 font-mono text-sm bg-[#3c3c3c] border-[#3e3e42] text-white placeholder-gray-400 resize-none"
            disabled={isSolved}
          />
        </div>
      </>
    );
  }

  return (
    <div className="p-4 border-b bg-gray-50">
      <div className="flex gap-2 mb-4">
        <Button
          onClick={onRun}
          disabled={isRunning || isSolved}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          <Play className="h-4 w-4" />
          {isRunning ? "Running..." : "Run"}
        </Button>
        <Button
          onClick={onSubmit}
          disabled={isSubmitting || isSolved}
          className="bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
          size="sm"
        >
          <Send className="h-4 w-4" />
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Custom Input (Optional)
        </label>
        <Textarea
          value={customInput}
          onChange={(e) => onCustomInputChange(e.target.value)}
          placeholder="Enter your custom input here..."
          className="h-20 font-mono text-sm resize-none"
          disabled={isSolved}
        />
      </div>
    </div>
  );
};

export default EditorControls;
