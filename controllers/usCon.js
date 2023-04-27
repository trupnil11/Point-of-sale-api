

const mysqlDb = require( '../helpers/config' );

exports.us_insDetail = async(req, res) => {
    
    console.log('us_insDetail called');
    const values = req.body;
    
    var sql =
    "INSERT INTO `users`(`uname`, `uemail`, `upassword`, `urole`, `uphone`) VALUES  ?"; 
    
    var detail = [
        [
            values.name,
            values.email,
            values.password,
            values.role,
            values.phone
        ]
      ];
      
      
      mysqlDb.query(sql, [detail], (err, result) => {
        console.log(result);
        if (result.affectedRows > 0) {
            return res.send({
                Insert_Id: result.insertId,
                Affected_Rows: result.affectedRows,
                Message: "Data Inserted Succesfully",
                Data: req.body,
              });
        } else {
        return res.send({
            success: "False",
            message: "Data Insertion Failed !",
            });
        }
     });
}

exports.us_selDetail = (req, res, next) => {
    console.log('us_selDetail called');
    mysqlDb.query("SELECT * FROM `users`;", (err, result) => {
        if(err){  throw err;  }
        console.log(result);
        return res.send(result);
    });
}

exports.us_upDetail = async(req, res, next) => {
    console.log('us_upDetail called'); 
    var id = req.params.id;
     
    const values = req.body;
     var sql = "UPDATE users SET uname= ?,uemail= ?,upassword= ?,urole= ?,uphone= ?  WHERE users.id = ?";
  
  
     var detail = [
      values.Uname,
      values.Uemail,
      values.Upassword,
      values.Urole,
      values.Uphone,
      id
     ];
   
     await mysqlDb.query(sql,detail, (err, result) => {
      console.log(result);
      if (result.changedRows > 0) {
      return res.send({
        Changed_Rows: result.changedRows,
        Row_ID: id,
        Message: "Data Updated Succesfully",
        Data: req.body,
      });
    } else {
      return res.send({
        Message_1: "Something Went Wrong!",
        Message_2: "Data Updation Failed!"
  
      });
    }
  });
  
  }
  
  exports.us_delDetail = async (req, res, next) => {
    console.log('us_delDetail called');
    var uid = req.params.id;
    
    sql="DELETE FROM `users` WHERE `users`.`id`= ?";
    
    await mysqlDb.query(sql,uid,(err, result) => {
        if(err){   
         console.log(err);
         return res.send({
          Error_Message: err.sqlMessage,
          Sql_Query: err.sql
        });
        } else {
        console.log(result);
        if(result.affectedRows < 1){
          return res.send({
            Message_1: "Something Went Wrong!",
            Message_2: "Data Deletion Failed!"
          });
        }else{
           return res.send({
           Row_ID: uid,
           Message: "Data Deleted Succesfully"
         });
        }
              
     }
  });
}

exports.us_select_Detail = async (req, res, next) => {
  console.log('us_select_Detail called');
  var uid = req.params.id;
  
  sql="SELECT * FROM `users` WHERE `users`.`id`= ?";
  
  await mysqlDb.query(sql,uid,(err, result) => {
      if(err){   
       console.log(err);
       return res.send({
        Error_Message: err.sqlMessage,
        Sql_Query: err.sql
      });
      } else {
      console.log(result);
      if(result != ""){
        return res.send({
          Row_ID: uid,
          Message: "Data Fetched Succesfully",
          Data: result
        });
      }else{
      return res.send({
         Message_1: "Something Went Wrong!",
         Message_2: "Failed To Fetch Data!"
       });
      }
            
   }
});
}
