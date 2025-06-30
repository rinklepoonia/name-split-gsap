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
    const rockingHandRef = useRef(null);

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
        }).to(".flower",
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

        tl.to(devSplit.chars,
            {
                y: "320px",
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
        dragging.current = true;
        const heroRect = e.currentTarget.getBoundingClientRect();
        const dragBigFlower = bigFlowerRef.current;
        const relativeX = e.clientX - heroRect.left;
        const relativeY = e.clientY - heroRect.top;
        const randomImage = FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)];
        currentDragImage.current = randomImage;
        dragBigFlower.src = randomImage;
        gsap.set(dragBigFlower, {
            left: relativeX - 45,
            top: relativeY - 45,
            opacity: 1,
        });
        dragStart.current = { x: relativeX, y: relativeY };
        document.body.style.cursor = 'url("/assets/images/svg/dragCursor.svg"), auto';
    };

    const handlePointerMove = (e) => {
        if (!dragging.current) return;
        const heroRect = e.currentTarget.getBoundingClientRect();
        const dragLine = lineRef.current;
        const currentRelativeX = e.clientX - heroRect.left;
        const currentRelativeY = e.clientY - heroRect.top;
        const startX = dragStart.current.x;
        const startY = dragStart.current.y;
        const dx = currentRelativeX - startX;
        const dy = currentRelativeY - startY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        document.body.style.cursor = 'url("/assets/images/svg/hand-blue-ellipse.svg"), auto';
        gsap.set(dragLine, {
            left: startX,
            top: startY,
            width: dist,
            opacity: 1,
            rotate: angle,
            transformOrigin: "0 50%",
        });

        const dragBigFlower = bigFlowerRef.current;
        gsap.set(dragBigFlower, {
            scale: 1 + dist / 600,
        });
    }

    const handlePointerUp = (e) => {
        dragging.current = false;
        const dragBigFlower = bigFlowerRef.current;
        const rockingHand = rockingHandRef.current;
        document.body.style.cursor = 'none';
        gsap.set(rockingHand, {
            left: e.clientX,
            top: e.clientY,
            opacity: 1,
            ease: "bounce.out",
        });

        setTimeout(() => {
            gsap.set(rockingHand, {
                opacity: 0,
            });
            document.body.style.cursor = 'url("/assets/images/svg/dragCursor.svg"), auto';
        }, 500);


        gsap.set(dragBigFlower, {
            opacity: 0,
            rotate: gsap.utils.random(-180, 180),
        });
        const dragLine = lineRef.current
        gsap.set(dragLine, {
            opacity: 0,
        })

        const burstFlowers = Array.from({ length: 15 }).map((_, i) => {
            const burstFlower = document.createElement('img');
            burstFlower.src = FLOWER_IMAGES[Math.floor(Math.random() * FLOWER_IMAGES.length)];
            burstFlower.className = 'burst-flower absolute pointer-events-none z-30';
            burstFlower.style.cssText = `
                width: ${Math.floor(Math.random() * 30 + 20)}px;
                height: ${Math.floor(Math.random() * 30 + 20)}px;
                object-fit: contain;
                position: absolute;
                left: ${dragStart.current.x}px;
                top: ${dragStart.current.y}px;
                opacity: 0;
                transform: scale(0.5);
            `;

            document.getElementById('hero').appendChild(burstFlower);

            gsap.fromTo(burstFlower,
                {
                    opacity: 0,
                    scale: 0.5,
                    x: 0,
                    y: 0,
                },
                {
                    opacity: () => gsap.utils.random(0.6, 1),
                    scale: () => gsap.utils.random(0.4, 1.2),
                    x: () => gsap.utils.random(-window.innerWidth / 4, window.innerWidth / 4),
                    y: () => gsap.utils.random(-window.innerHeight / 4, window.innerHeight / 4),
                    scale: 1.5,
                    onComplete: () => {
                        gsap.to(burstFlower, {
                            y: "+=2000",
                            onComplete: () => {
                                if (burstFlower.parentNode) {
                                    burstFlower.remove();
                                }
                            }
                        });
                    }
                });
            return burstFlower;
        });
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
            {/* <p className="text-base  text-white mt-80 max-w-[300px] text-center">You heard us right. GSAP is now 100% free for all users, thanks to Webflow's support.</p> */}
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

            {/* Rocking hand image */}
            <img
                ref={rockingHandRef}
                src="/assets/images/svg/rocking-hand.svg"
                alt="rocking-hand"
                className="pointer-events-none absolute z-60 rocking-hand-shake"
                style={{
                    width: "30px",
                    height: "30px",
                    opacity: 0,
                    objectFit: "contain",
                    position: "absolute",
                    left: "0px",
                    top: "0px",
                }}
            />
        </div>
    );
};

export default Practice;
