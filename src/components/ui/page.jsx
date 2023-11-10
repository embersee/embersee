import { cn } from "../utils/classnames";

export const Page = ({ children, number, className, title }) => {
  return (
    <div className={cn("h-screen p-2", className)}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
