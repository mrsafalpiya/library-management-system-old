package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	"github.com/mrsafalpiya/library-management/services/auth"
)

func LoggedIn(ctx *gin.Context) {
	jwtCookies, err := ctx.Cookie("jwt")
	if err != nil || jwtCookies == "" {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "token not set",
		})
		return
	}

	type TokenClaim struct {
		UserID int64 `json:"user_id"`
		IDType string `json:"id_type"`
		jwt.StandardClaims
	}

	token, err := jwt.ParseWithClaims(jwtCookies, &TokenClaim{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(auth.SecretKey), nil
	})
	if err != nil {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "invalid token",
		})
		return
	}

	claims := token.Claims.(*TokenClaim)
	if !token.Valid {
		ctx.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
			"error": "invalid token",
		})
		return
	}

	ctx.Set("user_id", claims.UserID)
	ctx.Set("id_type", claims.IDType)

	ctx.Next()
}

// Place this middleware AFTER the `LoggedIn` middleware.
func ShouldBeStudent(ctx *gin.Context) {
	idType := ctx.GetString("id_type")

	if idType != "Student" {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"error": "your account doesn't have the necessary permissions to access this resource -- must be student",
		})
		return
	}
}

// Place this middleware AFTER the `LoggedIn` middleware.
func ShouldBeStaff(ctx *gin.Context) {
	idType := ctx.GetString("id_type")

	if idType != "Staff" {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"error": "your account doesn't have the necessary permissions to access this resource -- must be staff",
		})
		return
	}
}

// Place this middleware AFTER the `LoggedIn` middleware.
func ShouldBeTeacher(ctx *gin.Context) {
	idType := ctx.GetString("id_type")

	if idType != "Teacher" {
		ctx.AbortWithStatusJSON(http.StatusForbidden, gin.H{
			"error": "your account doesn't have the necessary permissions to access this resource -- must be staff",
		})
		return
	}
}
