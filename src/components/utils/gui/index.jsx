import { Leva } from "leva";
import { useGui } from "@/lib/store";
import levaTheme from "@/lib/leva/theme";

export function GUI() {
  const { gui } = useGui();

  return (
    <div className="gui">
      <div className="leva">
        <Leva theme={levaTheme} hidden={!gui} />
      </div>
    </div>
  );
}
