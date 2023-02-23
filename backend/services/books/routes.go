package books

import (
	"github.com/ggicci/httpin"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/services/jwtAuth"
)

type ListBooksQuery struct {
	Size   int32  `in:"query=size;default=10"`
	Page   int32  `in:"query=page;default=1"`
	Sort   string `in:"query=sort;default=title-asc"`
	Search string `in:"query=search"`
}

func RegisterRoutes(r chi.Router, srvCfg *server.Config) {
	r.With(jwtauth.Verifier(jwtAuth.TokenAuth)).With(httpin.NewInput(ListBooksQuery{})).Get("/books", handleListBooks(srvCfg))
}
