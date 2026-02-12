import { ContactInfo } from "./contact-info";
import { Education } from "./education";
import { Experience } from "./experience";
import { Skill } from "./skill";
export interface Profile {
  id: string;
  name: string;
  title: string;
  contact: ContactInfo;
  summary: string;
  experience: Experience[];
  skills: Skill[];
  education: Education[];
}
