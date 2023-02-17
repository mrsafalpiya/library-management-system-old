package idTypes

import (
	"net/http"

	"github.com/gin-gonic/gin"
	sqlc "github.com/mrsafalpiya/library-management/db/sqlc"
)

func handleGet(queries *sqlc.Queries) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		idTypes, err := queries.ListIDTypes(ctx)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		ctx.IndentedJSON(http.StatusOK, gin.H{
			"id_types": idTypes,
		})
	}
}
