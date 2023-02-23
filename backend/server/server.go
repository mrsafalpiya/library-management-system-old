package server

import (
	"database/sql"

	"github.com/go-playground/validator/v10"
	db "github.com/mrsafalpiya/library-management/db/sqlc"
)

type Config struct {
	DbConn    *sql.DB
	Queries   *db.Queries
	Validator *validator.Validate
}
