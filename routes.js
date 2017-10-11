const nextRoutes = require('next-routes');

const routes = module.exports = nextRoutes();

routes.add('index', '/');
routes.add('about', '/about');

routes.add('places', '/places');
routes.add('place', '/places/:slug');

routes.add('placeNew', '/places/new');
routes.add('eventNew', '/events/new');

routes.add('placeEdit', '/places/:slug/edit');
routes.add('eventEdit', '/events/:slug/edit');

routes.add('placesDelete', '/places/:slug/delete');
routes.add('eventDelete', '/events/:slug/delete');
