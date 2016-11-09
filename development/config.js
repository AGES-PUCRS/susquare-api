/* 
 HOMO = 'mongodb://10.32.223.4/susquare'
 PROD = 'mongodb://10.32.223.7/susquare'
 port 8888
*/

export default {
<<<<<<< HEAD
    databaseUrl: process.env.URL_MONGO || 'mongodb://localhost/' ,
=======
    databaseUrl: process.env.URL_MONGO || 'mongodb://localhost' ,
>>>>>>> 3c292e61717fa8391285d1b9470c988cb03c9e79
    port: process.env.PORT || 27017
}
