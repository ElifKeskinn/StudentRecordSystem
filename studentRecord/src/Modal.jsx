import { useState } from 'react';

function Modal({ isOpen, closeModal, saveNewRecord }) {
  const [formData, setFormData] = useState({
    ad: '',
    soyad: '',
    ePosta: '',
    dogumTarihi: '',
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    saveNewRecord(formData);
    setFormData({
        ad: '',
        soyad: '',
        ePosta: '',
        dogumTarihi: '',
      });
    closeModal();
  }

  function handleClose() {
    setFormData({
      ad: '',
      soyad: '',
      ePosta: '',
      dogumTarihi: '',
    });
    closeModal();
  }


  if (!isOpen) return null;

  return (
    <div className="modalBackdrop">
      <div className="modalContent">
        <h2>Yeni Öğrenci Ekle</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Ad</label>
            <input type="text" name="ad" required value={formData.ad} onChange={handleChange} />
          </div>
          <div>
            <label>Soyad</label>
            <input type="text" name="soyad" required value={formData.soyad} onChange={handleChange} />
          </div>
          <div>
            <label>E-Posta</label>
            <input type="email" name="ePosta" required value={formData.ePosta} onChange={handleChange} />
          </div>
          <div>
            <label>Doğum Tarihi</label>
            <input type="date" name="dogumTarihi" required value={formData.dogumTarihi} onChange={handleChange} />
          </div>
          <button type="submit">Kaydet</button>
          <button type="button" onClick={handleClose}>İptal</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;
