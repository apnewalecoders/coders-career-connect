
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Building, User, Briefcase, ChevronDown } from "lucide-react";

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
  return (
    <div className="flex lg:hidden gap-3 overflow-x-auto pb-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit">
            <Building className="h-4 w-4" />
            {selectedCompany === "All Companies" ? "Company" : selectedCompany}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {companies.map((company) => (
            <DropdownMenuItem
              key={company}
              onClick={() => onCompanyChange(company)}
              className={selectedCompany === company ? "bg-brand-red text-white" : ""}
            >
              {company}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit">
            <Briefcase className="h-4 w-4" />
            {selectedRole === "All Roles" ? "Role" : selectedRole}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {roles.map((role) => (
            <DropdownMenuItem
              key={role}
              onClick={() => onRoleChange(role)}
              className={selectedRole === role ? "bg-brand-red text-white" : ""}
            >
              {role}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="whitespace-nowrap flex items-center gap-2 min-w-fit">
            <User className="h-4 w-4" />
            {selectedExperience === "All Levels" ? "Experience" : selectedExperience}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-48">
          {experienceLevels.map((level) => (
            <DropdownMenuItem
              key={level}
              onClick={() => onExperienceChange(level)}
              className={selectedExperience === level ? "bg-brand-red text-white" : ""}
            >
              {level}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button 
        variant="ghost" 
        size="sm" 
        onClick={onResetFilters}
        className="text-brand-red hover:bg-red-50 whitespace-nowrap"
      >
        Clear All
      </Button>
    </div>
  );
};

export default MobileFilters;
