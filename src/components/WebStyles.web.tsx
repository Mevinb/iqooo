export function WebStyles() {
  return (
    <style>{`
    button:focus-visible, [role="button"]:focus-visible, [role="tab"]:focus-visible, [role="checkbox"]:focus-visible, input:focus-visible {
      outline: 3px solid #116B5A !important;
      outline-offset: 3px;
    }
    input { outline-offset: -3px !important; }
    ::selection { background: #C4DFD1; color: #17342F; }
    @media (prefers-reduced-motion: reduce) { *, *::before, *::after { scroll-behavior: auto !important; } }
  `}</style>
  );
}
