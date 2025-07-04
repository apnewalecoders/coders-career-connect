
import { Clock } from "lucide-react";

interface MockAssessmentTimerProps {
  timeLeft: number;
}

const MockAssessmentTimer = ({ timeLeft }: MockAssessmentTimerProps) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg">
      <Clock className="h-5 w-5 text-red-500" />
      <span className="font-mono text-lg font-semibold text-red-600">
        {formatTime(timeLeft)}
      </span>
    </div>
  );
};

export default MockAssessmentTimer;
