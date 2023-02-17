package auth

import (
	"github.com/gin-gonic/gin"
	db "github.com/mrsafalpiya/library-management/db/sqlc"
)

func RegisterRoutes(r *gin.RouterGroup, queries *db.Queries) {
	r.POST("/auth/login", handleLogin(queries))
	r.POST("/auth/logout", handleLogout)
}
