import { permanentRedirect } from "next/navigation";

export default function LegacyTestoProductRedirectPage() {
  permanentRedirect("/products/testo-booster-capsules");
}
