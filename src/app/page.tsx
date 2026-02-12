"use client";
import { useEffect, useState } from "react";
import { profile } from "./model/cv";
import { menuItems } from "./model/menu";
import { SkillType } from "./model/types/skillType";
import { MenuItem } from "./model/types/menuItem";

export default function Home() {
  const [showNavName, setShowNavName] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const handleScroll = () => {
      const experienceSection = document.getElementById("experience");
      if (!experienceSection) return;

      const rect = experienceSection.getBoundingClientRect();
      const navHeight = 80; // approx navbar height
      setShowNavName(rect.top <= navHeight);
    };

    handleScroll(); // set initial value
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          } else {
            setVisibleSections((prev) => {
              const updated = new Set(prev);
              updated.delete(entry.target.id);
              return updated;
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px",
      },
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1
            className={`text-xl font-bold text-slate-900 dark:text-white transition-opacity duration-300 ${
              showNavName ? "opacity-100" : "opacity-0"
            }`}
          >
            {profile.name}
          </h1>

          {/* Desktop menu */}
          <div className="hidden md:flex gap-6">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                // X icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                // Hamburger icon
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile dropdown menu */}
        <div
          className={`md:hidden border-t border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="max-w-6xl mx-auto px-6 py-3 flex flex-col gap-2">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className="py-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <section id={MenuItem.PROFILE.toLocaleLowerCase()} className="py-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <div>
              <h2 className="text-5xl font-bold text-blue-900 dark:text-white mb-2">
                {profile.name}
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-300 mb-4">
                {profile.title}
              </p>
              <div className="flex gap-4 justify-center text-sm text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  {profile.contact.email}
                </span>
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  {profile.contact.location}
                </span>
              </div>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {profile.summary}
            </p>
          </div>
        </section>

        {/* Experience Section */}
        <section
          id={MenuItem.EXPERIENCE.toLocaleLowerCase()}
          className={`py-10 transition-all duration-700 ${
            visibleSections.has(MenuItem.EXPERIENCE.toLocaleLowerCase())
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {MenuItem.EXPERIENCE}
          </h3>
          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <div
                key={exp.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {exp.title}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {exp.company}
                    </p>
                    {exp.clients.length > 0 && (
                      <p className="text-sm font-bold text-slate-500 dark:text-purple-400 mt-1">
                        Client: {exp.clients.join(", ")}
                      </p>
                    )}
                  </div>

                  <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  {exp.tasks.map((task, index) => (
                    <li key={index} className="flex gap-2">
                      <span className="text-blue-600 dark:text-blue-400 mt-1">
                        •
                      </span>
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section
          id={MenuItem.EDUCATION.toLocaleLowerCase()}
          className={`py-16 transition-all duration-700 ${
            visibleSections.has(MenuItem.EDUCATION.toLocaleLowerCase())
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {MenuItem.EDUCATION}
          </h3>
          <div className="space-y-6">
            {profile.education.map((edu) => (
              <div
                key={edu.id}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white">
                      {edu.degree}
                    </h4>
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {edu.institution}
                    </p>
                    {edu.achievments.length > 0 && (
                      <ul className="mt-2 text-slate-600 dark:text-slate-300 list-disc list-inside">
                        {edu.achievments.map((ach, index) => (
                          <li key={index}>{ach}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 px-3 py-1 rounded-full">
                    {edu.startDate} - {edu.endDate ? edu.endDate : "Present"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section
          id={MenuItem.SKILLS.toLocaleLowerCase()}
          className={`py-10 transition-all duration-700 ${
            visibleSections.has(MenuItem.SKILLS.toLocaleLowerCase())
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
            {MenuItem.SKILLS}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Tools / Languages
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) =>
                  skill.type === SkillType.TECHNICAL ? (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm"
                    >
                      {skill.name}
                    </span>
                  ) : null,
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700">
              <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
                Key Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map(
                  (skill) =>
                    skill.type === SkillType.KEY && (
                      <span
                        key={skill.id}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm"
                      >
                        {skill.name}
                      </span>
                    ),
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id={MenuItem.CONTACT.toLocaleLowerCase()}
          className={`py-10 transition-all duration-700 ${
            visibleSections.has(MenuItem.CONTACT.toLocaleLowerCase())
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-gradient-to-br from-white-600 to-gray-400 dark:bg-gradient-to-br dark:from-white-600 dark:to-blue-400 rounded-2xl p-12 dark:text-white text-center shadow-2xl">
            <h3 className="text-3xl font-bold mb-4">
              Let&apos;s Work Together
            </h3>
            <p className="dark:text-blue-100 mb-8 max-w-2xl mx-auto">
              I&apos;m currently looking for internship opportunities where I
              can contribute to exciting projects and continue learning. Feel
              free to reach out!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${profile.contact.email}`}
                className="px-8 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6 inline mr-2 -mt-1"
                >
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                Send Email
              </a>
              <a
                href={profile.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 text-blue-600 dark:border-white dark:text-white font-medium rounded-lg hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5 inline mr-2 -mt-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Profile
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© 2026 Mary Vikko Miller</p>
        </div>
      </footer>
    </div>
  );
}
