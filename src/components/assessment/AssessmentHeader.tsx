
interface AssessmentHeaderProps {
  filteredCount: number;
}

const AssessmentHeader = ({ filteredCount }: AssessmentHeaderProps) => {
  return (
    <>
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Mock Assessments</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Take comprehensive mock assessments designed to simulate real company hiring processes. Test your skills across different domains and get ready for your dream job.
        </p>
      </div>

      {/* Results Count */}
      <div className="mb-6">  
        <p className="text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredCount}</span> assessment{filteredCount !== 1 ? 's' : ''}
        </p>
      </div>
    </>
  );
};

export default AssessmentHeader;
