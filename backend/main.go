package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"reflect"
	"strings"
	"time"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-playground/validator/v10"

	db "github.com/mrsafalpiya/library-management/db/sqlc"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/services/auth"
	"github.com/mrsafalpiya/library-management/services/users"

	_ "github.com/lib/pq"
)

var (
	port = 5050
)

func registerRoutes(router *chi.Mux, srvCfg *server.Config) {
	router.Route("/api/v1", func(r chi.Router) {
		auth.RegisterRoutes(r, srvCfg)
		users.RegisterRoutes(r, srvCfg)
		// idTypes.RegisterRoutes(r, srvCfg)
		// student.RegisterRoutes(r, srvCfg)
		// books.RegisterRoutes(r, srvCfg)
	})
}

func setupAndGetDBConn() (*sql.DB, error) {
	dbConn, err := sql.Open("postgres", "postgresql://root:secret@localhost:5432/library?sslmode=disable")
	if err != nil {
		return nil, err
	}

	err = dbConn.Ping()
	if err != nil {
		return nil, err
	}

	return dbConn, nil
}

func setupAndGetValidator() *validator.Validate {
	v := validator.New()
	v.RegisterTagNameFunc(func(fld reflect.StructField) string {
		name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]

		if name == "-" {
			return ""
		}

		return name
	})

	return v
}

func main() {
	// Database

	dbConn, err := setupAndGetDBConn()
	if err != nil {
		log.Fatal("Cannot connect to DB:", err)
	}

	queries := db.New(dbConn)

	// Validator

	v := setupAndGetValidator()

	// Server

	srvCfg := server.Config{
		DbConn:    dbConn,
		Queries:   queries,
		Validator: v,
	}

	router := chi.NewRouter()
	router.Use(middleware.Logger)
	router.Use(middleware.Recoverer)
	router.Use(middleware.Timeout(60 * time.Second))

	registerRoutes(router, &srvCfg)

	fmt.Println("Registered routes are:")
	walkFunc := func(method string, route string, handler http.Handler, middlewares ...func(http.Handler) http.Handler) error {
		fmt.Printf("%s %s\n", method, route)
		return nil
	}
	if err := chi.Walk(router, walkFunc); err != nil {
		log.Panicf("Logging err: %s\n", err.Error())
	}
	fmt.Println()

	log.Printf("Listening to port %d", port)

	err = http.ListenAndServe(fmt.Sprintf(":%d", port), router)
	if err != nil {
		log.Fatal(err)
	}
}
