
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
import { Building, User, Briefcase, Filter } from "lucide-react";

interface MobileFiltersProps {
  companies: string[];
  roles: string[];
  experienceLevels: string[];
  selectedCompany: string;
  selectedRole: string;
  selectedExperience: string;
  onCompanyChange: (company: string) => void;
  onRoleChange: (role: string) => void;
  onExperienceChange: (experience: string) => void;
  onResetFilters: () => void;
}

const MobileFilters = ({
  companies,
  roles,
  experienceLevels,
  selectedCompany,
  selectedRole,
  selectedExperience,
  onCompanyChange,
  onRoleChange,
  onExperienceChange,
  onResetFilters,
}: MobileFiltersProps) => {
  const hasActiveFilters = selectedCompany !== "All Companies" || selectedRole !== "All Roles" || selectedExperience !== "All Levels";
  
  const activeFilters = [
    ...(selectedCompany !== "All Companies" ? [{ label: selectedCompany, color: "bg-purple-50 border-purple-200 text-purple-800" }] : []),
    ...(selectedRole !== "All Roles" ? [{ label: selectedRole, color: "bg-blue-50 border-blue-200 text-blue-800" }] : []),
    ...(selectedExperience !== "All Levels" ? [{ label: selectedExperience, color: "bg-green-50 border-green-200 text-green-800" }] : [])
  ];

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
            {/* Company Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {companies.map((company) => (
                  <button
                    key={company}
                    onClick={() => onCompanyChange(company)}
                    className={`p-3 rounded-lg text-sm border transition-all ${
                      selectedCompany === company
                        ? "bg-brand-red text-white border-brand-red"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-red"
                    }`}
                  >
                    {company}
                  </button>
                ))}
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Role
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => onRoleChange(role)}
                    className={`p-3 rounded-lg text-sm border transition-all ${
                      selectedRole === role
                        ? "bg-brand-red text-white border-brand-red"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-red"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience Filter */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <User className="h-4 w-4" />
                Experience
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {experienceLevels.map((level) => (
                  <button
                    key={level}
                    onClick={() => onExperienceChange(level)}
                    className={`p-3 rounded-lg text-sm border transition-all ${
                      selectedExperience === level
                        ? "bg-brand-red text-white border-brand-red"
                        : "bg-white text-gray-700 border-gray-200 hover:border-brand-red"
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

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

export default MobileFilters;
