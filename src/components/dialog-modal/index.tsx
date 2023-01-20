import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { useSelector, useDispatch } from "react-redux";
import { hideDialog, showDialog } from "../../store/dialog-slice";
import styles from "./styles.module.css";
import { IRootState } from "../../store";
import { currentPhase } from "../../store/session-slice";

const Transition = React.forwardRef(function Transition(props, ref) {
  // @ts-ignore
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function DialogModal() {
  const dispatch = useDispatch();
  const { dialog, sessionSlice } = useSelector((state: IRootState) => ({ ...state }));

  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown" | "closeClick"
  ) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") {
      return;
    }
    if (dialog.next) {
      dispatch(showDialog({ ...dialog.next }));
    } else {
      dispatch(hideDialog({}));
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        zIndex: "999999999999999",
      }}
    >
      <Dialog
        open={dialog.show}
        // @ts-ignore
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        disableScrollLock={true}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
      >
        <DialogTitle
          className={`${styles.header} ${styles.dialog_info}`}
          fontSize={"20px"}
        >
          {dialog.header} (Completed: {Math.round(currentPhase / sessionSlice.phases.length * 100)}%)
        </DialogTitle>
        <DialogContent className={styles.body}>
          {dialog.msgs &&
            dialog.msgs.map((msg, i) => (
              <DialogContentText
                fontSize={"16px"}
                style={{ marginBottom: "20px"}}
                className={styles.msg}
                id="alert-dialog-slide-description"
                key={i}
              >
                <img
                  src={
                    msg.type == "error"
                      ? "https://www.freeiconspng.com/uploads/orange-error-icon-0.png"
                      : msg.type === "info"
                      ? "https://www.freeiconspng.com/uploads/info-icon-6.png"
                      : "https://www.pngmart.com/files/20/Success-Transparent-Background.png"
                  }
                  alt=""
                />
                <span>{msg.msg}</span>
              </DialogContentText>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose({}, "closeClick")}>
            {dialog.next ? "Next" : "Close"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
