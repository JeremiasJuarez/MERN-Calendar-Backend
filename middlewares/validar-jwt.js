const { response } = require('express');
const jwt = require('jsonwebtoken')

const validarJWT = ( req, res = response, next ) =>{

    // x-token en los headers. leer headers con express
    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la validacion'
        })
    }

    try {
        
        // lo mismo que hacer const payload=jwt.verify... etc. Desestructuramos del payload name y uid
        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED,
        );

        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no Valido'
        })
    }

    next()

};

module.exports = {
    validarJWT
};