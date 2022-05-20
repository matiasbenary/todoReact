import {
  Checkbox,
  Divider,
  Flex,
  IconButton,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsTrashFill } from "react-icons/bs";

const Task = ({ task, tasks, setTasks }) => {
  const [isInput, setIsInput] = useState(false);
  const [input, setInput] = useState(task.title);
  if (isInput) {
    return (
      <Input
        type="email"
        placeholder="Ingrese su tarea"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            setTasks(
              tasks.map((taskMp) => {
                if (task.id == taskMp.id) {
                  return { ...taskMp, title: input };
                }
                return taskMp;
              })
            );
            setIsInput(false);
          }
        }}
      />
    );
  }
  return (
    <Flex
      justify="space-between"
      key={`list${task.id}`}
      onDoubleClick={() => setIsInput(true)}
    >
      <Checkbox
        defaultChecked={task.hasCompleted}
        onChange={() => {
          setTasks(
            tasks.map((taskFl) => {
              if (taskFl.id === task.id) {
                return {
                  ...taskFl,
                  hasCompleted: !taskFl.hasCompleted,
                };
              }
              return taskFl;
            })
          );
        }}
      >
        <Text as={task.hasCompleted ? "s" : "span"}>{task.title}</Text>
      </Checkbox>
      <IconButton
        onClick={() => {
          setTasks(tasks.filter((taskFl) => task.id !== taskFl.id));
        }}
        icon={<BsTrashFill></BsTrashFill>}
      ></IconButton>
    </Flex>
  );
};

export default Task;
