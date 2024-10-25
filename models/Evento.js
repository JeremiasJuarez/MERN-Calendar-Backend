const { Schema, model } = require('mongoose');

const EventoSchema = Schema({

    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    }

});


//Para cambiarle el key al objeto que retorna al guardar un modelo, usamos este codigo
// cuando se llame un metodo del constructor del modelo, lo que por defecto es _id se llamara id
// y quitamos el __V que coresponde a la version del modelo.
EventoSchema.method('toJSON', function(){
    const { __v, _id, ...object } = this.toObject()

    object.id = _id;
    return object;
})

module.exports = model('Evento', EventoSchema )