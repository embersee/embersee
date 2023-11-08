export default function Button({ href, blank, children }) {
  return (
    <div className="button shadow-box">
      <a href={href} target={blank && "_blank"}>
        <div className="flex gap-1 p-2 text-white">[{children}]</div>
      </a>
    </div>
  );
}
