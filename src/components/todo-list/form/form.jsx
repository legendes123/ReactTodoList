import dayjs from 'dayjs';
import React, { useRef, useState } from 'react';
import svg from '../../../svg/icons8-галочка.svg';
import Index from '../posts';
import cl from './form.module.css';

function Form() {
  const [posts, setPosts] = useState([]);
  const [drag, setDrag] = useState(false);
  const [files, setFiles] = useState(null);
  const [date, setDate] = useState('');
  const [dateNow, setDateNow] = useState(false);
  const [id, setId] = useState(0);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const inputFile = useRef(null);
  const [validation, setValidation] = useState(false);
  const addNewPost = (e) => {
    e.preventDefault();
    if (title === '' || description === '' || date === '') {
      setValidation(true);
    } else {
      const date1 = dayjs(date);
      const date2 = dayjs();

      if (date1.isBefore(date2)) {
        setDateNow(true);
      } else if (date1.isAfter(date2)) {
        setDateNow(false);
      }
      setPosts([
        ...posts,
        {
          id,
          title,
          description,
          svg: drag,
          data: dateNow,
          dataVal: date,
        },
      ]);

      setDrag(false);
      setId(id + 1);
      setValidation(false);
    }
  };
  function dragStartHandler(e) {
    e.preventDefault();
  }

  function dragLeaveHandler(e) {
    e.preventDefault();
    setDrag(false);
  }

  function onDropHandler(e) {
    e.preventDefault();
    setDrag(true);
    const file = [...e.dataTransfer.files];
    setFiles(file);
    console.log(file);
    console.log(files);
  }
  return (
    <div className={cl.container}>
      <div className={cl.form}>
        <div className={cl.form__title}>
          <p>Ввидите заголовок</p>
          <input
            className={cl.form__input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {validation ? <p className={cl.p__validation}>Не все поля заполнены</p> : null}
        </div>
        <div className={cl.form__title}>
          <p>Ввидите описание</p>
          <input
            className={cl.form__input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={cl.form__title}>
          <p>Ввидите дату</p>
          <input
            type="date"
            className={cl.form__input}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            ref={inputFile}
          />
        </div>
        {drag
          ? (
            <div
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              className={cl.input__wrapper}
              onDrop={(e) => onDropHandler(e)}
            >
              <label htmlFor="input__file" className={cl.input__file_button}>
                <input
                  name="file"
                  type="file"
                  id="input__file"
                  className={cl.input__file}
                />
                <img src={svg} alt={svg} />
                <span className={cl.input__file_icon_wrapper} />
                <span>Выберите файл</span>
              </label>
            </div>
          )
          : (

            <div
              className={cl.input__wrapper}
              onDragStart={(e) => dragStartHandler(e)}
              onDragLeave={(e) => dragLeaveHandler(e)}
              onDragOver={(e) => dragStartHandler(e)}
              onDrop={(e) => onDropHandler(e)}
            >
              <label htmlFor="input__file" className={cl.input__file_button}>
                <input
                  name="file"
                  type="file"
                  id="input__file"
                  className={cl.input__file}
                  onChange={() => setDrag(true)}
                />
                <span className={cl.input__file_icon_wrapper} />
                <span>Выберите файл</span>
              </label>
            </div>

          )}

        <button
          type="button"
          onClick={addNewPost}
          className={cl.button}
        >

          Создать
        </button>
      </div>
      {posts.map((item) => <Index posts={item} key={item.id} deletePost={() => setPosts([...posts.filter((product) => product.id !== item.id)])} setModal={setModal} modal={modal} />)}
    </div>
  );
}

export default Form;
