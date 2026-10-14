import React from 'react';

/**
 * High-fidelity 3D-styled SVG illustrations with realistic lighting,
 * multi-stop gradients, ambient occlusion shadows, specular reflections,
 * and contact shadows. Works 100% offline at college expo booths!
 */
export default function ThreeDIllustration({ type, size = 160, className = "" }) {
  const normType = (type || 'apple').toLowerCase();

  return (
    <div 
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 3D Apple (Der Apfel) */}
      {(normType.includes('apfel') || normType === 'apple') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            {/* Apple 3D Body Gradient */}
            <radialGradient id="appleGrad" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#FF6B78" />
              <stop offset="25%" stopColor="#E63946" />
              <stop offset="70%" stopColor="#B31E2B" />
              <stop offset="100%" stopColor="#6E0B14" />
            </radialGradient>
            {/* Specular Highlight */}
            <linearGradient id="appleHighlight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.0" />
            </linearGradient>
            {/* Stem Gradient */}
            <linearGradient id="stemGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#5C3A21" />
              <stop offset="50%" stopColor="#8B5A2B" />
              <stop offset="100%" stopColor="#3E2412" />
            </linearGradient>
            {/* Leaf Gradient */}
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7FD957" />
              <stop offset="70%" stopColor="#38A123" />
              <stop offset="100%" stopColor="#1C5E11" />
            </linearGradient>
            {/* Cast Shadow */}
            <radialGradient id="appleShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="100" cy="180" rx="65" ry="14" fill="url(#appleShadow)" />

          {/* Stem */}
          <path 
            d="M98 65 Q96 25 118 20 Q116 28 103 62 Z" 
            fill="url(#stemGrad)" 
            filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.3))"
          />

          {/* 3D Leaf */}
          <path 
            d="M104 45 C125 25 155 35 150 55 C135 65 115 55 104 45 Z" 
            fill="url(#leafGrad)" 
            filter="drop-shadow(0px 2px 3px rgba(0,0,0,0.25))"
          />
          {/* Leaf Rib */}
          <path d="M106 46 Q130 45 147 53" stroke="#A8F387" strokeWidth="1.5" fill="none" opacity="0.7" />

          {/* 3D Apple Main Body */}
          <path 
            d="M100 68 C80 50 42 55 35 90 C26 135 60 172 96 172 C98 172 102 172 104 172 C140 172 174 135 165 90 C158 55 120 50 100 68 Z" 
            fill="url(#appleGrad)" 
          />

          {/* Indentation at top */}
          <ellipse cx="100" cy="67" rx="14" ry="6" fill="#4A050B" opacity="0.6" />

          {/* 3D Gloss / Specular Highlights */}
          <ellipse cx="65" cy="88" rx="20" ry="32" fill="url(#appleHighlight)" transform="rotate(-25 65 88)" />
          <ellipse cx="56" cy="78" rx="7" ry="12" fill="#FFFFFF" opacity="0.75" transform="rotate(-20 56 78)" />
          
          {/* Secondary Rim Light */}
          <path 
            d="M142 90 C148 115 138 148 118 162" 
            stroke="#FFB3BA" 
            strokeWidth="3" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.4" 
          />
        </svg>
      )}

      {/* 3D Banana (Die Banane) */}
      {(normType.includes('banane') || normType === 'banana') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <linearGradient id="bananaBody" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE066" />
              <stop offset="35%" stopColor="#FFC857" />
              <stop offset="75%" stopColor="#E09F1F" />
              <stop offset="100%" stopColor="#A86F08" />
            </linearGradient>
            <linearGradient id="bananaFacet" x1="0%" y1="0%" x2="100%" y2="80%">
              <stop offset="0%" stopColor="#FFF2A3" />
              <stop offset="60%" stopColor="#FFC857" />
              <stop offset="100%" stopColor="#C98B10" />
            </linearGradient>
            <linearGradient id="bananaStem" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A6B22" />
              <stop offset="100%" stopColor="#2D4512" />
            </linearGradient>
            <radialGradient id="bananaShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="100" cy="178" rx="70" ry="12" fill="url(#bananaShadow)" />

          {/* Stem Tip */}
          <path d="M42 45 L32 36 L36 30 L48 40 Z" fill="url(#bananaStem)" />

          {/* 3D Banana Body Bottom Ridge */}
          <path 
            d="M44 42 C75 75 110 100 162 135 C168 140 165 148 156 148 C105 142 58 108 36 48 Z" 
            fill="#B87705" 
          />

          {/* 3D Banana Main Facet */}
          <path 
            d="M42 41 C80 82 118 108 165 138 C170 141 168 147 160 146 C112 135 68 95 38 46 Z" 
            fill="url(#bananaBody)" 
          />

          {/* Upper Light Facet */}
          <path 
            d="M40 40 C72 75 106 98 152 126 C156 128 154 133 148 132 C104 118 64 82 36 43 Z" 
            fill="url(#bananaFacet)" 
          />

          {/* Specular Ridge Line */}
          <path 
            d="M46 48 C80 84 116 108 150 128" 
            stroke="#FFFFFF" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
            fill="none" 
            opacity="0.65" 
          />

          {/* Bottom Dark Cap */}
          <path d="M162 137 C168 141 172 146 166 149 C162 147 158 143 162 137 Z" fill="#422907" />
        </svg>
      )}

      {/* 3D Glass of Water (Das Wasser) */}
      {(normType.includes('wasser') || normType === 'water') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.7" />
              <stop offset="25%" stopColor="#D8F0FA" stopOpacity="0.2" />
              <stop offset="75%" stopColor="#AEE2F7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#67D0F7" />
              <stop offset="40%" stopColor="#29B6F6" />
              <stop offset="100%" stopColor="#0288D1" />
            </linearGradient>
            <radialGradient id="waterShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0288D1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="100" cy="180" rx="55" ry="12" fill="url(#waterShadow)" />

          {/* Glass Back Wall */}
          <path d="M56 45 L68 165 C69 171 75 175 82 175 L118 175 C125 175 131 171 132 165 L144 45 Z" fill="#E1F5FE" opacity="0.5" />

          {/* Water Fill with 3D Depth */}
          <path d="M60 82 L70 162 C71 167 76 170 82 170 L118 170 C124 170 129 167 130 162 L140 82 Q100 92 60 82 Z" fill="url(#waterGrad)" />

          {/* Water Surface Ellipse */}
          <ellipse cx="100" cy="82" rx="40" ry="10" fill="#B3E5FC" />
          <ellipse cx="100" cy="82" rx="36" ry="8" fill="#E1F5FE" opacity="0.6" />

          {/* Floating 3D Ice Cube 1 */}
          <polygon points="80,88 98,82 110,92 92,98" fill="#E0F7FA" opacity="0.9" />
          <polygon points="80,88 92,98 92,108 80,98" fill="#B2EBF2" opacity="0.8" />
          <polygon points="92,98 110,92 110,102 92,108" fill="#80DEEA" opacity="0.8" />

          {/* Water Bubbles */}
          <circle cx="85" cy="125" r="4" fill="#FFFFFF" opacity="0.6" />
          <circle cx="115" cy="135" r="5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="102" cy="150" r="3" fill="#FFFFFF" opacity="0.7" />

          {/* Front Glass Outline & Highlights */}
          <path d="M54 45 L67 165 C68 172 74 177 82 177 L118 177 C126 177 132 172 133 165 L146 45 Z" fill="url(#glassGrad)" />
          
          {/* Top Glass Rim */}
          <ellipse cx="100" cy="45" rx="46" ry="10" fill="none" stroke="#FFFFFF" strokeWidth="3" opacity="0.9" />

          {/* Long Vertical Glass Specular Highlight */}
          <path d="M62 52 L73 160" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.75" />
          <path d="M138 52 L128 160" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
        </svg>
      )}

      {/* 3D Bread Loaf (Das Brot) */}
      {(normType.includes('brot') || normType === 'bread') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <radialGradient id="breadCrust" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#DE9B52" />
              <stop offset="40%" stopColor="#B36826" />
              <stop offset="80%" stopColor="#7A3F0E" />
              <stop offset="100%" stopColor="#4A2304" />
            </radialGradient>
            <linearGradient id="breadScore" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF2D6" />
              <stop offset="100%" stopColor="#F5D098" />
            </linearGradient>
            <radialGradient id="breadShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="100" cy="172" rx="72" ry="14" fill="url(#breadShadow)" />

          {/* Main 3D Bread Loaf Body */}
          <path 
            d="M32 135 C28 95 60 60 100 60 C140 60 172 95 168 135 C165 155 145 162 100 162 C55 162 35 155 32 135 Z" 
            fill="url(#breadCrust)" 
          />

          {/* Bread Scores / Slits with Tender Golden Dough Interior */}
          <path d="M60 88 C70 95 72 110 65 125" stroke="url(#breadScore)" strokeWidth="6" strokeLinecap="round" fill="none" />
          <path d="M100 78 C108 88 108 108 100 128" stroke="url(#breadScore)" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M140 88 C130 95 128 110 135 125" stroke="url(#breadScore)" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Flour Dusting Specular Highlight on Crust */}
          <ellipse cx="88" cy="72" rx="28" ry="8" fill="#FFFFFF" opacity="0.3" transform="rotate(-8 88 72)" />
          <ellipse cx="120" cy="75" rx="20" ry="6" fill="#FFFFFF" opacity="0.25" transform="rotate(8 120 75)" />

          {/* Wheat Ear Decoration */}
          <path d="M96 150 Q100 135 104 150" stroke="#FFF0D0" strokeWidth="2" fill="none" opacity="0.6" />
        </svg>
      )}

      {/* 3D German Book (Das Buch) */}
      {(normType.includes('buch') || normType === 'book') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <linearGradient id="bookCover" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E63946" />
              <stop offset="60%" stopColor="#C41C2B" />
              <stop offset="100%" stopColor="#7A0B15" />
            </linearGradient>
            <linearGradient id="bookSpine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4A050B" />
              <stop offset="50%" stopColor="#8F1520" />
              <stop offset="100%" stopColor="#4A050B" />
            </linearGradient>
            <linearGradient id="bookPages" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFF9E6" />
              <stop offset="50%" stopColor="#EDE0C5" />
              <stop offset="100%" stopColor="#CFC0A3" />
            </linearGradient>
            <radialGradient id="bookShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="102" cy="175" rx="72" ry="14" fill="url(#bookShadow)" />

          {/* Back Cover */}
          <polygon points="40,140 148,162 165,145 56,125" fill="#4A050B" />

          {/* 3D Pages Block */}
          <polygon points="52,122 152,142 150,154 50,134" fill="url(#bookPages)" />
          {/* Individual Page Lines */}
          <line x1="53" y1="126" x2="151" y2="146" stroke="#D1BE9B" strokeWidth="1" />
          <line x1="52" y1="130" x2="151" y2="150" stroke="#D1BE9B" strokeWidth="1" />

          {/* Golden Ribbon Bookmark */}
          <path d="M125 142 L130 178 L122 170 L115 178 L120 142 Z" fill="#FFC857" filter="drop-shadow(0 2px 3px rgba(0,0,0,0.3))" />

          {/* 3D Front Hardcover */}
          <polygon points="35,62 145,82 162,142 50,122" fill="url(#bookCover)" />

          {/* Spine Rim */}
          <path d="M35 62 C30 75 32 110 50 122 L42 135 C22 120 20 75 35 62 Z" fill="url(#bookSpine)" />

          {/* Front Cover Gold Deco Embellishment */}
          <rect x="70" y="85" width="55" height="28" rx="4" fill="none" stroke="#FFC857" strokeWidth="2" transform="skewY(7)" />
          <text x="76" y="103" fill="#FFC857" fontSize="10" fontWeight="900" fontFamily="sans-serif" transform="skewY(7)">
            DEUTSCH
          </text>

          {/* Cover Sheen */}
          <polygon points="38,64 90,73 105,128 52,120" fill="#FFFFFF" opacity="0.18" />
        </svg>
      )}

      {/* 3D Milk (Die Milch) */}
      {(normType.includes('milch') || normType === 'milk') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <linearGradient id="milkBottle" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="25%" stopColor="#F0F8FF" />
              <stop offset="70%" stopColor="#D9ECF7" />
              <stop offset="100%" stopColor="#BCE0F2" />
            </linearGradient>
            <linearGradient id="milkCap" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#42A5F5" />
              <stop offset="100%" stopColor="#1565C0" />
            </linearGradient>
            <radialGradient id="milkShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="100" cy="178" rx="55" ry="12" fill="url(#milkShadow)" />

          {/* 3D Milk Bottle Body */}
          <path 
            d="M80 50 L120 50 L124 75 L138 95 L138 165 C138 172 130 176 122 176 L78 176 C70 176 62 172 62 165 L62 95 L76 75 Z" 
            fill="url(#milkBottle)" 
          />

          {/* Blue Label Badge */}
          <path d="M62 110 L138 110 L138 142 L62 142 Z" fill="#29B6F6" opacity="0.85" />
          <text x="76" y="132" fill="#FFFFFF" fontSize="13" fontWeight="900" fontFamily="sans-serif">
            MILCH
          </text>

          {/* Cute Cow Spot / Splash icon */}
          <circle cx="85" cy="158" r="4" fill="#90CAF9" />
          <circle cx="118" cy="155" r="5" fill="#90CAF9" />

          {/* Cap */}
          <rect x="76" y="36" width="48" height="15" rx="3" fill="url(#milkCap)" />

          {/* 3D Glass / Plastic Bottle Highlight */}
          <path d="M72 82 L72 165" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.8" />
        </svg>
      )}

      {/* 3D Coffee Cup (Der Kaffee) */}
      {(normType.includes('kaffee') || normType === 'coffee') && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <linearGradient id="cupGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F5F5F7" />
              <stop offset="100%" stopColor="#D2D2D7" />
            </linearGradient>
            <radialGradient id="coffeeGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#8D5524" />
              <stop offset="65%" stopColor="#5C3317" />
              <stop offset="100%" stopColor="#301A0A" />
            </radialGradient>
            <radialGradient id="cupShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="98" cy="180" rx="68" ry="12" fill="url(#cupShadow)" />

          {/* Saucer */}
          <ellipse cx="98" cy="168" rx="66" ry="12" fill="#E5E5EA" />
          <ellipse cx="98" cy="166" rx="62" ry="10" fill="#FFFFFF" />

          {/* Cup Handle */}
          <path d="M130 90 C165 90 165 140 130 140" stroke="#E5E5EA" strokeWidth="12" fill="none" strokeLinecap="round" />
          <path d="M130 90 C165 90 165 140 130 140" stroke="#FFFFFF" strokeWidth="8" fill="none" strokeLinecap="round" />

          {/* Cup Body */}
          <path d="M55 78 L65 152 C67 158 74 162 82 162 L114 162 C122 162 129 158 131 152 L141 78 Z" fill="url(#cupGrad)" />

          {/* Coffee Liquid Surface */}
          <ellipse cx="98" cy="78" rx="43" ry="12" fill="url(#coffeeGrad)" />
          {/* Coffee Foam Heart */}
          <path d="M98 77 C93 72 87 75 92 81 L98 86 L104 81 C109 75 103 72 98 77 Z" fill="#D7A15C" opacity="0.8" />

          {/* Steaming Aroma Whirls */}
          <path d="M85 58 Q80 42 90 30" stroke="#FFC857" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.75" />
          <path d="M102 55 Q108 38 98 24" stroke="#FFC857" strokeWidth="3.5" fill="none" strokeLinecap="round" opacity="0.85" />
          <path d="M116 58 Q122 42 112 30" stroke="#FFC857" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
        </svg>
      )}

      {/* 3D Happy / Emotion (Glücklich) */}
      {(normType.includes('glücklich') || normType.includes('happy')) && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <radialGradient id="starGrad" cx="35%" cy="30%" r="65%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="35%" stopColor="#FFC857" />
              <stop offset="80%" stopColor="#F39C12" />
              <stop offset="100%" stopColor="#D35400" />
            </radialGradient>
            <radialGradient id="starShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#E67E22" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="100" cy="180" rx="55" ry="12" fill="url(#starShadow)" />

          {/* 3D Glowing Star / Happy Icon */}
          <path 
            d="M100 25 L118 68 L164 72 L128 104 L139 150 L100 126 L61 150 L72 104 L36 72 L82 68 Z" 
            fill="url(#starGrad)" 
            stroke="#F39C12" 
            strokeWidth="3" 
            strokeLinejoin="round" 
          />

          {/* Happy Eyes */}
          <path d="M80 82 Q88 74 96 82" stroke="#4A2304" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M104 82 Q112 74 120 82" stroke="#4A2304" strokeWidth="4" strokeLinecap="round" fill="none" />

          {/* Big Cheerful Smile */}
          <path d="M84 96 Q100 118 116 96" stroke="#4A2304" strokeWidth="4.5" strokeLinecap="round" fill="#E63946" />

          {/* Rosy Cheeks */}
          <circle cx="75" cy="94" r="6" fill="#E63946" opacity="0.5" />
          <circle cx="125" cy="94" r="6" fill="#E63946" opacity="0.5" />

          {/* Specular Highlight */}
          <circle cx="90" cy="55" r="8" fill="#FFFFFF" opacity="0.6" />
        </svg>
      )}

      {/* 3D German Flag & Shield Badge (Deutsch / Expo) */}
      {(normType.includes('deutsch') || normType.includes('germany') || normType.includes('default')) && (
        <svg viewBox="0 0 200 200" width={size} height={size} className="drop-shadow-xl animate-float">
          <defs>
            <radialGradient id="badgeShadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#111111" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#111111" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Contact Shadow */}
          <ellipse cx="100" cy="182" rx="60" ry="12" fill="url(#badgeShadow)" />

          {/* 3D Shield Base */}
          <path d="M40 40 L160 40 L160 110 C160 155 100 180 100 180 C100 180 40 155 40 110 Z" fill="#111111" />

          {/* Shield Layers (German Flag) */}
          <path d="M44 44 L156 44 L156 75 L44 75 Z" fill="#111111" stroke="#333" strokeWidth="1" />
          <path d="M44 75 L156 75 L156 115 L44 115 Z" fill="#E63946" />
          <path d="M44 115 L156 115 L156 110 C156 148 100 174 100 174 C100 174 44 148 44 110 Z" fill="#FFC857" />

          {/* Gold Shield Border */}
          <path 
            d="M40 40 L160 40 L160 110 C160 155 100 180 100 180 C100 180 40 155 40 110 Z" 
            fill="none" 
            stroke="#FFC857" 
            strokeWidth="6" 
          />

          {/* Specular Glare */}
          <path d="M48 48 L152 48 L100 160 Z" fill="#FFFFFF" opacity="0.12" />
        </svg>
      )}
    </div>
  );
}
