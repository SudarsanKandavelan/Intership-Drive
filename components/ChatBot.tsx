"use client";

import React, { useEffect, useRef } from "react";
import { useChat, type Message } from "@ai-sdk/react";
import styles from "./ChatBot.module.css";
import { FaPaperPlane, FaRobot, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function ChatBot() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    isLoading,
    error,
  } = useChat({ api: "/api/chat" });

  useEffect(() => {
    inputRef.current?.focus(); // Always refocus input
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
    
    <div className={styles.chatContainer}>
      <div className={styles.header}>💬 AI Gemini Chat</div>

      <div className={styles.messageArea}>
        <AnimatePresence>
          {messages.map((m: Message) => {
            const isUser = m.role === "user";
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  display: "flex",
                  flexDirection: isUser ? "row-reverse" : "row",
                  alignItems: "flex-start",
                  gap: "12px",
                }}
              >
                <div style={{ fontSize: "24px", marginTop: "4px" }}>
                  {isUser ? <FaUserCircle color="#6366f1" /> : <FaRobot color="#10b981" />}
                </div>

                <div
                  className={`${styles.message} ${
                    isUser ? styles.userMessage : styles.aiMessage
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${styles.message} ${styles.aiMessage}`}
          >
            AI is typing... 🤖
          </motion.div>
        )}

        {error && (
          <div style={{ color: "red", fontWeight: "bold", fontSize: "14px" }}>
            Error: {error.message}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          inputRef.current?.focus(); // Re-focus input after submit
        }}
        className={styles.inputForm}
      >
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            type="text"
            className={styles.textInput}
            placeholder="Type your message..."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.sendButton}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <FaPaperPlane size={16} />
          </button>
        </div>
      </form>
    </div>
    </>
    
  );
}
