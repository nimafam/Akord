"use client";

import {
    SceneSection,
    SceneWorldContent,
    WorldAnchor,
    sceneSpatialMap,
} from "@/components/experience";

import {
    HeroContent,
} from "./HeroContent";

export function Hero() {
    return (
        <SceneSection
            id="hero"
            name="Hero"
            order={1}
            className="
                relative
                min-h-svh
                overflow-hidden
                border-0
                bg-transparent
            "
        >
            <WorldAnchor
                position={
                    sceneSpatialMap.hero.contentAnchor
                }
                align="left"
                depthScale
                referenceDistance={6}
                minScale={0.72}
                maxScale={1.15}
                className="
                    z-10
                    w-[min(720px,calc(100vw-3rem))]
                "
            >
                <SceneWorldContent
                    fromSceneId="hero"
                    toSceneId="services"
                    mode="from"
                >
                    <HeroContent />
                </SceneWorldContent>
            </WorldAnchor>
        </SceneSection>
    );
}