package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/mrsafalpiya/library-management/db"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/validator"
)

var (
	port = 5050
)

func registerRoutes(router *chi.Mux, srvCfg *server.Config) {
	router.Route("/api/v1", func(r chi.Router) {
	})
}

func printRegisteredRoutes(router *chi.Mux) {
	fmt.Println("Registered routes are:")
	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		fmt.Printf("%s %s\n", method, route)
		return nil
	}
	if err := chi.Walk(router, walkFunc); err != nil {
		log.Panicf("Logging err: %s\n", err.Error())
	}
	fmt.Println()

}

func main() {
	// Server Setup

	dbConn, err := db.SetupAndGetDBConn("postgres", "postgresql://root:secret@localhost:5432/library?sslmode=disable")
	if err != nil {
		log.Fatal("Cannot connect to DB:", err)
	}

	v := validator.SetupAndGetValidator()

	srvCfg := server.Config{
		DbConn:    dbConn,
		Validator: v,
	}

	// Router

	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.Timeout(60 * time.Second))

	registerRoutes(router, &srvCfg)

	// Startup

	printRegisteredRoutes(router)

	log.Printf("Listening to port %d", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), router)
	if err != nil {
		log.Fatal(err)
	}
}
