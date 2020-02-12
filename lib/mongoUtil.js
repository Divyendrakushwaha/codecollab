// const MongoClient = require('mongodb').MongoClient

// class Connection {
//     static connectToMongo() {
//         if ( this.db ) return Promise.resolve(this.db)
//         return MongoClient.connect(this.url)
//             .then(db => this.db = db)
//     }
// }

// Connection.db = 'codet'
// Connection.url = 'mongodb+srv://karankhiani:KaranKhiani@m001-sandbox-lpcrf.mongodb.net/test?retryWrites=true&w=majority'
// // Connection.options = {
// //     bufferMaxEntries:   0,
// //     reconnectTries:     5000,
// //     useNewUrlParser: true
// // }

// module.exports = { Connection }
const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb+srv://karankhiani:KaranKhiani@m001-sandbox-lpcrf.mongodb.net/test?retryWrites=true&w=majority";

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
      _db  = client.db('codet');
      return callback( err );
    } );
  },

  getDb: function() {
    return _db;
  }
};