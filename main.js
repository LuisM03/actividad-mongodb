const {MongoClient, } = require("mongodb")
const  {faker} = require("@faker-js/faker");
const {ObjectId} = require("mongodb");
const { obtenerDocumentosPiplines, deleteCollection } = require("./crud")



let uri = "mongodb+srv://admin:admin@container.qdz4bit.mongodb.net/?retryWrites=true&w=majority"

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const documento = {
        nombre: "John",
        descripcion: "Jhon es muy educado",
        responsable: "Si es responsable",
        fecha_creacion: new Date(),
        asignaturas: ["Ingles", "Filosofia"]
    }

    const result = await deleteCollection(client, "calificaciones")
    console.log(result)
  } finally {
  }
}
run().catch(console.dir);

