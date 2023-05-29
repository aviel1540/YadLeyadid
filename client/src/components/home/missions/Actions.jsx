import { ModalDialog } from "~/components/ui/ModalDialog";
import { PopUp } from "~/components/ui/PopUp";
import { Form } from "./Form";

export const Actions = ({ setOpen, open, refetch }) => {

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    // onClick={() => deleteMutateProduct(open.id)}
                    title={"האם אתה בטוח ?"}
                    setOpen={setOpen}
                    open={open}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        title={open.content}
                        refetch={refetch}
                        setOpen={setOpen}
                        open={open}
                    />
                </PopUp>
            )}
        </>
    );
};

