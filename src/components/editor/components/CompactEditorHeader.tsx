
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { languages } from "../types";

interface CompactEditorHeaderProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const CompactEditorHeader = ({ selectedLanguage, onLanguageChange }: CompactEditorHeaderProps) => {
  return (
    <div className="p-3 border-b border-[#3e3e42] bg-[#252526]">
      <Select value={selectedLanguage} onValueChange={onLanguageChange}>
        <SelectTrigger className="w-full bg-[#3c3c3c] border-[#3e3e42] text-white">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#252526] border-[#3e3e42]">
          {languages.map((lang) => (
            <SelectItem key={lang.value} value={lang.value} className="text-white hover:bg-[#3c3c3c]">
              {lang.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CompactEditorHeader;
