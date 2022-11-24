import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';
import '../style/DraggableWindow.css';

type DraggableWindowProps = {
  children: React.ReactNode;
  title: string;
};

const DraggableWindow: React.FC<DraggableWindowProps> = (
  props: DraggableWindowProps
) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [isDragging, setDragging] = useState(false);
  useEffect(() => {
    console.log('draggableWindowmounted');
  }, []);

  const { children } = props;
  const { title } = props;
  const closeWindow = () => {
    console.log('closewindow');
  };
  const dragStart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDragging(true);
    setX(e.target.width - e.target.getBoundingClientRect().left);
    setY(e.target.height - e.target.getBoundingClientRect().top);
  };
  // const dragging = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (isDragging) {
  //     const left = e.screenX - x;
  //   }
  // };
  // const dragEnd = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setDragging(true);
  //   setX(e.screenX);
  // };

  return (
    <div className="DraggableWindow">
      <div className="titleBar">
        <h4 className="title">{title}</h4>
        <div className="closeButton">
          <Chip onClick={closeWindow} color="error" />
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
};

export default DraggableWindow;
