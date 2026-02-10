import { Briefcase, Users, BarChart2, Globe, Layout, Lock } from 'lucide-react';

export default function Sidebar() {
  return (
    <div className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900">RECRUITMENT SUITE</h2>
      </div>

      <div className="flex-1 px-4">
        <p className="text-xs font-bold text-gray-400 mb-2 mt-4 px-2 uppercase tracking-wider">Recruitment Suite</p>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-purple-50 text-purple-700 font-medium"><Briefcase size={20} />Posted Jobs</a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 mt-1"><Users size={20} />Candidates</a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 mt-1"><BarChart2 size={20} />Analytics</a>
        
        <p className="text-xs font-bold text-gray-400 mb-2 mt-8 px-2 uppercase tracking-wider">Settings</p>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50"><Layout size={20} />Company Profile</a>
        <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 hover:bg-gray-50 mt-1"><Globe size={20} />Integrations</a>
      </div>

      <div className="p-4 border-t border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">NA</div>
        <div className="flex-1">
          <p className="text-sm font-bold text-gray-900">Nguyen Anh</p>
          <p className="text-xs text-gray-500">Recruiter Admin</p>
        </div>
        <button  title="Sign Out" className="text-gray-400 hover:text-red-500 transition-colors">
          <Lock size={16} />
        </button>
      </div>
    </div>
  );
}