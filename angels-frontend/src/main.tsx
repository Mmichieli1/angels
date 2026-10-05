import Keycloak from "keycloak-js";

import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Configuration pointant ver le conteneur angels-jwt-server
export const keycloak = new Keycloak({
  url: "http://localhost:8080",
  realm: "angels-realm",
  clientId: "angels-frontend",
});

export async function initKeycloak(): Promise<boolean | void> {
  try {
    const authenticated = await keycloak.init({
      onLoad: "check-sso", // Force la connexion des l'arrivée sur le frontend
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
    });

    console.log("Authenticated ! : " + authenticated);
    console.log("Utilisateur connecté ! Token : " + keycloak.token);
    return authenticated;
  } catch (err) {
    console.error("Erreur lors de l'initialisation de Keycloak", err);
    return false;
  }
}

// Appel de la fonction d'initialization de Keycloak
initKeycloak().then((authenticated) => {
  createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
      <App isAuthenticated={authenticated ?? false} />
    </StrictMode>,
  );
});
