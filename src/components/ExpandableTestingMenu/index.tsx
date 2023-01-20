import { useState } from "react";
import styles from "./styles.module.css";
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import Draggable, { DraggableEvent } from "react-draggable";
import { IRootState } from "../../store";
import { useSelector } from "react-redux";
import { currentPhase } from "../../store/session-slice";

type ExpandableTestingMenuProps = {
  children: React.ReactNode | React.ReactNode[];
};

export default function ExpandableTestingMenu({
  children,
}: ExpandableTestingMenuProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const { sessionSlice } = useSelector((state: IRootState) => state);

  const toggleMenuHandler = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const handleOnStopDragging = (event: DraggableEvent) => {
    event.stopPropagation();
  };

  return (
    <>
      <div
        className={styles.expandableTestingMenu}
        style={{
          top: isExpanded ? 0 : -1000,
        }}
      >
        <div className={styles.expandableTestingMenuHeader}>
          <h1>Testing Menu</h1> <h3>Completed: {Math.round(currentPhase / sessionSlice.phases.length * 100)}%</h3>
        </div>
        <div className={styles.expandableTestingMenuContent}>{children}</div>
      </div>
      <Draggable onStop={handleOnStopDragging}>
        <div className={styles.arrowContainer} onClick={toggleMenuHandler}>
          {isExpanded ? (
            <IoIosArrowDropup size={50} />
          ) : (
            <IoIosArrowDropdown size={50} />
          )}
        </div>
      </Draggable>
    </>
  );
}
