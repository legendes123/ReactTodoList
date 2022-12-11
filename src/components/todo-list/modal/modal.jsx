import dayjs from 'dayjs';
import React, { useState } from 'react';
import cl from './modal.module.css';
import cross from '../../../svg/cross-svgrepo-com.svg';

function Modal({ setModal, posts }) {
  const [titleModal, setTitleModal] = useState('');
  const [descriptionModal, setDescriptionModal] = useState('');
  const [dateModal, setDateModal] = useState('');
  const [dateModalNow, setDateModalNow] = useState(null);
  const [modalValidation, setModalValidation] = useState(false);
  function add() {
    if (titleModal === '' || descriptionModal === '' || dateModal === '') {
      setModalValidation(true);
    } else {
      const date1 = dayjs(dateModal);
      const date2 = dayjs();

      if (date1.isBefore(date2)) {
        setDateModalNow(true);
      } else if (date1.isAfter(date2)) {
        setDateModalNow(false);
      }
      setModal(false);
      posts.title = titleModal;
      posts.description = descriptionModal;
      posts.dataVal = dateModal;
      posts.data = dateModalNow;
      setModalValidation(false);
    }
  }

  return (
    <div className={cl.modal}>
      <div className={cl.modal__content}>

        <button
          aria-label="Mute volume"
          className={cl.modal__cross}
          type="button"
          onClick={() => setModal(false)}
        >
          <img src={cross} alt={cross} />
        </button>

        <div className={cl.container__input}>
          <div className={cl.form}>
            <div className={cl.form__title}>
              <p>Изменить заголовок</p>
              <input
                className={cl.form__input}
                onChange={(e) => setTitleModal(e.target.value)}

              />
            </div>
          </div>
          <div className={cl.form}>
            <div className={cl.form__title}>
              <p>Изменить описание</p>
              <input
                className={cl.form__input}
                onChange={(e) => setDescriptionModal(e.target.value)}
              />
            </div>
          </div>

          <div className={cl.form}>
            <div className={cl.form__title}>
              <p>Изменить дату</p>
              <input
                type="date"
                className={cl.form__input}
                onChange={(e) => setDateModal(e.target.value)}
              />
            </div>
          </div>
          {modalValidation ? <p className={cl.p__validation}>Не все поля заполнены</p> : null}
          <button onClick={add} type="button" className={cl.modal__button}>Изменить</button>

        </div>
      </div>
    </div>
  );
}

export default Modal;
