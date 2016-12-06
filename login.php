<?php

include_once ("db_layer.php");

/**
 * login class
 */
class login extends db_layer {

    /**
     * constructor
     */
    function __construct() {
    }

    /**
     * function authenticates user and gets user details
     * @param string username user name
     * @param string password user password
     */
    function userLogin($username, $password) {
        $str_query = "SELECT * FROM proximity_users
			    WHERE username='$username' and password='$password' ";

        return $this->query($str_query);
    }

}

?>