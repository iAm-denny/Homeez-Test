import React, { useState } from "react";
import { Group, Line, Path, Rect } from "react-konva";

const ViewFloorItem = (props) => {
  const {
    item,
    displayFurnitures,
    setDisplayFurnitures,
    handleClick,
    selectedShapeId,
    handleSelectShape,
    cursor,
  } = props;

  const handleDragStart = (e) => {
    console.log("-..........", e);
    const id = e.target.attrs.name;
    const cloneFurniture = [...displayFurnitures];
    const searchItem = cloneFurniture.find((item) => item.id == id);
    const searchIndex = cloneFurniture.indexOf(item);
    cloneFurniture.splice(searchIndex, 1);
    cloneFurniture.push(searchItem);
    setDisplayFurnitures(cloneFurniture);
  };

  const handleDragEnd = (e) => {
    const id = e.target.attrs.name;
    const x = e.target._lastPos.x;
    const y = e.target._lastPos.y;

    const cloneFurniture = [...displayFurnitures];
    const searchItem = cloneFurniture.find((item) => item.id == id);
    const newData = { ...searchItem, x, y };
    const searchIndex = cloneFurniture.indexOf(item);
    cloneFurniture.splice(searchIndex, 1);
    cloneFurniture.push(newData);
    setDisplayFurnitures(cloneFurniture);
  };

  return item.tag == "polygon" ? (
    <Group
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={cursor == "hand"}
      name={item.id}
      onClick={(e) => {
        e.cancelBubble = true;
        if (cursor == "arrow") {
          handleSelectShape(item.id);
        }
      }}
      onMouseUp={(e) => {
        if (cursor == "hand") {
          const container = e.target.getStage().container();
          container.style.cursor = "grab";
        }
      }}
      onMouseDown={(e) => {
        if (cursor == "hand") {
          const container = e.target.getStage().container();
          container.style.cursor = "grabbing";
        }
      }}
      x={item.x}
      y={item.y}
    >
      <Line
        points={item.points}
        fill={item.background}
        stroke={selectedShapeId == item.id ? "red" : item.borderColor}
        closed
        scale={{
          x: 0.3,
          y: 0.3,
        }}
      />
    </Group>
  ) : (
    <Group
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable={cursor == "hand"}
      name={item.id}
      onClick={(e) => {
        e.cancelBubble = true;
        if (cursor == "arrow") {
          handleSelectShape(item.id);
        }
      }}
      onMouseUp={(e) => {
        if (cursor == "hand") {
          const container = e.target.getStage().container();
          container.style.cursor = "grab";
        }
      }}
      onMouseDown={(e) => {
        if (cursor == "hand") {
          const container = e.target.getStage().container();
          container.style.cursor = "grabbing";
        }
      }}
      x={item.x}
      y={item.y}
    >
      <Path
        data={item.d}
        fill={item.background}
        stroke={selectedShapeId == item.id ? "red" : item.borderColor}
        strokeWidth={8}
        scale={{
          x: 0.4,
          y: 0.4,
        }}
      />
    </Group>
  );
};

export default ViewFloorItem;
