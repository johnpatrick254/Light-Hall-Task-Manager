<?php

class Header
{
    private $status = false;
    private $token;
    private $err;

    function __construct()
    {
        $headers = getallheaders();
        $headers = getallheaders();
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            $authHeaderParts = explode(' ', $authHeader);
            if (count($authHeaderParts) === 2 && $authHeaderParts[0] === 'Bearer') {
                $this->token = $authHeaderParts[1];
                $this->status = true;
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
