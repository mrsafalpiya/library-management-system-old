package student

import (
	"github.com/ggicci/httpin"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/jwtauth"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/services/jwtAuth"
	"github.com/mrsafalpiya/library-management/services/middlewares"
)

type ListTransactionsQuery struct {
	Type string `in:"query=type;default=.*"`
	Size int32  `in:"query=size;default=5"`
	Page int32  `in:"query=page;default=1"`
}

func RegisterRoutes(r chi.Router, srvConfig *server.Config) {
	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(jwtAuth.TokenAuth))
		r.Use(jwtauth.Authenticator)
		r.Use(middlewares.ShouldBeStudent)

		r.Get("/student/dashboard", handleDashboard(srvConfig))
		r.With(httpin.NewInput(ListTransactionsQuery{})).Get("/student/transaction", handleListTransactions(srvConfig))
	})
}
