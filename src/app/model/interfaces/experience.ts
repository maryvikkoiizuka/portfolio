export interface Experience {
  id: string;
  title: string;
  company: string;
  clients: string[];
  location: string;
  startDate: string;
  endDate: string | null;
  description: string;
  technologies: string[];
  tasks: string[];
  current?: boolean;
}
