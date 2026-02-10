import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getApplications, updateStatus } from "../services/JobsApi";

export default function ApplicantTable({ jobId }: any) {
  const qc = useQueryClient();

  const { data } = useQuery({
    queryKey: ["apps", jobId],
    queryFn: () => getApplications(jobId),
    enabled: !!jobId
  });

  const mutation = useMutation({
    mutationFn: ({ id, status }: any) => updateStatus(id, status),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["apps", jobId] })
  });

  if (!jobId) return <div>Select job</div>;

  return (
    <div className="table">
      {data?.map((a: any) => (
        <div key={a.id} className="row">
          <span>{a.candidateName}</span>

          <select
            value={a.status}
            onChange={(e) =>
              mutation.mutate({ id: a.id, status: e.target.value })
            }
          >
            <option>REVIEWING</option>
            <option>INTERVIEW</option>
            <option>OFFER</option>
            <option>HIRED</option>
            <option>REJECTED</option>
          </select>
        </div>
      ))}
    </div>
  );
}
