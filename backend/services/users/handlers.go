package users

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"

	"github.com/go-chi/jwtauth"
	"github.com/mrsafalpiya/library-management/db"
	sqlc "github.com/mrsafalpiya/library-management/db/sqlc"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/utils"
	"golang.org/x/crypto/bcrypt"
)

func handleCreate(srvCfg *server.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Input request

		var input struct {
			IDTypeID int64  `json:"id_type_id" validate:"required"`
			IDNum    string `json:"id_num" validate:"required"`
			Name     string `json:"name" validate:"required"`
			Password string `json:"password" validate:"required"`
		}

		if err := utils.RequestJSON(r, &input); err != nil {
			utils.ResponseBadRequestErr(w, err.Error())
			return
		}

		if err := srvCfg.Validator.Struct(input); err != nil {
			utils.ResponseBadRequestErr(w, utils.ValidatorErrMsg(err))
			return
		}

		// Check if the given id type exists

		_, err := srvCfg.Queries.GetIDType(r.Context(), input.IDTypeID)
		if err != nil {
			switch {
			case errors.Is(err, sql.ErrNoRows):
				utils.ResponseForbiddenErr(w, utils.Envelope{
					"id_type_id": fmt.Sprintf("id type of the given id '%d' does not exist", input.IDTypeID),
				})
			default:
				utils.ResponseForbiddenErr(w, db.DBErrorString(err))
			}

			return
		}

		// Fill new user params

		passwordHash, err := bcrypt.GenerateFromPassword([]byte(input.Password), 12)
		if err != nil {
			utils.ResponseServerErrorLog(w, err)
			return
		}

		args := sqlc.CreateUserParams{
			IDTypeID:       input.IDTypeID,
			IDNum:          input.IDNum,
			Name:           input.Name,
			PasswordHashed: string(passwordHash),
		}

		// Create new user

		newUser, err := srvCfg.Queries.CreateUser(r.Context(), args)
		if err != nil {
			utils.ResponseForbiddenErr(w, db.DBErrorString(err))
			return
		}

		// Also create a profile for the user

		_, err = srvCfg.Queries.CreateProfile(r.Context(), sqlc.CreateProfileParams{
			UserID: sql.NullInt64{
				Int64: newUser.ID,
				Valid: true,
			},
		})
		if err != nil {
			utils.ResponseForbiddenErr(w, db.DBErrorString(err))
			return
		}

		// Create response

		response := struct {
			ID    int64  `json:"id"`
			IDNum string `json:"id_num"`
			Name  string `json:"name"`
		}{
			ID:    newUser.ID,
			IDNum: newUser.IDNum,
			Name:  newUser.Name,
		}

		utils.ResponseOKData(w, utils.Envelope{
			"response": response,
		})
	}
}

func handleUser(srvCfg *server.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		_, claims, _ := jwtauth.FromContext(r.Context())
		userID := claims["user_id"].(float64)

		var output struct {
			Name   string `json:"name"`
			IDType string `json:"id_type"`
		}

		query := `
			SELECT users.name, id_types.id_type
			FROM users
			JOIN id_types ON id_types.id = users.id_type_id
			WHERE users.id = $1`

		row := srvCfg.DbConn.QueryRow(query, userID)
		err := row.Scan(&output.Name, &output.IDType)
		if err != nil {
			utils.ResponseServerErrorLog(w, err)
			return
		}

		utils.ResponseOKData(w, output)
	}
}
