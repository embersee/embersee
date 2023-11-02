import { useGui } from "@/lib/store";
import { useScroll } from "@react-three/drei";

export function Play({ pages }: { pages: number }) {
  const scroll = useScroll();

  return (
    <div className="mt-10 flex gap-4 justify-center items-center text-2xl  ">
      <p>Scroll</p>
      <p>or</p>
      <button
        onClick={() =>
          scroll.el.scrollTo({
            top: window.innerHeight * pages,
            behavior: "smooth",
          })
        }
      >
        Play
      </button>
    </div>
  );
}

export function BackToTop() {
  const scroll = useScroll();

  return (
    <div className="absolute top-[470vh] right-[10vw]">
      <button
        className=" text-2xl"
        onClick={() =>
          scroll.el.scrollTo({
            top: 0,
            behavior: "smooth",
          })
        }
      >
        Watch again.
      </button>
    </div>
  );
}

export function EnableExperimentation() {
  const { gui, setGui } = useGui();
  return (
    <div className="absolute top-[475vh] right-[10vw]">
      <button className="hover:text-matcha" onClick={() => setGui(!gui)}>
        func experimentation({!gui ? "true" : "false"})
      </button>
    </div>
  );
}
