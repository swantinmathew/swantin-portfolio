export function DotGrid({
  className = "",
  width = 280,
  height = 220,
  color = "#1E8E5A",
  opacity = 0.35,
}) {
  const patternId = `dot-pat-${color.replace("#", "")}-${width}x${height}`;
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <pattern
          id={patternId}
          x="0"
          y="0"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="3" r="2" fill={color} fillOpacity={opacity} />
        </pattern>
      </defs>
      <rect width={width} height={height} fill={`url(#${patternId})`} />
    </svg>
  );
}

export function WireframeTriangle({
  className = "",
  size = 200,
  color = "#E8836B",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <polygon
        points="50,10 92,86 8,86"
        stroke={color}
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.65"
      />
      <polygon
        points="50,24 82,80 18,80"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.35"
      />
      <circle cx="50" cy="10" r="3" fill={color} />
      <circle cx="92" cy="86" r="3" fill={color} />
      <circle cx="8" cy="86" r="3" fill={color} />
    </svg>
  );
}

export function GeometricRing({
  className = "",
  size = 220,
  color = "#1E8E5A",
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={color}
        strokeWidth="1"
        strokeDasharray="4 4"
        opacity="0.45"
      />
      <circle
        cx="50"
        cy="50"
        r="34"
        stroke={color}
        strokeWidth="1.5"
        opacity="0.25"
      />
      <circle cx="50" cy="6" r="3" fill={color} opacity="0.8" />
      <circle cx="50" cy="94" r="3" fill={color} opacity="0.8" />
    </svg>
  );
}

