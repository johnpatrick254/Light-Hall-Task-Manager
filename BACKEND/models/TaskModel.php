<?php

declare(strict_types=1);

abstract class TaskModel{
    abstract public function createTask(array $data);
    abstract public function updateTask($id, array $data);
    abstract public function deleteTask($id);

}