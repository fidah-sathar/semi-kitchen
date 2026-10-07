import { useRef, useState } from "react";
import "./App.css";

const customers = [
  {
    name: "Mia",
    initial: "M",
    request: "Make it special",
    shape: "Round",
    tiers: "2 tiers",
    flavour: "Vanilla",
    frosting: "Vanilla",
    piping: "Shell",
    drip: "None",
    decoration: "Rose",
    topper: "Happy Birthday",
  },
  {
    name: "Ayla",
    initial: "A",
    request: "Something pretty",
    shape: "Round",
    tiers: "1 tier",
    flavour: "Strawberry",
    frosting: "Strawberry",
    piping: "Ruffle",
    drip: "White",
    decoration: "Pearl",
    topper: "Happy Birthday",
  },
  {
    name: "Noor",
    initial: "N",
    request: "Chocolate dream",
    shape: "Round",
    tiers: "2 tiers",
    flavour: "Chocolate",
    frosting: "Chocolate",
    piping: "Pearl",
    drip: "Chocolate",
    decoration: "Cherry",
    topper: "For You",
  },
];

const flavourColors = {
  Vanilla: "#e7c89f",
  Chocolate: "#765043",
  Strawberry: "#d98d9d",
  RedVelvet: "#a6535c",
};

const frostingColors = {
  Vanilla: "#fff8ed",
  Chocolate: "#765043",
  "Cream Cheese": "#fff5e7",
  Strawberry: "#f2b1bc",
};

const frostingStyles = [
  "Vanilla",
  "Chocolate",
  "Cream Cheese",
  "Strawberry",
];

const pipingStyles = [
  "None",
  "Shell",
  "Ruffle",
  "Pearl",
];

const dripOptions = [
  "None",
  "Chocolate",
  "White",
  "Strawberry",
];

const decorationOptions = [
  { name: "Rose", reward: 35, icon: "rose" },
  { name: "Pearl", reward: 10, icon: "pearl" },
  { name: "Bow", reward: 25, icon: "bow" },
  { name: "Cherry", reward: 20, icon: "cherry" },
  { name: "Flower", reward: 30, icon: "flower" },
  { name: "Strawberry", reward: 25, icon: "strawberry" },
];

const topperOptions = [
  "None",
  "Happy Birthday",
  "For You",
  "Best Wishes",
];

const candleOptions = [
  "None",
  "Single",
  "Three",
  "Five",
];

/* =========================================================
   COLORS
========================================================= */

function hexToRgb(hex) {
  const clean = hex.replace("#", "");

  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((value) =>
        Math.round(value)
          .toString(16)
          .padStart(2, "0")
      )
      .join("")
  );
}

function lighten(hex, amount = 0.1) {
  const { r, g, b } = hexToRgb(hex);

  return rgbToHex(
    r + (255 - r) * amount,
    g + (255 - g) * amount,
    b + (255 - b) * amount
  );
}

function darken(hex, amount = 0.1) {
  const { r, g, b } = hexToRgb(hex);

  return rgbToHex(
    r * (1 - amount),
    g * (1 - amount),
    b * (1 - amount)
  );
}

/* =========================================================
   CAKE SVG
========================================================= */

function CakeSVG({
  shape,
  tiers,
  flavour,
  frosting,
  piping,
  drip,
}) {
  const tierCount = tiers === "2 tiers" ? 2 : 1;
  const sponge =
    flavourColors[flavour] || flavourColors.Vanilla;
  const frostingColor =
    frostingColors[frosting] || frostingColors.Vanilla;

  const boardY = 416;
  const bottomHeight = 112;
  const topHeight = 102;
  const bottomY = boardY - bottomHeight;
  const topY = bottomY - topHeight + 8;

  return (
    <svg
      className="svg-cake"
      viewBox="0 0 520 520"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          id="cakeShadow"
          x="-30%"
          y="-30%"
          width="160%"
          height="180%"
        >
          <feDropShadow
            dx="0"
            dy="6"
            stdDeviation="6"
            floodColor="#80665c"
            floodOpacity="0.14"
          />
        </filter>

        <filter
          id="boardShadow"
          x="-30%"
          y="-50%"
          width="160%"
          height="200%"
        >
          <feDropShadow
            dx="0"
            dy="4"
            stdDeviation="4"
            floodColor="#80665c"
            floodOpacity="0.11"
          />
        </filter>

        <linearGradient
          id="spongeShade"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor={darken(sponge, 0.13)}
          />
          <stop offset="18%" stopColor={sponge} />
          <stop offset="75%" stopColor={sponge} />
          <stop
            offset="100%"
            stopColor={darken(sponge, 0.08)}
          />
        </linearGradient>

        <linearGradient
          id="frostingShade"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop
            offset="0%"
            stopColor={lighten(frostingColor, 0.05)}
          />
          <stop
            offset="72%"
            stopColor={frostingColor}
          />
          <stop
            offset="100%"
            stopColor={darken(frostingColor, 0.08)}
          />
        </linearGradient>

        <linearGradient
          id="dripShade"
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#8a5a4e" />
          <stop offset="100%" stopColor="#633e36" />
        </linearGradient>
      </defs>

      {/* CAKE BOARD */}
      <ellipse
        cx="260"
        cy="419"
        rx="190"
        ry="24"
        fill="#ead9ce"
        filter="url(#boardShadow)"
      />

      <ellipse
        cx="260"
        cy="413"
        rx="179"
        ry="17"
        fill="#fffaf6"
      />

      <ellipse
        cx="260"
        cy="412"
        rx="166"
        ry="9"
        fill="#f1e3da"
        opacity="0.75"
      />

      {/* TOP TIER */}
      {tierCount === 2 && (
        <CakeTier
          y={topY}
          width={224}
          height={topHeight}
          shape={shape}
          sponge={sponge}
          frosting={frostingColor}
          piping={piping}
          drip={drip}
          topTier
        />
      )}

      {/* BOTTOM TIER */}
      <CakeTier
        y={bottomY}
        width={292}
        height={bottomHeight}
        shape={shape}
        sponge={sponge}
        frosting={frostingColor}
        piping={piping}
        drip={drip}
      />

      <ellipse
        cx="260"
        cy="413"
        rx="145"
        ry="5"
        fill="#80665c"
        opacity="0.11"
      />
    </svg>
  );
}

