const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHandler = (request, h) => {
  const { title, tags, body } = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    title, tags, body, createdAt, updatedAt, id,
  }

  notes.push(newNote);

  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    }).code(201);
    console.log(notes);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  }).code(500);
  
  return response;
};

const getAllNotesHandler = (request, h) => {
  return h.response({
    status: "success",
    data: {
      notes,
    },
  }).code(200);
}

const getNoteByIdHandler = (request, h) => {
  const { id } = request.params;
  console.log("idnotes:", id);
  const note = notes.filter((n) => n.id === id)[0];
  if (note !== undefined) {
    return h.response({
      status: "success",
      data: {
        note,
      },
    }).code(200);
  }

  return h.response({
    status: "fail",
    message: "Catatan tidak ditemukan",
  }).code(404);
};

const editNodeByIdHandler = (request, h) => {
  const { id } = request.params;
  const note = notes.filter((n) => n.id === id)[0];

  if (note) {
    const { title, tags, body } = request.payload;

    if(title === undefined || title === "") {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Mohon isi judul catatan",
      }).code(400);
    }

    if (tags === undefined || tags === "") {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Mohon isi tag catatan",
      }).code(400);
    }

    if (body === undefined || body === "") {
      return h.response({
        status: "fail",
        message: "Gagal memperbarui catatan. Mohon isi body catatan",
      }).code(400);
    }

    const updatedAt = new Date().toISOString();
    note.title = title;
    note.tags = tags;
    note.body = body;
    note.updatedAt = updatedAt;

    return h.response({
      status: "success",
      message: "Catatan berhasil diperbarui",
    }).code(200);
  }

  return h.response({
    status: "fail",
    message: "Gagal memperbarui catatan. Id tidak ditemukan",
  }).code(404);

}

const deleteNoteByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    return h.response({
      status: "success",
      message: "Catatan berhasil dihapus",
    }).code(200);
  }

  return h.response({
    status: "fail",
    message: "Catatan gagal dihapus. Id tidak ditemukan",
  }).code(404);

}

module.exports = { addNoteHandler, getAllNotesHandler, getNoteByIdHandler, editNodeByIdHandler, deleteNoteByIdHandler };  