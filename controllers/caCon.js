
const { query } = require('express');
const mysqlDb = require( '../helpers/config' );

exports.ca_insDetail = async(req, res) => {
    
    console.log('ca_insDetail called');
    const values = req.body;
    console.log(values)
    
   
    var sql =
    "INSERT INTO `customers` (`cname`,`cphone`,`cemail`,`caddress`,`ccity`,`cpincode`,`cstate`,`ccountry`) VALUES  ?"; 
    
    var detail = [
        [
          values.cname,
          values.cphone,
          values.cemail,
          values.caddress,
          values.ccity,
          values.cpincode,
          values.cstate,
          values.ccountry          
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

exports.ca_selDetail = (req, res, next) => {
    console.log('ca_selDetail called');
    mysqlDb.query("SELECT * FROM `customers`;", (err, result) => {
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

exports.ca_upDetail = async(req, res, next) => {
    console.log('ca_upDetail called');
    var cid = req.params.id;

    const values = req.body;
var sql = "UPDATE customers  SET cname = ?,cphone= ?,cemail= ?,caddress= ?,ccity= ?,cpincode= ?,cstate= ?,ccountry= ?  WHERE customers.id = ?";


    var detail = [
      values.cname,
      values.cphone,
      values.cemail,
      values.caddress,
      values.ccity,
      values.cpincode,
      values.cstate,
      values.ccountry,
      cid
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
         Row_ID: cid,
         Message: "Data Updated Succesfully"
       });
      }      
   }
  });
}

exports.ca_delDetail = async (req, res, next) => {
    console.log('ca_delDetail called');
    var cid = req.params.id;
    
    sql="DELETE FROM `customers` WHERE `customers`.`id`= ?";
    
    await mysqlDb.query(sql,cid,(err, result) => {
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
           Row_ID: cid,
           Message: "Data Deleted Succesfully"
         });
        }
              
     }
  });
}

exports.ca_select_Detail = async (req, res, next) => {
  console.log('ca_select_Detail called');
  var cid = req.params.id;
  
  sql="SELECT * FROM `customers` WHERE `customers`.`id`= ?";
  
  await mysqlDb.query(sql,cid,(err, result) => {
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
         Row_ID: cid,
         Message: "Data Fetched Succesfully",
         Data : result
       });
      }
            
   }
});
}