/* =========================================================
   CAKE TIER
========================================================= */

function CakeTier({
  y,
  width,
  height,
  shape,
  sponge,
  frosting,
  piping,
  drip,
  topTier = false,
}) {
  const cx = 260;
  const left = cx - width / 2;
  const right = cx + width / 2;
  const square = shape === "Square";

  const bodyTop = y + (square ? 30 : 38);
  const bottom = y + height;
  const radius = square ? 12 : 24;

  const bodyPath = square
    ? `
      M ${left + radius} ${bodyTop}
      H ${right - radius}
      Q ${right} ${bodyTop} ${right} ${bodyTop + radius}
      V ${bottom - radius}
      Q ${right} ${bottom} ${right - radius} ${bottom}
      H ${left + radius}
      Q ${left} ${bottom} ${left} ${bottom - radius}
      V ${bodyTop + radius}
      Q ${left} ${bodyTop} ${left + radius} ${bodyTop}
      Z
    `
    : `
      M ${left} ${bodyTop}
      C ${left} ${bodyTop - 4}, ${left + 28} ${bodyTop - 7}, ${cx} ${bodyTop - 7}
      C ${right - 28} ${bodyTop - 7}, ${right} ${bodyTop - 4}, ${right} ${bodyTop}
      V ${bottom - radius}
      Q ${right} ${bottom} ${right - radius} ${bottom}
      H ${left + radius}
      Q ${left} ${bottom} ${left} ${bottom - radius}
      Z
    `;

  const topPath = square
    ? `
      M ${left + 14} ${y + 8}
      Q ${left} ${y + 8} ${left} ${y + 22}
      V ${y + 31}
      H ${right}
      V ${y + 22}
      Q ${right} ${y + 8} ${right - 14} ${y + 8}
      Z
    `
    : `
      M ${left} ${y + 22}
      C ${left + 2} ${y + 8}, ${left + 45} ${y}, ${cx} ${y}
      C ${right - 45} ${y}, ${right - 2} ${y + 8}, ${right} ${y + 22}
      C ${right - 3} ${y + 33}, ${right - 48} ${y + 39}, ${cx} ${y + 39}
      C ${left + 48} ${y + 39}, ${left + 3} ${y + 33}, ${left} ${y + 22}
      Z
    `;

  const frostingEdge = square
    ? `M ${left} ${y + 28} C ${left + 45} ${y + 32}, ${right - 45} ${y + 32}, ${right} ${y + 28}`
    : `
      M ${left + 3} ${y + 28}
      C ${left + 35} ${y + 35}, ${left + 68} ${y + 35}, ${left + 98} ${y + 30}
      C ${left + 126} ${y + 38}, ${right - 126} ${y + 38}, ${right - 98} ${y + 30}
      C ${right - 68} ${y + 35}, ${right - 35} ${y + 35}, ${right - 3} ${y + 28}
    `;

  const pipingClipId = `pipingClip-${Math.round(y)}-${Math.round(width)}`;

  return (
    <g filter="url(#cakeShadow)">
      <defs>
        <clipPath id={pipingClipId}>
          <rect
            x={left}
            y={bottom - 15}
            width={width}
            height="20"
            rx={square ? 6 : 18}
          />
        </clipPath>
      </defs>

      {/* SPONGE BODY */}
      <path d={bodyPath} fill="url(#spongeShade)" />

      {/* BAKED SIDE SHADING */}
      <path
        d={`
          M ${left + 10} ${bodyTop + 10}
          C ${left + 18} ${bodyTop + 32}, ${left + 16} ${bottom - 20}, ${left + 28} ${bottom - 10}
        `}
        fill="none"
        stroke={darken(sponge, 0.22)}
        strokeWidth="9"
        opacity="0.16"
        strokeLinecap="round"
      />

      <path
        d={`
          M ${right - 12} ${bodyTop + 12}
          C ${right - 20} ${bodyTop + 35}, ${right - 18} ${bottom - 20}, ${right - 28} ${bottom - 11}
        `}
        fill="none"
        stroke={lighten(sponge, 0.16)}
        strokeWidth="8"
        opacity="0.12"
        strokeLinecap="round"
      />

      {/* TOP FROSTING */}
      <path d={topPath} fill="url(#frostingShade)" />

      {/* SOFT FROSTING HIGHLIGHT */}
      <path
        d={
          square
            ? `M ${left + 22} ${y + 15} H ${right - 30}`
            : `
              M ${left + 34} ${y + 18}
              C ${left + 72} ${y + 7}, ${cx - 20} ${y + 8}, ${cx + 14} ${y + 14}
            `
        }
        fill="none"
        stroke="#ffffff"
        strokeWidth="5"
        opacity="0.28"
        strokeLinecap="round"
      />

      {/* FROSTING EDGE */}
      <path
        d={frostingEdge}
        fill="none"
        stroke={darken(frosting, 0.09)}
        strokeWidth="4"
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* DRIP */}
      {drip !== "None" && (
        <RealisticDrip
          left={left}
          right={right}
          y={y + 29}
          color={
            drip === "Chocolate"
              ? "#75483c"
              : drip === "White"
                ? "#fff9f1"
                : "#e3a0aa"
          }
          square={square}
        />
      )}

      {/* BOTTOM PIPING */}
      <g clipPath={`url(#${pipingClipId})`}>
        <BottomPiping
          piping={piping}
          left={left + 7}
          right={right - 7}
          y={bottom - 2}
          frosting={frosting}
          square={square}
        />
      </g>
    </g>
  );
}

