import React, { useState } from "react";
import "../App.css";

type TPoint = { x: number; y: number };

const Points = () => {
  const [points, setPoints] = useState<TPoint[]>([]);

  const [popped, setPopped] = useState<TPoint[]>([]);

  const [reseted, setReseted] = useState<TPoint[]>([]);

  const handlePlacePoint = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;

    console.log(clientX, clientY);

    setPoints([
      ...points,
      {
        x: clientX,
        y: clientY,
      },
    ]);
  };

  const handleResetButton = () => {
    const emptyArray: TPoint[] = [];
    const resetedPoints = [...points];
    setPoints(emptyArray);
    setReseted(resetedPoints);
  };

  const handleRedoButton = () => {
    const emptyArray: TPoint[] = [];
    const resetedPoints = [...reseted];

    if (resetedPoints.length && !points.length) {
      const newPoints = [...resetedPoints];
      setPoints(newPoints);
      setReseted(emptyArray);
    }

    if (resetedPoints.length && points.length) {
      const newPoints = [...points];
      const poppedPoint = popped.pop();
      if (!poppedPoint) return;
      newPoints.push(poppedPoint);
      setPoints(newPoints);
      setReseted(emptyArray);
    }

    if (popped.length && !reseted.length) {
      const newPoints = [...points];
      const poppedPoint = popped.pop();
      if (!poppedPoint) return;
      newPoints.push(poppedPoint);
      setPoints(newPoints);
    }
  };

  const handleUndoButton = () => {
    const newPoints = [...points];
    const poppedPoint = newPoints.pop();
    if (!poppedPoint) return;
    setPopped([...popped, poppedPoint]);
    setPoints(newPoints);
  };

  return (
    <>
      <button
        disabled={points.length === 0}
        className="Reset"
        onClick={handleResetButton}
      >
        Reset
      </button>
      <button
        disabled={
          (popped.length === 0 && reseted.length === 0) ||
          (reseted.length !== 0 && points.length !== 0)
        }
        className="Redo"
        onClick={handleRedoButton}
      >
        Redo
      </button>
      <button
        disabled={points.length === 0}
        className="Undo"
        onClick={handleUndoButton}
      >
        Undo
      </button>
      <div className="App" onClick={handlePlacePoint}>
        {points.map((point, idx) => (
          <div
            className="point"
            key={idx}
            style={{ left: point.x - 4 + "px", top: point.y - 3 + "px" }}
          ></div>
        ))}
      </div>
    </>
  );
};

export default Points;
