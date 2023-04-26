
const { query } = require('express');
const mysqlDb = require( '../helpers/config' );

exports.reg_insDetail = async(req, res) => {
    
    console.log('reg_insDetail called');
    const values = req.body;
    
   
    var sql =
    "INSERT INTO `registration` (`Oname`,`Bname`,`Wno`,`Email`,`Password`,`Token`,`Lin_time`,`Lout_time`,`E_verified`) VALUES  ?"; 
    
    var detail = [
        [
          values.Oname,
          values.Bname,
          values.Wno,
          values.Email,
          values.Password,
          values.Token,
          values.Lin_time,
          values.Lout_time,
          values.E_verified
          
        ]
      ];

      await mysqlDb.query(sql, [detail], (err, result) => {
        if(err){   
          console.log(err);
          return res.send({
           Error_Message: err.sqlMessage,
           Sql_Query: err.sql
         });
         }else{
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
            Message_1: "Something Went Wrong!",
            Message_2: "Data Insertion Failed!"
          });
        }
    }
  });
}

exports.reg_selDetail = (req, res, next) => {
    console.log('reg_selDetail called');
    mysqlDb.query("SELECT * FROM `registration`;", (err, result) => {
        if(err){   
          console.log(err);
          return res.send({
           Error_Message: err.sqlMessage,
           Sql_Query: err.sql
         });
         }else{
        console.log(result);
        return res.send({
          Message: "Data Fetched Successfully",
          Data: result
        });
    }
  });
}

exports.reg_upDetail = async(req, res, next) => {
    console.log('reg_upDetail called');
    var rid = req.params.id;

    const values = req.body;
var sql = "UPDATE registration  SET Oname = ?,Bname= ?,Wno= ?,Email= ?,Password= ?,Token= ?,Lin_time= ?,Lout_time= ?,E_verified= ?  WHERE registration.id = ?";


    var detail = [
      
        values.Oname,
        values.Bname,
        values.Wno,
        values.Email,
        values.Password,
        values.Token,
        values.Lin_time,
        values.Lout_time,
        values.E_verified,
        rid
    ];
   
  await mysqlDb.query(sql,detail, (err, result) => {
    if(err){   
      console.log(err);
      return res.send({
       Error_Message: err.sqlMessage,
       Sql_Query: err.sql
     });
     }else {
      console.log(result);
      if(result.affectedRows < 1){
        return res.send({
          Message_1: "Something Went Wrong!",
          Message_2: "Data Updation Failed!"
        });
      }else{
         return res.send({
         Row_ID: rid,
         Message: "Data Updated Succesfully"
       });
      }      
   }
  });
}

exports.reg_delDetail = async (req, res, next) => {
    console.log('reg_delDetail called');
    var rid = req.params.id;
    
    sql="DELETE FROM `registration` WHERE `registration`.`id`= ?";
    
    await mysqlDb.query(sql,rid,(err, result) => {
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
           Row_ID: rid,
           Message: "Data Deleted Succesfully"
         });
        }
              
     }
  });
}

exports.reg_select_Detail = async (req, res, next) => {
  console.log('reg_select_Detail called');
  var sid = req.params.id;
  
  sql="SELECT * FROM `registration` WHERE `registration`.`id`= ?";
  
  await mysqlDb.query(sql,sid,(err, result) => {
      if(err){   
       console.log(err);
       return res.send({
        Error_Message: err.sqlMessage,
        Sql_Query: err.sql
      });
      } else {
      console.log(result);
      if(result == ""){
        return res.send({
          Message_1: "Something Went Wrong!",
          Message_2: "Failed To Fetch Data!"
        });
      }else{
         return res.send({
         Row_ID: rid,
         Message: "Data Fetched Succesfully"
       });
      }
            
   }
});
}


