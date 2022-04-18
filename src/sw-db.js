// Utilidades para grabar PouchDB
const db = new PouchDB('monedas');


function guardarMoneda( moneda ) {

    moneda._id = new Date().toISOString();

    return db.put( moneda ).then( () => {

        //self.registration.sync.register('nuevo-post');

        const newResp = { ok: true, offline: true };

        return new Response( JSON.stringify(newResp) );

    });

}


// Postear monedas a la API
/*function postearmonedas() {

    const posteos = [];

    return db.allDocs({ include_docs: true }).then( docs => {


        docs.rows.forEach( row => {

            const doc = row.doc;

            const fetchPom =  fetch('api', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify( doc )
                }).then( res => {

                    return db.remove( doc );

                });
            
            posteos.push( fetchPom );


        }); // fin del foreach

        return Promise.all( posteos );

    });





}

*/