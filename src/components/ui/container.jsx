export default function Container({ children }) {
  return (
    <div className="relative p-4">
      <svg
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
      >
        <line
          x1="7.5"
          y1="0"
          x2="7.5"
          y2="15"
          stroke="hsl(var(--foreground))"
        ></line>
        <line
          x1="15"
          y1="7.5"
          x2="0"
          y2="7.5"
          stroke="hsl(var(--foreground))"
        ></line>
      </svg>
      <svg
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-0 top-0"
      >
        <line
          x1="7.5"
          y1="0"
          x2="7.5"
          y2="15"
          stroke="hsl(var(--foreground))"
        ></line>
        <line
          x1="15"
          y1="7.5"
          x2="0"
          y2="7.5"
          stroke="hsl(var(--foreground))"
        ></line>
      </svg>
      {children}
      <svg
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0"
      >
        <line
          x1="7.5"
          y1="0"
          x2="7.5"
          y2="15"
          stroke="hsl(var(--foreground))"
        ></line>
        <line
          x1="15"
          y1="7.5"
          x2="0"
          y2="7.5"
          stroke="hsl(var(--foreground))"
        ></line>
      </svg>
      <svg
        height={15}
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 right-0"
      >
        <line
          x1="7.5"
          y1="0"
          x2="7.5"
          y2="15"
          stroke="hsl(var(--foreground))"
        ></line>
        <line
          x1="15"
          y1="7.5"
          x2="0"
          y2="7.5"
          stroke="hsl(var(--foreground))"
        ></line>
      </svg>
    </div>
  );
}
