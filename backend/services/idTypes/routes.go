package idTypes

import (
	"github.com/go-chi/chi/v5"
	"github.com/mrsafalpiya/library-management/server"
)

func RegisterRoutes(r chi.Router, srvCfg *server.Config) {
	r.Get("/id-types", handleGet(srvCfg))
}
