package books

import (
	"database/sql"
	"fmt"
	"math"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/mrsafalpiya/library-management/utils"
)

func handleListBooks(db *sql.DB) gin.HandlerFunc {
	type Book struct {
		ID        int64  `json:"id"`
		Code      string `json:"code"`
		Title     string `json:"title"`
		Author    string `json:"author"`
		Publisher string `json:"publisher"`
	}

	input := struct {
		Size   int32  `form:"size"`
		Page   int32  `form:"page"`
		Sort   string `form:"sort"`
		Search string `form:"search"`
	}{}

	paginationMeta := struct {
		CurrentPage      int `json:"current_page"`
		PageSize         int `json:"page_size"`
		FirstPage        int `json:"first_page"`
		LastPage         int `json:"last_page"`
		TotalRecords     int `json:"total_records"`
		PageRecordsCount int `json:"page_records_count"`
	}{}

	return func(ctx *gin.Context) {
		if err := ctx.ShouldBindQuery(&input); err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Default values

		if input.Size == 0 {
			input.Size = 10
		}
		if input.Page == 0 {
			input.Page = 1
		}
		if input.Sort == "" {
			input.Sort = "title-asc"
		}
		paginationMeta.PageRecordsCount = 0

		// Set sort

		sortQuery1, sortQuery2, err := utils.GetSortQuery(input.Sort, "code", "title", "author", "publisher")
		if err == utils.ErrInvalidSortQuery {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": "invalid sort query",
			})
			return
		}

		query := fmt.Sprintf(`
			SELECT *
			FROM books
			WHERE to_tsvector('english', title) @@ to_tsquery('english', $3) or $3 = ''
			ORDER BY %s %s
			LIMIT $1
			OFFSET $2;`, sortQuery1, sortQuery2)
		args := []any{
			input.Size,
			(input.Page - 1) * input.Size,
			input.Search,
		}

		rows, err := db.Query(query, args...)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		books := []Book{}
		for rows.Next() {
			book := Book{}

			err := rows.Scan(&book.ID, &book.Code, &book.Title, &book.Author, &book.Publisher)
			if err != nil {
				ctx.IndentedJSON(http.StatusBadRequest, gin.H{
					"error": err.Error(),
				})
				return
			}

			books = append(books, book)
			paginationMeta.PageRecordsCount++
		}

		// Query for pagination metadata

		query = `
			SELECT COUNT(*)
			FROM books
			WHERE to_tsvector('english', title) @@ to_tsquery('english', $1) or $1 = ''`
		row := db.QueryRow(query, input.Search)
		err = row.Scan(&paginationMeta.TotalRecords)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Calculate pagination metadata

		paginationMeta.CurrentPage = int(input.Page)
		paginationMeta.PageSize = int(input.Size)
		paginationMeta.FirstPage = 1
		paginationMeta.LastPage = int(math.Ceil(float64(paginationMeta.TotalRecords) / float64(paginationMeta.PageSize)))

		ctx.IndentedJSON(http.StatusOK, gin.H{
			"metadata": paginationMeta,
			"books":    books,
		})
	}
}
