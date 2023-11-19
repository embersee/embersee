import EdgeWrapper from "@/components/ui/edge-wrapper";

export default function Button({ href, blank, children, ...props }) {
  return (
    <div {...props} className="button">
      <a href={href} target={blank && "_blank"}>
        <EdgeWrapper className="p-2 px-4">
          <span className="link ">{children}</span>
        </EdgeWrapper>
      </a>
    </div>
  );
}
