<?php

/**
*/
include_once("db_layer.php");

/**
*Users  class
*/
class users extends db_layer{

	/**
	*constructor
	*/
	function __construct(){
	}
	
	/**
	*Adds a new user
	*@param string firstname first name
	*@param string lastname last name
	*@param string username login name
	*@param string password login password
	*@param double location_lat user location
	*@param double location_long user location
	*@return boolean returns true if successful or false 
	*/
	function addUser($username,$password,$email,$phone){
		
		$strQuery="INSERT INTO proximity_users SET
					username = '$username',
					password = '$password',
					email = '$email', 
					phone = '$phone' ";
		return $this->query($strQuery);				
	}
	
	/**
	*gets user records based on the filter
	*@param string mixed condition to filter. If  false, then filter will not be applied
	*@return boolean true if successful, else false
	*/
	function getUsers($filter=false){
		$strQuery="SELECT * from proximity_users";
		
		if($filter){
			$strQuery=$strQuery . " where $filter";
		}
		return $this->query($strQuery);
	}
	
	function getUser($user_id){
		$filter="user_id = $user_id";
		
		if(!$this->getUsers($filter)){
			return false;
		}
		
		return $this->fetch();
	}
	
	/**
	*Searches for user by username, fristname, lastname 
	*@param string text search text
	*@return boolean true if successful, else false
	*/
	function searchUsers($text=false){
		$filter=false;
		
		if($text){
			$filter = " username like '%$text%' or firstname like '%$text%' or lastname like '%$text%' ";
		}
		
		return $this->getUsers($filter);
	}
	
	/**
	*delete user
	*@param int usercode the user code to be deleted
	*returns true if the user is deleted, else false
	*/
	function deleteUser($user_id){
		$strQuery = "DELETE FROM users WHERE user_id = '$user_id' ";
		
		return $this->query($strQuery);
	}
	
	/**
	*edit user
	*@param int usercode the user code to be updated
	*returns true if the user is updated, else false
	*/
	function editUser($user_id,$firstname,$lastname,$username,$password,$location_lat,$location_long){
		$strQuery = "UPDATE users SET
						firstname = '$firstname',
						lastname = '$lastname',
						username = '$username',
						password = MD5('$password'),
						location_lat = '$location_lat', 
						location_long = '$location_long'
						WHERE user_id = '$user_id' ";
		
		return $this->query($strQuery);
	}
}
?>