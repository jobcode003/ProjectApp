<?php
//establish a connection
$connect=mysqli_connect("localhost","root","","userlogin");
if($connect){
    echo "connected";
}
else{
    echo "not connected";

}

//get the user signup details
$f_name=$_POST['firstname'];
$s_name=$_POST['secondname'];
$email=$_POST['email'];
$password=$_POST['password'];
//$hashed_password=password_hash($password,PASSWORD_DEFAULT);
//write sql code to insert
$sql="INSERT INTO signup VALUES('','$f_name','$s_name','$email','$password')";
if(mysqli_query($connect,$sql)){
    header("location:signin.html");
}
else{
    echo "values not inserted";
}

//get html elements


?>