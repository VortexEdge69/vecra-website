"use client";
import { useEffect, useState } from "react";

interface Particle {
    id: number;
    x: number;
    y: number;
    size: number;
    color: string;
    speed: number;
}

export default function MinecraftParticles() {
    const [particles, setParticles] = useState<Particle[]>([]);

    useEffect(() => {
        const particleCount = 30;
        const newParticles = Array.from({ length: particleCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 8 + 8,
            color: ["#0076fe", "#fff", "#1e293b", "#38bdf8"][Math.floor(Math.random() * 4)],
            speed: Math.random() * 2 + 1,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute animate-pulse"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        backgroundColor: particle.color,
                        animation: `float ${particle.speed}s infinite ease-in-out`,
                    }}
                />
            ))}
        </div>
    );
}