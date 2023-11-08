import Button from "@/components/ui/button";
import { useGui } from "@/lib/store";
import { useScroll } from "@react-three/drei";

export function BackToTop() {
  const scroll = useScroll();

  return (
    <Button
      onClick={() =>
        scroll.el.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      Back to top
    </Button>
  );
}

export function EnableExperimentation() {
  const { gui, setGui } = useGui();
  return <Button onClick={() => setGui(!gui)}>Experimentation</Button>;
}
