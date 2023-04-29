import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";

export const Actions = ({ setOpen, open, refetch }) => {

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    // onClick={() => deleteMutateShift(info.shiftCode)}
                    title={"האם אתה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        title={
                            open.title === "edit"
                                ? "עריכת נתונים"
                                : "הוספת מוצר חדש"
                        }
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                    />
                </PopUp>
            )}
        </>
    );
};

