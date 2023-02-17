package main

import (
	"database/sql"
	"log"
	"reflect"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/gin-gonic/gin/binding"
	"github.com/go-playground/validator/v10"

	db "github.com/mrsafalpiya/library-management/db/sqlc"
	"github.com/mrsafalpiya/library-management/services/auth"
	"github.com/mrsafalpiya/library-management/services/books"
	"github.com/mrsafalpiya/library-management/services/idTypes"
	"github.com/mrsafalpiya/library-management/services/student"
	"github.com/mrsafalpiya/library-management/services/users"

	_ "github.com/lib/pq"
)

func registerRoutes(r *gin.RouterGroup, db *sql.DB, queries *db.Queries) {
	users.RegisterRoutes(r, db, queries)
	auth.RegisterRoutes(r, queries)
	idTypes.RegisterRoutes(r, queries)
	student.RegisterRoutes(r, db)
	books.RegisterRoutes(r, db)
}

func registerCustomValidations() {
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		users.RegisterValidations(v)
	}
}

func main() {
	// DB connection
	dbConn, err := sql.Open("postgres", "postgresql://root:secret@localhost:5432/library?sslmode=disable")
	if err != nil {
		log.Fatal("Cannot connect to DB:", err)
	}

	err = dbConn.Ping()
	if err != nil {
		log.Fatal("[ERROR] Couldn't connect to database:", err)
	}

	queries := db.New(dbConn)

	// Validator
	if v, ok := binding.Validator.Engine().(*validator.Validate); ok {
		v.RegisterTagNameFunc(func(fld reflect.StructField) string {
			name := strings.SplitN(fld.Tag.Get("json"), ",", 2)[0]

			if name == "-" {
				return ""
			}

			return name
		})
	}
	registerCustomValidations()

	// Server
	r := gin.Default()
	apiRoutes := r.Group("/api/v1")

	registerRoutes(apiRoutes, dbConn, queries)

	if err := r.Run(); err != nil {
		log.Fatal(err)
	}
}
