package student

import (
	"database/sql"

	"github.com/gin-gonic/gin"
	"github.com/mrsafalpiya/library-management/services/middlewares"
)

func RegisterRoutes(r *gin.RouterGroup, db *sql.DB) {
	r.GET("/student/dashboard", middlewares.LoggedIn, middlewares.ShouldBeStudent, handleDashboard(db))
	r.GET("/student/transaction", middlewares.LoggedIn, middlewares.ShouldBeStudent, handleListTransactions(db))
}
