import { Leva } from "leva";
import { useStore } from "@/lib/store";

export function GUI() {
  const [gui, setGui] = useStore(({ gui, setGui }) => [gui, setGui]);

  return (
    <div className="hidden">
      <button
        onClick={() => {
          setGui(!gui);
        }}
      ></button>
      <header>
        <h1>ANISO_ASCII_TOOL</h1>
      </header>
      <div>
        <div>
          <Leva
            isRoot
            fill
            flat
            titleBar={false}
            // theme={levaTheme}
            hideCopyButton
            // neverHide
            collapsed={false}
          />
        </div>
        <div>
          <p>
            the Aniso ascii tool is an open-source ASCII tool built by{" "}
            <a href="https://studiofreight.com">Studio Freight</a> to generate
            and customize character-based imagery.
          </p>
          <br />
          <p>
            DRAG AND DROP ANY FILE
            <br /> .glb, .mp4, .mov, .webm, .png, .webp, .avif
          </p>
        </div>
        <div>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/studio-freight/aniso"
          >
            github
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://studiofreight.com"
          >
            studiofreight.com
          </a>
        </div>
      </div>
    </div>
  );
}
