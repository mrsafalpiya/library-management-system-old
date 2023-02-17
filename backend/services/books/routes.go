package books

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/mrsafalpiya/library-management/services/middlewares"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/books", middlewares.LoggedIn, handleListBooks(db))
}
