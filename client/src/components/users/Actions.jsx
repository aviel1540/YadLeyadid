import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";
import { useDeleteUser } from "~/hooks/useUsers";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteMutateUser } = useDeleteUser(
        setOpen,
        open,
        refetch
    );

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    onClick={() => deleteMutateUser(open.id)}
                    title={"האם אתה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        title={
                            open.title === "edit" ? "עריכת נתונים" : open.title === "asignProductToUser" ? "שיוך מוצרים ללקוח" : "הוספת לקוח חדש"
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

