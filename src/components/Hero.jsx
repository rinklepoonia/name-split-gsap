"use client"
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React, { useLayoutEffect } from 'react'

const Hero = () => {

    useLayoutEffect(() => {
        const headingSplit = SplitText.create("#text", {
            type: "chars, words,lines",
        });
        const devSplit = SplitText.create("#developerText", {
            type: "chars, words, lines",
        });
        const tl = gsap.timeline();
        tl.to(headingSplit.chars, {
            y: 300,
            opacity: 0,
            x: () => gsap.utils.random(-10, 10),
            rotation: () => gsap.utils.random(-50, 50),
            autoAlpha: 0,
            stagger: {
                each: 0.04,
                from: "edges",
            },
            duration: 0.7,
            onComplete: () => {
                gsap.set("#text", { display: "none" });
            },
        });"<"
        tl.fromTo(devSplit.chars ,
            {
                y: "-200%",
                autoAlpha: 0,
                opacity: 0,
                x: () => gsap.utils.random(-10, 10),
            },
            {
                y: 5,
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
    }, []);
    return (
        <div id='hero' className='min-h-screen flex flex-col items-center bg-black py-30 relative' >
            <p id='text' className='text-[150px] font-semibold text-blue-300'>Pricing</p>
            <p id='developerText' className='text-[150px] font-semibold text-blue-300 absolute top-[120px]'>Free</p>
        </div>
    )
}

export default Hero