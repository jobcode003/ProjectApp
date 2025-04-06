<?php
$connect=mysqli_connect("localhost","root","","userlogin");
if(!$connect){
    echo " not connected";
}
$email=$_POST['email'];
$password=$_POST['password'];

$sql="SELECT * FROM signup WHERE Email='$email' AND password='$password'";

$result=mysqli_query($connect,$sql);
if($result->num_rows==1){
    header('location:com.html');
exit();
}
else{
    header('location:fail.html');
    exit();
}




?>
