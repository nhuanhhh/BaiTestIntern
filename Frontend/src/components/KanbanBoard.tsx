import { updateCandidateStatus } from '../services/JobsApi';

interface Candidate {
  id: string; 
  name: string;
  role: string;
  match: string;
}


function CandidateCard({ 
  data, 
  isNew, 
  onHire, 
  canHire 
}: { 
  data: Candidate; 
  isNew?: boolean;
  onHire: (id: string, name: string) => void;
  canHire: boolean; 
}) {
  return (
    <div className="bg-white p-3 mb-2 rounded border border-gray-200 shadow-sm cursor-pointer hover:border-purple-400 hover:shadow-md transition-all group">
      {isNew && (
        <span className="bg-yellow-300 text-[9px] font-bold px-1.5 py-0.5 rounded text-yellow-900 mb-1.5 inline-block">
          NEW
        </span>
      )}
      <div className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
        {data.name}
      </div>
      <div className="text-[11px] text-gray-500 mt-0.5">{data.role}</div>
      <div className="text-[10px] text-green-600 font-bold mt-1.5">
        {data.match} Match
      </div>
      {canHire && (
        <button 
            onClick={() => onHire(data.id, data.name)}
            className="mt-2 w-full text-[10px] font-bold bg-purple-600 text-white py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        >
            Xác nhận tuyển
        </button>
      )}
    </div>
  );
}

function KanbanColumn({ title, count, children, colorDot }: any) {
  return (
    <div className="bg-gray-50 rounded-lg p-3 min-h-[160px] border border-gray-100 min-w-[160px] flex flex-col h-full">
      <div className="flex items-center gap-2 mb-3">
        {colorDot && <div className={`w-1.5 h-1.5 rounded-full ${colorDot}`}></div>}
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          {title} ({count})
        </span>
      </div>
      <div className="space-y-2 flex-1">
        {children}
      </div>
    </div>
  );
}

interface KanbanBoardProps {
    candidates: any;
    jobId: string;       
    onUpdate?: () => void; 
}

export default function KanbanBoard({ candidates, onUpdate }: KanbanBoardProps) {
  if (!candidates) return null;

  const handleHire = async (candidateId: string, candidateName: string) => {
    const isConfirmed = window.confirm(`Bạn có chắc muốn tuyển "${candidateName}" không?`);
    if (isConfirmed) {
        try {
            await updateCandidateStatus(candidateId, 'HIRED');
            alert("✅ Tuyển dụng thành công!");
            if (onUpdate) onUpdate();
        } catch (error) {
            alert("❌ Lỗi update!");
        }
    }
  };

  return (
    <div className="p-6 grid grid-cols-6 gap-3 overflow-x-auto">
      <KanbanColumn title="NEW" count={candidates.new?.length || 0} colorDot="bg-yellow-400">
        {candidates.new?.map((c: any, i: number) => (
          <CandidateCard key={i} data={c} isNew onHire={handleHire} canHire={true} />
        ))}
      </KanbanColumn>
      <KanbanColumn title="SCREENING" count={candidates.screening?.length || 0} colorDot="bg-blue-400">
        {candidates.screening?.map((c: any, i: number) => (
          <CandidateCard key={i} data={c} onHire={handleHire} canHire={true} />
        ))}
      </KanbanColumn>
      <KanbanColumn title="INTERVIEW" count={candidates.interview?.length || 0} colorDot="bg-purple-400">
        {candidates.interview?.map((c: any, i: number) => (
          <CandidateCard key={i} data={c} onHire={handleHire} canHire={true} />
        ))}
      </KanbanColumn>
      <KanbanColumn title="OFFER" count={candidates.offer?.length || 0} colorDot="bg-pink-400">
        {candidates.offer?.map((c: any, i: number) => (
          <CandidateCard key={i} data={c} onHire={handleHire} canHire={true} />
        ))}
      </KanbanColumn>
      <KanbanColumn title="HIRED" count={candidates.hired?.length || 0} colorDot="bg-green-500">
        {candidates.hired?.map((c: any, i: number) => (
          <CandidateCard key={i} data={c} onHire={handleHire} canHire={false} />
        ))}
      </KanbanColumn>
      <KanbanColumn title="FAILED" count={candidates.failed?.length || 0} colorDot="bg-gray-400">
        {candidates.failed?.map((c: any, i: number) => (
          <CandidateCard key={i} data={c} onHire={handleHire} canHire={false} />
        ))}
      </KanbanColumn>

    </div>
  );
}