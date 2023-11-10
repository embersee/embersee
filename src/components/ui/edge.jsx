export const Edge = ({ className }) => {
  return (
    <svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <line x1="1" y1="1" x2="1" y2="10" stroke="currentColor"></line>
      <line x1="10" y1="1" x2="1" y2="1" stroke="currentColor"></line>
    </svg>
  );
};
