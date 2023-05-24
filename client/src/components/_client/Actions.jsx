import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";

export const Actions = ({ setOpen, open, refetch }) => {

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    // onClick={() => deleteMutateUser(open.id)}
                    title={"האם את/ה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                    />
                </PopUp>
            )}
        </>
    );
};

