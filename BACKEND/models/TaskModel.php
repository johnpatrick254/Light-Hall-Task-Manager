<?php

declare(strict_types=1);

abstract class TaskModel{
    abstract public function __construct(string $userEmail);

    abstract public function createTask(array $data):int;

    abstract  public function taskExist(string $id);
   abstract public function getOneTask(string $id);

    abstract public function getAllTask();

   abstract  public function updateTask(string $id, array $data):int;

   abstract  public function deleteTask(string $id):int;

   abstract  public function deleteManyTasks(array $data):int;

}