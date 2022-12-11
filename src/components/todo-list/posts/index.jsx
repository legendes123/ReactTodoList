import React from 'react';
import check from '../../../svg/icons8-галочка.svg';
import cross from '../../../svg/cross-svgrepo-com.svg';
import basket from '../../../svg/dustbin_120823.svg';
import edit from '../../../img/free-icon-edit-5859580.png';
import close from '../../../svg/timer-svgrepo-com.svg';
import cl from './index.module.css';
import Modal from '../modal/modal';

function Index({
  posts, deletePost, setModal, modal,
}) {
  return (
    <div>
      <table className={posts.data ? `${cl.container__posts} ${cl.table}` : cl.table}>
        <thead>
          <th className={cl.table__th}>Заголовок</th>
          <th className={cl.table__th}>Описание</th>
          <th className={cl.table__th}>Дата</th>
          <th className={cl.table__th}>Файл</th>
        </thead>
        <tbody>

          <th className={cl.table__th}>{posts.title}</th>
          <th className={cl.table__th}>{posts.description}</th>

          <th className={cl.table__th}>
            { posts.data
              ? <img className={cl.close} src={close} alt={close} />
              : <p>{posts.dataVal}</p> }

          </th>
          <th className={cl.table__th}>

            {posts.svg

              ? <img src={check} alt={check} />
              : <img src={cross} alt={cross} />}
          </th>

          <th className={cl.delete}>
            <img src={edit} alt={edit} />
            <button
              className={cl.delete__button}
              type="button"
              onClick={() => setModal(true)}
            >
              Редактировать
            </button>
          </th>
          <th className={cl.edit}>
            <img src={basket} alt={basket} />
            <button className={cl.edit__button} type="button" onClick={deletePost}>Удалить</button>
          </th>

        </tbody>
      </table>
      {modal
        ? <Modal setModal={setModal} posts={posts} key={posts.id} />
        : null }
    </div>

  );
}

export default Index;
