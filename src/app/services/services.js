export async function listBooks(query) {
    const API_URL = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`;
    if (!query) {
        return []
    }

    try {
        const response = await fetch(API_URL)
        if (!response.ok) {
            throw new Error(`Erro na na busca: ${response.statusText}`)
        }
        const data = await response.json()
        console.log(data)
        return data.items || []
    } catch (error) {
        console.error('Erro na busca de livros', error)
        return []
    }
}

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

export async function getBookDetails(id) {
    if (!id) {
        throw new Erro('O ID do livro é necessário para buscar os detalhes')
    }
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)

        if (!response.ok) {
            throw new Error(`Erro ao buscar o livro ${response.statusText}`)
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição", error)
        throw error
    }
}