/* =========================================================
   DRIP
========================================================= */

function RealisticDrip({
  left,
  right,
  y,
  color,
  square,
}) {
  const width = right - left;

  const points = square
    ? [
        { x: 0.00, depth: 4 },
        { x: 0.13, depth: 18 },
        { x: 0.26, depth: 7 },
        { x: 0.40, depth: 25 },
        { x: 0.55, depth: 9 },
        { x: 0.70, depth: 21 },
        { x: 0.84, depth: 8 },
        { x: 1.00, depth: 5 },
      ]
    : [
        { x: 0.00, depth: 4 },
        { x: 0.13, depth: 19 },
        { x: 0.26, depth: 7 },
        { x: 0.40, depth: 28 },
        { x: 0.55, depth: 9 },
        { x: 0.69, depth: 23 },
        { x: 0.83, depth: 8 },
        { x: 1.00, depth: 5 },
      ];

  const coords = points.map((point) => ({
    x: left + width * point.x,
    y: y + point.depth,
  }));

  const smoothPath = (items) => {
    let d = `M ${items[0].x} ${items[0].y}`;

    for (let i = 0; i < items.length - 1; i += 1) {
      const p0 = items[i - 1] || items[i];
      const p1 = items[i];
      const p2 = items[i + 1];
      const p3 = items[i + 2] || p2;

      const c1x = p1.x + (p2.x - p0.x) / 6;
      const c1y = p1.y + (p2.y - p0.y) / 6;
      const c2x = p2.x - (p3.x - p1.x) / 6;
      const c2y = p2.y - (p3.y - p1.y) / 6;

      d += `
        C ${c1x} ${c1y},
          ${c2x} ${c2y},
          ${p2.x} ${p2.y}
      `;
    }

    return d;
  };

  const lowerEdge = smoothPath(coords);

  const path = `
    M ${left} ${y - 1}
    ${lowerEdge}
    L ${right} ${y - 1}
    Z
  `;

  return (
    <g>
      <path
        d={path}
        fill={color}
        stroke={darken(color, 0.08)}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      <path
        d={smoothPath(
          coords.map((point) => ({
            x: point.x,
            y: point.y - 1.5,
          }))
        )}
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        opacity="0.13"
        strokeLinecap="round"
      />
    </g>
  );
}

/* =========================================================
   PIPING
========================================================= */

