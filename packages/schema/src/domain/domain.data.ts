import { Domain } from "./domain.schema";
import { DomainItem } from "./domain.type";

export const DOMAINS: DomainItem[] = [
  {
    id: Domain.TECHNOLOGY,
    name: "Information Technology",
    description:
      "Software development, IT services, and technical communication",
  },
  {
    id: Domain.BUSINESS,
    name: "Business & Management",
    description: "Corporate communication, meetings, and leadership vocabulary",
  },
  {
    id: Domain.STUDENT,
    name: "Student & Academics",
    description:
      "School & college discussions, essays, presentations, and exam prep",
  },
  {
    id: Domain.MEDICAL,
    name: "Healthcare & Medicine",
    description:
      "Medical terminology, clinical communication, and patient care",
  },
  {
    id: Domain.FINANCE,
    name: "Finance & Banking",
    description: "Accounting, investments, banking, and economic terminology",
  },
  {
    id: Domain.LAW,
    name: "Legal & Compliance",
    description:
      "Contracts, litigation, legal terms, and regulatory compliance",
  },
  {
    id: Domain.EDUCATION,
    name: "Education & Teaching",
    description:
      "Pedagogy, classroom communication, and academic administration",
  },
  {
    id: Domain.SCIENCE,
    name: "Science & Research",
    description:
      "Scientific methods, laboratory communication, and data analysis",
  },
];
