const ICONS = {
  link: (
    "M27 12.5V5h-7.5M18 14l9-9m-4 13v8a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h8"
  ),
  copy: (
    "M27 23 V5 H9 M23 9 H5 V27 H23 V9 Z"
  ),
  check: (
    "M27 9L13 23L6 16"
  ),
};

export const Icon = ({
  name,
}: {
  name: keyof typeof ICONS;
}) => (
  <div style={{ display: "grid" }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={ICONS[name]} />
    </svg>
  </div>
);
