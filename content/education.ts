export interface EducationItem {
  period: string;
  title: string;
  institution?: string;
  subheading?: string;
  meta: string;
}

export const education: EducationItem[] = [
  {
    period: "2023 – 2027",
    title: "Govt. Model Engineering College, Kochi",
    institution: "Govt. Model Engineering College",
    subheading: "APJ Abdul Kalam Technological University (KTU)",
    meta: "B.Tech in Computer Science and Engineering · CGPA 8.21 / 10.0",
  },
  {
    period: "Certification",
    title: "AI Fundamentals",
    institution: "IBM SkillsBuild Program",
    subheading: "Foundations for Understanding AI",
    meta: "Certified Credential",
  },
];
