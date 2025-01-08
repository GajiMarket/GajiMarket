import React, { useState } from 'react'
import "../../style/Chatpage.css"

interface ChatSendProps {
  onSendMessage: (message: string, images?: string[]) => void;
}

const ChatSend: React.FC<ChatSendProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [images, setImages] = useState<string[]>([]);

  // 메시지 전송 & 이미지 업로드
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || images.length > 0) {
      onSendMessage(message, images);
      setMessage('');
      setImages([]);
      (document.getElementById('image-upload') as HTMLInputElement).value = '';  // 이미지 업로드 input 초기화
    }
  };

  // 이미지 업로드 시 미리보기
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const totalImages = images.length + filesArray.length;
      if (totalImages > 10) {
        alert('파일은 10개까지만 선택 가능합니다.');
        return;
      }

      const imagesArray = filesArray.map(file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        return new Promise<string>((resolve) => {
          reader.onload = () => {
            if (reader.result) {
              resolve(reader.result as string);
            }
          };
        });
      });
      // 이미지 업로드시 기존 이미지 초기화 후 새로 추가
      // Promise.all(imagesArray).then(setImages);

      // 이미지 업로드 시 기존 이미지 유지하면서 뒤에 추가
      Promise.all(imagesArray).then(newImages => setImages(preImages => [...preImages, ...newImages]));
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      {images.length > 0 && (  // 이미지 미리보기 창 별도 표시
        <div className="chat-image-preview-container">
          {images.slice(0, 10).map((image, index) => (
            <div key={index} className="chat-image-preview-wrapper">
              <img src={image} alt="첨부 이미지" className="chat-image-preview" />
              <button className="chat-image-remove-button" onClick={() => handleRemoveImage(index)}>x</button>
          </div>
        ))}
        </div>
      )}
      <form className="chat-send" onSubmit={handleSubmit}>
        <label htmlFor="image-upload" className="chat-plus-button">+</label>
        <input
          id="image-upload"
          type="file"
          accept="image/*"
          multiple  // 파일 여러개 선택 가능
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
          className="chat-input"
        />
        <button type="submit" className="chat-send-button">전송</button>
      </form>
    </div>
  );
};

export default ChatSend