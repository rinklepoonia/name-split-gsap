"use client"
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import React, { useLayoutEffect } from 'react'

const Hero = () => {

    useLayoutEffect(() => {
        const headingSplit = SplitText.create("#text", {
            type: "chars, words,lines",
        });

        gsap.fromTo(headingSplit.chars, {
            y: 0,
        }, {
            y: 300,
            x: () => gsap.utils.random(-10, 10),
            rotation: () => gsap.utils.random(90, -90),
            autoAlpha: 0,
            stagger: {
                each: 0.09,
                from: "edges",
            },

            repeat: -1,
        });


        return () => {
            headingSplit.revert();

        };
    }, []);
    return (
        <div id='hero' className='min-h-screen flex justify-center items-center bg-black' >
            <p id='text' className='text-[150px] text-[#fffce1]'>Rinkle</p>
        </div>
    )
}

export default Hero