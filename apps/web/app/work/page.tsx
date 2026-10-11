"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { type WorkProject, WorkProjectScene, workProjects } from "@/components/experience/work";
import { Reveal, Stagger } from "@/components/motion";

export default function WorkArchivePage() {
    const [selectedProject, setSelectedProject] = useState<WorkProject | null>(null);

    const closeProject = () => {
        setSelectedProject(null);
        window.history.replaceState(null, "", "/work");
    };

    useEffect(() => {
        const syncProjectFromUrl = () => {
            const slug = new URLSearchParams(window.location.search).get("project");
            setSelectedProject(workProjects.find((project) => project.slug === slug) ?? null);
        };
        syncProjectFromUrl();
        window.addEventListener("popstate", syncProjectFromUrl);
        return () => window.removeEventListener("popstate", syncProjectFromUrl);
    }, []);

    useEffect(() => {
        if (!selectedProject) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeProject();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedProject]);

    const openProject = (project: WorkProject) => {
        setSelectedProject(project);
        window.history.pushState(null, "", `/work?project=${project.slug}`);
    };

    return (
        <main className="min-h-screen bg-[#F0F0EB] text-[#253B2A]">
            <header className="mx-auto flex min-h-[68svh] w-[min(92vw,1360px)] flex-col justify-center border-b border-[#455C2F]/15 pb-20 pt-32 md:pt-40">
                <Reveal trigger="viewport" direction="right" distance={24} className="mb-9 flex items-center gap-4 font-body text-[9px] uppercase tracking-[0.28em] text-[#455C2F]/60">
                    <span>04</span><span className="h-px w-14 bg-[#455C2F]/30" /><span>Selected Work</span><span className="h-1.5 w-1.5 rounded-full bg-[#455C2F]" />
                </Reveal>
                <Reveal trigger="viewport" direction="up" distance={48} duration={1}>
                    <h1 className="max-w-6xl font-heading text-[clamp(4.5rem,10vw,10rem)] font-normal leading-[0.76] tracking-[-0.06em]">Ideas, made<br /><span className="text-[#9C9EA1]">tangible.</span></h1>
                </Reveal>
                <Reveal trigger="viewport" direction="up" distance={24} delay={0.18} className="mt-12 max-w-xl border-l border-[#455C2F]/25 pl-6 font-body text-sm leading-[1.8] text-[#253B2A]/62 md:text-base">A growing archive of strategic systems, identities, digital experiences, and physical expressions composed by AKORD.</Reveal>
            </header>

            <Stagger trigger="viewport" stagger={0.18} distance={54} duration={0.95} className="mx-auto grid w-[min(92vw,1360px)] gap-8 py-24 md:py-36">
                {workProjects.map((project, index) => (
                    <article key={project.slug} className="group grid gap-8 border-b border-[#455C2F]/15 pb-24 md:grid-cols-[minmax(0,1.45fr)_minmax(0,0.55fr)] md:items-end">
                        <button type="button" onClick={() => openProject(project)} className="relative block aspect-[16/10] w-full overflow-hidden bg-[#D9DAD5] text-left" aria-label={`Open ${project.title} case study`}>
                            <Image src={project.assets.hero} alt={`${project.title} project cover`} fill priority unoptimized={project.slug === "danaday-branding"} sizes="(max-width: 768px) 92vw, 68vw" className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]" />
                        </button>
                        <div className="min-w-0 pb-2">
                            <div className="mb-8 font-body text-[9px] uppercase tracking-[0.24em] text-[#455C2F]/55">{String(index + 1).padStart(2, "0")} / {project.year}</div>
                            <h2 className="[overflow-wrap:anywhere] font-heading text-[clamp(2.7rem,4.7vw,5rem)] leading-[0.84] tracking-[-0.045em]">{project.title}</h2>
                            <p className="mt-7 font-body text-sm leading-[1.75] text-[#253B2A]/62">{project.industry} · {project.country}</p>
                            <button type="button" onClick={() => openProject(project)} className="mt-10 flex w-fit items-center gap-5 border-b border-[#455C2F]/30 pb-2 font-body text-[9px] uppercase tracking-[0.24em]"><span>View case study</span><span>↗</span></button>
                        </div>
                    </article>
                ))}
            </Stagger>

            <footer className="flex min-h-[34svh] items-center justify-center bg-[#455C2F] px-6 text-center text-[#F0F0EB]">
                <p className="font-heading text-[clamp(2.5rem,5vw,5.5rem)] tracking-[-0.04em]">More compositions to come.</p>
            </footer>

            {selectedProject && (
                <div className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[#F0F0EB]">
                    <button type="button" onClick={closeProject} className="fixed right-5 top-5 z-[80] flex h-12 items-center gap-3 rounded-full bg-[#F0F0EB]/90 px-5 font-body text-[9px] uppercase tracking-[0.22em] text-[#253B2A] shadow-lg backdrop-blur-md transition-colors hover:bg-[#455C2F] hover:text-[#F0F0EB]" aria-label="Close project case study"><span>Close</span><span className="text-base leading-none">×</span></button>
                    <WorkProjectScene project={selectedProject} active />
                </div>
            )}
        </main>
    );
}
