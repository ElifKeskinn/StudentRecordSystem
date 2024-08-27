import { useEffect, useState } from 'react'
import Modal from './Modal';

function App() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const savedData = localStorage.data ? JSON.parse(localStorage.data) : [];
    setData(savedData);
  }, []);
  

  function save() {
    localStorage.data = JSON.stringify(data);
  }

  function updateRecord(record) {
    let foundRecord = data.find(x => x.id === record.id);
    // referansı bozmamak için object assign kullanıyoruz
    // eğer referansı kırarsak bu sefer gösterim sırası bozulur
    // eğer bu notları çözemezseniz referansı kırıp arayüzde probleme odaklanın
    Object.assign(foundRecord, record);
    setData([...data]);
    save();
  }

  function deleteRecord(id) {
    if(!confirm('Emin misiniz?')) { return; }

    setData(data.filter(x => x.id !== id));
    save();
  }

  function saveNewRecord(newRecord) {
    const newId = data.length ? Math.max(...data.map(x => x.id)) + 1 : 1;
    newRecord.id = newId;
    setData([...data, newRecord]);
    save();
  }


  return (
    <div className='container'>
      <h1>Öğrenci bilgi sistemi 
      <button className='yeniBtn' onClick={() => setIsModalOpen(true)}>yeni</button>
      </h1>
      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>E-Posta Adresi</li>
          <li>Doğum Tarihi</li>
          <li>#</li>
        </ul>
        {data.map(x => <StudentRow key={x.id} {...x} deleteRecord={deleteRecord} updateRecord={updateRecord} />)}
      </div>
      <Modal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} saveNewRecord={saveNewRecord} />
    </div>
  )
}

function StudentRow({ id, ad, soyad, ePosta, dogumTarihi, updateRecord, deleteRecord }) {
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = id;
    updateRecord(formObj);
    setEditing(false);
  }

  return (
    //başka yere tıklandığında edit özelliğini kapatmayı ekledim
    //onBlur özelliğini buldum internette ama onunla değişim yapamıyodu
    //değiştirdiğimi sanıp düzenlemeyi kapatıyodu
    //sonra onBlur yazınca onBlurCapture önerdi vscode oldu :))

    <form onSubmit={handleSubmit} onDoubleClick={() => setEditing(true)} onBlurCapture={() => setEditing(false)}>
      {isEditing ? 
        <>
          <div className="studentTableCol">
            <input type="text" required name='ad' defaultValue={ad} />
          </div>
          <div className="studentTableCol">
            <input type="text" required name='soyad' defaultValue={soyad} />
          </div>
          <div className="studentTableCol">
            <input type="email" required name='ePosta' defaultValue={ePosta} />
          </div>
          <div className="studentTableCol">
            <input type="date" required name='dogumTarihi' defaultValue={dogumTarihi} />
          </div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(false)}>vazgeç</button>
            <button className='saveBtn' type='submit'>kaydet</button>
          </div>
        </>
        :
        <>
          <div className="studentTableCol">{ad}</div>
          <div className="studentTableCol">{soyad}</div>
          <div className="studentTableCol">{ePosta}</div>
          <div className="studentTableCol">{dogumTarihi.split('-').reverse().join('.')}</div>
          <div className="studentTableCol">
            <button type='button' onClick={() => setEditing(true)}>düzenle</button>
            <button className='delBtn' type='button' onClick={() => deleteRecord(id)}>sil</button>
          </div>
        </>
      }
    </form> 
  )
}

export default App

