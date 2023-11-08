import classNames from "classnames";

export const Page = ({ children, number, className, title }) => {
  return (
    <div className={classNames("h-screen p-2", className)}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
