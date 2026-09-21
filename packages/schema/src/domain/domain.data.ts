import { Domain } from "./domain.schema";
import { DomainItem } from "./domain.type";

export const DOMAINS: DomainItem[] = [
  {
    _id: Domain.TECHNOLOGY,
    id: Domain.TECHNOLOGY,
    name: "Information Technology",
    description:
      "Software development, IT services, and technical communication",
  },
  {
    _id: Domain.BUSINESS,
    id: Domain.BUSINESS,
    name: "Business & Management",
    description: "Corporate communication, meetings, and leadership vocabulary",
  },
  {
    _id: Domain.STUDENT,
    id: Domain.STUDENT,
    name: "Student & Academics",
    description:
      "School & college discussions, essays, presentations, and exam prep",
  },
  {
    _id: Domain.MEDICAL,
    id: Domain.MEDICAL,
    name: "Healthcare & Medicine",
    description:
      "Medical terminology, clinical communication, and patient care",
  },
  {
    _id: Domain.FINANCE,
    id: Domain.FINANCE,
    name: "Finance & Banking",
    description: "Accounting, investments, banking, and economic terminology",
  },
  {
    _id: Domain.LAW,
    id: Domain.LAW,
    name: "Legal & Compliance",
    description:
      "Contracts, litigation, legal terms, and regulatory compliance",
  },
  {
    _id: Domain.EDUCATION,
    id: Domain.EDUCATION,
    name: "Education & Teaching",
    description:
      "Pedagogy, classroom communication, and academic administration",
  },
  {
    _id: Domain.SCIENCE,
    id: Domain.SCIENCE,
    name: "Science & Research",
    description:
      "Scientific methods, laboratory communication, and data analysis",
  },
];
