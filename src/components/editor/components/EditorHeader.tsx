
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Sun, Moon, Maximize2, Minimize2 } from "lucide-react";
import { languages } from "../types";

interface EditorHeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  problemTitle: string;
  difficulty: string;
  isSolved: boolean;
  showTimer?: boolean;
  timeLeft?: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  isFullScreen: boolean;
  onToggleFullScreen: () => void;
  getDifficultyColor: (difficulty: string) => string;
  formatTime: (seconds: number) => string;
}

const EditorHeader = ({
  selectedLanguage,
  onLanguageChange,
  problemTitle,
  difficulty,
  isSolved,
  showTimer,
  timeLeft,
  isDarkMode,
  onToggleDarkMode,
  isFullScreen,
  onToggleFullScreen,
  getDifficultyColor,
  formatTime
}: EditorHeaderProps) => {
  return (
    <div className="bg-gray-50 border-b px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-gray-900">{problemTitle}</h2>
          <Badge className={getDifficultyColor(difficulty)}>{difficulty}</Badge>
          {isSolved && <CheckCircle className="h-5 w-5 text-green-600" />}
        </div>
        {showTimer && timeLeft !== undefined && (
          <div className="flex items-center gap-2 text-sm text-red-600">
            <Clock className="h-4 w-4" />
            <span className="font-mono font-semibold">{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <Select value={selectedLanguage} onValueChange={onLanguageChange}>
            <SelectTrigger className="w-40">
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
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleDarkMode}
            className="flex items-center gap-2"
          >
            {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onToggleFullScreen}
            className="hidden lg:flex"
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
