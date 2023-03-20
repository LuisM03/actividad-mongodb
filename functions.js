let asignaturas = []
for(let i = 0; i < 5; i++){
    asignaturas.push(faker.name.jobArea())
}
for(let i = 0; i < 100; i++){
    const area = {
        nombre: faker.name.firstName(),
        descripcion: faker.lorem.text(),
        responsable: faker.name.fullName(),
        fecha_creacion: faker.date.recent(),
        asignaturas: asignaturas,
    }

    const result = await agregarArea(database, "areas", area)
}


for(let i = 0; i < 100; i++){
    const estudiante = {
        nombre_completo: faker.name.fullName(),
        numero_identificacion: faker.phone.imei(),
        fecha_nacimiento: faker.date.birthdate({min: 11, max: 28, mode: 'age'}),
        asignaturas: asignaturas,
        contacto_padres: faker.name.fullName()
    }

    const result = await agregarEstudiantes(database, "estudiantes", estudiante)
}


for(let i = 0; i < 100; i++){
    const calificacion = {
        asignatura: faker.name.jobArea(),
        alumno: faker.name.fullName(),
        nota: parseFloat(faker.datatype.float({min: 1, max:10,precision: 0.01})),
        fecha_evaluacion: faker.date.recent(),
        comentarios: faker.lorem.paragraph()
    }

    const result = await agregarCalificacion(database, "calificaciones", calificacion)
}

