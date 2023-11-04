import Button from "@/components/ui/Button.astro";
import { useGui } from "@/lib/store";
import { useScroll } from "@react-three/drei";

export function Play({ pages }: { pages: number }) {
  const scroll = useScroll();

  return (
    <div className="mt-10 flex gap-4 justify-center items-center text-2xl">
      <p className=" text-whisper ">Scroll to start.</p>
      {/* <p>or</p>
      <button
        onClick={() =>
          scroll.el.scrollTo({
            top: window.innerHeight * pages,
            behavior: "smooth",
          })
        }
      >
        Play
      </button> */}
    </div>
  );
}

export function BackToTop() {
  const scroll = useScroll();

  return (
    <div
      className=" text-tokyo bg-night/30 backdrop-blur-sm w-min transition-all whitespace-nowrap select-none cursor-pointer outline-2 border-current; shadow-box hover:underline hover:-translate-y-2 hover:translate-x-2 hover:outline active:-translate-y-1 active:translate-x-1;"
      onClick={() =>
        scroll.el.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      <div className="p-2 flex gap-1 text-white">
        <p>Back to top</p>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
          stroke="#e7e7d8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-arrow-up-right"
        >
          <path d="m5 12 7-7 7 7" />
          <path d="M12 19V5" />
        </svg>
      </div>
    </div>
  );
}

export function SeeMore() {
  return (
    <a href="#work">
      <div className=" text-babycarrot bg-night/30 backdrop-blur-sm w-min transition-all whitespace-nowrap select-none cursor-pointer outline-2 border-current; shadow-box hover:underline hover:-translate-y-2 hover:translate-x-2 hover:outline active:-translate-y-1 active:translate-x-1;">
        <div className="p-2 flex gap-1 text-white">
          <p>See more</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e7e7d8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </div>
      </div>
    </a>
  );
}

export function ContactNow() {
  return (
    <div className=" text-matcha bg-night/30 backdrop-blur-sm w-min transition-all whitespace-nowrap select-none cursor-pointer outline-2 border-current shadow-box hover:underline hover:-translate-y-2 hover:translate-x-2 hover:outline active:-translate-y-1 active:translate-x-1;">
      <a href="/contact">
        <div className="p-2 flex gap-1 text-white">
          <p>Contact</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#e7e7d8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-arrow-up-right"
          >
            <path d="M7 7h10v10"></path>
            <path d="M7 17 17 7"></path>
          </svg>
        </div>
      </a>
    </div>
  );
}

export function EnableExperimentation() {
  const { gui, setGui } = useGui();
  return (
    <button
      type="button"
      onClick={() => setGui(!gui)}
      className="self-end bg-night/30 backdrop-blur-sm w-min transition-all whitespace-nowrap select-none cursor-pointer outline-2 border-current shadow-box hover:underline hover:-translate-y-2 hover:translate-x-2 hover:outline active:-translate-y-1 active:translate-x-1;"
    >
      <p className="p-2">experimentation mode</p>
    </button>
  );
}
