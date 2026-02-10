import { Lock } from 'lucide-react';

export default function Header() {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 shadow-sm flex-shrink-0 sticky top-0 z-10">
      <div className="flex gap-8 text-sm font-bold text-gray-500">
        <a href="#" className="hover:text-purple-600 transition-colors">Home</a>
        <a href="#" className="hover:text-purple-600 transition-colors">Jobs</a>
        <a href="#" className="hover:text-purple-600 transition-colors">Refer & Earn</a>
        <a href="#" className="text-purple-600 border-b-2 border-purple-600 pb-[22px]">For Business</a>
      </div>


      <div className="flex items-center gap-6">
        <span className="text-sm font-bold text-gray-900 cursor-pointer hover:text-purple-600 transition-colors">
          Post a job
        </span>
        <button className="bg-purple-600 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-purple-700 flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
          <Lock size={16} />
          Sign In
        </button>
      </div>
    </div>
  );
}