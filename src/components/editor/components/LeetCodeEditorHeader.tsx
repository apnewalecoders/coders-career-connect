
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "../types";

interface LeetCodeEditorHeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LeetCodeEditorHeader = ({ selectedLanguage, onLanguageChange }: LeetCodeEditorHeaderProps) => {
  return (
    <div className="p-3 border-b border-gray-200 bg-white">
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-40 bg-white border-gray-300">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-gray-200">
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value} className="hover:bg-gray-50">
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LeetCodeEditorHeader;
