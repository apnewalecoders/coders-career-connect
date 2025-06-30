
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Filter, X } from "lucide-react";

interface FilterSection {
  title: string;
  icon?: React.ReactNode;
  options: { value: string; label: string }[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

interface MobileFilterSheetProps {
  sections: FilterSection[];
  onResetFilters: () => void;
  hasActiveFilters: boolean;
  activeFilters: { label: string; color: string }[];
}

const MobileFilterSheet = ({ 
  sections, 
  onResetFilters, 
  hasActiveFilters, 
  activeFilters 
}: MobileFilterSheetProps) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="w-full bg-white border-gray-200 flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-auto bg-brand-red text-white">
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="h-[80vh] bg-white">
          <SheetHeader>
            <SheetTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-brand-red" />
              Filters
            </SheetTitle>
          </SheetHeader>
          
          <div className="py-4 space-y-6 overflow-y-auto">
            {sections.map((section, index) => (
              <div key={index}>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  {section.icon}
                  {section.title}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {section.options.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => section.onSelect(option.value)}
                      className={`p-3 rounded-lg text-sm border transition-all ${
                        section.selectedValue === option.value
                          ? "bg-brand-red text-white border-brand-red"
                          : "bg-white text-gray-700 border-gray-200 hover:border-brand-red"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {hasActiveFilters && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="font-medium text-gray-900 mb-3">Active Filters</h4>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.map((filter, index) => (
                    <Badge key={index} variant="outline" className={filter.color}>
                      {filter.label}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <SheetFooter className="border-t pt-4">
            <Button 
              variant="outline" 
              onClick={onResetFilters}
              className="w-full text-brand-red border-brand-red hover:bg-red-50"
            >
              Clear All Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileFilterSheet;
