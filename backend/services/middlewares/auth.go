package middlewares

import (
	"net/http"

	"github.com/go-chi/jwtauth"
	"github.com/mrsafalpiya/library-management/utils"
)

// Place this middleware AFTER the `JWT` middleware.
func ShouldBeStudent(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, claims, _ := jwtauth.FromContext(r.Context())
		idType := claims["id_type"].(string)

		if idType != "Student" {
			utils.ResponseForbiddenErr(w, "your account does not have the necessary permissions to access this resource -- must be student")
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Place this middleware AFTER the `JWT` middleware.
func ShouldBeStaff(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, claims, _ := jwtauth.FromContext(r.Context())
		idType := claims["id_type"].(string)

		if idType != "Staff" {
			utils.ResponseForbiddenErr(w, "your account does not have the necessary permissions to access this resource -- must be staff")
			return
		}

		next.ServeHTTP(w, r)
	})
}

// Place this middleware AFTER the `JWT` middleware.
func ShouldBeTeacher(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		_, claims, _ := jwtauth.FromContext(r.Context())
		idType := claims["id_type"].(string)

		if idType != "Teacher" {
			utils.ResponseForbiddenErr(w, "your account does not have the necessary permissions to access this resource -- must be teacher")
			return
		}

		next.ServeHTTP(w, r)
	})
}
