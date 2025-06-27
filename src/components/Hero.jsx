"use client"
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React, { useEffect, useLayoutEffect, useState } from 'react'
const FLOWER_IMAGES = [
    "/assets/images/png/img-one.png",
    "/assets/images/png/img-4.png",
    "/assets/images/png/img-5.png",
    "/assets/images/png/img-6.png",
    "/assets/images/webp/img-7.webp",
    "/assets/images/png/img-one.png",
    "/assets/images/png/img-4.png",
    "/assets/images/png/img-5.png",
    "/assets/images/png/img-6.png",
    "/assets/images/webp/img-7.webp",
];

const NUM_FLOWERS = 20;

const Hero = () => {
    const [flowers, setFlowers] = useState([]);
    useEffect(() => {
        const generated = Array.from({ length: NUM_FLOWERS }).map((_, i) => ({
            src: FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)],
            size: Math.floor(Math.random() * 40 + 30), 
            key: `flower-${i}`,
        }));
        setFlowers(generated);
    }, []);
    useLayoutEffect(() => {

        if (flowers.length === 0) return;

        const headingSplit = SplitText.create("#text", {
            type: "chars, words,lines",
        });
        const devSplit = SplitText.create("#developerText", {
            type: "chars, words, lines",
        });
        const tl = gsap.timeline();


        tl.to(".flower", {
            opacity: () => gsap.utils.random(0.6, 1),
            scale: () => gsap.utils.random(0.4, 1.2),
            x: () => gsap.utils.random(-window.innerWidth / 2, window.innerWidth / 2),
            y: () => gsap.utils.random(-window.innerHeight / 2, window.innerHeight / 2),
            rotate: () => gsap.utils.random(-360, 360),
            duration: 0.3,
        }).to(".flower", {
            opacity: 0,
            scale: 0.2,
            y: "+=200",
        }, "+=0.1");


        tl.to(headingSplit.chars, {
            y: 400,
            opacity: 0,
            x: () => gsap.utils.random(-10, 10),
            rotation: () => gsap.utils.random(-50, 50),
            autoAlpha: 0,
            stagger: {
                each: 0.03,
                from: "edges",
            },
            duration: 0.5,
            onComplete: () => {
                gsap.set("#text", { display: "none" });
            },
        }); "<"
        tl.fromTo(devSplit.chars,
            {
                autoAlpha: 0,
                opacity: 0,
                x: () => gsap.utils.random(-10, 10),
            },
            {
                y: "320px",
                autoAlpha: 1,
                opacity: 1,
                stagger: {
                    each: 0.09,
                    from: "random",
                },
            },
        );
        return () => {
            headingSplit.revert();
            devSplit.revert();

        };
    }, [flowers]);
    return (
        <div id='hero' className='min-h-screen flex flex-col items-center bg-black py-30 relative' >
            <p id='text' className='text-[150px] font-semibold text-blue-300'>Pricing</p>
            <p id='developerText' className='text-[150px] font-semibold text-blue-300 absolute top-[-19%]'>Free</p>
            {flowers.map(({ src, size, key }) => (
                <img
                    key={key}
                    src={src}
                    alt={key}
                    className="flower absolute pointer-events-none z-0 top-[320px]"
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        objectFit: "contain",
                    }}
                />
            ))}
        </div>
    )
}

export default Hero