import { useEffect, useMemo, useState } from "react";

const NODE_COUNT = 28;

export default function AIOrb() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setReducedMotion(mediaQuery.matches);

    updateMotionPreference();
    mediaQuery.addEventListener?.("change", updateMotionPreference);

    if (reducedMotion) return () => mediaQuery.removeEventListener?.("change", updateMotionPreference);

    let rafId;
    let start = performance.now();

    const tick = (now) => {
      setTime((now - start) * 0.001);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      mediaQuery.removeEventListener?.("change", updateMotionPreference);
    };
  }, [reducedMotion]);

  const nodes = useMemo(() =>
    Array.from({ length: NODE_COUNT }, (_, index) => {
      const angle = (index / NODE_COUNT) * Math.PI * 2;
      const orbit = 126 + (index % 6) * 16 + Math.sin(index * 1.7) * 12;
      const size = 3 + (index % 5) * 1.4;
      const speed = 0.26 + (index % 7) * 0.08;
      const drift = index * 0.7;

      return { angle, orbit, size, speed, drift };
    }),
  []);

  const positions = nodes.map((node) => {
    const driftPhase = node.angle + time * (node.speed * 0.9) + node.drift;
    const x = Math.cos(driftPhase) * node.orbit;
    const y = Math.sin(driftPhase * 1.25 + node.drift) * (node.orbit * 0.7);

    return { ...node, x, y };
  });

  const connections = [];
  for (let i = 0; i < positions.length; i += 1) {
    for (let j = i + 1; j < positions.length; j += 1) {
      const dx = positions[i].x - positions[j].x;
      const dy = positions[i].y - positions[j].y;
      const distance = Math.hypot(dx, dy);

      if (distance < 98) {
        connections.push({
          a: i,
          b: j,
          distance,
          opacity: Math.max(0.12, 1 - distance / 98),
        });
      }
    }
  }

  const limitedConnections = connections.slice(0, 32);

  return (
    <button
      type="button"
      className={`ai-orb-shell ${isActive ? "is-active" : ""}`}
      aria-label="AI neural core"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      onClick={() => setIsActive((value) => !value)}
    >
      <div className="ai-orb" aria-hidden="true">
        <div className="orb-halo" />
        <div className="orb-rings">
          <span className="ring ring-a" />
          <span className="ring ring-b" />
          <span className="ring ring-c" />
          <span className="ring ring-d" />
        </div>

        <svg className="orb-network" viewBox="-180 -180 360 360" preserveAspectRatio="xMidYMid meet">
          {limitedConnections.map((connection) => {
            const start = positions[connection.a];
            const end = positions[connection.b];

            return (
              <line
                key={`${connection.a}-${connection.b}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="rgba(104, 196, 255, 0.9)"
                strokeOpacity={connection.opacity}
                strokeWidth={1.3}
              />
            );
          })}
        </svg>

        <div className="orb-core">
          <span className="orb-core__pulse" />
          <span className="orb-core__inner" />
        </div>

        {positions.map((node, index) => (
          <span
            key={`${node.angle}-${index}`}
            className="orb-node"
            style={{
              left: `calc(50% + ${node.x}px)`,
              top: `calc(50% + ${node.y}px)`,
              width: `${node.size}px`,
              height: `${node.size}px`,
              opacity: 0.55 + (index % 6) * 0.08,
              animationDelay: `${(index % 8) * 0.3}s`,
            }}
          />
        ))}
      </div>
    </button>
  );
}
