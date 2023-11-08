import { useGui } from "@/lib/store";
import { useScroll } from "@react-three/drei";

export function Play({ pages }) {
  // const scroll = useScroll();

  return (
    <div className="flex items-center justify-center gap-4 text-2xl">
      <p className=" text-whisper ">Scroll to start.</p>
    </div>
  );
}

export function BackToTop() {
  const scroll = useScroll();

  return (
    <div
      className=" border-current; shadow-box active:translate-x-1; w-min cursor-pointer select-none whitespace-nowrap bg-night/30 text-tokyo outline-2 backdrop-blur-sm transition-all hover:-translate-y-2 hover:translate-x-2 hover:underline hover:outline active:-translate-y-1"
      onClick={() =>
        scroll.el.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }
    >
      <div className="flex gap-1 p-2 text-white">
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
      <div className=" border-current; shadow-box active:translate-x-1; w-min cursor-pointer select-none whitespace-nowrap bg-night/30 text-babycarrot outline-2 backdrop-blur-sm transition-all hover:-translate-y-2 hover:translate-x-2 hover:underline hover:outline active:-translate-y-1">
        <div className="flex gap-1 p-2 text-white">
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
    <div className=" shadow-box active:translate-x-1; w-min cursor-pointer select-none whitespace-nowrap border-current bg-night/30 text-matcha outline-2 backdrop-blur-sm transition-all hover:-translate-y-2 hover:translate-x-2 hover:underline hover:outline active:-translate-y-1">
      <a href="/contact">
        <div className="flex gap-1 p-2 text-white">
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
      className="shadow-box active:translate-x-1; w-min cursor-pointer select-none self-end whitespace-nowrap border-current bg-night/30 outline-2 backdrop-blur-sm transition-all hover:-translate-y-2 hover:translate-x-2 hover:underline hover:outline active:-translate-y-1"
    >
      <p className="p-2">experimentation mode</p>
    </button>
  );
}
