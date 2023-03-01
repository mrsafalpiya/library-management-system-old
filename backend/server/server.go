package server

import (
	"database/sql"

	"github.com/go-playground/validator/v10"
)

type Config struct {
	DbConn    *sql.DB
	Validator *validator.Validate
}
