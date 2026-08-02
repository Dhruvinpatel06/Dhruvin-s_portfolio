import { Metadata } from "next";
import ResumeView from "./resume-view";

export const metadata: Metadata = {
  title: "Résumé | Dhruvin Patel",
  description:
    "Résumé of Dhruvin Patel — Full-Stack Developer & CSE Student. View online or download the PDF.",
};

export default function ResumePage() {
  return <ResumeView />;
}
