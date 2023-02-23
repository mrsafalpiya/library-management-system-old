package auth

import (
	"github.com/go-chi/chi/v5"
	"github.com/mrsafalpiya/library-management/server"
)

func RegisterRoutes(r chi.Router, srvCfg *server.Config) {
	r.Post("/auth/login", handleLogin(srvCfg))
	r.Post("/auth/logout", handleLogout)
}
