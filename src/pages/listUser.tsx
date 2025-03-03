import { Table, Button, Space, Popconfirm, message, Modal, Input, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';

const ListUser: React.FC = () => {

    interface Task {
        key: string;
        task: string;
        state: string;
    }

    var instruccions = {
        "title": "Create a new task",
        "content": "Add a new task to the list.",
        execute: () => handleOk()
    }

    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [modalData, setModalData] = useState(instruccions);
    const [checkBox, setCheckBox] = useState(Boolean);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isCreating, setIsCreating] = useState(Boolean);
    const [completeList, setCompleteList] = useState<Task[]>([]);

    const showModal = () => {
        setIsModalOpen(true);
    };

    useEffect(() => {
        if (isCreating) {
            setModalData(
                {
                    "title": " Create a new task ",
                    "content": `Add a task`,
                    execute: () => {
                        addTasks();
                        setIsModalOpen(false);
                        setNewTask("");
                    }
                }
            )
        } else {
            setModalData(
                {
                    "title": "Edit task",
                    "content": `Add a new field for the task: ${selectedTask?.task}`,
                    execute: () => {
                        setTasks(tasks.map(item =>
                            item.key === selectedTask!.key ? { ...item, task: newTask } : item
                        ));
                        setNewTask("")
                        setIsModalOpen(false);
                    }
                }
            );
        }

    }, [newTask, isCreating])

    useEffect( ()=> {
        console.log(tasks);
        
        setCompleteList(tasks)
    }, [tasks])

    const addTasks = () => {
        const nTask = {
            key: (tasks.length + 1).toString(),
            task: newTask,
            state: "pending"
        };
        setTasks(prevTasks => [...prevTasks, nTask]);
    };

    const handleOk = () => {
        showModal()
        setIsCreating(true)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleDelete = (key: string) => {
        setTasks(tasks.filter(task => task.key !== key));
        message.success('delete task');
    };

    const handleFilter = (state: string) => {

        console.log(state);
        

        if (state === "all") {
            setTasks(completeList)
        }

        const filteredTasks = completeList.filter(task => task.state === state);
        setTasks(filteredTasks);
        
    };

    const handleEdit = (record: Task) => {
        if (isModalOpen == false) {
            showModal()
        }

        setIsCreating(false)
        setSelectedTask(record);
    };

    const handleCheckBox = (record: Task, value: boolean) => {
        setTasks(tasks.map(item =>
            item.key === record.key ? { ...item, state: value ? "completed" : "pending" } : item
        ));
    };

    const columns = [
        {
            title: 'Task',
            dataIndex: 'task',
            key: 'task',
        },
        {
            title: 'State',
            dataIndex: 'state',
            key: 'state',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_: any, record: Task) => (
                <Space>
                    <Checkbox checked={record.state === "completed"} onChange={(e) => handleCheckBox(record, e.target.checked)}>
                    </Checkbox>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
                        Edit
                    </Button>
                    <Popconfirm title="¿Seguro que deseas eliminar?" onConfirm={() => handleDelete(record.key)} okText="Sí" cancelText="No">
                        <Button danger icon={<DeleteOutlined />}>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ width: '800px', height: '600px', margin: '20px auto' }}>

            <Space direction="horizontal" size="large">
                <h2>Tasks</h2>
                <Button type="default" onClick={handleOk}> Add a new Task </Button>

                <Button type="default" onClick={() => handleFilter("all")}> All </Button>
                <Button type="default" onClick={() => handleFilter("completed")}> Completed </Button>
                <Button type="default" onClick={() => handleFilter("pending")}> Pending </Button>
            </Space>

            <Modal
                title={modalData.title}
                open={isModalOpen}
                onOk={modalData.execute}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>{modalData.content}</p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input
                        placeholder="Write something."
                        value={ newTask }
                        onChange={(e) => setNewTask(e.target.value)}
                        allowClear
                        style={{ width: 300 }}
                    />
                </div>
            </Modal>

            <Table columns={columns} dataSource={tasks} pagination={{ pageSize: 5 }} />;
        </div>
    )
};

export default ListUser;