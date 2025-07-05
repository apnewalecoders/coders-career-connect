
import { Clock } from "lucide-react";

interface MockTestTimerProps {
  timeLeft: number;
}

const MockTestTimer = ({ timeLeft }: MockTestTimerProps) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 text-red-600">
      <Clock className="h-4 w-4 lg:h-5 lg:w-5" />
      <span className="font-mono font-bold text-sm lg:text-xl">{formatTime(timeLeft)}</span>
    </div>
  );
};

export default MockTestTimer;
