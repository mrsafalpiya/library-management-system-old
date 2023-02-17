package student

import (
	"database/sql"
	"math"
	"net/http"
	"time"

	"github.com/dustin/go-humanize"
	"github.com/gin-gonic/gin"
)

type Transaction struct {
	Type           string    `json:"type"`
	BookName       string    `json:"book_name"`
	DateTime       time.Time `json:"date_time"`
	DateTimeString string    `json:"date_time_string"`
}

func handleDashboard(db *sql.DB) gin.HandlerFunc {
	return func(ctx *gin.Context) {
		userID := ctx.GetInt64("user_id")

		type Borrow struct {
			RegisterID    string    `json:"register_id"`
			Title         string    `json:"title"`
			Author        string    `json:"author"`
			Publisher     string    `json:"publisher"`
			IssueDate     time.Time `json:"issue_date"`
			DueDate       time.Time `json:"due_date"`
			DueDateString string    `json:"due_date_string"`
			IsLate        bool      `json:"is_late"`
		}

		output := struct {
			User struct {
				Name   string  `json:"name"`
				IDNum  string  `json:"id_num"`
				IDType string  `json:"id_type"`
				Batch  *string `json:"batch"`
			} `json:"user"`
			Transactions []Transaction `json:"transactions"`
			Borrows      struct {
				BorrowsCount   int64    `json:"borrows_count"`
				HasLateBorrows bool     `json:"has_late_borrows"`
				List           []Borrow `json:"list"`
			} `json:"borrows"`
		}{}

		// Query about the user

		userQuery := `
			SELECT users.name, users.id_num, id_types.id_type, batches.name
			FROM users
			JOIN id_types ON id_types.id = users.id_type_id
			JOIN profiles ON profiles.user_id = users.id
			LEFT OUTER JOIN batches ON batches.id = profiles.batch_id
			WHERE users.id = $1;`
		row := db.QueryRow(userQuery, userID)
		err := row.Scan(&output.User.Name, &output.User.IDNum, &output.User.IDType, &output.User.Batch)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}

		// Query about the transactions

		transactionsQuery := `
			SELECT transactions.transaction_type, books.title, created_at
			FROM transactions
			JOIN copies ON copies.id = transactions.copy_id
			JOIN books ON books.id = copies.book_id
			WHERE user_id = $1
			ORDER BY transactions.id DESC
			LIMIT 4;`
		rows, err := db.Query(transactionsQuery, userID)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		for rows.Next() {
			transaction := Transaction{}

			err := rows.Scan(&transaction.Type, &transaction.BookName, &transaction.DateTime)
			if err != nil {
				ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			output.Transactions = append(output.Transactions, transaction)
		}

		// Query about the borrows

		borrowsQuery := `
			SELECT copies.register_id, books.title, books.author, books.publisher, borrows.created_at
			FROM borrows
			JOIN copies ON copies.id = borrows.copy_id
			JOIN books ON books.id = copies.book_id
			WHERE borrows.user_id = $1;`
		rows, err = db.Query(borrowsQuery, userID)
		if err != nil {
			ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
				"error": err.Error(),
			})
			return
		}
		for rows.Next() {
			borrow := Borrow{}

			err := rows.Scan(&borrow.RegisterID, &borrow.Title, &borrow.Author, &borrow.Publisher, &borrow.IssueDate)
			if err != nil {
				ctx.IndentedJSON(http.StatusInternalServerError, gin.H{
					"error": err.Error(),
				})
				return
			}

			output.Borrows.List = append(output.Borrows.List, borrow)
		}

		// Process borrows

		for i := range output.Borrows.List {
			output.Borrows.BorrowsCount++
			dueDate := output.Borrows.List[i].IssueDate.Add(30 * 24 * time.Hour) // 1 month
			output.Borrows.List[i].DueDate = dueDate
			output.Borrows.List[i].DueDateString = humanize.Time(dueDate)
			if output.Borrows.List[i].DueDate.Before(time.Now()) {
				output.Borrows.List[i].IsLate = true
				output.Borrows.HasLateBorrows = true
			}
		}

		// Process transactions

		for i := range output.Transactions {
			dateTime := output.Transactions[i].DateTime
			output.Transactions[i].DateTimeString = humanize.Time(dateTime)
		}

		ctx.IndentedJSON(http.StatusOK, output)
	}
}

func handleListTransactions(db *sql.DB) gin.HandlerFunc {
	input := struct {
		Type string `form:"type"`
		Size int32  `form:"size"`
		Page int32  `form:"page"`
	}{}

	paginationMeta := struct {
		CurrentPage  int `json:"current_page"`
		PageSize     int `json:"page_size"`
		FirstPage    int `json:"first_page"`
		LastPage     int `json:"last_page"`
		TotalRecords int `json:"total_records"`
	}{}

	return func(ctx *gin.Context) {
		userID := ctx.GetInt64("user_id")

		if err := ctx.ShouldBindQuery(&input); err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}
		// Default values
		if input.Type == "" {
			input.Type = ".*"
		}
		if input.Size == 0 {
			input.Size = 5
		}
		if input.Page == 0 {
			input.Page = 1
		}

		query := `
			SELECT transactions.transaction_type, books.title, created_at
			FROM transactions
			JOIN copies ON copies.id = transactions.copy_id
			JOIN books ON books.id = copies.book_id
			WHERE user_id = $1 AND transaction_type ~* $2
			ORDER BY created_at desc
			LIMIT $3
			OFFSET $4;`
		args := []any{
			userID,
			input.Type,
			input.Size,
			(input.Page - 1) * input.Size,
		}

		rows, err := db.Query(query, args...)
		if err != nil {
			ctx.IndentedJSON(http.StatusBadRequest, gin.H{
				"error": err.Error(),
			})
			return
		}

		transactions := []Transaction{}
		for rows.Next() {
			transaction := Transaction{}

			err := rows.Scan(&transaction.Type, &transaction.BookName, &transaction.DateTime)
			if err != nil {
				ctx.IndentedJSON(http.StatusBadRequest, gin.H{
					"error": err.Error(),
				})
				return
			}
			transaction.DateTimeString = humanize.Time(transaction.DateTime)

			transactions = append(transactions, transaction)
		}

		// Query for pagination metadata

		query = `
			SELECT COUNT(*)
			FROM transactions
			JOIN copies ON copies.id = transactions.copy_id
			JOIN books ON books.id = copies.book_id
			WHERE user_id = $1 AND transaction_type ~* $2;`
		row := db.QueryRow(query, userID, input.Type)
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
			"metadata":     paginationMeta,
			"transactions": transactions,
		})
	}
}
