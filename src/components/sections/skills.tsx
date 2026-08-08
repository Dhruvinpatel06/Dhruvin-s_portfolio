"use client";

import SectionWrapper from "../ui/section-wrapper";
import { SectionHeader } from "./section-header";

/**
 * Tech-stack section.
 *
 * The skills live in the interactive 3D keyboard's keycaps — this section
 * provides the header and the tall scroll area that the keyboard scrubs through.
 */
const SkillsSection = () => {
  return (
    <SectionWrapper
      id="skills"
      className="w-full h-screen md:h-[150dvh] pointer-events-none"
    >
      <SectionHeader id="skills" title="Tech Stack" desc="(hint: press a key)" />
    </SectionWrapper>
  );
};

export default SkillsSection;
