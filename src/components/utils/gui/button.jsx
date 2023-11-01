import { useGui } from "@/lib/store";

export default function EnableExperimentation() {
  const { gui, setGui } = useGui();
  return (
    <button className="experiments" onClick={() => setGui(!gui)}>
      enable_experimentation({!gui ? "true" : "false"})
    </button>
  );
}
