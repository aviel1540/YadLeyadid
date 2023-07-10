import { ModalDialog, PopUp } from "~/components/ui";
import { Form } from "./Form";
import { useDeleteMainCategory } from "~/hooks/useMainCategory";

export const Actions = ({ setOpen, open, refetch }) => {

    const { mutate: deleteMutateMainCategory } = useDeleteMainCategory(setOpen, open, refetch);

    return (
        <>
            {open.modalDialog && (
                <ModalDialog
                    open={open}
                    setOpen={setOpen}
                    title={"האם את/ה בטוח ?"}
                    onClick={() => deleteMutateMainCategory(open.id)}
                />
            )}
            {open.popUp && (
                <PopUp setOpen={setOpen} open={open}>
                    <Form
                        open={open}
                        setOpen={setOpen}
                        refetch={refetch}
                    />
                </PopUp>
            )}
        </>
    );
};

