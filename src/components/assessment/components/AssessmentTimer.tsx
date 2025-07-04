
import { Clock } from "lucide-react";

interface AssessmentTimerProps {
  timeLeft: number;
}

const AssessmentTimer = ({ timeLeft }: AssessmentTimerProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg border border-red-200">
      <Clock className="h-5 w-5 text-red-600" />
      <span className="font-mono text-xl font-bold text-red-600">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default AssessmentTimer;
