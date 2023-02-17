package idTypes

import (
	"github.com/gin-gonic/gin"
	db "github.com/mrsafalpiya/library-management/db/sqlc"
)

func RegisterRoutes(r *gin.RouterGroup, queries *db.Queries) {
	r.GET("/id-types", handleGet(queries))
}
