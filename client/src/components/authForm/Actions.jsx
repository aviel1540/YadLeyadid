import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";

export const Actions = ({ setOpen, open }) => {

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    title={"האם את/ה בטוח ?"}
                // onClick={submitHandler}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        open={open}
                        setOpen={setOpen}
                    />
                </PopUp>
            )}
        </>
    );
};

