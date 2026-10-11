"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type MouseEvent } from "react";

import { servicesChoreography } from "@/components/experience/choreography/ServicesChoreography";
import { getServiceTimelineRange } from "@/components/experience/services/ResolveServicesTimeline";
import { SERVICES_INTERNAL_START } from "@/components/experience/services/ServicesTimelineConfig";

const primaryLinks = [
    { label: "Home", href: "/#hero", index: "01" },
    { label: "About", href: "/#about", index: "02" },
    { label: "Services", href: "/#services", index: "03" },
    { label: "Work", href: "/work", index: "04" },
    { label: "Contact", href: "/#contact", index: "05" },
] as const;

const serviceLinks = ["Core", "Identity", "Digital", "Promotion", "Edge"] as const;
type ServiceLink = (typeof serviceLinks)[number];

export function SiteHeader() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        let frame: number | null = null;
        const update = () => {
            frame = null;
            setScrolled(window.scrollY > 18);
        };
        const onScroll = () => {
            if (frame === null) frame = window.requestAnimationFrame(update);
        };
        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (frame !== null) window.cancelAnimationFrame(frame);
        };
    }, []);

    const navigateToScene = (
        event: MouseEvent<HTMLAnchorElement>,
        sceneId: "hero" | "about" | "services" | "work" | "contact",
    ) => {
        setOpen(false);

        if (pathname !== "/") return;

        const destination = document.getElementById(sceneId);
        if (!destination) return;

        event.preventDefault();
        const top = destination.offsetTop;
        window.history.replaceState(null, "", sceneId === "hero" ? "/" : `/#${sceneId}`);
        window.scrollTo({ top, behavior: "smooth" });
    };

    const navigateToService = (
        event: MouseEvent<HTMLAnchorElement>,
        service: ServiceLink,
    ) => {
        setOpen(false);
        if (pathname !== "/") return;

        const destination = document.getElementById("services");
        const range = getServiceTimelineRange(service.toLowerCase());
        if (!destination || !range) return;

        event.preventDefault();
        const internalProgress = range.start + (range.end - range.start) * 0.2;
        const phaseProgress = SERVICES_INTERNAL_START + internalProgress * (1 - SERVICES_INTERNAL_START);
        const sceneProgress = servicesChoreography.traverse.start +
            phaseProgress * (servicesChoreography.traverse.end - servicesChoreography.traverse.start);
        const top = destination.offsetTop - window.innerHeight +
            sceneProgress * (destination.offsetHeight + window.innerHeight);

        window.history.replaceState(null, "", `/#service-${service.toLowerCase()}`);
        window.scrollTo({ top, behavior: "smooth" });
    };

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    useEffect(() => {
        const main = document.querySelector("main");
        if (!(main instanceof HTMLElement)) return;
        main.inert = open;
        return () => {
            main.inert = false;
        };
    }, [open]);

    return (
        <>
            <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-5 md:pt-5">
                <div
                    className={`pointer-events-auto relative mx-auto flex h-16 w-full items-center justify-between rounded-[1.35rem] px-5 transition-all duration-700 md:h-[4.5rem] md:rounded-[1.6rem] md:px-7 ${scrolled || open ? "bg-white/48 shadow-[0_16px_55px_rgba(1,54,46,0.08)] backdrop-blur-xl" : "bg-transparent"}`}
                >
                    <Link href="/#hero" onClick={(event) => navigateToScene(event, "hero")} className="relative z-10 flex items-center gap-3 text-primary" aria-label="AKORD home">
                        <span className="block h-[1.7rem] w-[6.8rem] bg-primary md:h-[1.95rem] md:w-[7.8rem]" style={{ WebkitMask: "url('/brand/akord-wordmark.svg') center / contain no-repeat", mask: "url('/brand/akord-wordmark.svg') center / contain no-repeat" }} />
                    </Link>

                    <div className="relative z-10 flex items-center gap-4">
                        <span className="hidden font-body text-[8px] font-medium uppercase tracking-[0.27em] text-primary/45 sm:block">{open ? "Close navigation" : "Explore"}</span>
                        <button
                            type="button"
                            onClick={() => setOpen((value) => !value)}
                            className="group flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white/25 text-primary transition-colors duration-500 hover:bg-primary hover:text-white md:h-11 md:w-11"
                            aria-expanded={open}
                            aria-controls="site-navigation"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            <span className="relative block h-3.5 w-4.5">
                                <span className={`absolute left-0 top-[2px] h-px bg-current transition-all duration-500 ${open ? "w-[18px] translate-y-[4.5px] rotate-45" : "w-[18px]"}`} />
                                <span className={`absolute right-0 top-[7px] h-px bg-current transition-all duration-400 ${open ? "w-0 opacity-0" : "w-[12px]"}`} />
                                <span className={`absolute bottom-0 left-0 h-px bg-current transition-all duration-500 ${open ? "w-[18px] -translate-y-[4.5px] -rotate-45" : "w-[15px]"}`} />
                            </span>
                        </button>
                    </div>
                </div>
            </header>

            <div
                id="site-navigation"
                role="dialog"
                aria-modal="true"
                className={`fixed inset-0 z-[49] overflow-x-hidden overflow-y-auto overscroll-contain bg-[#EDECE7] text-primary transition-[clip-path,visibility] duration-[1000ms] ease-[cubic-bezier(.22,.75,.18,1)] ${open ? "visible" : "invisible"}`}
                style={{ clipPath: open ? "circle(150vmax at calc(100% - 3.5rem) 3.5rem)" : "circle(0 at calc(100% - 3.5rem) 3.5rem)" }}
                aria-hidden={!open}
            >
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(187,152,125,.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,.8),transparent_52%)]" />
                <div className="pointer-events-none absolute bottom-[-32vw] right-[-16vw] h-[70vw] w-[70vw] rounded-full border border-primary/10" />
                <div className="pointer-events-none absolute bottom-[-20vw] right-[-4vw] h-[48vw] w-[48vw] rounded-full border border-secondary/25" />

                <nav className="relative mx-auto grid min-h-svh w-[min(88vw,1320px)] items-center gap-14 pb-12 pt-28 md:grid-cols-[1.25fr_0.75fr] md:pt-32" aria-label="Primary navigation">
                    <div className="space-y-1 md:space-y-0">
                        {primaryLinks.map((item, index) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                onClick={(event) => {
                                    if (item.label === "Home") navigateToScene(event, "hero");
                                    else if (item.label === "About") navigateToScene(event, "about");
                                    else if (item.label === "Services") navigateToScene(event, "services");
                                    else if (item.label === "Contact") navigateToScene(event, "contact");
                                    else setOpen(false);
                                }}
                                tabIndex={open ? 0 : -1}
                                className="group flex w-fit items-baseline gap-5 py-1 font-heading text-[clamp(2.8rem,6vw,6.5rem)] font-normal leading-[0.86] tracking-[-0.055em] transition-colors duration-500 hover:text-secondary"
                                style={{ opacity: open ? 1 : 0, transform: `translate3d(${open ? 0 : -36}px,0,0)`, transitionDelay: open ? `${220 + index * 70}ms` : "0ms" }}
                            >
                                <span className="font-body text-[8px] tracking-[0.22em] text-primary/38 md:text-[10px]">{item.index}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="border-l border-primary/15 pl-7 md:pl-12" style={{ opacity: open ? 1 : 0, transform: `translate3d(0,${open ? 0 : 24}px,0)`, transition: "opacity 700ms 520ms, transform 700ms 520ms" }}>
                        <div className="mb-7 font-body text-[9px] uppercase tracking-[0.27em] text-primary/40">The five disciplines</div>
                        <div className="space-y-4">
                            {serviceLinks.map((service, index) => (
                                <Link key={service} href={`/#service-${service.toLowerCase()}`} onClick={(event) => navigateToService(event, service)} tabIndex={open ? 0 : -1} className="flex items-center gap-4 font-body text-sm uppercase tracking-[0.18em] text-primary/65 transition-colors hover:text-secondary"><span className="text-[8px] text-secondary">0{index + 1}</span><span>{service}</span></Link>
                            ))}
                        </div>
                        <Link href="/#contact" onClick={(event) => navigateToScene(event, "contact")} tabIndex={open ? 0 : -1} className="group mt-12 flex w-fit items-center gap-5 rounded-full bg-primary px-7 py-4 font-body text-[9px] uppercase tracking-[0.23em] text-white transition-colors hover:bg-secondary"><span>Start a conversation</span><span className="transition-transform duration-500 group-hover:translate-x-1">↗</span></Link>
                    </div>

                    <div className="flex items-center justify-between border-t border-primary/12 pt-6 font-body text-[8px] uppercase tracking-[0.22em] text-primary/35 md:col-span-2">
                        <span>Strategy · Identity · Digital · Growth</span>
                        <div className="flex gap-6"><Link href="/privacy" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Privacy</Link><Link href="/terms" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Terms</Link></div>
                    </div>
                </nav>
            </div>
        </>
    );
}
