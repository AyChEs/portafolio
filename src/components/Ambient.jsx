// Decorative animated light-stream behind the hero.
export default function Ambient() {
  return (
    <div className="ambient" aria-hidden="true">
      <svg viewBox="0 0 1400 900" preserveAspectRatio="none">
        <defs>
          <linearGradient id="strand" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1d4ed8" stopOpacity="0" />
            <stop offset="28%" stopColor="#2563eb" stopOpacity=".85" />
            <stop offset="62%" stopColor="#93c5fd" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="spark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#dbeafe" stopOpacity="0" />
            <stop offset="50%" stopColor="#dbeafe" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#strand)" strokeLinecap="round">
          <path d="M-60 700 C 260 690 430 505 720 430 S 1120 320 1470 205" strokeWidth="1" strokeOpacity=".30" />
          <path d="M-60 725 C 260 714 430 528 720 452 S 1120 340 1470 222" strokeWidth="1.6" strokeOpacity=".42" />
          <path d="M-60 752 C 260 740 430 552 720 475 S 1120 361 1470 240" strokeWidth="2.4" strokeOpacity=".55" />
          <path d="M-60 781 C 260 768 430 578 720 500 S 1120 384 1470 260" strokeWidth="1.4" strokeOpacity=".38" />
          <path d="M-60 808 C 260 794 430 602 720 523 S 1120 405 1470 278" strokeWidth="1" strokeOpacity=".26" />
          <path d="M-60 836 C 260 821 430 627 720 547 S 1120 427 1470 297" strokeWidth="1" strokeOpacity=".18" />
        </g>
        <g fill="none" stroke="url(#spark)" strokeLinecap="round" strokeWidth="2.2" strokeDasharray="130 2270">
          <path d="M-60 725 C 260 714 430 528 720 452 S 1120 340 1470 222" style={{ animation: 'beamRun 7s linear infinite' }} />
          <path d="M-60 752 C 260 740 430 552 720 475 S 1120 361 1470 240" style={{ animation: 'beamRun 9s 1.4s linear infinite' }} />
          <path d="M-60 781 C 260 768 430 578 720 500 S 1120 384 1470 260" style={{ animation: 'beamRun 8s 3.1s linear infinite' }} />
          <path d="M-60 700 C 260 690 430 505 720 430 S 1120 320 1470 205" style={{ animation: 'beamRun 11s 5s linear infinite' }} />
        </g>
      </svg>
      <div className="glow-band" />
      <div className="glow-orb" />
      <div className="fade" />
    </div>
  );
}
