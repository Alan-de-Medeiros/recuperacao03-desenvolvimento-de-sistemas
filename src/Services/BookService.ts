import { randomUUID } from "crypto";
import { prisma } from "../prisma/client";
import { Books } from "@prisma/client";

class BookService {
    public async create(book: CreateBookType) {
        const bookExist = await prisma.books.findUnique({
            where: { isbn: book.isbn }
        });
        if (bookExist !== null) {
            throw new Error("JÁ EXISTE UM LIVRO COM ESSE TITULO")
        }

        const Books = {
            id: randomUUID(),
            isbn: book.isbn,   
            title: book.title,
            authors: book.authors,
            publication_year: book.publication_year,
            page_count: book.page_count,
            is_active: true,
            created_at: new Date(),
            updated_at: new Date()
        } as Books;

        await prisma.books.create({ data: Books });
    }

    public async getIsbn(isbn: string) {
        return await prisma.books.findMany({
            where: { isbn: isbn },  
        });
    }

    public async getById(id: string) {
        return await prisma.books.findUnique({
            where: { id: id }
        })
    }

    public async deleteById(id: string) {
        const updateBook = {
            is_active: false,
            updated_at: new Date()
        }
       
        await prisma.books.update({
            where: { id: id },
            data: updateBook
        })
    }

    public async updateAuthor(id: string, techs: string[]) {
        await prisma.books.update({
            where: { id: id },
            data: {
                authors: techs,
                updated_at: new Date()
            }
        })
    }
}

export const bookService = new BookService();