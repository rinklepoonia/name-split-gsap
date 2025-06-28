"use client";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

const FLOWER_IMAGES = [
    "/assets/images/webp/img-1.webp",
    "/assets/images/webp/img-2.webp",
    "/assets/images/webp/img-3.webp",
    "/assets/images/webp/img-4.webp",
    "/assets/images/webp/img-5.webp",
    "/assets/images/webp/img-6.webp",
    "/assets/images/webp/img-7.webp",
];

const NUM_FLOWERS = 20;

const Practice = () => {
    const [flowers, setFlowers] = useState([]);
    const bigFlowerRef = useRef(null);
    const lineRef = useRef(null);
    const dragging = useRef(false);

    const dragStart = useRef({ x: 0, y: 0 });

    const currentDragImage = useRef(null);

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
            type: "chars, words, lines",
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
        }).to(
            ".flower",
            {
                opacity: 0,
                scale: 0.2,
                y: "+=200",
            },
            "+=0.1"
        );

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
        });

        tl.fromTo(
            devSplit.chars,
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
            }
        );

        return () => {
            headingSplit.revert();
            devSplit.revert();
        };
    }, [flowers]);

    // 🌼 DRAG INTERACTIONS
    const handlePointerDown = (e) => {
        const heroRect = e.currentTarget.getBoundingClientRect();
        const dragBigFlower = bigFlowerRef.current;
        const relativeX = e.clientX - heroRect.left;
        const relativeY = e.clientY - heroRect.top;
        gsap.set(dragBigFlower, {
            left: relativeX - 45,
            top: relativeY - 45,
            opacity: 1,
        });
        dragStart.current = { x: relativeX, y: relativeY };
    };

    const handlePointerMove = (e) => {
        if (!dragging.current) return;
        const heroRect = e.currentTarget.getBoundingClientRect();
        const currentRelativeX = e.clientX - heroRect.left;
        const currentRelativeY = e.clientY - heroRect.top;
        const startX = dragStart.current.x;
        const startY = dragStart.current.y;
        const dx = currentRelativeX - startX;
        const dy = currentRelativeY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        gsap.set(dragLine, {
            width: dist,
            opacity: 1,
            rotate: angle,
        })
    }

    const handlePointerUp = (e) => {
        const dragBigFlower = bigFlowerRef.current;
        gsap.set(dragBigFlower, {
            opacity: 0,
        });
        const dragLine = lineRef.current
        gsap.set(dragLine, {
            opacity: 0,
        })
    }



    return (
        <div
            id="hero"
            className="min-h-screen flex flex-col items-center bg-black py-30 relative overflow-hidden"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}

        >
            <p id="text" className="text-[150px] font-semibold text-blue-300">Pricing</p>
            <p id="developerText" className="text-[150px] font-semibold text-blue-300 absolute top-[-19%]">Free</p>

            {/* Flowers */}
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

            {/* Big drag flower */}
            <img
                ref={bigFlowerRef}
                src="/assets/images/webp/img-6.webp"
                alt="big-flower"
                className="pointer-events-none absolute z-50"
                style={{
                    width: "90px",
                    height: "90px",
                    opacity: 0,
                    objectFit: "contain",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                }}
            />

            {/* Dotted line */}
            <div
                ref={lineRef}
                className="pointer-events-none absolute z-40"
                style={{
                    width: "0px",
                    height: "2px",
                    backgroundImage: "linear-gradient(to right, white 50%, transparent 50%)",
                    backgroundSize: "10px 2px",
                    backgroundRepeat: "repeat-x",
                    opacity: 0,
                }}
            />
        </div>
    );
};

export default Practice;
