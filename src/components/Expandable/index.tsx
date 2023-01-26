// expandable section
import styles from "./styles.module.css";
import { MdOutlineExpandLess, MdOutlineExpandMore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store";
import {
  addExpandedSection,
  removeExpandedSection,
} from "../../store/expanded-sections-slice";

type ExpandableProps = {
  title: string;
  uniqueId: string;
  children: JSX.Element | JSX.Element[];
};
export default function Expandable({
  title,
  children,
  uniqueId,
}: ExpandableProps) {
  const expandedSects = useSelector((state: IRootState) => ({
    ...state.expandedSectionsSlice,
  }));
  const dispatch = useDispatch();
  const isExpanded = expandedSects.expanded.includes(uniqueId);

  const expandToggle = () => {
    if (expandedSects.expanded.includes(uniqueId)) {
      dispatch(removeExpandedSection(uniqueId));
    } else {
      dispatch(addExpandedSection(uniqueId));
    }
  };

  return (
    <div className={styles.expandable}>
      <div className={styles.title} onClick={expandToggle}>
        {title} {isExpanded ? <MdOutlineExpandLess /> : <MdOutlineExpandMore />}
      </div>
      {isExpanded && <div className={styles.content}>{children}</div>}
    </div>
  );
}
