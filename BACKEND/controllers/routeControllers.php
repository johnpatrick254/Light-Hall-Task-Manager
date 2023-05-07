<?php

declare(strict_types=1);
namespace Route;
use Task;

function handleReq($method, ?string $endPoint, Task $task)
{
    if ($endPoint) {
        //handle individual product operations
        if ($method == "PUT" || "GET" || "DELETE" || "POST") {
            if ($method == "GET") {
                return  $task->getOneTask($endPoint); //fetch single task
            } else if ($method == "DELETE") {
                return $task->deleteTask($endPoint); //delete task
            } else if ($method == "PUT") {
                $data = json_decode(file_get_contents('php://input'));
                $changes = (array) $data;
                
                return $task->updateTask($endPoint, $changes); //update task
            }
        }
        http_response_code(500);
        exit("Only POST,PUT, DELETE and GET methods allowed to this route!");
    } else {
        //fetch all tasks or delete multiple
        if ($method == "DELETE" || "GET" || "POST") {
            if ($method == "DELETE") {
                $data = json_decode(file_get_contents('php://input'));
                $idObject = (array) $data[0];
                $ids = (array)$idObject['data'];
                return  $task->deleteManyTasks($ids); //delete multiple tasks
            } else if ($method == "GET") {
                return $task->getAllTask();  //get all tasks
            } else if ($method == "POST") {
                $data = json_decode(file_get_contents('php://input'));
                $newTask = (array) $data;
                return $task->createTask($newTask); //create task
            }
        }
        http_response_code(500);
        exit(" DELETE ,POST and GET methods allowed to this route!");
    }
}
