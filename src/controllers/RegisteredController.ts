import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { bookService } from "../Services/BookService";

export async function RegisteredController(app: FastifyInstance) {
  app.post(
    "/registeredBook",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const body = request.body as CreateBookType;

      await bookService.create(body)

      return reply.code(201).send();
    }
  );
  app.get(
    "/books/isbn/:isbn",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { isbn: string}
      const books = await bookService.getIsbn(params.isbn)

      return reply.code(200).send(books);
    }
  );

  app.get(
    "/books/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };

      const books = await bookService.getById(params.id);

      return reply.code(200).send(books);
    }
  );

  app.delete(
    "/books/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };

      await bookService.deleteById(params.id);

      return reply.code(204).send();
    }
  );

  app.patch(
    "/books/:id",
    async (request: FastifyRequest, reply: FastifyReply) => {
      const params = request.params as { id: string };
      const body = request.body as { authors: string[] };

      await bookService.updateAuthor(params.id, body.authors);

      return reply.code(200).send();
    }
  );
}