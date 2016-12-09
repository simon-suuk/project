<?php
	//createDelete();

	//get command
	$cmd=$_REQUEST['cmd'];
	
	switch($cmd)
	{	
		case 1:
			addContact(); 
			break;
		case 2:
			getContacts();
			break;
		default:
			echo '{"result":0, "message":"wrong command"}';
			break;
	}

	/**
	 * function to authenticate user
	 */
	function getContacts(){
		$con=mysqli_connect("localhost","simon_baaman","2237f7e245302fb8","mobileweb__simon_baaman");
		// Check connection
		if (mysqli_connect_errno())
		{
			
		}

		$sql="SELECT contact_name, contact_num FROM contacts";
		$result=mysqli_query($con,$sql);

		// Fetch all
		$contact_details = mysqli_fetch_all($result,MYSQLI_ASSOC);
		
		if($contact_details){
			echo json_encode($contact_details);
		}else{
			echo '{"result":0,"message":"Please Check your records. No Users added Yet"}';
		}
		
		mysqli_close($con);
	}
	
	function addContact(){
		$contact_name = $_REQUEST['contact_name'];
		$contact_num = $_REQUEST['contact_num'];
		
		// Create connection
		$conn = new mysqli("localhost","simon_baaman","2237f7e245302fb8","mobileweb__simon_baaman");
		// Check connection
		if ($conn->connect_error) {
		    
		}

		$sql = "INSERT INTO contacts SET
					contact_name = '$contact_name',
					contact_num = '$contact_num' ";

		if ($conn->query($sql) === TRUE) {
		   
		} else {
		   
		}

		$conn->close();
	}
	
	
	function createDelete(){
		// Create connection
		$con=mysqli_connect("localhost","simon_baaman","2237f7e245302fb8","mobileweb__simon_baaman");
		
		
		$dsql = "DROP TABLE IF EXISTS `contacts`";
		if (mysqli_query($con, $dsql)) {
		    
		} else {
		    
		}
		
		// sql to create table
		$sql = "CREATE TABLE contacts (
		id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
		contact_name VARCHAR(50) NOT NULL,
		contact_num VARCHAR(50) NOT NULL
		)";

		if (mysqli_query($con, $sql)) {
		    
		} else {
		   
		}

		mysqli_close($con);
		
		addContact();
	}
?>