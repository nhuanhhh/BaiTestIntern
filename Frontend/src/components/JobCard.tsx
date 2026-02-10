import { MoreVertical } from 'lucide-react';
import KanbanBoard from './KanbanBoard';

interface JobCardProps {
  job: {
    id: string; 
    title: string;
    status: string;
    location: string;
    type: string;
    code?: string;
    candidates?: any;
  };
  refetch?: () => void; 
}

export default function JobCard({ job, refetch }: JobCardProps) {
  const isExpanded = !!job.candidates; 

  return (
    <div className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow mb-6 ${!isExpanded ? 'p-6 flex justify-between items-center cursor-pointer' : ''}`}>
      
      <div className={`${isExpanded ? 'p-6 border-b border-gray-100 flex justify-between items-start' : ''}`}>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h2 className="text-lg font-bold text-gray-900">{job.title}</h2>
            <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wide ${
              job.status === 'ACTIVE' 
                ? 'bg-green-50 text-green-600' 
                : 'bg-orange-50 text-orange-600'
            }`}>
              {job.status}
            </span>
          </div>
          <p className="text-sm text-gray-400 font-medium">
            {job.location} <span className="text-gray-300">•</span> {job.type}
            {job.code && <><span className="text-gray-300"> • </span> {job.code}</>}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {isExpanded ? (
            <button className="border border-red-200 text-red-500 hover:bg-red-50 px-4 py-1.5 rounded text-sm font-bold transition-colors">
              Close Job
            </button>
          ) : null}
          <button className="text-gray-300 hover:text-gray-500">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>
      {isExpanded && (
        <KanbanBoard 
            candidates={job.candidates} 
            jobId={job.id}       
            onUpdate={refetch}   
        />
      )}
    </div>
  );
}