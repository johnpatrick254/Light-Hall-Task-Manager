<?php

declare(strict_types=1);

namespace Route;

use Task;

function handleReq($method, ?string $endPoint, Task $task)
{
    if ($endPoint) {
//handle individual product operations
        if ($method == "PUT" || $method == "GET" || $method == "DELETE") {
            if ($method == "GET") {
             return  $task->getOneTask($endPoint); //fetch single task
            } else if ($method == "DELETE") {
                return $task->deleteTask($endPoint); //delete task
            }else if ($method == "PUT") {
                $data = json_decode(file_get_contents('php://input'));
                $changes = (array) $data[0];
                return $task->updateTask($endPoint,$changes); //update task
                
            }
        }
        http_response_code(500);
        exit("Only POST, DELETE and GET methods allowed to this route!");
    } else {

        if ($method == "DELETE" || "GET") {
            if ($method == "DELETE") {
                $data = json_decode(file_get_contents('php://input'));
                $idObject = (array) $data[0];
                $ids = (array)$idObject['data'];
                return  $task->deleteManyTasks($ids); //delete multiple tasks
            } else if ($method == "GET") {
                return $task->getAllTask();  //get all tasks
            }
        }
        http_response_code(500);
        exit("Only DELETE and GET methods allowed to this route!");
    }
}
