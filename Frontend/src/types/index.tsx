export type Job = {
  id: string;
  title: string;
  location: string;
};

export type Status =
  | "REVIEWING"
  | "INTERVIEW"
  | "OFFER"
  | "HIRED"
  | "REJECTED";

export type Application = {
  id: string;
  candidateName: string;
  status: Status;
  appliedAt: string;
};
