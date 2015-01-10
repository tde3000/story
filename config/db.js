mongodb_connection_string = 'mongodb://127.0.0.1:27017/' + 'storytime';
        if(process.env.OPENSHIFT_MONGODB_DB_URL){
            mongodb_connection_string = process.env.OPENSHIFT_MONGODB_DB_URL;
        }

module.exports = {
        url: mongodb_connection_string
	}