function BottomPiping({
  piping,
  left,
  right,
  y,
  frosting,
  square,
}) {
  if (piping === "None") {
    return null;
  }

  if (piping === "Pearl") {
    const pearls = [];

    for (let x = left + 3; x <= right - 3; x += 21) {
      pearls.push(
        <circle
          key={x}
          cx={x}
          cy={y - 1}
          r="4.7"
          fill="#fffaf4"
          stroke={darken(frosting, 0.1)}
          strokeWidth="1.2"
        />
      );
    }

    return <g>{pearls}</g>;
  }

  if (piping === "Shell") {
    const shells = [];
    const step = 22;

    for (let x = left; x <= right - step; x += step) {
      shells.push(
        <path
          key={x}
          d={`
            M ${x} ${y}
            C ${x + 1} ${y - 7},
              ${x + 5} ${y - 10},
              ${x + 11} ${y - 10}
            C ${x + 17} ${y - 10},
              ${x + 20} ${y - 6},
              ${x + 21} ${y}
            C ${x + 17} ${y + 2},
              ${x + 5} ${y + 2},
              ${x} ${y}
            Z
          `}
          fill={lighten(frosting, 0.02)}
          stroke={darken(frosting, 0.12)}
          strokeWidth="1"
        />
      );
    }

    return <g>{shells}</g>;
  }

  if (piping === "Ruffle") {
    const pieces = [];
    const step = 18;

    for (let x = left; x <= right - step; x += step) {
      pieces.push(
        <path
          key={x}
          d={`
            M ${x} ${y}
            C ${x + 4} ${y - 7},
              ${x + 8} ${y - 7},
              ${x + 12} ${y}
            C ${x + 15} ${y + 5},
              ${x + 17} ${y + 5},
              ${x + 18} ${y}
          `}
          fill="none"
          stroke={frosting}
          strokeWidth="6"
          strokeLinecap="round"
        />
      );
    }

    return <g>{pieces}</g>;
  }

  return null;
}

/* =========================================================
   DECORATIONS
========================================================= */

