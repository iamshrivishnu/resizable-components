import React, { useEffect, useRef } from "react";
import "./Resizable.css";

const Resizable = ({ component: Component, content }) => {
  const topRef = useRef(),
    leftRef = useRef(),
    rightRef = useRef(),
    bottomRef = useRef(),
    wrapperRef = useRef();

  useEffect(() => {
      const wrapper = wrapperRef.current;
    const mouseDownHandler = (event) => {
      let oldX = event.clientX;
      let oldY = event.clientY;
      const target = event.target;

      const mouseMoveHandler = (moveEvent) => {
        const newX = moveEvent.clientX;
        const newY = moveEvent.clientY;
        const domRect = wrapper.getBoundingClientRect();
        const axisFactor = {
            x : 0,
            y : 0
        }
        if(target === top){
            axisFactor.y = -1 
        }else if(target === bottom){
            axisFactor.y = 1
        }else if(target === left){
            axisFactor.x = -1
        }else if(target === right){
            axisFactor.x = 1
        }
        wrapper.style.width = (domRect.width+ ((newX - oldX) * axisFactor.x)) + "px"
        wrapper.style.height = (domRect.height+ ((newY - oldY) * axisFactor.y)) + "px"
        oldX = newX;
        oldY = newY;
      };

      const mouseUpHandler = () => {
        window.removeEventListener("mousemove", mouseMoveHandler);
        window.removeEventListener("mouseup", mouseUpHandler);
      };

      window.addEventListener("mousemove", mouseMoveHandler);
      window.addEventListener("mouseup", mouseUpHandler);
    };
    const top = topRef.current,
      bottom = bottomRef.current,
      left = leftRef.current,
      right = rightRef.current;

    top.addEventListener("mousedown", mouseDownHandler);
    bottom.addEventListener("mousedown", mouseDownHandler);
    left.addEventListener("mousedown", mouseDownHandler);
    right.addEventListener("mousedown", mouseDownHandler);

    return () => {
      top.removeEventListener("mousedown", mouseDownHandler);
      bottom.removeEventListener("mousedown", mouseDownHandler);
      left.removeEventListener("mousedown", mouseDownHandler);
      right.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <div className='wrapper'>
      <span className="top" ref={topRef}></span>
      <span className="left" ref={leftRef}></span>
      <Component className="resizable" ref={wrapperRef}>{content}</Component>
      <span className="right" ref={rightRef}></span>
      <span className="bottom" ref={bottomRef}></span>
    </div>
  );
};

export default Resizable;
