export default function Button({ href, blank, children, ...props }) {
  return (
    <div {...props} className="button">
      <a href={href} target={blank && "_blank"} className="flex items-center">
        <span className="text-emerald text-4xl font-extralight">[</span>

        {children}
        <span className="text-emerald text-4xl font-extralight">]</span>
      </a>
    </div>
  );
}
