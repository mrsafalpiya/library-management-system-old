package users

import (
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/services/jwtAuth"
	"github.com/mrsafalpiya/library-management/services/middlewares"
)

func RegisterRoutes(r chi.Router, srvCfg *server.Config) {
	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(jwtAuth.TokenAuth))
		r.Use(jwtauth.Authenticator)

		r.With(middlewares.ShouldBeStaff).Post("/users", handleCreate(srvCfg))
		r.Get("/user", handleUser(srvCfg))
	})
}
