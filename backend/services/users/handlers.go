package users

import (
	"database/sql"
	"errors"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mrsafalpiya/library-management/db"
	sqlc "github.com/mrsafalpiya/library-management/db/sqlc"
	"github.com/mrsafalpiya/library-management/utils"
	"golang.org/x/crypto/bcrypt"
)

func handleCreate(queries *sqlc.Queries) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		// Input request

		var input struct {
			IDTypeID *int64 `json:"id_type_id"`
			IDNum    string `json:"id_num" binding:"required"`
			Name     string `json:"name" binding:"required"`
			Password string `json:"password" binding:"required"`
		}

		if err := utils.ReadJSON(ctx, &input); err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": utils.ValidatorErrMsg(err),
			})
			return
		}

		// Check if the given id type exists

		if input.IDTypeID != nil {
			_, err := queries.GetIDType(ctx, *input.IDTypeID)
			if err != nil {
				switch {
				case errors.Is(err, sql.ErrNoRows):
					ctx.IndentedJSON(http.StatusForbidden, gin.H{"id_type_id": "id type of the given id doesn't exist"})
				default:
					ctx.IndentedJSON(http.StatusForbidden, gin.H{"error": db.DBErrorString(err)})
				}

				return
			}
		}

		// Fill new user params

		passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), 12)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": "Couldn't process your request",
			})
		}

		args := sqlc.CreateUserParams{
			IDNum:          input.IDNum,
			Name:           input.Name,
			PasswordHashed: string(passwordHash),
		}
		if input.IDTypeID != nil {
			args.IDTypeID.Int64 = *input.IDTypeID
			args.IDTypeID.Valid = true
		}

		// Create new user

		newUser, err := queries.CreateUser(ctx, args)
		if err != nil {
			ctx.IndentedJSON(http.StatusForbidden, gin.H{"error": db.DBErrorString(err)})
			return
		}

		// Also create a profile for the user

		_, err = queries.CreateProfile(ctx, sqlc.CreateProfileParams{
			UserID: sql.NullInt64{
				Int64: newUser.ID,
				Valid: true,
			},
		})
		if err != nil {
			ctx.IndentedJSON(http.StatusForbidden, gin.H{"error": db.DBErrorString(err)})
			return
		}

		response := struct {
			ID    int64  `json:"id"`
			IDNum string `json:"id_num"`
			Name  string `json:"name"`
		}{
			ID:    newUser.ID,
			IDNum: newUser.IDNum,
			Name:  newUser.Name,
		}

		ctx.IndentedJSON(http.StatusOK, gin.H{"response": response})

	}
}

func handleUser(db *sql.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.GetInt64("user_id")

		var output struct {
			Name   string `json:"name"`
			IDType string `json:"id_type"`
		}

		query := `
			SELECT users.name, id_types.id_type
			FROM users
			JOIN id_types ON id_types.id = users.id_type_id
			WHERE users.id = $1`

		row := db.QueryRow(query, userID)
		err := row.Scan(&output.Name, &output.IDType)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": err,
			})
			return
		}

		ctx.IndentedJSON(http.StatusOK, output)
	}
}
