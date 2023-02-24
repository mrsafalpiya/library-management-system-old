package auth

import (
	"database/sql"
	"errors"
	"fmt"
	"net/http"
	"time"

	"github.com/mrsafalpiya/library-management/db"
	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/services/jwtAuth"
	"github.com/mrsafalpiya/library-management/utils"
	"golang.org/x/crypto/bcrypt"
)

func handleLogin(srvCfg *server.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Input

		input := struct {
			IDType   int64  `json:"id_type" validate:"required"`
			IDNum    string `json:"id_num" validate:"required"`
			Password string `json:"password" validate:"required"`
		}{}

		if err := utils.RequestJSON(r, &input); err != nil {
			utils.ResponseBadRequestErr(w, err.Error())
			return
		}

		if err := srvCfg.Validator.Struct(input); err != nil {
			utils.ResponseBadRequestErr(w, utils.ValidatorErrMsg(err))
			return
		}

		// Query the user

		user, err := srvCfg.Queries.GetUserOfIDNum(r.Context(), input.IDNum)
		if err != nil {
			switch {
			case errors.Is(err, sql.ErrNoRows):
				utils.ResponseForbiddenErr(w, fmt.Sprintf("user with the given ID number '%s' does not exist", input.IDNum))
			default:
				utils.ResponseForbiddenErr(w, db.DBErrorString(err))
			}

			return
		}

		// Query the ID type

		idType, err := srvCfg.Queries.GetIDType(r.Context(), user.IDTypeID)
		if err != nil {
			switch {
			case errors.Is(err, sql.ErrNoRows):
				utils.ResponseForbiddenErr(w, fmt.Sprintf("id type of the given id '%d' does not exist", input.IDType))
			default:
				utils.ResponseForbiddenErr(w, db.DBErrorString(err))
			}

			return
		}

		// Check if the user belongs to the given ID type

		if user.IDTypeID != input.IDType {
			utils.ResponseBadRequestErr(w, "user doesn't belong to the given ID type")
			return
		}

		// Check if the password is correct

		err = bcrypt.CompareHashAndPassword([]byte(user.PasswordHashed), []byte(input.Password))
		if err != nil {
			utils.ResponseUnauthorizedErr(w, "incorrect password")
			return
		}

		// Generate JWT

		expireAt := time.Now().Add(time.Hour * 24)

		_, tokenString, _ := jwtAuth.TokenAuth.Encode(map[string]interface{}{
			"user_id": user.ID,
			"id_type": idType.IDType,
			"exp":     expireAt.Unix(),
		})

		if err != nil {
			utils.ResponseServerErrorLog(w, err)
			return
		}

		utils.ResponseOKData(w, utils.Envelope{
			"token":   tokenString,
			"expires": expireAt,
		})
	}
}

func handleLogout(w http.ResponseWriter, r *http.Request) {
	http.SetCookie(w, &http.Cookie{
		Name:     "jwt",
		Expires:  time.Now().Add(-time.Hour),
		Secure:   false,
		HttpOnly: true,
	})

	utils.ResponseOKData(w, utils.Envelope{
		"message": "success",
	})
}
