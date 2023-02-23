package idTypes

import (
	"net/http"

	"github.com/mrsafalpiya/library-management/server"
	"github.com/mrsafalpiya/library-management/utils"
)

func handleGet(srvCfg *server.Config) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idTypes, err := srvCfg.Queries.ListIDTypes(r.Context())
		if err != nil {
			utils.ResponseServerErrorLog(w, err)
			return
		}

		utils.ResponseOKData(w, utils.Envelope{
			"id_types": idTypes,
		})
	}
}
