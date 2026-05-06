import React, { useEffect, useRef, useState } from 'react';
import { useGameStore } from '../../store/gameStore';

// Procedural Types
interface Point {
    x: number;
    y: number;
}
interface Entity {
    id: string;
    type: 'EXIT' | 'BOOK' | 'CANDLE' | 'PHANTOM';
    pos: Point;
    active: boolean;
}

const TILE_SIZE = 40;

export default function LibraryCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { oil, advanceRoom, consumeOil, addSecret, reduceSanity } = useGameStore();

    // Game state ref to avoid closure staleness in render loop
    const gameState = useRef({
        player: { x: 5, y: 5 },
        target: { x: 5, y: 5 },
        entities: [] as Entity[],
        gridWidth: 15,
        gridHeight: 20
    });

    // Simple procedural gen
    useEffect(() => {
        const ents: Entity[] = [];
        // Add Exit
        ents.push({ id: 'exit1', type: 'EXIT', pos: { x: 12, y: 1 }, active: true });
        // Add random books
        for(let i=0; i<3; i++) {
            ents.push({ 
                id: `bk_${i}`, type: 'BOOK', 
                pos: { x: Math.floor(Math.random()*10)+2, y: Math.floor(Math.random()*15)+2 }, 
                active: true 
            });
        }
        // Add candle
        ents.push({ id: 'oil1', type: 'CANDLE', pos: { x: Math.floor(Math.random()*10)+2, y: Math.floor(Math.random()*15)+2 }, active: true });
        // Add Phantom
        ents.push({ id: 'phant1', type: 'PHANTOM', pos: { x: 8, y: 8 }, active: true });
        
        gameState.current.entities = ents;
        gameState.current.player = { x: 5, y: 18 };
        gameState.current.target = { x: 5, y: 18 };
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let frameId: number;
        let lastTime = performance.now();

        const render = (time: number) => {
            const dt = time - lastTime;
            lastTime = time;

            // Resize handling
            const { width, height } = canvas.getBoundingClientRect();
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            // Update Logic
            const state = gameState.current;
            const px = state.player.x * TILE_SIZE;
            const py = state.player.y * TILE_SIZE;
            const tx = state.target.x * TILE_SIZE;
            const ty = state.target.y * TILE_SIZE;

            // Simple movement
            const speed = 0.05 * dt;
            const dx = tx - px;
            const dy = ty - py;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if (dist > speed) {
                state.player.x += (dx / dist) * (speed / TILE_SIZE);
                state.player.y += (dy / dist) * (speed / TILE_SIZE);
            } else {
                state.player.x = state.target.x;
                state.player.y = state.target.y;
            }

            // Phantom Movement (chase player slowly)
            state.entities.forEach(ent => {
                if(ent.type === 'PHANTOM' && ent.active) {
                    const pdx = state.player.x - ent.pos.x;
                    const pdy = state.player.y - ent.pos.y;
                    const pdist = Math.sqrt(pdx*pdx + pdy*pdy);
                    if(pdist < 5) {
                        ent.pos.x += (pdx/pdist) * 0.01 * (dt/16);
                        ent.pos.y += (pdy/pdist) * 0.01 * (dt/16);
                    }
                    if(pdist < 1) {
                         reduceSanity(0.5);
                    }
                }
            });

            // Draw Background (Wood floor / noise)
            ctx.fillStyle = '#0a0505';
            ctx.fillRect(0, 0, width, height);

            // Offset to center player
            const offsetX = width/2 - state.player.x * TILE_SIZE;
            const offsetY = height/2 - state.player.y * TILE_SIZE;

            ctx.save();
            ctx.translate(offsetX, offsetY);

            // Grid / Walls simulation (just floor tiles for now)
            ctx.strokeStyle = '#1a100c';
            ctx.lineWidth = 1;
            for(let x=0; x<state.gridWidth; x++) {
                for(let y=0; y<state.gridHeight; y++) {
                    ctx.strokeRect(x * TILE_SIZE, y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
                }
            }

            // Draw entities
            state.entities.forEach(ent => {
                if(!ent.active) return;
                const ex = ent.pos.x * TILE_SIZE;
                const ey = ent.pos.y * TILE_SIZE;
                
                ctx.beginPath();
                if(ent.type === 'EXIT') {
                    ctx.fillStyle = '#008b8b';
                    ctx.fillRect(ex, ey, TILE_SIZE, TILE_SIZE);
                } else if(ent.type === 'BOOK') {
                    ctx.fillStyle = '#e5cdab';
                    ctx.fillRect(ex + 10, ey + 10, 20, 20);
                } else if(ent.type === 'CANDLE') {
                    ctx.fillStyle = '#ffaa00';
                    ctx.arc(ex + 20, ey + 20, 8, 0, Math.PI * 2);
                    ctx.fill();
                } else if(ent.type === 'PHANTOM') {
                    ctx.fillStyle = 'rgba(139, 0, 0, 0.6)';
                    ctx.arc(ex + 20, ey + 20, 15, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Draw Player
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(state.player.x * TILE_SIZE + 20, state.player.y * TILE_SIZE + 20, 10, 0, Math.PI*2);
            ctx.fill();

            ctx.restore();

            // Lighting (Fog of war)
            // The canvas darkens everywhere except near the player. Radius depends on oil.
            const lightRadius = Math.max(30, (useGameStore.getState().oil / 100) * 200 + 40);
            
            ctx.globalCompositeOperation = 'source-over';
            
            // Create a gradient mask
            const gradient = ctx.createRadialGradient(
                width/2, height/2, 10,
                width/2, height/2, lightRadius
            );
            gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // fully transparent center
            gradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.6)');
            gradient.addColorStop(1, 'rgba(3, 2, 5, 1)'); // completely dark edges

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
            
            frameId = requestAnimationFrame(render);
        };

        frameId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(frameId);
    }, [reduceSanity]);

    const handleTap = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();
        let clientX, clientY;
        
        if ('touches' in e) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
        } else {
            clientX = e.clientX;
            clientY = e.clientY;
        }

        const x = clientX - rect.left;
        const y = clientY - rect.top;

        const state = gameState.current;
        // Inverse calculate grid tap pos relative to player center
        const tapGridX = state.player.x + (x - canvas.width/2)/TILE_SIZE;
        const tapGridY = state.player.y + (y - canvas.height/2)/TILE_SIZE;

        state.target = { x: tapGridX, y: tapGridY };
        consumeOil(0.5); // Moving costs a tiny bit of oil

        // Check Interactions
        checkInteractions();
    };

    const checkInteractions = () => {
        const state = gameState.current;
        state.entities.forEach(ent => {
            if(!ent.active) return;
            const dx = state.target.x - ent.pos.x;
            const dy = state.target.y - ent.pos.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            if(dist < 1.5) {
                if(ent.type === 'EXIT') {
                    advanceRoom();
                    resetRoomPosition();
                } else if (ent.type === 'BOOK') {
                    ent.active = false;
                    addSecret('book_' + Date.now());
                } else if (ent.type === 'CANDLE') {
                    ent.active = false;
                    useGameStore.getState().refillOil(30);
                }
            }
        });
    }

    const resetRoomPosition = () => {
         const state = gameState.current;
         state.player = { x: 5, y: 18 };
         state.target = { x: 5, y: 18 };
         // In a full game we would regenerate entities here
    }

    return (
        <canvas 
            ref={canvasRef}
            onMouseDown={handleTap}
            onTouchStart={handleTap}
            className="w-full h-full block cursor-crosshair touch-none"
        />
    );
}
