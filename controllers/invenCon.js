

const mysqlDb = require( '../helpers/config' );

exports.in_insDetail = async(req, res) => {
    
    console.log('in_insDetail called');
    const values = req.body;
    
   
    var sql =
    "INSERT INTO `inventory`(`product_id`,`available_qty`,`minimum_notify_qty`) VALUES  ?"; 
    
    var detail = [
        [
          values.product_id,
          values.available_qty,
          values.minimum_notify_qty
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
            success: False,
            message: "Data Insertion Failed !",
          });
        }
    });
}
     

exports.in_selDetail = (req, res, next) => {
    console.log('in_selDetail called');
    mysqlDb.query("SELECT * FROM `inventory`;", (err, result) => {
        if(err){  throw err;  }
        console.log(result);
        return res.send(result);
    });
}

exports.in_upDetail = async(req, res, next) => {
  console.log('in_upDetail called'); 
  var id = req.params.id;
   
  const values = req.body;
   var sql = "UPDATE inventory SET product_id= ?,available_qty= ?,minimum_notify_qty= ?  WHERE inventory.id = ?";


   var detail = [
    values.B_logo,
    values.B_dis_name,
    values.B_name,
    values.B_wh_no,
    values.B_web,
    values.First_day,
    values.Last_day,
    values.Opens_at,
    values.Closing_at,
    values.Address,
    values.Country,
    values.State,
    values.City,
    values.Area,
    values.Pincode,
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

exports.ov_delDetail = async (req, res, next) => {
  console.log('ov_delDetail called');
  var oid = req.params.id;
  
  sql="DELETE FROM `overview` WHERE `overview`.`id`= ?";
  
  await mysqlDb.query(sql,oid,(err, result) => {
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
         Row_ID: oid,
         Message: "Data Deleted Succesfully"
       });
      }
            
   }
});
}

exports.ov_select_Detail = async (req, res, next) => {
  console.log('ov_select_Detail called');
  var oid = req.params.id;
  
  sql="SELECT * FROM `overview` WHERE `overview`.`id`= ?";
  
  await mysqlDb.query(sql,oid,(err, result) => {
      if(err){   
       console.log(err);
       return res.send({
        Error_Message: err.sqlMessage,
        Sql_Query: err.sql
      });
      } else {
      console.log(result);
      if(result){
        return res.send({
          Row_ID: oid,
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
