import "antd/dist/antd.css";
import "./App.css";
import { Button, Table, Modal, Input } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {SearchOutlined} from "@ant-design/icons";
import './home.css'

function Home() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPersonal, setEditingPersonal] = useState(null);
  const [dataSource, setDataSource] = useState([
    {
      id: 1,
      name: "adaylarla ilgili teknik bir ödev hazırlamamam gerekiyor",
      address: "Urgent",
    },
    {
      id: 2,
      name: "yapılan işlerle ilgili activity kayıtları oluşturmam gerekiyor",
      address: "Regular",
    },
    {
      id: 3,
      name: "teknik taskları planlayacağım",
      address: "Trivial",
    },

  ]);
  const columns = [
    {
      key: "1",
      title: "",
      dataIndex: "id",
      sorter:(record1,record2)=>{
        return record1.id > record2.id
      }
    },
    {
      key: "2",
      title: "Name",
      dataIndex: "name",
      filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return (
          <>
        <Input 
        autoFocus 
        placeholder="Search..." 
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value?[e.target.value]:[]);
          confirm({ closeDropdown:false });
        }}
        onPressEnter={() => {
          confirm()
        }}
        onBlur={() => {
          confirm()
        }}>
        </Input>
        <Button 
        onClick={()=>{confirm()}} 
        type='primary'>
        Search</Button>
        <Button 
        onClick={()=>{clearFilters()}} 
        type='danger'>
        Reset</Button>
        </>
        );
      },
      filterIcon:()=>{
        return <SearchOutlined />
      },
      onFilter:(value,record) => {
        return record.name.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      key: "4",
      title: "Priority",
      dataIndex: "address",
      filterDropdown:({setSelectedKeys, selectedKeys, confirm, clearFilters}) => {
        return (
          <>
        <Input 
        autoFocus 
        placeholder="Search..." 
        value={selectedKeys[0]}
        onChange={(e) => {
          setSelectedKeys(e.target.value?[e.target.value]:[]);
          confirm({ closeDropdown:false });
        }}
        onPressEnter={() => {
          confirm()
        }}
        onBlur={() => {
          confirm()
        }}>
        </Input>
        <Button 
        onClick={()=>{confirm()}} 
        type='primary'>
        Search</Button>
        <Button 
        onClick={()=>{clearFilters()}} 
        type='danger'>
        Reset</Button>
        </>
        );
      },
      filterIcon:()=>{
        return <SearchOutlined />
      },
      onFilter:(value,record) => {
        return record.address.toLowerCase().includes(value.toLowerCase())
      },
    },
    {
      key: "5",
      title: "Actions",
      render: (record) => {
        return (
          <>
            <EditOutlined
              onClick={() => {
                onEditTask(record);
              }}
            />
            <DeleteOutlined
              onClick={() => {
                onDeleteEdit(record);
              }}
              style={{ color: "red", marginLeft: 12 }}
            />
          </>
        );
      },
    },
  ];


  useEffect(()=>{
    localStorage.setItem('my-list',JSON.stringify(dataSource));
  });

  const onAddTask = () => {
    const randomNumber = parseInt(Math.random() * 1000);
    const newTask = {
      id: randomNumber,
      name: "Task " + randomNumber,
      email: randomNumber + "@gmail.com",
      address: "Urgent " + randomNumber,
    };
    setDataSource((pre) => {
      return [...pre, newTask];
    });
  };

  const onDeleteEdit = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete it?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((personal) => personal.id !== record.id);
        });
      },
    });
  };
  const onEditTask = (record) => {
    setIsEditing(true);
    setEditingPersonal({ ...record });
  };
  const resetEditing = () => {
    setIsEditing(false);
    setEditingPersonal(null);
  };
  
  return (
    <div className="Home">
      <header className="Home-header">
        <Button style={{float: 'right'}} className="Home-btn" onClick={onAddTask}>+Create</Button>
        <Table columns={columns} dataSource={dataSource}></Table>
        <Modal
          title="Edit Task"
          visible={isEditing}
          okText="Save"
          onCancel={() => {
            resetEditing();
          }}
          onOk={() => {
            setDataSource((pre) => {
              return pre.map((personal) => {
                if (personal.id === editingPersonal.id) {
                  return editingPersonal;
                } else {
                  return personal;
                }
              });
            });
            resetEditing();
          }}
        >
          <Input
            value={editingPersonal?.name}
            onChange={(e) => {
              setEditingPersonal((pre) => {
                return { ...pre, name: e.target.value };
              });
            }}
          />
          <Input
            value={editingPersonal?.address}
            onChange={(e) => {
              setEditingPersonal((pre) => {
                return { ...pre, address: e.target.value };
              });
            }}
          />
        </Modal>
      </header>
    </div>
  );
}

export default Home;

