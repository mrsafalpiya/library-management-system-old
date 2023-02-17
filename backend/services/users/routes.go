package users

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	db "github.com/mrsafalpiya/library-management/db/sqlc"
	"github.com/mrsafalpiya/library-management/services/middlewares"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB, queries *db.Queries) {
	r.POST("/users", middlewares.LoggedIn, middlewares.ShouldBeStaff, handleCreate(queries))
	r.GET("/user", middlewares.LoggedIn, handleUser(db))
}
