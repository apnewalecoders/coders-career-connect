
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
}

interface FilterDropdownProps {
  title: string;
  icon?: React.ReactNode;
  options: FilterOption[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
}

const FilterDropdown = ({
  title,
  icon,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select option"
}: FilterDropdownProps) => {
  const displayValue = selectedValue === "All" || !selectedValue 
    ? placeholder 
    : options.find(opt => opt.value === selectedValue)?.label || placeholder;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit bg-white border-gray-200">
          {icon}
          <span className="hidden sm:inline">{title}:</span>
          <span className="font-normal text-sm">{displayValue}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 bg-white z-50 border shadow-lg">
        {options.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSelect(option.value)}
            className={selectedValue === option.value ? "bg-brand-red text-white" : "hover:bg-gray-50"}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterDropdown;
