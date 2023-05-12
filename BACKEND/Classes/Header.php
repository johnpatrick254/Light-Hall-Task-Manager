<?php

class Header
{
    private $status = false;
    private $token;
    private $err;

    function __construct()
    {
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            $authHeaderParts = explode(' ', $authHeader);
            if (count($authHeaderParts) === 2 && $authHeaderParts[0] === 'Bearer') {
                 
                if(is_string($authHeaderParts[1])){
                    $this->token = (string) $authHeaderParts[1];
                    $this->status = true;
                }
                $this->err = "$authHeaderParts[1] is not a string";
            } else {
                // Invalid authorization header format
                $this->err = " Invalid authorization header format";
            }
        } else {
            // Authorization header is missing
            $this->err = "Authorization header is missing";
        }
    }

    public function getToken()
    {
        if ($this->status) {
            return $this->token;
        } else {
           return $this->err;
        }
    }
}
