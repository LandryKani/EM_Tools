import React from 'react'
import style from "./Task1.module.css";
import TaskComponent from "./TaskComponent";
import { taskData } from "../../../utils/taskData2";

function Task3() {
  return (
    <>
      <div className={style.task_container}>
        <p className={style.header}>{taskData?.length ?? 0} Tâches</p>
        <div className={style.container_elt}>
          {taskData?.map((task) => (
            <TaskComponent data={task} />
          ))}
        </div>
      </div>
    </>
  )
}

export default Task3
