import React, { useState } from 'react';
import { TextField, Button, Container, Paper, Typography } from '@mui/material';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === '') {
      return;
    }
    const newMessage = { content: inputValue, sender: 'user' };
    setMessages([...messages, newMessage]);
    setInputValue('');

    // 在这里添加与 ChatGPT 的交互代码，获取回答并将其添加到 messages 数组中
    getChatGptReply(inputValue)
      .then((reply) => {
        const replyMessage = { content: reply, sender: 'chatgpt' };
        setMessages([...messages, replyMessage]);
      })
      .catch((error) => console.log(error));
  };

  const getChatGptReply = async (question) => {
    // 在这里添加与 ChatGPT 的交互代码，发送问题并获取回答
    // 这里只是一个示例，你需要根据你的具体情况进行实现
    const apiKey = "***";
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        body: JSON.stringify({ question,
        model: "gpt-3.5-turbo",
        temperature: 0.5,
        max_tokens: 4096,
        stream: true, }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
          
        },
      });
        
    const data = await response.json();
    return data.reply;
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Paper elevation={3} sx={{ padding: '1rem', height: '70vh', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}>
            <Typography variant="subtitle1" color={message.sender === 'user' ? 'primary' : 'secondary'}>
              {message.sender === 'user' ? 'User' : 'ChatGPT'}
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '0.5rem' }}>
              {message.content}
            </Typography>
          </div>
        ))}
      </Paper>
      <form onSubmit={handleMessageSubmit} style={{ marginTop: '1rem' }}>
        <TextField
          label="Question"
          variant="outlined"
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button variant="contained" color="primary" type="submit" style={{ marginTop: '1rem' }}>
          Send
        </Button>
      </form>
    </Container>
  );
};

export default ChatPage;
