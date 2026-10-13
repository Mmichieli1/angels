# 1. Création du Realm 
resource "keycloak_realm" "angels_realm" {
  realm                       = "angels-realm"
  enabled                     = true
  ssl_required                = "external"
  registration_allowed        = false
  remember_me                 = true
  verify_email                = false
  login_with_email_allowed    = true
  duplicate_emails_allowed    = false
  reset_password_allowed      = true
  edit_username_allowed       = false
  
  # Thème de login personnalisé issu de l'export
  login_theme                 = "angels-theme"

  # Durées de vie des tokens et sessions (en secondes)
  access_code_lifespan        = "60s"
  access_code_lifespan_login  = "1800s"
  access_token_lifespan       = "300s"
  sso_session_idle_timeout    = "1800s"
  sso_session_max_lifespan    = "36000s"
}

# 2. Rôles globaux du Realm (user, admin)
resource "keycloak_role" "role_user" {
  realm_id    = keycloak_realm.angels_realm.id
  name        = "user"
  description = ""
}

resource "keycloak_role" "role_admin" {
  realm_id    = keycloak_realm.angels_realm.id
  name        = "admin"
  description = ""
}

# 3. Client Frontend (angels-frontend)
resource "keycloak_openid_client" "angels_frontend" {
  realm_id                     = keycloak_realm.angels_realm.id
  client_id                    = "angels-frontend"
  name                         = "angels-frontend"
  enabled                      = true
  access_type                  = "PUBLIC"
  standard_flow_enabled        = true
  implicit_flow_enabled        = false
  direct_access_grants_enabled = true
  
  root_url                     = "http://localhost:5173"
  admin_url                    = "http://localhost:5173"
  base_url                     = "http://localhost:5173"
  
  valid_redirect_uris = [
    "http://localhost:5173/*",
    "http://localhost/*"
  ]
  
  web_origins = [
    "http://localhost",
    "http://localhost:5173"
  ]
}

# 4. Utilisateur de test (username en minuscules obligatoires)
resource "keycloak_user" "test_user" {
  realm_id   = keycloak_realm.angels_realm.id
  username   = "testuser"
  enabled    = true
  email      = "test@angels.io"
  first_name = "Test"
  last_name  = "User"

  initial_password {
    value     = "SuperSecurePassword123!"
    temporary = false
  }
}

# 5. Assignation des rôles
resource "keycloak_user_roles" "test_user_role" {
  realm_id = keycloak_realm.angels_realm.id
  user_id  = keycloak_user.test_user.id
  
  role_ids = [
    keycloak_role.role_user.id
  ]
}