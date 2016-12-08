<?php
	//check command
	if(!isset($_REQUEST['cmd'])){
		echo '{"result":0, "message":"command not provided"}';
		exit();
	}
	
	//get command
	$cmd=$_REQUEST['cmd'];
	
	switch($cmd)
	{	
		case 1:
			login(); 
			break;
		case 2:
			signUp();
			break;
		default:
			echo '{"result":0, "message":"wrong command"}';
			break;
	}

	/**
	 * function to authenticate user
	 */
	function login() {
		if (isset($_REQUEST['username'])) {
			$username = $_REQUEST['username'];
			$password = $_REQUEST['password'];

			include_once("login.php");

			$log = new login();
			$authenticate = $log->userLogin($username, $password);

			// checking if bookings have been gotten from database
			if (!$authenticate) {
			    echo '{"result":0,"message":"Error authenticating"}';
			    return;
			}

			$row = $log->fetch();
			if (!$row) {
			    echo '{"result":0, "message":"username or password is wrong"}';
			    return;
			} else {
				echo '{"result":1,"userInfo": ';echo json_encode($row);echo '}'; 
			}
		}
	}
	
	/**
	 * function to signup user
	 */
	function signUp() {
		if (isset($_REQUEST['username'])) {
			$username = $_REQUEST['username'];
			$password = $_REQUEST['password'];
			$email = $_REQUEST['email'];
			$phone = $_REQUEST['phone'];
			
			include_once("users.php");

			$userObj=new users();
			$r=$userObj->addUser($username,$password,$email,$phone);
			
			if(!$r){
				echo '{"result":0, "message":"Error signing up"}';
				return;
			} else {
				echo '{"result":1,"message": "You have successfully signed up for Proximity"}'; 
			}
		}
	}
?>