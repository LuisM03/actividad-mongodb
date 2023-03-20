//--> Operaciones - CRUD
// -> find() - limit()
const obtenerDocumentos = (client, collection,limit=10) => {
    
    try {
        const results = client.db("classify").collection(collection).find().limit(limit).toArray()
        return results
    }catch(error) {
        console.log(error)
    }
}

// -> findOne()
const obtenerDocumento = (client, collection,id_documeno) => {
    try {
        const result = client.db("classify").collection(collection).findOne({"_id": new ObjectId(id_documeno)})
        return result
    }catch(error) {
        console.log(error)
    }
}

// -> insertOne()
const agregarDocumento = (client, collection, documento) => {
    try {
        const result = client.db("classify").collection(collection).insertOne(documento)
        console.log(`El documento fue agregado con exito!`)
    } catch (error) {
        console.log(error)
    }
}

// -> insertMany()
const agregarDocumentos = (client, collection, documentos) => {
    try {
        const result = client.db("classify").collection(collection).insertMany(documentos)
        console.log(`Documentos agregados con exito!`)
    } catch (error) {
        console.log(error)
    }
}

// -> updateOne - $upsert = true && $upsert = false
const updateDocumento = (client, collection, updatedDocumento, id_documento) => {
    try {
        // const result = client.db("classify").collection(collection).updateOne({"_id": new ObjectId(id_area)}, {$set: updatedDocumento})
        const result = client.db("classify").collection(collection).updateOne({"_id": new ObjectId(id_documento)}, {$set: updatedDocumento}, {upsert: true})
        console.log(`Documento ${id_area} actualizado con exito!`)
    } catch (error) {
        console.log(error)
    }
}

// -> deleteOne()
const deleteDocumento = (client, collection, id_documento) => {
    try {
        const result = client.db("classify").collection(collection).deleteOne({"_id": new ObjectId(id_documento)})
        console.log(`Documento ${id_area} eliminado con exito!`)
    } catch (error) {
        console.log(error)
    }
}

// -> deleteMany()
const deleteDocumentos = (client, collection, condicion) => {
    try {
        const result = client.db("classify").collection(collection).deleteMany(condicion)
        console.log("Documentos eliminados")
    } catch (error) {
        console.log(error)
    }
}

// -> drop()
const deleteCollection = (client, collection) => {
    try {
        const result = client.db("classify").collection(collection).drop()
        console.log("Coleccion " + collection + "eliminada con exito")
        return result
    } catch (error) {
        console.log(error)
    }
}

// -> dropDatabase()
const deleteDatabase = (client) => {
    try {
        const result = client.db("classify").dropDatabase()
        console.log("Base de datos eliminada")
    } catch (error) {
        console.log(error)
    }
}

// -> Ejemplos de $lookup
const obtenerDocumentoLookup = (client, collection, collectionUnir, localField, foreignField, as) => {
    try {
        const result = client.db("classify").collection(collection).aggregate([
            {
                $lookup: {
                    from: collectionUnir,
                    localField: localField,
                    foreignField: foreignField,
                    as: as
                }
            },
            {
                $match: {
                    $expr: { $gte: [{ $size: `$${as}` }, 1] }
                }
            }
        ])
        return result
    } catch (error) {
        console.log(error)
    }
}

// -> Ejemplo de piplines ->  Solo para la coleccion de calificaciones
const obtenerDocumentosPiplines = (client) => {
    try {
        const result = client.db("classify").collection("calificaciones").aggregate([
            { $match: { nota: {$gte: 7.0}}},
            { $project: { asignatura: 1, alumno: 1, _id: 0, nota: 1 } },
            { $sort: {alumno: -1} }
        ])
        return result
    } catch (error) {
        console.log(error)
    }
}

// -> Ejemplo de unwind ->  Solo para la coleccion de areas
const obtenerDocumentosUnWind = (client) => {
    try {
        const result = client.db("classify").collection("areas").aggregate([
            { $unwind: "$asignaturas"},
        ])
        return result
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    obtenerDocumento,
    obtenerDocumentos,
    agregarDocumento,
    agregarDocumentos,
    updateDocumento,
    deleteDocumento,
    deleteDocumentos,
    deleteCollection,
    deleteDatabase,
    obtenerDocumentoLookup,
    obtenerDocumentosPiplines,
    obtenerDocumentosUnWind
}