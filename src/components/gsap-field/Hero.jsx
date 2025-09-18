"use client" 
import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";

const Hero = () => {
    useEffect(() => {
        const tl = gsap.timeline();
        tl.fromTo(
            "#logoOverlay",
            { clipPath: "inset(0 100% 0 0)" },
            { clipPath: "inset(0 0% 0 0)", duration: 1, ease: "power2.out" }
        );
        tl.to("#logoOverlay", {
            top: "2rem",
            duration: 1,
            ease: "power2.out",
        });
        tl.to(
            ["#logoOverlay", "#fadeLogo"],
            {
                top: "2rem",
                duration: 1,
                ease: "power2.out",
            },
            "<" 
        );
        tl.to(".hero-container", {
            onComplete: () => {
                document.querySelector(".hero-container")?.classList.remove("bg-black");
                document.querySelector(".hero-container")?.classList.add("bg-hero-gsap-field", "bg-full");
            },
        });
    }, []);
 

    return (
            <div className="hero-container  bg-black min-h-screen flex relative">
                <Image id="fadeLogo"
                    className="opacity-10 absolute top-1/2 left-8"
                    width={300}
                    height={310}
                    src="/assets/images/svg/gsap-field-logo.svg"
                    alt="gsap-field-logo"
                />
                <Image
                    id="logoOverlay"
                    className="opacity-100 absolute top-1/2 left-8"
                    width={300}
                    height={310}
                    src="/assets/images/svg/gsap-field-logo.svg"
                    alt="gsap-field-logo-overlay"
                />
            </div> 
    );
};

export default Hero;
