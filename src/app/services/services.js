export async function searchBooks(search) {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(search)}`;

    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error('Erro na requição')
        }
        const data = await response.json()
        return data.items || []
    } catch (error) {
        console.error('Erro na requisição', error)
    }
}