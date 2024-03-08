import React from 'react';

const containerStyle = {
  backgroundColor: '#007bff',
  padding: '20px',
  margin: '20px',
  borderRadius: '15px',
  display: 'flex',
  flexDirection: 'column', // Dikey düzen
  alignItems: 'center', // Elemanları ortala
};

const titleStyle = {
  color: 'white',
  margin: 0,
  textAlign: 'center', // Yazıları ortala
  marginBottom: '10px', // "Faturalar" yazısının alt boşluğu
};

const buttonStyle = {
  backgroundColor: 'white',
  color: '#007bff',
  padding: '10px',
  borderRadius: '5px',
  alignSelf: 'flex-end', // Sağa sabitle
  marginBottom: '10px', // Butonun alt boşluğu
};

const PurchaseBillsInsert = ({ setShowInsert }) => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Yeni Fatura Oluştur</h2>
      <button style={buttonStyle} onClick={() => setShowInsert(false)}>
        Faturalara Dön
      </button>
    </div>
  );
};

export default PurchaseBillsInsert;
