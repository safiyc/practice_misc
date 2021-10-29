import { useState, useEffect } from 'react';

const listData = [
  {
    'value': 'e',
    'orderNum': 1
  },
  {
    'value': 'f',
    'orderNum': 2
  },
  {
    'value': 'g',
    'orderNum': 3
  },
  {
    'value': 'h',
    'orderNum': 4
  },
  {
    'value': 'i',
    'orderNum': 5
  }
];

const DragAndDropList = () => {
  const [listItems, setListItems] = useState([]);
  // to grab el from dom (ex. selectelementbyid),
  // import {useRef} from 'react'; 
  // const listElementContainer = useRef(null);
  // <ul ref={listElementContainer}>

  // to setState right after first component render
  useEffect(() => {
    setListItems(listData);
    // console.log('listContainer..', listContainer.current);
  }, []);

  // console.log('listItems..', listItems);

  // let list3Live = listContainer.current;
  // console.log('list3Live: ', list3Live);

  let sourceElement;  // element being dragged

  // execute once when element clicked and dragged
  // 'e' is source element
  const handleDragStart = (e) => {
    // console.log('handledragstart e.target: ', e.target);
    e.target.style.opacity = '.25';

    sourceElement = e.target;

    // e.dataTransfer.effectAllowed = 'moved';
    // e.dataTransfer.setData('text/html', e.target.innerHTML);
  };

  // execute once when clicked is removed from dragged element
  // 'e' is source element
  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
    // console.log('onDragEnd.. item undragged');
    // console.log('after drag-drop completes: ', list3Live);
  };

  // execute continously while element is dragged over dropzone
  // 'e' is target
  const handleDragOver = (e) => {
    // e.currentTarget is target element
    // console.log('ondragover e..', e.currentTarget);

    if (e.preventDefault) {
      e.preventDefault();

      const domElementHeight = e.currentTarget.getBoundingClientRect().height;
      // console.log('target element height... ', domElementHeight);
      let domElementHeightOffset;
      domElementHeightOffset = e.clientY - e.currentTarget.getBoundingClientRect().top;
      // console.log('domElementHeightOffset: ', domElementHeightOffset);
      if (sourceElement !== e.target) {
        if (domElementHeightOffset <= domElementHeight / 2) {
          e.target.classList.add('overTop');
          e.target.classList.remove('overBottom');
        } else if (domElementHeight > domElementHeight / 2) {
          e.target.classList.add('overBottom');
          e.target.classList.remove('overTop');
        }
      }
    }

    return false;
  };

  // func executes when dragged item is dragged past a dropzone
  // remmove styling overTop/Bottom when cursor is out of d dropzone element
  // e is dropzone element
  const handleDragLeave = (e) => {
    e.target.classList.remove('overTop');
    e.target.classList.remove('overBottom');
  };

  // func is triggered at moment of dragged element drop
  // e is dropzone element
  const handleDrop = (e) => {
    e.stopPropagation();

    // 'sourceElement' is the source, 'e.target' is the target
    let sourceOrderNum = parseInt(sourceElement.getAttribute('order_num'));
    let targetOrderNum = parseInt(e.target.getAttribute('order_num'));
    console.log('sourceOrderNum...', sourceOrderNum);
    console.log('targetOrderNum...', targetOrderNum);

    // execute only if source and target are not the same element
    if (sourceElement !== e.target) {

      // copy(shallow?) listItems arr so not to change state directly
      let tempArr = [...listItems];
      // arr val of returned item
      let tempSource = tempArr.splice((sourceOrderNum - 1), 1);
      // console.log('tempArr...', tempArr);
      // console.log('tempSource...', tempSource[0]);

      // get height of dropzone element (domRect.height)
      // offsetY is relative to cursor's location inside dropzone 
      const domElementHeight = e.currentTarget.getBoundingClientRect().height;
      let domElementHeightOffset = e.clientY - e.currentTarget.getBoundingClientRect().top;
      // console.log('heightOffset...', domElementHeightOffset, 'el height: ', domElementHeight);

      // if offsetY is less than half of dropzone element's height
      // append element before dropzone element, else after
      if (domElementHeightOffset <= domElementHeight / 2) {
        // console.log('append el before dropzone el');
        if (targetOrderNum > sourceOrderNum) {
          tempArr.splice((targetOrderNum - 2), 0, tempSource[0]);
          // console.log('tempArr, targetOrderNum > sourceOrderNum...', tempArr);

          // change orderNums btwn indices source and target elements
          for (let i = (sourceOrderNum - 1); i < targetOrderNum; i++) {
            tempArr[i].orderNum = 1 + i;
          }
        } else {
          tempArr.splice((targetOrderNum - 1), 0, tempSource[0]);
          // console.log('tempArr, targetOrderNum < sourceOrderNum...', tempArr);

          // change orderNums btwn indices source and target elements
          for (let i = (targetOrderNum - 1); i < sourceOrderNum; i++) {
            tempArr[i].orderNum = 1 + i;
          }
        }
      } else if (domElementHeightOffset > domElementHeight / 2) {
        // console.log('append el after dropzone el');

        if (targetOrderNum > sourceOrderNum) {
          tempArr.splice((targetOrderNum - 1), 0, tempSource[0]);
          // console.log('tempArr, targetOrderNum > sourceOrderNum...', tempArr);

          // change orderNums btwn indices source and target elements
          for (let i = (sourceOrderNum - 1); i < targetOrderNum; i++) {
            tempArr[i].orderNum = 1 + i;
          }
        } else {
          tempArr.splice(targetOrderNum, 0, tempSource[0]);
          // console.log('tempArr, targetOrderNum < sourceOrderNum...', tempArr);

          // change orderNums btwn indices source and target elements
          for (let i = targetOrderNum; i < sourceOrderNum; i++) {
            tempArr[i].orderNum = 1 + i;
          }
        }
      }

      console.log('tempArr after orderNums changed...', tempArr);
      setListItems(tempArr);

      e.target.classList.remove('overBottom');
      e.target.classList.remove('overTop');
    }

    return false;  // good practice to return false after ondrop
  };

  return (
    <div>
      <h2 className='textCenter'>Drag And Drop An Element</h2>
      <hr />
      <ul className='container'>
        {listItems.map(item =>
          <li
            key={item.value}
            order_num={item.orderNum}
            className='item textCenter'
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {item.value} {item.orderNum}
          </li>
        )}
      </ul>
    </div>
  );
};

export default DragAndDropList;