function GraphicDecoration({ type }) {
  if (type === "rose") {
    return (
      <div className="graphic rose-graphic">
        <span className="rose-petal rose-petal-1" />
        <span className="rose-petal rose-petal-2" />
        <span className="rose-petal rose-petal-3" />
        <span className="rose-petal rose-petal-4" />
        <span className="rose-petal rose-petal-5" />
        <span className="rose-inner rose-inner-1" />
        <span className="rose-inner rose-inner-2" />
        <span className="rose-inner rose-inner-3" />
        <span className="rose-center" />
        <span className="rose-highlight" />
      </div>
    );
  }

  if (type === "pearl") {
    return (
      <div className="graphic pearl-graphic">
        <span className="pearl-string" />
        <i />
        <i />
        <i />
      </div>
    );
  }

  if (type === "bow") {
    return (
      <div className="graphic bow-graphic">
        <svg
          className="bow-svg"
          viewBox="0 0 100 90"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M47 25
               C39 18 30 11 19 12
               C10 13 7 20 10 27
               C14 35 25 37 35 33
               C41 31 45 28 47 25Z"
            fill="#f7b8c7"
            stroke="#a95d70"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <path
            d="M43 25
               C35 20 26 16 19 18
               C16 19 15 22 18 24
               C25 29 34 29 43 25Z"
            fill="#ffe0e6"
            stroke="#c7788a"
            strokeWidth="1.1"
          />

          <path
            d="M53 25
               C61 18 70 11 81 12
               C90 13 93 20 90 27
               C86 35 75 37 65 33
               C59 31 55 28 53 25Z"
            fill="#f7b8c7"
            stroke="#a95d70"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <path
            d="M57 25
               C65 20 74 16 81 18
               C84 19 85 22 82 24
               C75 29 66 29 57 25Z"
            fill="#ffe0e6"
            stroke="#c7788a"
            strokeWidth="1.1"
          />

          <path
            d="M45 28
               C44 37 43 47 36 54
               C32 58 28 62 26 70
               L34 66
               L36 77
               C40 69 46 64 49 55
               C51 47 50 36 49 28Z"
            fill="#f3aabd"
            stroke="#a95d70"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <path
            d="M55 28
               C56 37 57 47 64 54
               C68 58 72 62 74 70
               L66 66
               L64 77
               C60 69 54 64 51 55
               C49 47 50 36 51 28Z"
            fill="#f3aabd"
            stroke="#a95d70"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />

          <rect
            x="46"
            y="22"
            width="8"
            height="9"
            rx="2"
            fill="#e894aa"
            stroke="#a95d70"
            strokeWidth="1.7"
          />

          <path
            d="M48.5 24 L48.5 29 M51.5 24 L51.5 29"
            stroke="#f9ccd5"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  if (type === "cherry") {
    return (
      <div className="graphic cherry-graphic">
        <span className="cherry-branch" />
        <span className="cherry-leaf" />
        <i className="cherry-one" />
        <i className="cherry-two" />
        <b className="cherry-highlight cherry-highlight-one" />
        <b className="cherry-highlight cherry-highlight-two" />
      </div>
    );
  }

  if (type === "flower") {
    return (
      <div className="graphic flower-graphic">
        <i className="flower-petal flower-petal-1" />
        <i className="flower-petal flower-petal-2" />
        <i className="flower-petal flower-petal-3" />
        <i className="flower-petal flower-petal-4" />
        <i className="flower-petal flower-petal-5" />
        <i className="flower-petal flower-petal-6" />
        <span className="flower-center" />
        <span className="flower-center-highlight" />
      </div>
    );
  }

  if (type === "strawberry") {
    return (
      <div className="graphic strawberry-graphic">
        <span className="strawberry-body" />
        <span className="strawberry-leaf" />
        <b className="seed seed-1" />
        <b className="seed seed-2" />
        <b className="seed seed-3" />
        <b className="seed seed-4" />
        <b className="seed seed-5" />
        <b className="seed seed-6" />
        <b className="seed seed-7" />
      </div>
    );
  }

  return null;
}

/* =========================================================
   CANDLES
========================================================= */

function CandleSet({ count, tiers }) {
  if (count === "None") return null;

  const number =
    count === "Single"
      ? 1
      : count === "Three"
        ? 3
        : 5;

  const positions =
    number === 1
      ? [0]
      : number === 3
        ? [-42, 0, 42]
        : [-64, -32, 0, 32, 64];

  return (
    <div
      className={`candle-set ${
        tiers === "2 tiers"
          ? "candle-set-two-tier"
          : "candle-set-one-tier"
      }`}
      aria-label={`${count} lit candles`}
    >
      {positions.map((offset, index) => (
        <div
          className="candle-wrap"
          key={`${offset}-${index}`}
          style={{
            transform: `translateX(${offset}px)`,
          }}
        >
          <div
            className="candle-flame"
            aria-hidden="true"
          >
            <span className="flame-outer" />
            <span className="flame-inner" />
          </div>

          <div className="candle-wick" />

          <div className="candle-body">
            <span />
            <span />
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   UI COMPONENTS
========================================================= */

function ToolSection({
  title,
  children,
}) {
  return (
    <section className="tool-section">
      <h3>{title}</h3>

      <div className="tool-options">
        {children}
      </div>
    </section>
  );
}

function ChoiceButton({
  value,
  selected,
  onClick,
  children,
}) {
  return (
    <button
      className={`choice-button ${
        selected ? "selected" : ""
      }`}
      onClick={onClick}
    >
      {children || value}
    </button>
  );
}

function OrderItem({
  label,
  value,
  match,
}) {
  return (
    <div className="order-item">
      <span>
        <small>{label}</small>
        <strong>{value}</strong>
      </span>

      <span
        className={
          match
            ? "check"
            : "empty-check"
        }
      >
        {match ? "✓" : "○"}
      </span>
    </div>
  );
}

/* =========================================================
   APP
========================================================= */

export default function App() {
  const cakeRef = useRef(null);

  const [customerIndex, setCustomerIndex] =
    useState(0);

  const [shape, setShape] =
    useState("Round");

  const [tiers, setTiers] =
    useState("1 tier");

  const [flavour, setFlavour] =
    useState("Vanilla");

  const [frosting, setFrosting] =
    useState("Vanilla");

  const [candles, setCandles] =
    useState("None");

  const [piping, setPiping] =
    useState("None");

  const [drip, setDrip] =
    useState("None");

  const [decorations, setDecorations] =
    useState([]);

  const [selectedDecorationId, setSelectedDecorationId] =
    useState(null);

  const [topper, setTopper] =
    useState("Happy Birthday");

  const [topperPosition, setTopperPosition] =
    useState({ x: 50, y: 27 });

  const [topperZ, setTopperZ] =
    useState(7);

  const [coins, setCoins] =
    useState(120);

  const [gameScreen, setGameScreen] =
    useState("decorate");

  const [lastScore, setLastScore] =
    useState(0);

  const [lastReward, setLastReward] =
    useState(0);

  const customer =
    customers[customerIndex];

  /* =========================================================
     DECORATIONS
  ========================================================= */

  const addDecoration = (type) => {
    const decoration = {
      id: Date.now() + Math.random(),
      type,
      x: 43 + Math.random() * 14,
      y: 35 + Math.random() * 25,
      rotation: 0,
      scale: 0.9 + Math.random() * 0.18,
    };

    setDecorations((prev) => [
      ...prev,
      decoration,
    ]);

    setSelectedDecorationId(
      decoration.id
    );
  };

  const removeDecoration = (id) => {
    setDecorations((prev) =>
      prev.filter(
        (item) => item.id !== id
      )
    );

    setSelectedDecorationId((current) =>
      current === id ? null : current
    );
  };

  const dragDecoration = (
    event,
    id
  ) => {
    event.preventDefault();

    const cake = cakeRef.current;

    if (!cake) return;

    const move = (moveEvent) => {
      const rect =
        cake.getBoundingClientRect();

      const x =
        ((moveEvent.clientX -
          rect.left) /
          rect.width) *
        100;

      const y =
        ((moveEvent.clientY -
          rect.top) /
          rect.height) *
        100;

      setDecorations((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                x: Math.max(
                  8,
                  Math.min(92, x)
                ),
                y: Math.max(
                  12,
                  Math.min(82, y)
                ),
              }
            : item
        )
      );
    };

    const stop = () => {
      window.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "pointerup",
        stop
      );
    };

    window.addEventListener(
      "pointermove",
      move
    );

    window.addEventListener(
      "pointerup",
      stop
    );
  };

  const rotateDecoration = (
    event,
    id
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedDecorationId(id);

    setDecorations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              rotation:
                item.rotation + 15,
            }
          : item
      )
    );
  };

  const resizeDecoration = (
    event,
    id,
    amount
  ) => {
    event.preventDefault();
    event.stopPropagation();

    setSelectedDecorationId(id);

    setDecorations((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              scale: Math.max(
                0.55,
                Math.min(
                  1.65,
                  item.scale + amount
                )
              ),
            }
          : item
      )
    );
  };

  const dragTopper = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const cake = cakeRef.current;

    if (!cake) return;

    const move = (moveEvent) => {
      const rect =
        cake.getBoundingClientRect();

      const x =
        ((moveEvent.clientX -
          rect.left) /
          rect.width) *
        100;

      const y =
        ((moveEvent.clientY -
          rect.top) /
          rect.height) *
        100;

      setTopperPosition({
        x: Math.max(
          12,
          Math.min(88, x)
        ),
        y: Math.max(
          8,
          Math.min(82, y)
        ),
      });
    };

    const stop = () => {
      window.removeEventListener(
        "pointermove",
        move
      );

      window.removeEventListener(
        "pointerup",
        stop
      );
    };

    window.addEventListener(
      "pointermove",
      move
    );

    window.addEventListener(
      "pointerup",
      stop
    );
  };

  const bringTopperForward = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setTopperZ(16);
  };

  const sendTopperBackward = (
    event
  ) => {
    event.preventDefault();
    event.stopPropagation();
    setTopperZ(7);
  };

  const renderDecoration = (item) => {
    const isSelected =
      selectedDecorationId === item.id;

    return (
      <div
        key={item.id}
        className={`placed-decoration ${
          isSelected
            ? "selected-decoration"
            : ""
        }`}
        style={{
          left: `${item.x}%`,
          top: `${item.y}%`,
          transform: `
            translate(-50%, -50%)
            rotate(${item.rotation}deg)
            scale(${item.scale})
          `,
        }}
        onPointerDown={(event) => {
          setSelectedDecorationId(
            item.id
          );
          dragDecoration(
            event,
            item.id
          );
        }}
        onDoubleClick={() =>
          removeDecoration(item.id)
        }
      >
        {isSelected && (
          <>
            <button
              type="button"
              className="decoration-control rotate-decoration"
              aria-label="Rotate decoration"
              onPointerDown={(event) =>
                event.stopPropagation()
              }
              onClick={(event) =>
                rotateDecoration(
                  event,
                  item.id
                )
              }
            >
              ↻
            </button>

            <button
              type="button"
              className="decoration-control delete-decoration"
              aria-label="Remove decoration"
              onPointerDown={(event) =>
                event.stopPropagation()
              }
              onClick={(event) =>
                removeDecoration(
                  item.id
                )
              }
            >
              ×
            </button>

            <div
              className="resize-decoration"
              onPointerDown={(event) =>
                event.stopPropagation()
              }
            >
              <button
                type="button"
                aria-label="Make decoration smaller"
                onClick={(event) =>
                  resizeDecoration(
                    event,
                    item.id,
                    -0.12
                  )
                }
              >
                −
              </button>

              <span aria-hidden="true">
                ↕
              </span>

              <button
                type="button"
                aria-label="Make decoration bigger"
                onClick={(event) =>
                  resizeDecoration(
                    event,
                    item.id,
                    0.12
                  )
                }
              >
                +
              </button>
            </div>
          </>
        )}

        <GraphicDecoration
          type={item.type}
        />
      </div>
    );
  };

  /* =========================================================
     MATCH
  ========================================================= */

  const decorationMatches =
    decorations.some(
      (item) =>
        item.type ===
        customer.decoration.toLowerCase()
    );

  const matches = [
    shape === customer.shape,
    tiers === customer.tiers,
    flavour === customer.flavour,
    frosting === customer.frosting,
    piping === customer.piping,
    drip === customer.drip,
    decorationMatches,
    topper === customer.topper,
  ];

  const currentMatch = Math.round(
    (matches.filter(Boolean).length /
      matches.length) *
      100
  );

  /* =========================================================
     GAME ACTIONS
  ========================================================= */

  const finishCake = () => {
    const score = currentMatch;

    const reward =
      20 +
      Math.round(score * 0.6) +
      decorations.length * 3;

    setLastScore(score);
    setLastReward(reward);

    setCoins(
      (prev) => prev + reward
    );

    setGameScreen("result");
  };

  const nextCustomer = () => {
    setCustomerIndex(
      (prev) =>
        (prev + 1) %
        customers.length
    );

    setShape("Round");
    setTiers("1 tier");
    setFlavour("Vanilla");
    setFrosting("Vanilla");
    setCandles("None");
    setPiping("None");
    setDrip("None");
    setDecorations([]);
    setTopper("Happy Birthday");
    setTopperPosition({
      x: 50,
      y: 27,
    });
    setTopperZ(7);

    setGameScreen("decorate");
  };

  /* =========================================================
     HEADER LOGO
     
     ONLY CHANGE:
     The old ୨୧ logo + text has been replaced
     with your uploaded Semi's Kitchen logo.
  ========================================================= */

  const BrandLogo = () => (
    <div
      className="brand"
      style={{
        display: "flex",
        alignItems: "center",
        height: "76px",
      }}
    >
      <div
        style={{
          width: "180px",
          height: "62px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/semi-logo.png"
          alt="Semi's Kitchen"
          style={{
            width: "180px",
            height: "120px",
            objectFit: "cover",
            objectPosition: "center center",
            display: "block",
            mixBlendMode: "multiply",
          }}
        />
      </div>
    </div>
  );

  /* =========================================================
     RESULT SCREEN
  ========================================================= */

  if (gameScreen === "result") {
    return (
      <div className="app">
        <header className="topbar">
          <BrandLogo />

          <div className="coin-display">
            ♡ <span>{coins}</span>
          </div>
        </header>

        <main className="result-screen">
          <div className="result-card">
            <span className="result-sparkle">
              ✦
            </span>

            <p className="eyebrow">
              CAKE DELIVERED
            </p>

            <h2>
              For {customer.name} ♡
            </h2>

            <div className="result-score">
              <strong>
                {lastScore}%
              </strong>

              <span>
                order match
              </span>
            </div>

            <p className="result-message">
              Your cake has been
              carefully packed and
              delivered to the
              customer.
            </p>

            <div className="reward-box">
              <span>♡</span>

              <strong>
                +{lastReward} coins
              </strong>
            </div>

            <button
              className="serve-button"
              onClick={nextCustomer}
            >
              Next customer
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     MAIN GAME
  ========================================================= */

  return (
    <div className="app">
      <header className="topbar">
        <BrandLogo />

        <div className="coin-display">
          ♡ <span>{coins}</span>
        </div>
      </header>

      <main className="game-layout">
        {/* LEFT PANEL */}

        <aside className="left-panel">
          <div className="customer-card">
            <div className="customer-avatar">
              {customer.initial}
            </div>

            <div>
              <h2>
                {customer.name}
              </h2>

              <p>
                has a cake request ♡
              </p>
            </div>
          </div>

          <div className="order-card">
            <div className="order-heading">
              <span className="order-icon">
                ✿
              </span>

              <div>
                <small>
                  CAKE ORDER
                </small>

                <h2>
                  {customer.request}
                </h2>
              </div>
            </div>

            <div className="order-list">
              <OrderItem
                label="SHAPE"
                value={customer.shape}
                match={
                  shape === customer.shape
                }
              />

              <OrderItem
                label="TIERS"
                value={customer.tiers}
                match={
                  tiers === customer.tiers
                }
              />

              <OrderItem
                label="FLAVOUR"
                value={customer.flavour}
                match={
                  flavour ===
                  customer.flavour
                }
              />

              <OrderItem
                label="FROSTING"
                value={customer.frosting}
                match={
                  frosting ===
                  customer.frosting
                }
              />

              <OrderItem
                label="PIPING"
                value={customer.piping}
                match={
                  piping ===
                  customer.piping
                }
              />

              <OrderItem
                label="DRIP"
                value={customer.drip}
                match={
                  drip === customer.drip
                }
              />

              <OrderItem
                label="DECOR"
                value={customer.decoration}
                match={decorationMatches}
              />

              <OrderItem
                label="TOPPER"
                value={customer.topper}
                match={
                  topper ===
                  customer.topper
                }
              />
            </div>
          </div>

          <div className="match-card">
            <div>
              <span>
                CURRENT MATCH
              </span>

              <strong>
                {currentMatch}%
              </strong>
            </div>

            <div className="match-track">
              <div
                style={{
                  width: `${currentMatch}%`,
                }}
              />
            </div>
          </div>
        </aside>

        {/* CENTER */}

        <section className="cake-panel">
          <div className="cake-heading">
            <p>
              ✦ DECORATE YOUR CAKE ✦
            </p>

            <span>
              Drag decorations to place
              them · Double click to remove
            </span>
          </div>

          <div className="cake-stage">
            <div className="cake-glow" />

            <div
              ref={cakeRef}
              className="cake"
            >
              <CakeSVG
                shape={shape}
                tiers={tiers}
                flavour={flavour}
                frosting={frosting}
                piping={piping}
                drip={drip}
              />

              <CandleSet
                count={candles}
                tiers={tiers}
              />

              {decorations.map(
                renderDecoration
              )}

              {topper !== "None" && (
                <div
                  className="cake-topper"
                  style={{
                    left: `${topperPosition.x}%`,
                    top: `${topperPosition.y}%`,
                    zIndex: topperZ,
                  }}
                  onPointerDown={dragTopper}
                >
                  <div className="topper-card">
                    {topper}
                  </div>

                  <div className="topper-stick" />

                  <div
                    className="topper-layer-controls"
                    onPointerDown={(event) =>
                      event.stopPropagation()
                    }
                  >
                    <button
                      type="button"
                      title="Bring topper forward"
                      onClick={
                        bringTopperForward
                      }
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      title="Send topper backward"
                      onClick={
                        sendTopperBackward
                      }
                    >
                      ↓
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="serve-button"
            onClick={finishCake}
          >
            Finish & Serve ♡
          </button>
        </section>

        {/* RIGHT PANEL */}

        <aside className="right-panel">
          <ToolSection title="Shape">
            {[
              "Round",
              "Square",
            ].map((item) => (
              <ChoiceButton
                key={item}
                value={item}
                selected={
                  shape === item
                }
                onClick={() =>
                  setShape(item)
                }
              />
            ))}
          </ToolSection>

          <ToolSection title="Tiers">
            {[
              "1 tier",
              "2 tiers",
            ].map((item) => (
              <ChoiceButton
                key={item}
                value={item}
                selected={
                  tiers === item
                }
                onClick={() =>
                  setTiers(item)
                }
              />
            ))}
          </ToolSection>

          <ToolSection title="Flavour">
            {Object.keys(
              flavourColors
            ).map((item) => (
              <ChoiceButton
                key={item}
                value={item}
                selected={
                  flavour === item
                }
                onClick={() =>
                  setFlavour(item)
                }
              />
            ))}
          </ToolSection>

          <ToolSection title="Frosting">
            {frostingStyles.map(
              (item) => (
                <ChoiceButton
                  key={item}
                  value={item}
                  selected={
                    frosting === item
                  }
                  onClick={() =>
                    setFrosting(item)
                  }
                >
                  <span
                    className="swatch"
                    style={{
                      background:
                        frostingColors[
                          item
                        ],
                    }}
                  />

                  {item}
                </ChoiceButton>
              )
            )}
          </ToolSection>

          <ToolSection title="Piping">
            {pipingStyles.map(
              (item) => (
                <ChoiceButton
                  key={item}
                  value={item}
                  selected={
                    piping === item
                  }
                  onClick={() =>
                    setPiping(item)
                  }
                />
              )
            )}
          </ToolSection>

          <ToolSection title="Drip">
            {dripOptions.map(
              (item) => (
                <ChoiceButton
                  key={item}
                  value={item}
                  selected={
                    drip === item
                  }
                  onClick={() =>
                    setDrip(item)
                  }
                />
              )
            )}
          </ToolSection>

          <ToolSection title="Candles">
            {candleOptions.map(
              (item) => (
                <ChoiceButton
                  key={item}
                  value={item}
                  selected={
                    candles === item
                  }
                  onClick={() =>
                    setCandles(item)
                  }
                />
              )
            )}
          </ToolSection>

          <ToolSection title="Decorations">
            <div className="decoration-grid">
              {decorationOptions.map(
                (item) => (
                  <button
                    key={item.name}
                    className="decoration-button"
                    onClick={() =>
                      addDecoration(
                        item.icon
                      )
                    }
                  >
                    <span className="decoration-preview">
                      <GraphicDecoration
                        type={
                          item.icon
                        }
                      />
                    </span>

                    <strong>
                      {item.name}
                    </strong>

                    <small>
                      +{item.reward} ♡
                    </small>
                  </button>
                )
              )}
            </div>
          </ToolSection>

          <ToolSection title="Topper">
            <div className="topper-options">
              {topperOptions.map(
                (item) => (
                  <ChoiceButton
                    key={item}
                    value={item}
                    selected={
                      topper === item
                    }
                    onClick={() =>
                      setTopper(item)
                    }
                  />
                )
              )}
            </div>
          </ToolSection>
        </aside>
      </main>
    </div>
  );
}