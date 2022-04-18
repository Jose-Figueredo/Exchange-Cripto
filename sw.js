// imports
importScripts('https://cdn.jsdelivr.net/npm/pouchdb@7.0.0/dist/pouchdb.min.js')

//importScripts('./src/sw-db.js');
//importScripts('./src/sw-utils.js');


const STATIC_CACHE    = 'static-v3';
const DYNAMIC_CACHE   = 'dynamic-v1';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    '/',
    'index.html',
    '/src/App.vue',
    'main.js',
    'router.js',
    'filter.js',
    '/src/components/PxButton.vue',
    '/src/components/PxIcon.vue',
    '/src/components/PxHeader.vue',
    '/src/components/PxAssetsTable.vue',
    '/src/views/About.vue',
    '/src/views/CoinDetail.vue',
    '/src/views/Error.vue',
    '/src/views/Home.vue',
    'assets/css/tailwind.css',
    'assets/logo.png',
    

];

const APP_SHELL_INMUTABLE = [
];



self.addEventListener('install', e => {


    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));





    e.waitUntil( Promise.all([ cacheStatic ])  );

});


self.addEventListener('activate', e => {

    const respuesta = caches.keys().then( keys => {

        keys.forEach( key => {

            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            }

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});





self.addEventListener( 'fetch', e => {

    let respuesta;
    const offlineResp= new Response(`Necesitas internet para usar la app`);
    if ( e.request.url.includes('/api') ) {


         respuesta= fetch(e.request)
        .then( res => { return res} )
        .catch( () => {
            return offlineResp} 
            );
     



    } else {

        respuesta = caches.match( e.request ).then( res => {

            if ( res ) {
                
               
                return res;
                
            } else {
    
                return fetch( e.request ).then( newRes => {
    
                    return newRes;
    
                });
    
            }
    
        });

    }

    e.respondWith( respuesta );

});


// tareas asíncronas
self.addEventListener('sync', e => {

    console.log('SW: Sync');

    if ( e.tag === 'nuevo-post' ) {

        // postear a BD cuando hay conexión
     //   const respuesta = postearMensajes();
        
        //e.waitUntil( respuesta );
    }

});


// Guardar  en el cache dinamico
function actualizaCacheDinamico( dynamicCache, req, res ) {


    if ( res.ok ) {

        return caches.open( dynamicCache ).then( cache => {

            cache.put( req, res.clone() );
            
            return res.clone();

        });

    } else {
        return res;
    }

}
