# Draggable Document Cards - Grid Layout

A Vite React application featuring drag and drop functionality for document cards in a grid layout. This project uses **React Beautiful DND** for drag and drop, **Tailwind CSS** for styling, and **TypeScript** for type safety.

## Clone Repository

To get started with this project, follow these steps:

```
git clone https://github.com/saran13raj/draggable-cards.git
cd draggable-cards
pnpm i
pnpm dev
```

**Clear local storage if you face any issues with drag and drop.**

## Features

### Drag and Drop to Reorder Documents

-   Drag and drop cards within a grid layout
-   Uses react-beautiful-dnd for a well-maintained and tested drag-and-drop solution
-   Avoids over-engineering by leveraging an established package

### View Document Detail

-   Click on a card to view an expanded view of the content image
-   Press ESC or click outside the modal to close
-   Utilizes @headlessui/react modal component

### Auto Save

-   Automatically calls the API with updated document order every 5 seconds
-   Displays a loader when the API call is pending
-   Skips API calls if no order change is detected
-   Uses MSW (Mock Service Worker) to mock API calls to https://saran13raj.com/draggable-cards
-   Implements axios for making API calls

## API Design

## Document Type Definition

```typescript
type Document = {
	id: string;
	type: string;
	title: string;
	position: number;
	image: string;
};
```

## API Endpoints

### 1. List All Documents

-   **API Name**: Get All Documents
-   **Endpoint**: `GET /api/documents`
-   **Description**: Retrieves a list of all documents.
-   **Request Body**: None
-   **Response**:
    ```json
    {
      "data": Document[]
    }
    ```

### 2. Update Document Order

-   **API Name**: Update Document Order
-   **Endpoint**: `PUT /api/documents/order`
-   **Description**: Updates the order of documents based on drag-and-drop reordering.
-   **Request Body**:
    ```json
    {
      "documents": Document[]
    }
    ```
-   **Response**:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```

### 3. Remove Document

-   **API Name**: Remove Document
-   **Endpoint**: `DELETE /api/documents/{id}`
-   **Description**: Removes a document from the list by its ID.
-   **Request Body**: None
-   **Response**:
    ```json
    {
      "success": boolean,
      "message": string
    }
    ```

### 4. Add Document

-   **API Name**: Add Document
-   **Endpoint**: `POST /api/documents`
-   **Description**: Adds a new document to the list.
-   **Request Body**:
    ```json
    {
      "type": string,
      "title": string,
      "image": string
    }
    ```
-   **Response**:
    ```json
    {
      "success": boolean,
      "message": string,
      "data": Document
    }
    ```

### 5. Update Document

-   **API Name**: Update Document
-   **Endpoint**: `PUT /api/documents/{id}`
-   **Description**: Updates a document's values in the list by its ID.
-   **Request Body**:
    ```json
    {
      "type": string,
      "title": string,
      "image": string
    }
    ```
-   **Response**:
    ```json
    {
      "success": boolean,
      "message": string,
      "data": Document
    }
    ```

**Enhancement Suggestion:** Add `createdAt`, `updatedAt` timestamps to the document to track document changes.

**Note:** All endpoints will return appropriate HTTP status codes (e.g., 200 for success, 404 for not found, 400 for bad request, etc.) along with the responses described above.

## Long-Term Maintenance Considerations

### Pagination

List endpoints support pagination using query parameters:

-   `page`: Page number (default: 1)
-   `per_page`: Items per page (default: 20, max: 100)

### Error Handling

All endpoints return consistent error responses:

```json
{
	"error": {
		"code": "ERROR_CODE",
		"message": "Human-readable error message",
		"details": {} // Optional additional error details
	}
}
```

### Rate Limiting

API requests are rate-limited to 100 requests per minute per API key. Rate limit information is included in the response headers:

-   `X-RateLimit-Limit`: The number of allowed requests in the current period
-   `X-RateLimit-Remaining`: The number of remaining requests in the current period
-   `X-RateLimit-Reset`: The time at which the current rate limit window resets

---

1. **API Documentation**: Maintain comprehensive API documentation using tools like Swagger/OpenAPI. Include example requests and responses for each endpoint.

2. **Security**: Regularly update dependencies, perform security audits, and consider implementing authentication.

3. **Deprecation Policy**: When introducing breaking changes, maintain the old endpoint for a set period (e.g., 6 months) before removing it.

4. **Monitoring and Logging**: Implement comprehensive logging and monitoring to track API usage, performance metrics, and errors.

5. **Testing**: Maintain a comprehensive test suite including unit tests, integration tests, and end-to-end tests for all API endpoints.

6. **Database Indexes**: Ensure proper database indexes are in place for frequently queried fields (e.g., `id`, `position`) to maintain performance as the dataset grows.

7. **Caching**: Implement caching strategies (e.g., Redis) for frequently accessed, rarely changing data to reduce database load.

8. **Bulk Operations**: For future scalability, consider adding endpoints for bulk create, update, and delete operations.
