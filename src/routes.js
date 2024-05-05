const { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNodeByIdHandler, deleteNoteByIdHandler } = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    // pada specific routes
    options: {
      cors: {
        origin: ['*'],
      },
    },
  },
  {
    method: "GET",
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: "GET",
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: "PUT",
    path: '/notes/{id}',
    handler: editNodeByIdHandler,
  },
  {
    method: "DELETE",
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  }
]

module.exports = routes;