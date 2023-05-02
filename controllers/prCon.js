console.log("prCon called")
const mysqlDb = require( '../helpers/config' );
const upload_file = require("../helpers/upload");

exports.pr_insDetail = async(req, res) => {
  //console.log("okkkkkkkkkk" + req.file.path);  
  const values = req.body;
  

  var sql =
    "INSERT INTO `product`(`pname`,`pm_img`,`pmrp`,`pdes`,`pl_des`,`ptype`,`isactive`,`pimg1`,`pimg2`) VALUES  ?"; 
    var detail = [
        [
          values.pname,
          req.file.path,
          values.pmrp,
          values.pdes,
          values.pl_des,
          values.ptype,
          values.status,
          values.pimg1,
          values.pimg2
        ]
      ];
      
      mysqlDb.query(sql, [detail], (err, result) => {
        console.log(result);
        if (result.affectedRows > 0) {
          return res.send({
            Insert_Id: result.insertId,
            Affected_Rows: result.affectedRows,
            Message: "Data Inserted Succesfully",
            Filepath : req.file.path,
            Data: req.body
          });
        } else {
          return res.send({
            Success: False,
            Message: "Data Insertion Failed !",
          });
        }
    });
 }

exports.pr_selDetail = (req, res, next) => {
    console.log('pr_selDetail called');
    mysqlDb.query("SELECT * FROM `product`;"  , (err, result) => {
        
        if(err){  throw err;  }
        console.log(result);
        return res.send(result);
    });
}

exports.pr_upDetail = async(req, res, next) => {
    console.log('pr_upDetail called');

    var id = req.params.id;
    console.log(req.params)
    console.log(req.body);
    
    const values = req.body;
    var img_path;

    if(req.file){
      img_path = req.file.path;
    }
    else{
      img_path = req.body.old_path;
    }

    console.log(img_path);
    var isActive = parseInt(req.body.isactive)


    sql="UPDATE product SET pname= ?,pm_img= ?,pmrp= ?,pdes= ?,pl_des=?,ptype= ?,isactive= ?,pimg1= ?,pimg2= ? WHERE product.id= ?";  
          
    var detail = [
      values.pname,
      img_path,
      values.pmrp,
      values.pdes,
      values.pl_des,
      values.ptype,
      isActive,
      values.pimg1,
      values.pimg2, 
      id
     ];
    //console.log(sql);
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
        Message_2: "Data Updation Failed!",
      });
    }
  });
}


exports.pr_delDetail = async (req, res, next) => {
  console.log('pr_delDetail called');
  var pid = req.params.id;
  
  sql="DELETE FROM `product` WHERE `product`.`id`= ?";
  
  await mysqlDb.query(sql,pid,(err, result) => {
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
         Row_ID: pid,
         Message: "Data Deleted Succesfully"
       });
      }
            
   }
});
}

exports.pr_select_Detail = async (req, res, next) => {
  console.log('pr_select_Detail called');
  var pid = req.params.id;
  
  sql="SELECT * FROM `product` WHERE `product`.`id`= ?";
  
  await mysqlDb.query(sql,pid,(err, result) => {
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
          Row_ID: pid,
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
