
import { Button } from "@/components/ui/button";
import { Filter, Building, Briefcase, User } from "lucide-react";

interface FilterSidebarProps {
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

const FilterSidebar = ({
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
}: FilterSidebarProps) => {
  return (
    <div className="hidden lg:block lg:w-1/4">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-4">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5 text-brand-red" />
            Filters
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onResetFilters}
            className="text-brand-red hover:bg-red-50"
          >
            Clear
          </Button>
        </div>
        
        {/* Companies */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Building className="h-4 w-4 text-gray-600" />
            Company
          </h4>
          <div className="space-y-2">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => onCompanyChange(company)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedCompany === company
                    ? "bg-brand-red text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {company}
              </button>
            ))}
          </div>
        </div>

        {/* Roles */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-gray-600" />
            Role
          </h4>
          <div className="space-y-2">
            {roles.map((role) => (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedRole === role
                    ? "bg-brand-red text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {role}
              </button>
            ))}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
            <User className="h-4 w-4 text-gray-600" />
            Experience
          </h4>
          <div className="space-y-2">
            {experienceLevels.map((level) => (
              <button
                key={level}
                onClick={() => onExperienceChange(level)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                  selectedExperience === level
                    ? "bg-brand-red text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
