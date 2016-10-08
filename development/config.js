/* 
 HOMO = 'mongodb://10.32.223.4/susquare'
 PROD = 'mongodb://10.32.223.7/susquare'
*/

export default {
    databaseUrl: process.env.URL_MONGO || 'mongodb://10.32.223.4/susquare' ,
    port: process.env.PORT || 8888
}
