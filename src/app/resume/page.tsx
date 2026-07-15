import { Metadata } from "next";
import ResumeView from "./resume-view";

export const metadata: Metadata = {
  title: "Résumé | Naresh Khatri",
  description:
    "Résumé of Naresh Khatri — Senior Full-Stack Engineer. View online or download the PDF.",
};

export default function ResumePage() {
  return <ResumeView />;
}
