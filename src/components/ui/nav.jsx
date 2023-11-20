import Button from "./button";
import { FadeInWhenVisible } from "@/components/utils/animations/FadeInWhenVisible";
import { vhToPixels } from "@/components/utils/animations/scrollHeight";

export const Nav = () => {
  return (
    <FadeInWhenVisible>
      <div className="absolute top-0 flex w-full justify-between p-2 text-lg">
        <Button href="/">embersee</Button>

        <div className="flex space-x-4">
          {/*<Button href="/about">about</Button>*/}

          <Button
            onClick={() =>
              window.scrollTo({ top: vhToPixels(100), behavior: "smooth" })
            }
          >
            contact
          </Button>
        </div>
      </div>
    </FadeInWhenVisible>
  );
};
