import jsonp from "jsonp"

export default class getData {
    static jsonp(url) {
        return new Promise((resolve,reject) =>{
            jsonp(url,{
                param:'callback'
            },function(err,res){
                if(!!res.city) {
                    console.log(res)
                    resolve(res)
                } else {
                    reject(err)
                }
            })
        })
    }
}