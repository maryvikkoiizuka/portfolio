export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  achievments: string[];
  endDate?: string;
  current?: boolean;
}
