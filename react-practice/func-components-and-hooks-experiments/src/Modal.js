import { useState } from 'react';

const modalPage = {
  position: 'fixed',
  zIndex: 1,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  overflow: 'auto', // scrollable if modalContent element's content exceeds height of modalPage element's parent height
  backgroundColor: 'rgba(0,0,0,.6)'
};

const modalContent = {
  backgroundColor: 'white',
  width: '70%',
  border: '1px solid black',
  padding: '20px',
  margin: 'auto'
}

const dataSample = [
  {
    desc: 'test1',
  },
  {
    desc: 'test2',
  },
  {
    desc: 'test3',
  }
];

const Modal = () => {
  const [toggleModal, setToggleModal] = useState(false);

  const handleToggle = (e) => {
    console.log('clicked modal toggle button...', toggleModal);
    console.log('currentTarget', e.currentTarget);
    console.log('target', e.target);

    // prevent modal to close when clicking inside area of <div style={modalContent}>, exception being the 'close' btn
    // applying this hack bc handleToggle is also passed to parent <div style={modalPage} onclick>
    if (e.currentTarget !== e.target) {
      return;
    }

    setToggleModal(!toggleModal);
  };

  const ModalPage = () => {
    if (toggleModal) {
      return (
        <div style={modalPage} onClick={handleToggle}>
          <div style={modalContent}>
            <p>Hello, I am Modal.</p>
            {dataSample.map(ind =>
              <p key={ind.desc}>{ind.desc}</p>
            )}
            <button onClick={handleToggle}>close</button>
          </div>
        </div >
      )
    }
    return null;
  };

  return (
    <>
      <h2 className='textCenter'>Modal Test</h2>
      <button onClick={handleToggle}>Toggle Modal</button>

      <ModalPage />

      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus totam ipsa sequi consequuntur qui, exercitationem numquam maiores quasi modi natus deserunt iste iusto molestiae praesentium earum. Reiciendis qui sapiente nesciunt?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus totam ipsa sequi consequuntur qui, exercitationem numquam maiores quasi modi natus deserunt iste iusto molestiae praesentium earum. Reiciendis qui sapiente nesciunt?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus totam ipsa sequi consequuntur qui, exercitationem numquam maiores quasi modi natus deserunt iste iusto molestiae praesentium earum. Reiciendis qui sapiente nesciunt?</p>
    </>
  );
};

export default Modal;