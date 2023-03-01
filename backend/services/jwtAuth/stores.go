package jwtAuth

import "github.com/go-chi/jwtauth"

var Token = jwtauth.New("HS256", []byte("secret"), nil)
