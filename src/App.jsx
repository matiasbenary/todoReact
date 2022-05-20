import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

import { BsSun, BsMoonStarsFill, BsTrashFill } from "react-icons/bs";
import Task from "./Components/Task";

const generateId = () => {
  let id = 0;
  return () => {
    id++;
    return id;
  };
};

const getId = generateId();

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState(0);
  console.log(tasks);
  return (
    <Flex
      minH={"100vh"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={5} mx={"auto"} py={12} px={6}>
        <Flex align={"center"} justify="space-between">
          <Heading fontSize={"4xl"}>ToDo List</Heading>
          <ButtonColorModeToggle></ButtonColorModeToggle>
        </Flex>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <Input
              type="email"
              placeholder="Ingrese su tarea"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  setTasks([
                    ...tasks,
                    { title: e.target.value, hasCompleted: false, id: getId() },
                  ]);
                  e.target.value = "";
                }
              }}
            />
          </Stack>
        </Box>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={5}
        >
          <ButtonGroup variant="outline" spacing="6" mb="5">
            <Button onClick={() => setFilter(0)}>Todos</Button>
            <Button onClick={() => setFilter(1)}>Completos</Button>
            <Button onClick={() => setFilter(2)}>Incompletos</Button>
          </ButtonGroup>
          <Stack spacing={4}>
            {tasks
              .filter((task) => {
                if (
                  filter === 0 ||
                  (filter === 1 && task.hasCompleted) ||
                  (filter === 2 && !task.hasCompleted)
                ) {
                  return true;
                }
                return false;
              })
              .map((task) => (
                <Task
                  task={task}
                  setTasks={setTasks}
                  tasks={tasks}
                  key={`task-${task.id}`}
                ></Task>
              ))}
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

const ButtonColorModeToggle = (props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      aria-label="Toggle Color Mode"
      onClick={toggleColorMode}
      _focus={{ boxShadow: "none" }}
      w="fit-content"
      {...props}
    >
      {colorMode === "light" ? <BsMoonStarsFill /> : <BsSun />}
    </Button>
  );
};

export default App;
