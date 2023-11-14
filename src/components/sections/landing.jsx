import { Page } from "@/components/ui/page";
import Button from "@/components/ui/button";
import { useScroll } from "@react-three/drei";
import CrossContainer from "@/components/ui/cross-container";

export default function Landing() {
  const scroll = useScroll();
  return (
    <Page className="flex flex-col">
      {/* <div className="flex items-center justify-center">
        <p>Scroll to preview</p>
      </div> */}
      <div className=" mx-auto my-auto">
        <p className="mb-2 text-2xl">Hey, my name is </p>

        <CrossContainer>
          <h1 className=" text-7xl leading-none tracking-tighter sm:text-[12em]">
            embersee
          </h1>
        </CrossContainer>

        {/* <Seperator /> */}
        <p className="mt-8 text-2xl">Creating Cutting-Edge Web Experiences</p>
        <p>
          Explore my world of dynamic websites, seamless automation, and
          immersive 3D graphics.
        </p>

        <div className="mt-5 text-2xl ">
          {/* <Button href="#work">View My Work</Button> */}
          <Button
            onClick={() =>
              scroll.el.scrollTo({
                top: window.innerHeight * 6,
                behavior: "smooth",
              })
            }
          >
            Let's Talk
          </Button>
        </div>
      </div>
    </Page>
  );
}
