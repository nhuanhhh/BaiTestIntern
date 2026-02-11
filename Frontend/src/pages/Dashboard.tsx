import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import JobCard from '../components/JobCard';


interface JobFromAPI {
  id: string; 
  title: string;
  status: string;
  type?: string;
  location?: string;
  applications: any[]; 
}

const filterCandidates = (apps: any[], status: string) => {
    if (!apps) return [];
    return apps.filter((app: any) => app.status === status);
};


const fetchJobs = async () => {
  console.log("Bat dau goi API...");
  const res = await axios.get('http://localhost:8386/api/jobs');
  
  console.log("Du lieu tho tu server:", res.data);

  return res.data.map((job: JobFromAPI) => ({
    id: job.id, 
    title: job.title,
    status: job.status || 'Active',
    location: job.location || 'Remote',
    type: job.type || 'Full-time',
    code: `#JOB-${job.id.slice(-4).toUpperCase()}`,
    
    candidates: {
      new: filterCandidates(job.applications, 'NEW'),
      screening: filterCandidates(job.applications, 'SCREENING'),
      interview: filterCandidates(job.applications, 'INTERVIEW'),
      offer: filterCandidates(job.applications, 'OFFER'),
      hired: filterCandidates(job.applications, 'HIRED'),
      failed: filterCandidates(job.applications, 'FAILED')
    }
  }));
};

export default function Dashboard() {
  const { data: jobs, isLoading, error } = useQuery({
    queryKey: ['jobs'],
    queryFn: fetchJobs,
  });

  return (
    <div className="min-h-screen bg-gray-50 flex text-gray-800 font-sans">
      <Sidebar/>

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header />

        <div className="p-8 overflow-y-auto flex-1 bg-[#F8F9FC]">
          
          <div className="text-xs text-gray-400 mb-4 flex items-center gap-1">
            Business <span>&gt;</span> Recruitment Suite <span>&gt;</span> <span className="text-gray-600 font-bold">Jobs</span>
          </div>

          <div className="flex gap-8 mb-6 border-b border-gray-200">
            <button className="pb-3 text-sm font-bold text-purple-600 border-b-2 border-purple-600">Active</button>
            <button className="pb-3 text-sm font-bold text-gray-400 hover:text-purple-600">Pending</button>
            <button className="pb-3 text-sm font-bold text-gray-400 hover:text-purple-600">Closed</button>
          </div>

          <div className="space-y-4">
            {isLoading && (
              <div className="text-center py-10 text-gray-500">
               Dang tai danh sach tu MongoDB...
              </div>
            )}

            {error && (
              <div className="text-center py-10 text-red-500 bg-red-50 rounded-lg border border-red-100">
              Loi ket noi Backend!
              </div>
            )}

            {/* Render JobCard */}
            {jobs?.map((job: any) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
          
        </div>
      </div>
    </div>
  );
}