
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MockQuestionNavigationProps {
  totalQuestions: number;
  submissions: {[key: number]: boolean};
}

const MockQuestionNavigation = ({ totalQuestions, submissions }: MockQuestionNavigationProps) => {
  return (
    <div className="bg-gray-50 border-b px-4 py-2">
      <TabsList className="grid w-fit grid-cols-2">
        {Array.from({ length: totalQuestions }, (_, index) => (
          <TabsTrigger key={index} value={index.toString()} className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${submissions[index] ? 'bg-green-500' : 'bg-gray-300'}`} />
              {index + 1}
            </div>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
};

export default MockQuestionNavigation;
