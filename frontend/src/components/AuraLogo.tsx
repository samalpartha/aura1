import { Heading } from "@radix-ui/themes";

export function AuraLogo() {
  return (
    <Heading as="h1" size="8" style={logoStyle}>
      AURA
    </Heading>
  );
}

const logoStyle: React.CSSProperties = {
  color: "#fff",
  textShadow: "0 2px 4px rgba(0,0,0,0.4), 0 5px 15px rgba(255,255,255,0.2)"
};
