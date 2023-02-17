package auth

import (
	"database/sql"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v4"
	sqlc "github.com/mrsafalpiya/library-management/db/sqlc"
	"github.com/mrsafalpiya/library-management/utils"
	"golang.org/x/crypto/bcrypt"
)

const SecretKey = "secret" // TODO: Read SecretKey from environmental variables

func handleLogin(queries *sqlc.Queries) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		input := struct {
			IDType   int64  `json:"id_type" binding:"required"`
			IDNum    string `json:"id_num" binding:"required"`
			Password string `json:"password" binding:"required"`
		}{}

		if err := utils.ReadJSON(ctx, &input); err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": utils.ValidatorErrMsg(err),
			})
			return
		}

		// Query the user

		user, err := queries.GetUserOfIDNum(ctx, input.IDNum)
		if err != nil {
			if err == sql.ErrNoRows {
				ctx.IndentedJSON(http.StatusBadRequest, gin.H{
					"error": "user with the given ID number doesn't exist",
				})
				return
			}
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Query the ID type

		idType, err := queries.GetIDType(ctx, user.IDTypeID.Int64)
		if err != nil {
			if err == sql.ErrNoRows {
				ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
					"error": "user's ID type is invalid",
				})
				return
			}
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Check if the user belongs to the given ID type

		if user.IDTypeID.Int64 != input.IDType {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": "user doesn't belong to the given ID type",
			})
			return
		}

		// Check if the password is correct

		err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHashed), []byte(input.Password))
		if err != nil {
			ctx.IndentedJSON(http.StatusBadGateway, gin.H{
				"error": "incorrect password",
			})
			return
		}

		// Generate JWT

		claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
			"user_id": user.ID,
			"id_type": idType.IDType,
			"exp":     time.Now().Add(time.Hour * 24).Unix(),
		})
		token, err := claims.SignedString([]byte(SecretKey))
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": "couldn't login",
			})
		}

		ctx.SetCookie("jwt", token, 24*int(time.Hour.Seconds()), "", "", false, true)

		ctx.IndentedJSON(http.StatusOK, gin.H{
			"message": "success",
		})
	}
}

func handleLogout(ctx *gin.Context) {
	ctx.SetCookie("jwt", "", -int(time.Hour.Seconds()), "", "", true, true)

	ctx.IndentedJSON(http.StatusOK, gin.H{
		"message": "success",
	})
}
