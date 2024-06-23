import React, { useState, useEffect, useRef } from "react";
import { Alert, Button, Breadcrumb, Layout, Menu, theme } from "antd";
import axios from "axios";
import { Form, Input } from "antd";
import { RiSpeakFill } from "react-icons/ri";
import { FiSend } from "react-icons/fi";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import "./SidebarStyles.css";

const { Header, Content, Footer, Sider } = Layout;

const getItem = (label, key, icon, children) => ({
  key,
  icon,
  children,
  label,
});

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const textareaRef = useRef(null);
  const [textareaHeight, setTextareaHeight] = useState("auto");

  useEffect(() => {
    if (textareaRef.current) {
      setTextareaHeight(`${textareaRef.current.scrollHeight}px`);
    }
  }, [inputText]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000); // Hide alert after 3 seconds
    });
  };
  const copyToSpeak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    try {
      // Replace with your API endpoint
      const response = await axios.post("https://readmewiz.onrender.com/api", {
        userMessage: inputText,
      });
      const botResponse = response.data.readme_content;
      //   const botResponse = "Your input is done";

      setMessages((prevMessages) => [
        ...prevMessages,
        { text: inputText, sender: "user" },
        { text: botResponse, sender: "bot" },
      ]);

      setInputText("");
      setTextareaHeight("auto");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", overflowY: "none" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>{"ReadMeWiz"}</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {showAlert && (
              <div className="alert-container">
                <Alert message="Copied to clipboard!" type="success" showIcon />
              </div>
            )}
            <div className="chat-box">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    message.sender === "user" ? "user-message" : "bot-message"
                  }`}
                >
                  {message.sender === "bot" ? (
                    <div
                      style={{
                        display: "flex",
                        alignContent: "end",
                        justifyContent: "end",
                        width: "100%",
                      }}
                    >
                      <Button
                        shape="circle"
                        onClick={() => copyToSpeak(message.text)}
                        icon={<RiSpeakFill />}
                      ></Button>
                      <Button
                        // className="copy-button"
                        type="primary"
                        style={{ marginLeft: "1rem" }}

                        onClick={() => copyToClipboard(message.text)}
                      >
                        Copy
                      </Button>
                    </div>
                  ) : null}
                  <div className="message-text">
                    {message.sender === "bot" ? (
                      <pre>{message.text}</pre>
                    ) : (
                      message.text
                    )}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="input-form">
              <Input.TextArea
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                style={{ resize: "none" }}
              />
              <Button type="primary" shape="circle" htmlType="submit">
                <FiSend />
              </Button>
            </form>
            <div style={{ textAlign: "center", marginTop: "0.4rem" }}>
              ReadMeWiz ©{new Date().getFullYear()} Created by Jash Asmani
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
