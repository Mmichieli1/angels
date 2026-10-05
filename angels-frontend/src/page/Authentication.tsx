import { keycloak } from "../main";

export default function Authentication() {
  return <>{keycloak.login()}</>;
}
