import { Table, Button, Space, Popconfirm, message, Modal, Input, Checkbox } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

import { useState } from 'react';

const ListUser: React.FC = () => {

    interface Task {
        key: string;
        task: string;
        state: string;
    }

    var initialTasks: Task[] = [
        { key: '1', task: 'task 1', state: "Pending" },
        { key: '2', task: 'task 2', state: "Completed" },
        { key: '3', task: 'task 3', state: "Pending" },
    ];

    var instruccions = {
        "title": "Create a new task",
        "content": "Add a new task to the list.",
    }

    const [tasks, setTask] = useState<Task[]>(initialTasks);
    const [newTask, setnewTask] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchWord, setSearchWord] = useState("");
    const [modalData, setModalData] = useState(instruccions);
    const [completeList, setCompleteList] = useState<Task[]>(initialTasks);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const addTasks = () => {
        const nTask = {
            key: (tasks.length + 1).toString(),
            task: newTask,
            state: "pending"
        };
        setTask(prevTasks => [...prevTasks, nTask]);
        setCompleteList(tasks)
    };

    const handleOk = () => {

        addTasks()
        setIsModalOpen(false);
        setnewTask("")
    };

    const handleCancel = () => {

        setIsModalOpen(false);
    };

    const handleDelete = (key: string) => {
        setTask(tasks.filter(task => task.key !== key));
        message.success('delete task');
    };

    const handleFilter = (state: string) => {

        var completed = [];
        var pending = [];

        if (state === "all") {
            setTask(completeList)
        }

        if (state === "Completed") {
            completed = completeList.filter(task => task.state === state)
            setTask(completed);
        }

        if (state === "Pending") {
            pending = completeList.filter(task => task.state === state)
            setTask(pending);
        }
    };

    const handleEdit = (record: Task) => {

        showModal()

        const modalContnt = {
            "title": "Edit task",
            "content": `Add a new field for the task: ${record.task}`,
        }

        tasks.forEach(task => {
            if (task.key === record.key) {
                task.task = record.task; // Modificamos directamente el array
            }
        });

        setTask(tasks);
        setModalData(modalContnt)
    };

    const handleCheckBox = (record: Task, value: boolean) => {

        initialTasks.forEach(task => {
            if (task.key === record.key) {
                task.state = value ? "Completed" : "Pending"; // Modificamos directamente el array
            }
        });

        setTask(initialTasks);
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
                    <Checkbox onChange={(e) => handleCheckBox(record, e.target.checked)}>
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
                <Button type="default" onClick={showModal}> Add a new Task </Button>

                <Button type="default" onClick={() => handleFilter("all")}> All </Button>
                <Button type="default" onClick={() => handleFilter("Completed")}> Completed </Button>
                <Button type="default" onClick={() => handleFilter("Pending")}> Pending </Button>
            </Space>



            <Modal
                title={modalData.title}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirm"
                cancelText="Cancel"
            >
                <p>{modalData.content}</p>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Input
                        placeholder="Write something."
                        value={newTask}
                        onChange={(e) => setnewTask(e.target.value)}
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