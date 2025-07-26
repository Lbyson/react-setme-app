import Button from "@/hooks/Button/Button";

interface TabsSectionProps {
  active: string;
  onChange: (tab: string) => void;
}

function TabsSection({ active, onChange }: TabsSectionProps) {
  return (
    <section style={{ display: "flex", justifyContent: "center" }}>
      <Button
        isActive={active === "welcoming"}
        onClick={() => onChange("welcoming")}
      >
        Главная
      </Button>

      <Button
        isActive={active === "profiles"}
        onClick={() => onChange("profiles")}
      >
        Профили
      </Button>

      <Button isActive={active === "fetch"} onClick={() => onChange("fetch")}>
        Поиск
      </Button>

      <Button
        isActive={active === "feedback"}
        onClick={() => onChange("feedback")}
      >
        Feedback
      </Button>

      <Button isActive={active === "learn"} onClick={() => onChange("learn")}>
        Learn
      </Button>
    </section>
  );
}

export default TabsSection;
