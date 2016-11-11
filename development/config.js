/* 
 HOMO = 'mongodb://10.32.223.4/susquare'
 PROD = 'mongodb://10.32.223.7/susquare'
 port 8888
*/

export default {
    databaseUrl: process.env.URL_MONGO || 'mongodb://localhost/' ,
    databaseUrl: process.env.URL_MONGO || 'mongodb://localhost' ,
    port: process.env.PORT || 27017
}
